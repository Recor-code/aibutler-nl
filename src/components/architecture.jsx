import React from "react";

// "Hoe het werkt" — architecture tabs
const Architecture = () => {
  const pillars = [
    {
      key: "schild",
      icon: "🛡",
      name: "Het Schild",
      sub: "Beveiliging",
      title: "Zelf gehost. Jouw data blijft van jou.",
      body: "De butler draait op jouw eigen infrastructuur of een afgesloten omgeving. Geheimen, credentials en geschiedenis verlaten nooit je perimeter. Volledige audit trail, rolgebaseerde toegang, en encryptie end‑to‑end.",
      bullets: ["Self‑hosted deployment", "Wachtwoordkluis‑integratie (1Password)", "Volledige audit logs", "AVG / GDPR compliant"]
    },
    {
      key: "entree",
      icon: "🚪",
      name: "De Entree",
      sub: "Gateway",
      title: "Jouw apps, verbonden. Geen nieuwe tools.",
      body: "De butler komt naar jou. Hij ontmoet je in Slack, e‑mail, WhatsApp of Teams — in de kanalen waar je al werkt. Geen ingewikkelde dashboards, geen leercurve. Gewoon een bericht, zoals naar een collega.",
      bullets: ["Slack, Teams, Discord", "E‑mail (Gmail, Outlook, IMAP)", "WhatsApp, Signal, Telegram", "CLI + Web console"]
    },
    {
      key: "handen",
      icon: "✍",
      name: "De Handen",
      sub: "Actie‑agent",
      title: "Schrijft code. Voert uit. Handelt.",
      body: "Dit is waar de butler zich onderscheidt: hij kletst niet alleen, hij doet. Triage van je inbox, webonderzoek, bestelopdrachten, rapporten — binnen door jou gedefinieerde grenzen.",
      bullets: ["E‑mail triage & concepten", "Web‑taken & onderzoek", "Code schrijven & uitvoeren", "API's aanroepen"]
    },
    {
      key: "hartslag",
      icon: "💓",
      name: "De Hartslag",
      sub: "Proactief",
      title: "Handelt voordat je het vraagt.",
      body: "De meeste AI wacht tot je iets typt. Deze butler niet. Hij monitort je agenda, mail en KPI's, en komt ongevraagd met briefings, signaleringen en voorstellen op het juiste moment.",
      bullets: ["Dagelijkse prioriteiten", "Briefings voor meetings", "KPI‑monitoring", "Deadline‑bewaking"]
    },
    {
      key: "brein",
      icon: "🧠",
      name: "Het Brein",
      sub: "Kern",
      title: "De dirigent van het geheel.",
      body: "Een centrale laag die de juiste vaardigheid kiest, werk opdeelt, delegeert aan subagents en resultaten samenvoegt — met jouw oordeelsvermogen als norm.",
      bullets: ["Planner met doelhiërarchie", "Routing naar subagents", "Tool‑selectie op context", "Zelfreflectie & correctie"]
    },
    {
      key: "vaardigheden",
      icon: "⚡",
      name: "De Vaardigheden",
      sub: "Expertise",
      title: "Voorgebouwde draaiboeken voor complex werk.",
      body: "Geen leeg canvas. Meer dan 60 klaar‑voor‑gebruik playbooks — van financiële rapportage tot content distributie — die je direct of op maat kunt inzetten.",
      bullets: ["Financiële intelligence", "Content‑engine", "Sales‑research", "Werving & selectie"]
    },
    {
      key: "geheugen",
      icon: "🧬",
      name: "Het Geheugen",
      sub: "Persoonlijkheid",
      title: "Kent je. Onthoudt alles.",
      body: "Elke conversatie, voorkeur en beslissing wordt onderdeel van een doorzoekbaar geheugen. Hoe langer hij in dienst is, hoe meer hij klinkt als jouw verlengstuk.",
      bullets: ["Notion & Drive", "E‑mailgeschiedenis", "CRM‑integratie", "Boeken & transcripten"]
    }
  ];

  const [active, setActive] = React.useState(pillars[0].key);
  const current = pillars.find(p => p.key === active);

  return (
    <section id="werking" className="section-pad" style={{ background: "var(--navy-900)", borderTop: "1px solid var(--line-dark)", borderBottom: "1px solid var(--line-dark)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "end", marginBottom: 60 }}>
          <div>
            <span className="eyebrow">Architectuur</span>
            <h2 className="h-section" style={{ marginTop: 20 }}>
              Hoe de butler <em>werkt</em>
            </h2>
          </div>
          <p className="lede" style={{ justifySelf: "end" }}>
            Geen monolithische blackbox, maar zeven samenwerkende delen — elk met een duidelijke rol in het huishouden van je digitale leven.
          </p>
        </div>

        <div className="arch-grid" style={{
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: 48
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {pillars.map(p => {
              const isActive = p.key === active;
              return (
                <button key={p.key} onClick={() => setActive(p.key)}
                  style={{
                    textAlign: "left",
                    padding: "18px 20px",
                    display: "flex", alignItems: "center", gap: 16,
                    borderRadius: 8,
                    background: isActive ? "linear-gradient(90deg, rgba(201,146,45,0.12), transparent 80%)" : "transparent",
                    borderLeft: `2px solid ${isActive ? "var(--brass-400)" : "transparent"}`,
                    transition: "all .2s ease"
                  }}>
                  <span style={{
                    fontSize: 22, width: 40, height: 40, borderRadius: 8,
                    display: "grid", placeItems: "center",
                    background: isActive ? "rgba(201,146,45,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? "var(--brass-500)" : "var(--line-dark)"}`
                  }}>{p.icon}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: isActive ? "var(--cream-50)" : "var(--navy-200)" }}>{p.name}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: isActive ? "var(--brass-300)" : "var(--navy-300)", marginTop: 3 }}>{p.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div style={{
            padding: "40px 44px",
            background: "linear-gradient(160deg, rgba(19,36,64,0.7) 0%, rgba(10,18,32,0.7) 100%)",
            border: "1px solid var(--line-dark)",
            borderRadius: 12,
            position: "relative",
            overflow: "hidden",
            minHeight: 440
          }}>
            <div style={{ position: "absolute", top: -40, right: -40, fontSize: 240, opacity: 0.05, lineHeight: 1 }}>{current.icon}</div>
            <div style={{ position: "relative" }}>
              <span className="chip">{current.sub}</span>
              <h3 style={{
                fontFamily: "var(--font-serif)",
                fontSize: 40,
                lineHeight: 1.1,
                margin: "24px 0 20px",
                letterSpacing: "-0.02em",
                color: "var(--cream-50)"
              }}>
                {current.title.split(".")[0]}.
                <span style={{ color: "var(--brass-300)", fontStyle: "italic" }}> {current.title.split(".")[1]}</span>
              </h3>
              <p style={{ fontSize: 17, color: "var(--navy-200)", maxWidth: "58ch", lineHeight: 1.65 }}>
                {current.body}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 32 }}>
                {current.bullets.map((b, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "12px 14px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--line-dark)",
                    borderRadius: 6,
                    fontSize: 13,
                    color: "var(--cream-50)"
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brass-400)" }} />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .arch-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Architecture;
