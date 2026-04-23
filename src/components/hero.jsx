// HERO — stately butler with typographic headline
const Hero = () => {
  return (
    <section id="top" style={{
      position: "relative",
      minHeight: "100vh",
      paddingTop: 140,
      paddingBottom: 80,
      overflow: "hidden",
      background: `
        radial-gradient(1200px 700px at 85% 40%, rgba(201,146,45,0.18), transparent 55%),
        radial-gradient(900px 600px at 15% 90%, rgba(46,84,144,0.28), transparent 60%),
        linear-gradient(180deg, #0a1220 0%, #0e1a2d 100%)
      `
    }}>
      <div className="grid-texture" />
      {/* Decorative arch behind butler */}
      <svg style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", opacity: 0.08, pointerEvents: "none" }}
        width="620" height="900" viewBox="0 0 620 900" fill="none">
        <path d="M310 80 Q 110 80 110 280 L 110 820 L 510 820 L 510 280 Q 510 80 310 80 Z"
          stroke="var(--brass-400)" strokeWidth="1" fill="none" />
        <path d="M310 130 Q 160 130 160 280 L 160 770 L 460 770 L 460 280 Q 460 130 310 130 Z"
          stroke="var(--brass-400)" strokeWidth="0.6" fill="none" />
      </svg>

      <div className="container-wide" style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1.05fr 1fr",
        gap: 60,
        alignItems: "center",
      }}>
        <div className="hero-copy">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span className="chip"><span className="dot" /> Beperkte pilotplaatsen beschikbaar</span>
          </div>

          <h1 className="h-display" style={{ fontSize: "clamp(52px, 7vw, 104px)", margin: 0 }}>
            Je eigen<br/>
            <em>digitale butler.</em><br/>
            <span style={{ color: "var(--navy-200)", fontSize: "0.55em", fontStyle: "normal", fontWeight: 300, letterSpacing: "-0.01em", display: "block", marginTop: 18 }}>
              Niet zomaar een chatbot — een assistent die <span style={{ color: "var(--brass-300)" }}>echt het werk doet</span>.
            </span>
          </h1>

          <p className="lede" style={{ marginTop: 36, fontSize: 19, maxWidth: "54ch" }}>
            Een autonome AI‑agent die denkt, plant en handelt in jouw naam. 24 uur per dag. Hij leest je inbox, bereidt je meetings voor, volgt afspraken op en voert taken uit — in de apps die je al gebruikt. Zonder dat jij nog een tool hoeft te leren.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
            <a href="#wachtlijst" className="btn btn-primary" style={{ padding: "16px 28px", fontSize: 15 }}>
              Plaats mij op de wachtlijst
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </a>
            <a href="#demo" className="btn btn-ghost" style={{ padding: "16px 28px", fontSize: 15 }}>
              Probeer de demo
            </a>
          </div>

          {/* Trust row */}
          <div style={{ marginTop: 64, display: "flex", gap: 44, flexWrap: "wrap" }}>
            {[
              ["24/7", "autonoom actief"],
              ["0", "nieuwe tools te leren"],
              ["100%", "zelf‑gehost & van jou"],
            ].map(([big, small], i) => (
              <div key={i}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 34, color: "var(--brass-300)", lineHeight: 1 }}>{big}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--navy-300)", marginTop: 8 }}>{small}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Butler portrait */}
        <div className="hero-portrait" style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: "5% -10% 5% -10%",
            background: "radial-gradient(closest-side, rgba(201,146,45,0.25), transparent 70%)",
            filter: "blur(40px)", zIndex: 0
          }} />
          {/* Ornate frame */}
          <div style={{
            position: "relative",
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid var(--brass-700)",
            boxShadow: "var(--shadow-lg)",
            background: "linear-gradient(180deg, #143048 0%, #0a1220 100%)",
            aspectRatio: "4/5"
          }}>
            <img src="assets/butler-hero.webp" alt="AIbutler — jouw digitale butler"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%", mixBlendMode: "normal" }} />
            {/* Brass corner ornaments */}
            {[[0,0,1,1],[0,1,1,-1],[1,0,-1,1],[1,1,-1,-1]].map(([x,y,sx,sy], i) => (
              <svg key={i} width="28" height="28" viewBox="0 0 28 28" style={{
                position: "absolute",
                [x ? "right" : "left"]: 8,
                [y ? "bottom" : "top"]: 8,
                transform: `scale(${sx}, ${sy})`,
                opacity: 0.85
              }}>
                <path d="M1 1 L14 1 M1 1 L1 14" stroke="var(--brass-400)" strokeWidth="1.2" />
                <path d="M4 4 L11 4 M4 4 L4 11" stroke="var(--brass-400)" strokeWidth="0.6" opacity="0.6" />
              </svg>
            ))}
            {/* Nameplate */}
            <div style={{
              position: "absolute", bottom: 20, left: 20, right: 20,
              padding: "12px 16px",
              background: "rgba(10,18,32,0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid var(--line-dark)",
              borderRadius: 4,
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--cream-50)" }}>Jeeves v2.6</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--brass-300)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>
                  ● In dienst — klaar voor opdracht
                </div>
              </div>
              <CrestMark size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div style={{
        position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
        color: "var(--navy-300)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8
      }}>
        <span>Rol verder</span>
        <div style={{ width: 1, height: 30, background: "linear-gradient(180deg, var(--brass-400), transparent)" }} />
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-copy, .hero-portrait { grid-column: 1 / -1; }
          #top > div:nth-of-type(2) { grid-template-columns: 1fr !important; }
          .hero-portrait { max-width: 480px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Hero });
