export default function Footer() {
  return (
    <footer
      style={{
        borderTop:  "1px solid rgba(255,255,255,0.05)",
        padding:    "32px 24px",
        textAlign:  "center",
        display:    "flex",
        flexDirection: "column",
        gap:        "8px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize:   "12px",
          color:      "var(--text-muted)",
          margin:     0,
        }}
      >
        Designed &amp; built by Prashik Kadam · 2027
      </p>
      <p
        style={{
          fontSize: "11px",
          color:    "#555",
          margin:   0,
        }}
      >
        Built with Next.js &amp; Vanilla CSS
      </p>
    </footer>
  );
}
