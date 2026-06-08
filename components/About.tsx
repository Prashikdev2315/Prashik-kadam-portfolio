"use client";

import { motion, type Variants } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Target, Languages } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const ICONS: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={16} color="var(--accent)" />,
  MapPin:        <MapPin        size={16} color="var(--accent)" />,
  Briefcase:     <Briefcase     size={16} color="var(--accent)" />,
  Target:        <Target        size={16} color="var(--accent)" />,
  Languages:     <Languages     size={16} color="var(--accent-mint)" />,
};

const leftVariants: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } },
};
const rightVariants: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } },
};
const headingVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Splits `text` on `phrase` and wraps the phrase in a highlight span
function Highlighted({ text, phrase }: { text: string; phrase: string }) {
  const idx = text.indexOf(phrase);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span
        style={{
          color:         "var(--accent-mint)",
          fontWeight:    600,
          background:    "rgba(56,226,164,0.08)",
          borderRadius:  "4px",
          padding:       "0 4px",
          border:        "1px solid rgba(56,226,164,0.2)",
          whiteSpace:    "nowrap",
        }}
      >
        {phrase}
      </span>
      {text.slice(idx + phrase.length)}
    </>
  );
}

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding:   "96px 0",
        maxWidth:  "1200px",
        margin:    "0 auto",
        paddingLeft:  "24px",
        paddingRight: "24px",
      }}
    >
      {/* Heading */}
      <motion.div
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginBottom: "48px" }}
      >
        <div className="section-label">// about_me</div>
        <h2 className="section-heading">About Me</h2>
        <div className="section-divider" />
      </motion.div>

      {/* Two-column layout */}
      <div className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "60% 40%",
          gap: "48px",
          alignItems: "start",
        }}
      >
        {/* Left — paragraphs */}
        <motion.div
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {personalInfo.aboutParagraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize:   "15px",
                color:      "var(--text-muted)",
                lineHeight: 1.8,
                margin:     0,
              }}
            >
              <Highlighted text={para} phrase="two patent-filed innovations" />
            </p>
          ))}
        </motion.div>

        {/* Right — quick facts card */}
        <motion.div
          variants={rightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="card"
          style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {personalInfo.quickFacts.map((fact) => (
            <div
              key={fact.label}
              style={{
                display:    "flex",
                alignItems: "center",
                gap:        "12px",
              }}
            >
              <div
                style={{
                  width:        "32px",
                  height:       "32px",
                  borderRadius: "8px",
                  background:   "rgba(79,142,247,0.1)",
                  border:       "1px solid rgba(79,142,247,0.2)",
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent: "center",
                  flexShrink:   0,
                }}
              >
                {ICONS[fact.icon]}
              </div>
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{fact.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
