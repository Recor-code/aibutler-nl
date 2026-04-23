// Vercel serverless function: /api/waitlist
// Adds an email to AWeber list awlist6952202 (numeric list id: 6952202).
//
// Required env vars:
//   AWEBER_CLIENT_ID
//   AWEBER_CLIENT_SECRET
//   AWEBER_ACCESS_TOKEN
//   AWEBER_REFRESH_TOKEN
//
// Limitation: AWeber rotates the refresh token on every use. Without
// persistent storage, a refresh here only lives for the current lambda
// container. When the access token finally expires (~1h after the last
// fresh one), the first 401 triggers a refresh and *logs* the new
// refresh token — you must copy it into Vercel env vars to keep working
// past that point. A future iteration can persist via Vercel KV.

const AWEBER_API = "https://api.aweber.com/1.0";
const AWEBER_AUTH = "https://auth.aweber.com/oauth2/token";
const LIST_ID = "6952202";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let cachedAccountId = null;

async function parseMaybeJson(res) {
  const text = await res.text();
  try { return { text, json: text ? JSON.parse(text) : null }; }
  catch { return { text, json: null }; }
}

function aweberError(prefix, res, parsed) {
  const msg = parsed?.json?.error?.message || parsed?.text || `${prefix} ${res.status}`;
  const err = new Error(msg);
  err.status = res.status;
  err.body = parsed?.text;
  err.aweberMessage = parsed?.json?.error?.message;
  return err;
}

async function refreshAccessToken(clientId, clientSecret, refreshToken) {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(AWEBER_AUTH, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basic}`
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken
    })
  });
  const parsed = await parseMaybeJson(res);
  if (!res.ok) throw aweberError("Token refresh", res, parsed);
  return parsed.json;
}

async function getAccountId(accessToken) {
  if (cachedAccountId) return cachedAccountId;
  const res = await fetch(`${AWEBER_API}/accounts`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const parsed = await parseMaybeJson(res);
  if (!res.ok) throw aweberError("Accounts", res, parsed);
  const id = parsed.json?.entries?.[0]?.id;
  if (!id) throw new Error("Geen AWeber-account gevonden.");
  cachedAccountId = id;
  return id;
}

async function addSubscriber(accessToken, accountId, email) {
  const res = await fetch(
    `${AWEBER_API}/accounts/${accountId}/lists/${LIST_ID}/subscribers`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        tags: ["aibutler-waitlist"],
        ad_tracking: "aibutler.nl/waitlist"
      })
    }
  );
  const parsed = await parseMaybeJson(res);
  if (!res.ok) throw aweberError("Subscribe", res, parsed);
  return parsed.json;
}

function isAlreadySubscribed(err) {
  const m = err?.aweberMessage || err?.message || "";
  return /already[_\s]?subscribed|subscriber already/i.test(m);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    AWEBER_CLIENT_ID,
    AWEBER_CLIENT_SECRET,
    AWEBER_ACCESS_TOKEN,
    AWEBER_REFRESH_TOKEN
  } = process.env;

  if (!AWEBER_CLIENT_ID || !AWEBER_CLIENT_SECRET || !AWEBER_ACCESS_TOKEN || !AWEBER_REFRESH_TOKEN) {
    return res.status(500).json({ error: "AWeber env vars zijn niet volledig geconfigureerd." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  const email = (body?.email || "").toString().trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Ongeldig e-mailadres." });
  }

  const subscribeWith = async (token) => {
    const accountId = await getAccountId(token);
    return addSubscriber(token, accountId, email);
  };

  let accessToken = AWEBER_ACCESS_TOKEN;
  let tokenRefreshed = false;

  try {
    try {
      await subscribeWith(accessToken);
    } catch (err) {
      if (isAlreadySubscribed(err)) {
        return res.status(200).json({ ok: true, already: true });
      }
      if (err.status === 401 || err.status === 403) {
        const fresh = await refreshAccessToken(
          AWEBER_CLIENT_ID,
          AWEBER_CLIENT_SECRET,
          AWEBER_REFRESH_TOKEN
        );
        accessToken = fresh.access_token;
        cachedAccountId = null;
        tokenRefreshed = true;
        // AWeber rotates refresh_token on each use; surface the new one so
        // an operator can update Vercel env vars before the old one dies.
        console.warn(
          "[aweber] token refreshed. Update AWEBER_ACCESS_TOKEN and AWEBER_REFRESH_TOKEN in Vercel env vars:",
          JSON.stringify({
            access_token: fresh.access_token,
            refresh_token: fresh.refresh_token,
            expires_in: fresh.expires_in
          })
        );
        try {
          await subscribeWith(accessToken);
        } catch (retryErr) {
          if (isAlreadySubscribed(retryErr)) {
            return res.status(200).json({ ok: true, already: true, tokenRefreshed });
          }
          throw retryErr;
        }
      } else {
        throw err;
      }
    }
    return res.status(200).json({ ok: true, tokenRefreshed });
  } catch (err) {
    console.error("[aweber] error:", err?.body || err?.message);
    return res.status(502).json({
      error: String(err?.aweberMessage || err?.message || "Onbekende fout.").slice(0, 300)
    });
  }
}
