"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio";
import SectionHeader from "./SectionHeader";

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <SectionHeader label="// achievements" title="Certifications & Recognition" />

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
                    fontSize:   "var(--step-0)",
                    fontWeight: 600,
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
                <div style={{ fontSize: "var(--step--1)", color: "var(--text-muted)", lineHeight: 1.6 }}>
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
