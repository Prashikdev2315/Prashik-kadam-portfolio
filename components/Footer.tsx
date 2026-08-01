import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop:      "1px solid rgba(255,255,255,0.05)",
        padding:        "32px var(--gutter)",
        display:        "flex",
        flexWrap:       "wrap",
        gap:            "12px",
        alignItems:     "center",
        justifyContent: "space-between",
        maxWidth:       "1200px",
        margin:         "0 auto",
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
        Designed &amp; built by {personalInfo.name}
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize:   "12px",
          color:      "var(--text-subtle)",
          margin:     0,
        }}
      >
        Next.js · TypeScript · Framer Motion
      </p>
    </footer>
  );
}
