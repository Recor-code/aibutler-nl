// AIbutler logo — butler crest mark + wordmark
const Logo = ({ size = 32, showWord = true, tone = "light" }) => {
  const wordColor = tone === "light" ? "var(--cream-50)" : "var(--navy-1000)";
  const accent = "var(--brass-400)";
  const bow = "var(--accent-bow)";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* outer brass ring */}
        <circle cx="24" cy="24" r="22" stroke={accent} strokeWidth="1.2" opacity="0.5" />
        <circle cx="24" cy="24" r="19" stroke={accent} strokeWidth="0.6" opacity="0.35" />
        {/* antenna */}
        <line x1="17" y1="6" x2="15" y2="2" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="31" y1="6" x2="33" y2="2" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="15" cy="2" r="1" fill={accent} />
        <circle cx="33" cy="2" r="1" fill={accent} />
        {/* butler head — rounded square */}
        <path d="M14 13 Q14 9 18 9 L30 9 Q34 9 34 13 L34 22 Q34 26 30 26 L18 26 Q14 26 14 22 Z"
              fill={accent} opacity="0.95" />
        {/* eye */}
        <circle cx="24" cy="17" r="4" fill="var(--navy-900)" />
        <circle cx="24" cy="17" r="2.5" fill="#5fb8d6" />
        <circle cx="24" cy="17" r="1" fill="var(--navy-1000)" />
        {/* head shine */}
        <path d="M18 11 Q19 10 22 10" stroke="#fff5d9" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        {/* bow tie */}
        <path d="M17 30 L24 28 L17 34 Z M31 30 L24 28 L31 34 Z" fill={bow} />
        <rect x="22.5" y="27.5" width="3" height="5.5" rx="0.8" fill={bow} />
        {/* tux collar V */}
        <path d="M14 32 L24 44 L34 32" stroke="var(--cream-50)" strokeWidth="1.2" fill="none" opacity="0.6" />
      </svg>
      {showWord && (
        <span style={{
          fontFamily: "var(--font-serif)",
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: wordColor,
          fontVariationSettings: '"opsz" 144'
        }}>
          AI<em style={{ color: "var(--brass-400)", fontStyle: "italic", fontWeight: 400 }}>butler</em>
        </span>
      )}
    </div>
  );
};

// Small decorative crest used as divider accents
const CrestMark = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2 L14 9 L21 10 L15.5 14.5 L17 22 L12 18 L7 22 L8.5 14.5 L3 10 L10 9 Z"
      fill="none" stroke="var(--brass-500)" strokeWidth="0.8" opacity="0.7"/>
    <circle cx="12" cy="12" r="2" fill="var(--brass-400)" />
  </svg>
);

Object.assign(window, { Logo, CrestMark });
