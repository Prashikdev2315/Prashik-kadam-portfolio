"use client";

import { motion, type Variants } from "framer-motion";
import { certifications } from "@/data/portfolio";

const headingVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Certifications() {
  return (
    <section
      id="certifications"
      style={{
        padding:  "96px 24px",
        maxWidth: "1200px",
        margin:   "0 auto",
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
        <div className="section-label">// achievements</div>
        <h2 className="section-heading">Certifications & Hackathons</h2>
        <div className="section-divider" />
      </motion.div>

      {/* Timeline list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
            style={{
              borderLeft:   "2px solid var(--accent)",
              paddingLeft:  "20px",
              paddingTop:   i === 0 ? "0" : "28px",
              paddingBottom: i === certifications.length - 1 ? "0" : "28px",
              position:     "relative",
            }}
          >
            {/* Dot on the line */}
            <div
              style={{
                position:     "absolute",
                left:         "-5px",
                top:          i === 0 ? "3px" : "31px",
                width:        "8px",
                height:       "8px",
                borderRadius: "50%",
                background:   "var(--accent)",
                border:       "2px solid var(--bg)",
              }}
            />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
              <div>
                <div
                  style={{
                    fontSize:   "14px",
                    fontWeight: 500,
                    color:      "var(--text-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {cert.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize:   "12px",
                    color:      "var(--accent-mint)",
                    marginBottom: "4px",
                  }}
                >
                  {cert.org}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  {cert.note}
                </div>
              </div>
              {cert.year && (
                <span
                  style={{
                    fontFamily:   "var(--font-mono), monospace",
                    fontSize:     "11px",
                    color:        "var(--text-muted)",
                    background:   "rgba(255,255,255,0.04)",
                    border:       "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "4px",
                    padding:      "3px 8px",
                    whiteSpace:   "nowrap",
                    flexShrink:   0,
                  }}
                >
                  {cert.year}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
