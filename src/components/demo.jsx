// Live butler chat demo using window.claude.complete
const Demo = () => {
  const [messages, setMessages] = React.useState([
    { role: "butler", text: "Goedemiddag. Ik ben Jeeves, uw digitale butler. Waarmee mag ik u van dienst zijn? U kunt mij bijvoorbeeld vragen uw inbox te triëren, een meeting voor te bereiden, of een samenvatting van uw week te maken." }
  ]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  const suggestions = [
    "Triëer mijn inbox",
    "Bereid mijn meeting van 14:00 voor",
    "Vat deze week samen",
    "Plan 3 uur diepwerk morgen"
  ];

  const send = async (text) => {
    if (!text.trim() || busy) return;
    const userMsg = { role: "user", text: text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setBusy(true);

    const history = [...messages, userMsg];
    const prompt = [
      "Je bent Jeeves, een digitale butler-AI. Je spreekt Nederlands.",
      "Karakter: uiterst beleefd, semi-formeel zakelijk, kort en to-the-point.",
      "Je spreekt de gebruiker aan met 'u'. Af en toe een subtiele butler-formulering ('met alle plezier', 'tot uw dienst', 'zoals u wenst'), maar NIET overdreven.",
      "Je bent een AUTONOME agent: je kletst niet alleen, je VOERT UIT. Beschrijf concreet welke actie je onderneemt, in welke stappen, en welk resultaat de gebruiker kan verwachten.",
      "Houd antwoorden kort (max ~90 woorden). Gebruik soms een genummerde lijst van stappen.",
      "Geen emoji. Geen markdown headings. Maximaal terughoudend met opmaak.",
      "",
      "Gespreksgeschiedenis:",
      ...history.map(m => `${m.role === "butler" ? "Butler" : "Gebruiker"}: ${m.text}`),
      "Butler:"
    ].join("\n");

    try {
      const reply = await window.claude.complete(prompt);
      setMessages(m => [...m, { role: "butler", text: reply.trim() }]);
    } catch (e) {
      setMessages(m => [...m, { role: "butler", text: "Mijn excuses — ik ondervind een kleine technische storing. Probeert u het zo dadelijk opnieuw?" }]);
    }
    setBusy(false);
  };

  return (
    <section id="demo" className="section-pad" style={{
      background: `
        radial-gradient(800px 500px at 20% 30%, rgba(201,146,45,0.12), transparent 55%),
        var(--navy-900)
      `,
      borderTop: "1px solid var(--line-dark)",
      borderBottom: "1px solid var(--line-dark)"
    }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60, alignItems: "center" }} className="demo-grid">
          <div>
            <span className="eyebrow">Live demo</span>
            <h2 className="h-section" style={{ marginTop: 20 }}>
              Geef hem een <em>opdracht.</em>
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              Dit is geen video, geen mockup. Typ een taak zoals je dat in Slack zou doen, en de butler antwoordt zoals hij dat in productie zou doen — met een plan van aanpak.
            </p>
            <div style={{ marginTop: 32, display: "grid", gap: 10 }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} disabled={busy}
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: "1px solid var(--line-dark)",
                    background: "rgba(255,255,255,0.02)",
                    color: "var(--cream-50)",
                    fontSize: 14,
                    fontFamily: "var(--font-mono)",
                    cursor: busy ? "not-allowed" : "pointer",
                    transition: "all .2s",
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}
                  onMouseEnter={e => !busy && (e.currentTarget.style.borderColor = "var(--brass-500)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--line-dark)")}>
                  <span>› {s}</span>
                  <span style={{ color: "var(--brass-400)", fontSize: 12 }}>opdracht ↵</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div style={{
            background: "linear-gradient(180deg, #0e1a2d 0%, #0a1220 100%)",
            border: "1px solid var(--brass-700)",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)"
          }}>
            {/* Title bar */}
            <div style={{
              padding: "14px 20px",
              borderBottom: "1px solid var(--line-dark)",
              display: "flex", alignItems: "center", gap: 12,
              background: "rgba(201,146,45,0.04)"
            }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "1px solid var(--brass-500)" }}>
                <img src="assets/butler-hero.webp" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} alt="Jeeves" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--cream-50)" }}>Jeeves</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--brass-300)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  ● In dienst
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--navy-600)" }} />)}
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="thin-scroll" style={{
              height: 420,
              overflowY: "auto",
              padding: 24,
              display: "flex", flexDirection: "column", gap: 16
            }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "82%"
                }}>
                  {m.role === "butler" && (
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--brass-400)", marginBottom: 6 }}>
                      Jeeves
                    </div>
                  )}
                  <div style={{
                    padding: "12px 16px",
                    borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "2px 12px 12px 12px",
                    background: m.role === "user"
                      ? "linear-gradient(180deg, var(--brass-400), var(--brass-500))"
                      : "rgba(255,255,255,0.04)",
                    color: m.role === "user" ? "var(--navy-900)" : "var(--cream-50)",
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    border: m.role === "butler" ? "1px solid var(--line-dark)" : "none",
                    whiteSpace: "pre-wrap"
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, color: "var(--brass-300)", fontSize: 13, fontFamily: "var(--font-mono)" }}>
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                  <span style={{ marginLeft: 6, color: "var(--navy-300)" }}>butler werkt...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{ padding: 16, borderTop: "1px solid var(--line-dark)", background: "rgba(0,0,0,0.2)" }}>
              <form onSubmit={e => { e.preventDefault(); send(input); }}
                style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "var(--brass-400)", fontFamily: "var(--font-mono)" }}>›</span>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Geef de butler een opdracht..."
                  disabled={busy}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "var(--cream-50)",
                    fontSize: 15,
                    fontFamily: "var(--font-sans)"
                  }}
                />
                <button type="submit" disabled={busy || !input.trim()}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    background: input.trim() && !busy ? "linear-gradient(180deg, var(--brass-400), var(--brass-500))" : "rgba(255,255,255,0.06)",
                    color: input.trim() && !busy ? "var(--navy-900)" : "var(--navy-300)",
                    fontSize: 13, fontWeight: 600,
                    transition: "all .2s"
                  }}>
                  Verstuur ↵
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes dot-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-4px); opacity: 1; } }
        .typing-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brass-400); display: inline-block; animation: dot-bounce 1s infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .typing-dot:nth-child(3) { animation-delay: 0.3s; }
        @media (max-width: 980px) {
          .demo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Demo });
