"use client";

import { motion, type Variants } from "framer-motion";
import { experiences } from "@/data/portfolio";
import SectionHeader from "./SectionHeader";

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeader label="// work" title="Experience" />

      {experiences.map((exp) => (
        <motion.article
          key={exp.org + exp.period}
          className="card"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ padding: "28px", position: "relative", overflow: "hidden" }}
        >
          {/* Accent rail */}
          <div
            aria-hidden
            style={{
              position:   "absolute",
              left:       0,
              top:        0,
              bottom:     0,
              width:      "3px",
              background: "linear-gradient(180deg, var(--accent), var(--accent-mint))",
            }}
          />

          <div
            style={{
              display:        "flex",
              alignItems:     "baseline",
              justifyContent: "space-between",
              flexWrap:       "wrap",
              gap:            "12px",
              marginBottom:   "6px",
            }}
          >
            <h3
              style={{
                fontSize:      "var(--step-2)",
                fontWeight:    600,
                letterSpacing: "-0.02em",
                color:         "var(--text-primary)",
                margin:        0,
              }}
            >
              {exp.role}
            </h3>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize:   "12px",
                color:      "var(--text-subtle)",
                whiteSpace: "nowrap",
              }}
            >
              {exp.period}
            </span>
          </div>

          <div
            style={{
              fontSize:     "var(--step-0)",
              color:        "var(--accent)",
              fontWeight:   500,
              marginBottom: "4px",
            }}
          >
            {exp.org}
          </div>
          <div
            style={{
              fontFamily:   "var(--font-mono), monospace",
              fontSize:     "12px",
              color:        "var(--text-subtle)",
              marginBottom: "20px",
            }}
          >
            {exp.orgSub}
          </div>

          <ul
            style={{
              listStyle:     "none",
              padding:       0,
              margin:        "0 0 20px",
              display:       "flex",
              flexDirection: "column",
              gap:           "10px",
            }}
          >
            {exp.bullets.map((bullet) => (
              <li
                key={bullet}
                style={{
                  display:    "flex",
                  gap:        "10px",
                  alignItems: "flex-start",
                  fontSize:   "var(--step-0)",
                  color:      "var(--text-muted)",
                  lineHeight: 1.65,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width:        "5px",
                    height:       "5px",
                    borderRadius: "50%",
                    background:   "var(--accent)",
                    flexShrink:   0,
                    marginTop:    "9px",
                  }}
                />
                {bullet}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
            {exp.tags.map((tag) => (
              <span key={tag} className="skill-tag" style={{ fontSize: "12px", padding: "4px 10px" }}>
                {tag}
              </span>
            ))}
          </div>

          {exp.githubUrl && (
            <a
              href={exp.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              style={{
                display:    "inline-flex",
                alignItems: "center",
                gap:        "7px",
                fontFamily: "var(--font-mono), monospace",
                fontSize:   "12px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.22 0 4.61-2.807 5.625-5.479 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {exp.githubLabel}
            </a>
          )}
        </motion.article>
      ))}
    </section>
  );
}
