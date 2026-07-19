"use client";

import { motion, type Variants } from "framer-motion";
import { experiences } from "@/data/portfolio";

const headingVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const bulletVariants: Variants = {
  hidden:  { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.38, ease: "easeOut", delay: 0.35 + i * 0.1 },
  }),
};

// ─── Highlight config ────────────────────────────────────────────────────────
const BULLET_HIGHLIGHTS: Array<{ phrase: string; color: string }> = [
  { phrase: "Spurti",     color: "#F0F4FF" },
  { phrase: "MERN Stack", color: "#4F8EF7" },
  { phrase: "React",      color: "#4F8EF7" },
];

// Safely renders text with specific phrases bolded — no dangerouslySetInnerHTML
function BulletText({ text }: { text: string }) {
  type Part = { text: string; color?: string };
  let parts: Part[] = [{ text }];

  for (const { phrase, color } of BULLET_HIGHLIGHTS) {
    parts = parts.flatMap((part) => {
      if (part.color !== undefined) return [part];
      const segments = part.text.split(phrase);
      if (segments.length === 1) return [part];
      return segments.flatMap<Part>((seg, i) => {
        const out: Part[] = [];
        if (seg) out.push({ text: seg });
        if (i < segments.length - 1) out.push({ text: phrase, color });
        return out;
      });
    });
  }

  return (
    <>
      {parts.map((part, i) =>
        part.color !== undefined ? (
          <strong key={i} style={{ color: part.color, fontWeight: 600 }}>
            {part.text}
          </strong>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding:  "96px 24px",
        maxWidth: "1200px",
        margin:   "0 auto",
      }}
    >
      {/* Section heading */}
      <motion.div
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginBottom: "48px" }}
      >
        <div className="section-label">// work</div>
        <h2 className="section-heading">Experience</h2>
        <div className="section-divider" />
      </motion.div>

      {/* ── Premium experience card ── */}
      {experiences.map((exp) => (
        <motion.div
          key={exp.org + exp.period}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            position:     "relative",
            borderRadius: "16px",
            overflow:     "hidden",
            background:   "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(10,15,28,0.98) 100%)",
            border:       "1px solid rgba(79,142,247,0.25)",
            boxShadow:    "0 0 40px rgba(79,142,247,0.08), 0 20px 60px rgba(0,0,0,0.5)",
            padding:      "0",
          }}
          whileHover={{
            boxShadow: "0 0 60px rgba(79,142,247,0.18), 0 24px 64px rgba(0,0,0,0.55)",
            borderColor: "rgba(79,142,247,0.45)",
          }}
          transition={{ duration: 0.25 }}
        >
          {/* Glow blob — top-left */}
          <div
            aria-hidden
            style={{
              position:     "absolute",
              top:          "-60px",
              left:         "-60px",
              width:        "280px",
              height:       "280px",
              borderRadius: "50%",
              background:   "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Glow blob — bottom-right */}
          <div
            aria-hidden
            style={{
              position:     "absolute",
              bottom:       "-40px",
              right:        "-40px",
              width:        "200px",
              height:       "200px",
              borderRadius: "50%",
              background:   "radial-gradient(circle, rgba(56,226,164,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Top accent bar ── */}
          <div
            style={{
              height:     "3px",
              background: "linear-gradient(90deg, #4F8EF7 0%, #38E2A4 60%, transparent 100%)",
            }}
          />

          <div style={{ padding: "32px 36px 36px", position: "relative" }}>

            {/* ── Header: org badge + period ── */}
            <div
              style={{
                display:        "flex",
                alignItems:     "flex-start",
                justifyContent: "space-between",
                flexWrap:       "wrap",
                gap:            "16px",
                marginBottom:   "20px",
              }}
            >
              {/* Institute badge — the HERO element */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Glowing initials avatar */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "backOut", delay: 0.15 }}
                  style={{
                    width:        "48px",
                    height:       "48px",
                    borderRadius: "12px",
                    background:   "linear-gradient(135deg, rgba(79,142,247,0.2) 0%, rgba(56,226,164,0.15) 100%)",
                    border:       "1px solid rgba(79,142,247,0.35)",
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent: "center",
                    flexShrink:   0,
                    boxShadow:    "0 0 20px rgba(79,142,247,0.2)",
                    fontFamily:   "var(--font-mono), monospace",
                    fontWeight:   700,
                    fontSize:     "13px",
                    color:        "#4F8EF7",
                    letterSpacing: "0.02em",
                    lineHeight:   1,
                    textAlign:    "center",
                  }}
                >
                  IIT
                </motion.div>

                <div>
                  {/* IIT Ropar — the star of the show */}
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                    style={{
                      fontSize:      "22px",
                      fontWeight:    700,
                      color:         "#F0F4FF",
                      letterSpacing: "-0.02em",
                      lineHeight:    1.15,
                    }}
                  >
                    Indian Institute of Technology Ropar
                  </motion.div>



                </div>
              </div>

              {/* Period tag */}
              <span
                style={{
                  fontFamily:   "var(--font-mono), monospace",
                  fontSize:     "11px",
                  color:        "var(--text-muted)",
                  background:   "rgba(255,255,255,0.04)",
                  border:       "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "6px",
                  padding:      "5px 12px",
                  whiteSpace:   "nowrap",
                  flexShrink:   0,
                  alignSelf:    "flex-start",
                }}
              >
                {exp.period}
              </span>
            </div>

            {/* ── Role + lab ── */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize:     "15px",
                  fontWeight:   600,
                  color:        "#4F8EF7",
                  marginBottom: "3px",
                }}
              >
                {exp.role}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize:   "12px",
                  color:      "var(--text-muted)",
                  fontStyle:  "italic",
                }}
              >
                Vicharanashala Lab for Education Design (VLED Lab)
              </div>
            </div>

            {/* ── Divider ── */}
            <div
              style={{
                height:       "1px",
                background:   "rgba(255,255,255,0.06)",
                marginBottom: "20px",
              }}
            />

            {/* ── Bullet contributions ── */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
              {exp.bullets.map((bullet, bi) => (
                <motion.li
                  key={bi}
                  custom={bi}
                  variants={bulletVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{
                    display:    "flex",
                    gap:        "10px",
                    alignItems: "flex-start",
                    fontSize:   "14px",
                    color:      "var(--text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      width:        "6px",
                      height:       "6px",
                      borderRadius: "50%",
                      background:   "#4F8EF7",
                      flexShrink:   0,
                      marginTop:    "7px",
                      boxShadow:    "0 0 6px rgba(79,142,247,0.5)",
                    }}
                  />
                  {/* Safe highlight rendering — no dangerouslySetInnerHTML */}
                  <BulletText text={bullet} />
                </motion.li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily:   "var(--font-mono), monospace",
                    fontSize:     "11px",
                    color:        "var(--text-muted)",
                    background:   "rgba(79,142,247,0.07)",
                    border:       "1px solid rgba(79,142,247,0.18)",
                    borderRadius: "5px",
                    padding:      "4px 10px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* ── GitHub link ── */}
            {exp.githubLabel && exp.githubUrl && (
              <a
                href={exp.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  gap:            "7px",
                  fontFamily:     "var(--font-mono), monospace",
                  fontSize:       "12px",
                  color:          "#4F8EF7",
                  textDecoration: "none",
                  border:         "1px solid rgba(79,142,247,0.35)",
                  borderRadius:   "7px",
                  padding:        "6px 14px",
                  background:     "rgba(79,142,247,0.06)",
                  transition:     "all 200ms ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background   = "rgba(79,142,247,0.15)";
                  el.style.borderColor  = "rgba(79,142,247,0.6)";
                  el.style.boxShadow    = "0 0 16px rgba(79,142,247,0.2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background  = "rgba(79,142,247,0.06)";
                  el.style.borderColor = "rgba(79,142,247,0.35)";
                  el.style.boxShadow   = "none";
                }}
              >
                {/* GitHub octicon SVG */}
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.22 0 4.61-2.807 5.625-5.479 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                {exp.githubLabel}
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </section>
  );
}
