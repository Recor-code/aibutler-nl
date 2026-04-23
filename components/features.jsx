// Features grid + "gebouwd anders" manifesto
const Features = () => {
  const features = [
    { icon: "📬", title: "Einde aan inbox‑sleur", body: "Automatische triage, prioritering en concept‑antwoorden in jouw toon. Je inbox wordt een beslissing van 10 minuten, niet van 2 uur." },
    { icon: "🔔", title: "Snijdt ruis weg", body: "Slim filter op Slack en Teams met door jou bepaalde grenzen. Signaal boven ruis — je ziet alleen wat telt." },
    { icon: "📎", title: "Volgt alles op", body: "Elke toezegging — van jou of anderen — wordt vastgelegd en bewaakt. Niets valt meer tussen wal en schip." },
    { icon: "📊", title: "80% minder voorbereiding", body: "Executive briefings met volledige context. Jij loopt een meeting in, de butler heeft het werk al gedaan." },
    { icon: "🎬", title: "Content‑engine", body: "Van gesprekken naar clips, posts en distributie‑klare assets. Eén opname wordt tien kanalen." },
    { icon: "🧾", title: "Financiële intelligence", body: "Maandelijkse P&L‑samenvattingen, outliers en aanbevelingen — voordat je accountant belt." },
    { icon: "📅", title: "Agenda‑regie", body: "Optimaliseert voor diepwerk en prioriteiten. Geen Tetris meer met je week." },
    { icon: "☎", title: "Belt voor je", body: "Screening, afspraken maken, informatie ophalen — in natuurlijke taal." }
  ];
  const manifesto = [
    ["Eigendom", "Volledig zelfgehost"],
    ["Overal", "Eén butler, elke app"],
    ["Onthoudt alles", "Persistent geheugen"],
    ["Actie, geen praat", "Doet het werk"],
    ["Security first", "Standaard versleuteld"]
  ];

  return (
    <section id="features" className="section-pad" style={{ background: "var(--navy-1000)" }}>
      <div className="container">
        <div style={{ maxWidth: 780, marginBottom: 72 }}>
          <span className="eyebrow">Wat hij kan</span>
          <h2 className="h-section" style={{ marginTop: 20 }}>
            Het verschil: hij <em>doet</em> het,<br/>
            in plaats van erover te praten.
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 1,
          background: "var(--line-dark)",
          border: "1px solid var(--line-dark)",
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 100
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              padding: "32px 28px",
              background: "var(--navy-1000)",
              transition: "background .3s ease",
              cursor: "default"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(201,146,45,0.04)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--navy-1000)"}>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, margin: "0 0 10px", color: "var(--cream-50)", letterSpacing: "-0.01em" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--navy-200)", margin: 0, lineHeight: 1.6 }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>

        {/* Manifesto row */}
        <div style={{
          textAlign: "center",
          padding: "60px 40px",
          borderTop: "1px solid var(--line-dark)",
          borderBottom: "1px solid var(--line-dark)"
        }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--brass-400)", marginBottom: 30 }}>
            — Anders gebouwd —
          </div>
          <div style={{
            display: "flex", justifyContent: "center", flexWrap: "wrap",
            gap: "40px 70px"
          }}>
            {manifesto.map(([big, small], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, color: "var(--cream-50)", fontStyle: "italic" }}>
                  {big}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--navy-300)", marginTop: 6 }}>
                  {small}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Features });
