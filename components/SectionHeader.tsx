"use client";

import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

interface Props {
  label: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}

export default function SectionHeader({ label, title, intro, align = "left" }: Props) {
  const centered = align === "center";
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        marginBottom: "48px",
        textAlign:    centered ? "center" : "left",
      }}
    >
      <div className="section-label">{label}</div>
      <h2 className="section-heading" style={{ marginBottom: intro ? "12px" : 0 }}>
        {title}
      </h2>
      {intro && (
        <p
          style={{
            fontSize:   "var(--step-0)",
            color:      "var(--text-muted)",
            maxWidth:   "58ch",
            margin:     centered ? "0 auto" : 0,
            lineHeight: 1.65,
          }}
        >
          {intro}
        </p>
      )}
      <div
        className="section-divider"
        style={{
          marginTop:   "20px",
          marginInline: centered ? "auto" : undefined,
          marginBottom: 0,
        }}
      />
    </motion.div>
  );
}
