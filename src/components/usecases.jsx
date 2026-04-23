import React from "react";

// Use cases — "Wat als hij zou kunnen..."
const UseCases = () => {
  const cases = [
    { num: "01", title: "Een app bouwen terwijl je slaapt", body: "Beschrijf het idee voor je naar bed gaat. Word wakker bij een werkend prototype — code, UI en testcases inbegrepen." },
    { num: "02", title: "Het signaal vinden in je data", body: "Niet zomaar een dashboard. Een interpretatie: wat betekent dit én wat zou je moeten doen?" },
    { num: "03", title: "Aankopen regelen voor jou", body: "Vluchten, kantoorbenodigdheden, abonnementen — binnen de budgetten en regels die jij vooraf instelt." },
    { num: "04", title: "Je bedrijf monitoren", body: "Bewaakt je KPI's en flagt afwijkingen voordat ze een probleem worden. Proactief, niet reactief." },
    { num: "05", title: "Je agenda beheren", body: "Plant rondom je diepwerk en prioriteiten. Zegt 'nee' wanneer dat zou moeten — en stelt een alternatief voor." },
    { num: "06", title: "Nooit meer een bal laten vallen", body: "Volgt op, rappelleert, herinnert. Zowel jou als de mensen die jou iets beloofden." },
    { num: "07", title: "Telefoongesprekken voeren", body: "Afspraken maken, reserveringen plaatsen, informatie opvragen. Met natuurlijke stem, namens jou." },
    { num: "08", title: "Onderzoek in minuten", body: "Marktanalyses, concurrenten, kandidaten. Wat een middag kost, is over tijdens je koffiepauze." }
  ];
  return (
    <section id="cases" className="section-pad" style={{ background: "var(--navy-900)", borderTop: "1px solid var(--line-dark)" }}>
      <div className="container">
        <div style={{ maxWidth: 780, marginBottom: 60 }}>
          <span className="eyebrow">Toepassingen</span>
          <h2 className="h-section" style={{ marginTop: 20 }}>
            Wat als hij <em>zou kunnen...</em>
          </h2>
          <p className="lede" style={{ marginTop: 24 }}>
            Dit is wat pas mogelijk is als een AI écht de controle heeft over tools, geheugen en initiatief.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {cases.map(c => (
            <div key={c.num}
              style={{
                padding: 32,
                background: "linear-gradient(180deg, rgba(19,36,64,0.5), rgba(10,18,32,0.5))",
                border: "1px solid var(--line-dark)",
                borderRadius: 12,
                position: "relative",
                transition: "transform .25s ease, border-color .25s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "var(--brass-500)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "var(--line-dark)"; }}
            >
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--brass-400)",
                letterSpacing: "0.1em",
                marginBottom: 20,
                display: "flex", alignItems: "center", gap: 10
              }}>
                <span>{c.num}</span>
                <span style={{ flex: 1, height: 1, background: "var(--line-dark)" }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 24, lineHeight: 1.15, margin: "0 0 14px", letterSpacing: "-0.01em" }}>
                {c.title}
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--navy-200)", margin: 0, lineHeight: 1.6 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
