import React from "react";
import Logo from "./logo";

// Top navigation
const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "16px 0",
      background: scrolled ? "rgba(10,18,32,0.82)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line-dark)" : "1px solid transparent",
      transition: "all .3s ease"
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#top"><Logo /></a>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div className="nav-links" style={{ display: "flex", gap: 28, fontSize: 14, color: "var(--navy-200)" }}>
            <a href="#werking" style={{ transition: "color .2s" }} onMouseEnter={e => e.target.style.color = "var(--brass-300)"} onMouseLeave={e => e.target.style.color = ""}>Hoe het werkt</a>
            <a href="#features">Mogelijkheden</a>
            <a href="#cases">Toepassingen</a>
            <a href="#vergelijk">Vergelijk</a>
            <a href="#demo">Demo</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="#wachtlijst" className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 13 }}>
            Op de wachtlijst
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .nav-links { display: none !important; } }
      `}</style>
    </nav>
  );
};

export default Nav;
