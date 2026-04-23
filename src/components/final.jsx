import React from "react";
import Logo from "./logo";

// Waitlist CTA — posts directly to AWeber's addlead.pl endpoint (form id
// 295803594 / list awlist6952202). After submit AWeber redirects back to
// /?subscribed=1#wachtlijst where we render the branded success state.
const Waitlist = () => {
  const [subscribed, setSubscribed] = React.useState(false);
  const inputStyle = {
    background: "transparent",
    border: "1px solid var(--line-dark)",
    outline: "none",
    padding: "12px 16px",
    borderRadius: 8,
    color: "var(--cream-50)",
    fontSize: 15,
    fontFamily: "var(--font-sans)"
  };

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed") === "1") {
      setSubscribed(true);
      const el = document.getElementById("wachtlijst");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

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

        {!subscribed ? (
          <form
            method="post"
            action="https://www.aweber.com/scripts/addlead.pl"
            acceptCharset="UTF-8"
            className="waitlist-form"
            style={{
              marginTop: 40,
              padding: 16,
              background: "rgba(0,0,0,0.3)",
              border: "1px solid var(--brass-700)",
              borderRadius: 16,
              maxWidth: 640,
              display: "grid",
              gap: 12,
              gridTemplateColumns: "1fr 1.3fr auto"
            }}
          >
            <input type="hidden" name="meta_web_form_id" value="295803594" />
            <input type="hidden" name="meta_split_id" value="" />
            <input type="hidden" name="listname" value="awlist6952202" />
            <input type="hidden" name="redirect" value="https://aibutler.nl/?subscribed=1#wachtlijst" />
            <input type="hidden" name="meta_adtracking" value="aibutler_waitlist" />
            <input type="hidden" name="meta_message" value="1" />
            <input type="hidden" name="meta_required" value="name,email" />
            <input type="hidden" name="meta_tooltip" value="" />

            <input type="text" name="name" required placeholder="Uw naam" autoComplete="name" style={inputStyle} />
            <input type="email" name="email" required placeholder="je@bedrijf.nl" autoComplete="email" style={inputStyle} />
            <button type="submit" className="btn btn-primary" style={{ padding: "12px 22px" }}>
              Plaats mij op de wachtlijst →
            </button>

            <div style={{ display: "none" }}>
              <img src="https://forms.aweber.com/form/displays.htm?id=TJysHAzMrJws" alt="" />
            </div>
          </form>
        ) : (
          <div style={{
            marginTop: 40,
            padding: "24px 28px",
            background: "linear-gradient(90deg, rgba(201,146,45,0.12), transparent)",
            border: "1px solid var(--brass-500)",
            borderRadius: 12,
            maxWidth: 640,
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
                Uitstekend. U staat genoteerd.
              </div>
              <div style={{ fontSize: 14, color: "var(--navy-200)", marginTop: 4 }}>
                Wij hebben u zojuist een bevestigingsmail gestuurd. Klikt u daarin op de link om uw aanmelding te voltooien, dan houden wij u op de hoogte zodra uw butler in dienst kan treden.
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 30, display: "flex", gap: 28, flexWrap: "wrap", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--navy-300)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <span>● Geen spam</span>
          <span>● Geen credit card</span>
          <span>● AVG‑conform</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .waitlist-form { grid-template-columns: 1fr !important; }
        }
      `}</style>
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
