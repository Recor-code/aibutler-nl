import React from "react";

// Comparison table
const Compare = () => {
  const rows = [
    ["Voert zelfstandig taken uit", true, false, false, "deels", false],
    ["Onthoudt jouw context blijvend", true, "deels", false, false, false],
    ["Werkt in jouw bestaande apps", true, false, "deels", true, true],
    ["Proactief, handelt ongevraagd", true, false, false, false, false],
    ["Zelf te hosten (eigen data)", true, false, false, false, true],
    ["Schrijft en voert code uit", true, "deels", "deels", false, false],
    ["Werkt 24/7 op de achtergrond", true, false, false, "deels", "deels"],
    ["Leercurve", "Geen", "Laag", "Laag", "Middel", "Hoog"]
  ];
  const cols = ["AIbutler", "ChatGPT", "Copilot", "Zapier", "n8n"];

  const cell = (v) => {
    if (v === true) return <span style={{ color: "var(--brass-300)", fontSize: 18 }}>●</span>;
    if (v === false) return <span style={{ color: "var(--navy-600)", fontSize: 18 }}>○</span>;
    if (v === "deels") return <span style={{ color: "var(--navy-300)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>deels</span>;
    return <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--navy-200)" }}>{v}</span>;
  };

  return (
    <section id="vergelijk" className="section-pad" style={{ background: "var(--navy-1000)" }}>
      <div className="container">
        <div style={{ maxWidth: 780, marginBottom: 56 }}>
          <span className="eyebrow">Vergelijking</span>
          <h2 className="h-section" style={{ marginTop: 20 }}>
            Waarin de butler <em>verschilt</em>
          </h2>
          <p className="lede" style={{ marginTop: 24 }}>
            Een eerlijke naast‑elkaar‑plaatsing. Andere tools zijn geweldig voor wat ze doen — ze doen alleen niet dit.
          </p>
        </div>

        <div style={{ border: "1px solid var(--line-dark)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 1.4fr) repeat(5, 1fr)",
            background: "linear-gradient(180deg, rgba(201,146,45,0.08), transparent)",
            borderBottom: "1px solid var(--line-dark)"
          }}>
            <div style={{ padding: "20px 28px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--navy-300)" }}>
              Eigenschap
            </div>
            {cols.map((c, i) => (
              <div key={i} style={{
                padding: "20px 16px",
                fontFamily: i === 0 ? "var(--font-serif)" : "var(--font-sans)",
                fontSize: i === 0 ? 18 : 13,
                fontWeight: i === 0 ? 500 : 500,
                color: i === 0 ? "var(--brass-300)" : "var(--navy-200)",
                textAlign: "center",
                borderLeft: "1px solid var(--line-dark)"
              }}>
                {c}
              </div>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "minmax(260px, 1.4fr) repeat(5, 1fr)",
              borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--line-dark)",
              background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent"
            }}>
              <div style={{ padding: "18px 28px", fontSize: 14.5, color: "var(--cream-50)" }}>
                {r[0]}
              </div>
              {r.slice(1).map((v, j) => (
                <div key={j} style={{
                  padding: "18px 16px",
                  textAlign: "center",
                  borderLeft: "1px solid var(--line-dark)",
                  background: j === 0 ? "rgba(201,146,45,0.04)" : "transparent"
                }}>
                  {cell(v)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Compare;
