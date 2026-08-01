"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/portfolio";
import SectionHeader from "./SectionHeader";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeader label="// tech_stack" title="Skills" />

      {/* Skill groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden:  {},
              visible: { transition: { staggerChildren: 0.03, delayChildren: gi * 0.05 } },
            }}
          >
            {/* Category label */}
            <div
              style={{
                fontFamily:    "var(--font-mono), monospace",
                fontSize:      "11px",
                color:         "var(--accent-mint)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom:  "12px",
              }}
            >
              {group.category}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {group.skills.map((skill) => {
                const isHighlight = group.highlight?.includes(skill);
                return (
                  <motion.span
                    key={skill}
                    variants={{
                      hidden:  { opacity: 0, scale: 0.85 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] } },
                    }}
                    className={`skill-tag${isHighlight ? " skill-tag--highlight" : ""}`}
                  >
                    {skill}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
