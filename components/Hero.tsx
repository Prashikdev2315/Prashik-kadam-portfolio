"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { personalInfo } from "@/data/portfolio";
import ParticleCanvas from "./ParticleCanvas";
import TypingText from "./TypingText";

const leftVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } },
};
const rightVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position:   "relative",
        minHeight:  "100svh",
        display:    "flex",
        alignItems: "center",
        overflow:   "hidden",
        paddingTop: "var(--nav-h)",
      }}
    >
      {/* Dot-grid background */}
      <div
        aria-hidden
        style={{
          position:        "absolute",
          inset:           0,
          backgroundImage: "radial-gradient(circle, rgba(79,142,247,0.15) 1px, transparent 1px)",
          backgroundSize:  "32px 32px",
          zIndex:          0,
        }}
      />

      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <ParticleCanvas />
      </div>

      {/* Bottom fade into the page background */}
      <div
        aria-hidden
        style={{
          position:      "absolute",
          bottom:        0,
          left:          0,
          right:         0,
          height:        "200px",
          background:    "linear-gradient(to bottom, transparent, var(--bg))",
          zIndex:        2,
          pointerEvents: "none",
        }}
      />

      <div
        className="hero-grid"
        style={{
          position:            "relative",
          zIndex:              3,
          maxWidth:            "1200px",
          margin:              "0 auto",
          padding:             "clamp(48px, 8vh, 96px) var(--gutter)",
          width:               "100%",
          display:             "grid",
          gridTemplateColumns: "1fr auto",
          gap:                 "64px",
          alignItems:          "center",
        }}
      >
        {/* LEFT — copy */}
        <motion.div
          className="hero-copy"
          variants={leftVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "flex-start" }}
        >
          <div
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          "8px",
              background:   "rgba(56,226,164,0.08)",
              border:       "1px solid rgba(56,226,164,0.25)",
              borderRadius: "20px",
              padding:      "6px 14px",
            }}
          >
            <span className="availability-dot" />
            <span
              style={{
                fontFamily:    "var(--font-mono), monospace",
                fontSize:      "12px",
                color:         "var(--accent-mint)",
                letterSpacing: "0.03em",
              }}
            >
              Open to internships &amp; new-grad roles · 2027
            </span>
          </div>

          <h1
            style={{
              fontSize:      "var(--step-4)",
              fontWeight:    700,
              color:         "var(--text-primary)",
              lineHeight:    1.05,
              letterSpacing: "-0.03em",
              margin:        0,
            }}
          >
            {personalInfo.name}
          </h1>

          <p
            style={{
              fontSize:   "var(--step-1)",
              color:      "var(--text-primary)",
              margin:     0,
              maxWidth:   "34ch",
              lineHeight: 1.5,
            }}
          >
            AI &amp; ML Engineer building systems that make it out of the notebook.
          </p>

          <TypingText />

          <div className="hero-cta" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#projects" className="btn btn--primary">
              View Projects
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              Download Résumé
            </a>
          </div>

          <div className="hero-social" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
              aria-label="GitHub profile"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
              aria-label="LinkedIn profile"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <span style={{ fontSize: "13px", color: "var(--text-subtle)" }}>
              {personalInfo.location}
            </span>
          </div>
        </motion.div>

        {/* RIGHT — portrait */}
        <motion.div
          variants={rightVariants}
          initial="hidden"
          animate="visible"
          style={{
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            gap:            "24px",
            justifyContent: "center",
          }}
        >
          <div
            className="photo-stack"
            style={{
              position:       "relative",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              width:          "min(340px, 72vw)",
              aspectRatio:    "1",
            }}
          >
            <div
              aria-hidden
              className="photo-glow"
              style={{
                position:     "absolute",
                inset:        "-26%",
                borderRadius: "50%",
                background:   "radial-gradient(circle, rgba(79,142,247,0.15) 0%, rgba(56,226,164,0.05) 50%, transparent 70%)",
              }}
            />
            <svg
              aria-hidden
              className="photo-ring-dashed"
              viewBox="0 0 100 100"
              style={{ position: "absolute", inset: "-11%", width: "122%", height: "122%" }}
            >
              <circle
                cx="50" cy="50" r="48"
                fill="none"
                stroke="#4F8EF7"
                strokeWidth="0.4"
                strokeDasharray="1.2 1.8"
                opacity="0.35"
              />
            </svg>
            <div
              aria-hidden
              className="photo-ring-solid"
              style={{
                position:     "absolute",
                inset:        "-4%",
                borderRadius: "50%",
                border:       "2px solid rgba(79,142,247,0.6)",
              }}
            />
            <div
              style={{
                position:     "relative",
                width:        "100%",
                height:       "100%",
                borderRadius: "50%",
                overflow:     "hidden",
                border:       "2px solid var(--accent)",
              }}
            >
              <Image
                src="/photo.jpg"
                alt={`Portrait of ${personalInfo.name}`}
                fill
                preload
                quality={85}
                style={{ objectFit: "cover" }}
                sizes="(max-width: 860px) 72vw, 340px"
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
            {personalInfo.heroStats.map((stat) => (
              <span
                key={stat.label}
                style={{
                  fontFamily:   "var(--font-mono), monospace",
                  fontSize:     "12px",
                  color:        "var(--accent)",
                  background:   "rgba(79,142,247,0.1)",
                  border:       "1px solid rgba(79,142,247,0.2)",
                  borderRadius: "20px",
                  padding:      "5px 12px",
                }}
              >
                {stat.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
