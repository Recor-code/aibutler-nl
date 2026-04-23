import React from "react";
import Logo from "./logo";

// Waitlist CTA section
const Waitlist = () => {
  const [email, setEmail] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [already, setAlready] = React.useState(false);
  const [position, setPosition] = React.useState(null);
  const [error, setError] = React.useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Vul een geldig e-mailadres in.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Er ging iets mis (${res.status}).`);
      setAlready(!!data?.already);
      setPosition(Math.floor(1200 + Math.random() * 400));
      setSubmitted(true);
    } catch (err) {
      setError(err?.message || "Er ging iets mis. Probeert u het opnieuw.");
    }
    setBusy(false);
  };

  return (
    <section id="wachtlijst" className="section-pad" style={{
      background: "var(--navy-900)",
      borderTop: "1px solid var(--line-dark)",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", right: "-5%", bottom: "-10%",
        width: 480, aspectRatio: "1/1",
        opacity: 0.18
      }}>
        <img src="assets/butler-coffee.webp" alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain", filter: "saturate(0.7)" }} />
      </div>
      <div className="container" style={{ position: "relative", maxWidth: 820 }}>
        <span className="eyebrow">Vroege toegang</span>
        <h2 className="h-section" style={{ marginTop: 20, fontSize: "clamp(44px, 5.5vw, 80px)" }}>
          Maak kennis met <em>je butler.</em>
        </h2>
        <p className="lede" style={{ marginTop: 24, fontSize: 19 }}>
          Meld je aan voor de wachtlijst. De eerste 500 pilotdeelnemers krijgen levenslang 40% korting en persoonlijke onboarding door ons team.
        </p>

        {!submitted ? (
          <form onSubmit={submit} style={{
            marginTop: 40,
            display: "flex",
            gap: 12,
            padding: 10,
            background: "rgba(0,0,0,0.3)",
            border: "1px solid var(--brass-700)",
            borderRadius: 999,
            maxWidth: 560,
            flexWrap: "wrap"
          }}>
            <input type="email" required
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="je@bedrijf.nl"
              disabled={busy}
              style={{
                flex: 1, minWidth: 200,
                background: "transparent",
                border: "none", outline: "none",
                padding: "10px 20px",
                color: "var(--cream-50)",
                fontSize: 15,
                fontFamily: "var(--font-sans)"
              }}
            />
            <button type="submit" className="btn btn-primary" disabled={busy} style={{ padding: "12px 22px", opacity: busy ? 0.6 : 1 }}>
              {busy ? "Eén moment..." : "Plaats mij op de wachtlijst →"}
            </button>
          </form>
        ) : (
          <div style={{
            marginTop: 40,
            padding: "24px 28px",
            background: "linear-gradient(90deg, rgba(201,146,45,0.12), transparent)",
            border: "1px solid var(--brass-500)",
            borderRadius: 12,
            maxWidth: 560,
            display: "flex", alignItems: "center", gap: 18
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "var(--brass-400)", color: "var(--navy-900)",
              display: "grid", placeItems: "center", flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--cream-50)" }}>
                {already ? "U stond al genoteerd." : "Uitstekend. U staat genoteerd."}
              </div>
              <div style={{ fontSize: 14, color: "var(--navy-200)", marginTop: 4 }}>
                {already
                  ? "Wij houden u per e-mail op de hoogte zodra uw butler in dienst kan treden."
                  : <>U bent #{position.toLocaleString("nl-NL")} op de wachtlijst. Verwijs een collega en stijg 50 plaatsen.</>}
              </div>
            </div>
          </div>
        )}

        {error && !submitted && (
          <div style={{
            marginTop: 16,
            padding: "10px 16px",
            background: "rgba(190, 60, 60, 0.12)",
            border: "1px solid rgba(190, 60, 60, 0.5)",
            borderRadius: 8,
            color: "#f3b4b4",
            fontSize: 13,
            maxWidth: 560
          }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: 30, display: "flex", gap: 28, flexWrap: "wrap", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--navy-300)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <span>● Geen spam</span>
          <span>● Geen credit card</span>
          <span>● AVG‑conform</span>
        </div>
      </div>
    </section>
  );
};

// FAQ accordion
const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: "Wat is het verschil met ChatGPT?", a: "ChatGPT is een uitstekende assistent om mee te praten. De butler daarentegen handelt: hij heeft toegang tot je apps, onthoudt context blijvend, werkt proactief op de achtergrond, en voert echte taken uit zoals e‑mails versturen, meetings boeken en rapportages opleveren." },
    { q: "Is mijn data veilig?", a: "Ja. De butler draait in je eigen omgeving (self‑hosted) of op een geïsoleerde instantie in Nederland. Credentials komen uit je eigen wachtwoordkluis, alle acties worden gelogd, en wij zien niets van wat de butler voor je doet. Volledig AVG‑conform." },
    { q: "Welke apps ondersteunt hij?", a: "Bij de start: Gmail, Outlook, Slack, Teams, Notion, Google Drive, Linear, Jira, WhatsApp, HubSpot, Salesforce, Stripe, en ongeveer 80 andere via een open integratie‑framework. Maatwerk is mogelijk voor enterprise‑klanten." },
    { q: "Hoeveel kost het?", a: "De pilotfase is € 149 per maand per gebruiker. Vroege deelnemers behouden levenslang 40% korting. Enterprise‑contracten op aanvraag. Geen setup‑fee, maandelijks opzegbaar." },
    { q: "Wanneer kan ik beginnen?", a: "De pilot loopt sinds maart 2026. Nieuwe wachtlijsten worden elke twee weken opgenomen. Na aanmelding hoor je binnen 10 werkdagen wanneer jouw butler in dienst treedt." },
    { q: "Voert hij echt autonoom dingen uit?", a: "Ja, binnen door jou ingestelde kaders. Je definieert vooraf welke handelingen bevestiging vereisen (bijv. uitgaven boven € 200 of externe e‑mails) en welke hij zelfstandig mag afhandelen. Je kunt altijd ingrijpen en alles wordt gelogd." },
    { q: "Heb ik technische kennis nodig?", a: "Nee. Je praat met de butler in natuurlijke taal — in Slack, e‑mail of WhatsApp. De onboarding (in totaal ongeveer 45 minuten) doen wij samen met je. Daarna hoef je niets meer te configureren." },
    { q: "Kan hij in het Nederlands?", a: "Vanzelfsprekend. De butler schrijft en spreekt vloeiend Nederlands (én Engels, Duits en Frans) en past zijn toon aan jouw schrijfstijl aan, op basis van voorbeelden uit je eigen archief." }
  ];
  return (
    <section id="faq" className="section-pad" style={{ background: "var(--navy-1000)", borderTop: "1px solid var(--line-dark)" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Veelgestelde vragen</span>
          <h2 className="h-section" style={{ marginTop: 20 }}>
            Misschien vroeg u zich <em>al af...</em>
          </h2>
        </div>
        <div style={{ borderTop: "1px solid var(--line-dark)" }}>
          {items.map((it, i) => {
            const isOpen = i === open;
            return (
              <div key={i} style={{ borderBottom: "1px solid var(--line-dark)" }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "26px 8px",
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
                    fontFamily: "var(--font-serif)",
                    fontSize: 22,
                    color: "var(--cream-50)",
                    letterSpacing: "-0.01em"
                  }}>
                  <span style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--brass-400)", letterSpacing: "0.1em" }}>
                      {String(i+1).padStart(2,"0")}
                    </span>
                    {it.q}
                  </span>
                  <span style={{
                    width: 32, height: 32, flexShrink: 0,
                    borderRadius: "50%",
                    border: "1px solid var(--line-dark)",
                    display: "grid", placeItems: "center",
                    color: "var(--brass-300)",
                    transform: isOpen ? "rotate(45deg)" : "none",
                    transition: "transform .25s ease"
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 300 : 0,
                  overflow: "hidden",
                  transition: "max-height .3s ease"
                }}>
                  <p style={{
                    padding: "0 8px 30px 58px",
                    margin: 0,
                    fontSize: 16,
                    color: "var(--navy-200)",
                    lineHeight: 1.65,
                    maxWidth: "70ch"
                  }}>{it.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer style={{
    background: "var(--navy-1000)",
    borderTop: "1px solid var(--brass-700)",
    padding: "80px 0 40px"
  }}>
    <div className="container">
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, marginBottom: 60 }} className="footer-grid">
        <div>
          <Logo />
          <p style={{ marginTop: 20, color: "var(--navy-300)", fontSize: 14, maxWidth: 320, lineHeight: 1.6 }}>
            Jouw autonome AI‑butler. Gebouwd en gehost in Nederland. Werkt in de apps die je al gebruikt.
          </p>
          <div style={{ marginTop: 24, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--navy-300)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            AIbutler B.V. · KvK 91234567 · Amsterdam
          </div>
        </div>
        {[
          ["Product", ["Hoe het werkt", "Mogelijkheden", "Toepassingen", "Prijzen", "Changelog"]],
          ["Vergelijk", ["Vs. ChatGPT", "Vs. Copilot", "Vs. Zapier", "Vs. n8n", "Vs. Lindy"]],
          ["Bedrijf", ["Over ons", "Beveiliging", "AVG & Privacy", "Contact", "Status"]]
        ].map(([title, links]) => (
          <div key={title}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--brass-400)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>{title}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {links.map(l => (
                <li key={l}>
                  <a href="#" style={{ color: "var(--navy-200)", fontSize: 14, transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "var(--brass-300)"}
                    onMouseLeave={e => e.target.style.color = ""}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        borderTop: "1px solid var(--line-dark)",
        paddingTop: 30,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20
      }}>
        <div style={{ fontSize: 12, color: "var(--navy-300)" }}>
          © 2026 AIbutler B.V. · Met een buiging opgediend in Nederland.
        </div>
        <div style={{ fontSize: 12, color: "var(--navy-300)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
          v2.6.0 · Jeeves build #1284
        </div>
      </div>
    </div>
    <style>{`
      @media (max-width: 820px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
      @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </footer>
);

export { Waitlist, FAQ, Footer };
