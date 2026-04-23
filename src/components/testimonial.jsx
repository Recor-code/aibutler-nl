import React from "react";

// Testimonial + pull-quote
const Testimonial = () => (
  <section className="section-pad" style={{
    background: `
      radial-gradient(1200px 600px at 50% 50%, rgba(201,146,45,0.1), transparent 60%),
      var(--navy-1000)
    `,
    borderTop: "1px solid var(--line-dark)"
  }}>
    <div className="container" style={{ textAlign: "center", maxWidth: 980 }}>
      <div style={{ color: "var(--brass-400)", fontFamily: "var(--font-serif)", fontSize: 80, lineHeight: 0.3, marginBottom: 40 }}>"</div>
      <blockquote style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(28px, 3.4vw, 44px)",
        lineHeight: 1.25,
        fontStyle: "italic",
        color: "var(--cream-50)",
        letterSpacing: "-0.01em",
        margin: 0,
        fontWeight: 300
      }}>
        Dit is niet zomaar automatisering. Dit is een <span style={{ color: "var(--brass-300)" }}>agent</span>.
        Hij stelt niet alleen voor — hij <span style={{ color: "var(--brass-300)" }}>doet</span>.
      </blockquote>
      <div style={{ marginTop: 50, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", border: "1px solid var(--brass-500)" }}>
          <img src="assets/butler-tray.webp" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 17, color: "var(--cream-50)" }}>Merel van den Berg</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--navy-300)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 2 }}>
            COO, Noordzicht Ventures — Pilotgebruiker
          </div>
        </div>
      </div>

      {/* Logo strip */}
      <div style={{ marginTop: 80, borderTop: "1px solid var(--line-dark)", paddingTop: 40 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--navy-300)", marginBottom: 30 }}>
          In gebruik bij teams van
        </div>
        <div style={{
          display: "flex", justifyContent: "center", flexWrap: "wrap",
          gap: "28px 56px", opacity: 0.55
        }}>
          {["Noordzicht", "Kraan & Co.", "Meridiaan", "Orthos Labs", "De Zuiderling", "Helix Studio", "Kompas Legal"].map(n => (
            <div key={n} style={{
              fontFamily: "var(--font-serif)",
              fontSize: 22,
              color: "var(--cream-50)",
              letterSpacing: "-0.005em",
              fontStyle: "italic",
              fontWeight: 300
            }}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Testimonial;
