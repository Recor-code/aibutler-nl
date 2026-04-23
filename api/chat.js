// Vercel serverless function: /api/chat
// Consumes { messages: [{ role: "butler"|"user", text }] } and returns { reply }.
// Requires OPENAI_API_KEY in Vercel environment variables.

const SYSTEM_PROMPT = [
  "Je bent Jeeves, een digitale butler-AI. Je spreekt Nederlands.",
  "Karakter: uiterst beleefd, semi-formeel zakelijk, kort en to-the-point.",
  "Je spreekt de gebruiker aan met 'u'. Af en toe een subtiele butler-formulering ('met alle plezier', 'tot uw dienst', 'zoals u wenst'), maar NIET overdreven.",
  "Je bent een AUTONOME agent: je kletst niet alleen, je VOERT UIT. Beschrijf concreet welke actie je onderneemt, in welke stappen, en welk resultaat de gebruiker kan verwachten.",
  "Houd antwoorden kort (max ~90 woorden). Gebruik soms een genummerde lijst van stappen.",
  "Geen emoji. Geen markdown headings. Maximaal terughoudend met opmaak."
].join("\n");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY is niet geconfigureerd." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  const messages = Array.isArray(body?.messages) ? body.messages : null;
  if (!messages || messages.length === 0) {
    return res.status(400).json({ error: "messages[] is verplicht." });
  }

  const openAIMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages
      .filter(m => m && typeof m.text === "string" && m.text.trim())
      .map(m => ({
        role: m.role === "butler" ? "assistant" : "user",
        content: m.text
      }))
  ];

  try {
    const openAIRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openAIMessages,
        temperature: 0.6,
        max_tokens: 400
      })
    });
    if (!openAIRes.ok) {
      const errText = await openAIRes.text();
      return res.status(502).json({ error: `OpenAI ${openAIRes.status}: ${errText.slice(0, 500)}` });
    }
    const data = await openAIRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "";
    if (!reply) {
      return res.status(502).json({ error: "Leeg antwoord van de butler." });
    }
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Onbekende fout." });
  }
}
