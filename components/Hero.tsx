"use client";

import Image from "next/image";
import { motion } from "framer-motion";


import { personalInfo } from "@/data/portfolio";
import ParticleCanvas from "./ParticleCanvas";
import TypingText from "./TypingText";

// Variants defined outside component to avoid re-renders
const leftVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } },
};
const rightVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position:       "relative",
        minHeight:      "100vh",
        display:        "flex",
        alignItems:     "center",
        overflow:       "hidden",
        paddingTop:     "68px",
      }}
    >
      {/* Dot-grid background */}
      <div
        style={{
          position:        "absolute",
          inset:           0,
          backgroundImage: "radial-gradient(circle, rgba(79,142,247,0.15) 1px, transparent 1px)",
          backgroundSize:  "32px 32px",
          zIndex:          0,
        }}
      />

      {/* Particle canvas — interactive (pointer events on the section, not canvas) */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <ParticleCanvas />
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position:   "absolute",
          bottom:     0,
          left:       0,
          right:      0,
          height:     "200px",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          zIndex:     2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position:  "relative",
          zIndex:    3,
          maxWidth:  "1200px",
          margin:    "0 auto",
          padding:   "80px 24px 100px",
          width:     "100%",
          display:   "grid",
          gridTemplateColumns: "1fr auto",
          gap:       "64px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* LEFT — Text */}
        <motion.div
          variants={leftVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {/* Label with blinking cursor */}
          <div
            style={{
              fontFamily:    "var(--font-mono), monospace",
              fontSize:      "13px",
              color:         "var(--accent-mint)",
              display:       "flex",
              alignItems:    "center",
              gap:           "6px",
            }}
          >
            AI &amp; ML Engineer · IIITDM Jabalpur
            <span style={{ animation: "blink 0.7s step-end infinite", color: "var(--accent-mint)" }}>|</span>
          </div>

          {/* Open-to-work badge */}
          <div
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          "8px",
              background:   "rgba(56,226,164,0.08)",
              border:       "1px solid rgba(56,226,164,0.25)",
              borderRadius: "20px",
              padding:      "6px 14px",
              alignSelf:    "flex-start",
            }}
          >
            <span className="availability-dot" />
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "12px", color: "var(--accent-mint)", letterSpacing: "0.03em" }}>
              Open to Internships &amp; Full-time · Graduating 2027
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize:   "clamp(40px, 6vw, 64px)",
              fontWeight: 700,
              color:      "var(--text-primary)",
              lineHeight: 1.1,
              margin:     0,
            }}
          >
            {personalInfo.name}
          </h1>

          {/* Typing tagline */}
          <TypingText />

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              data-cursor
              style={{
                padding:      "12px 24px",
                borderRadius: "8px",
                background:   "var(--accent)",
                color:        "#fff",
                fontWeight:   500,
                fontSize:     "14px",
                textDecoration: "none",
                transition:   "transform 150ms ease, box-shadow 150ms ease",
                display:      "inline-block",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(79,142,247,0.3)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)";    (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              View Projects
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              style={{
                padding:      "12px 24px",
                borderRadius: "8px",
                border:       "1px solid var(--accent)",
                color:        "var(--accent)",
                fontWeight:   500,
                fontSize:     "14px",
                textDecoration: "none",
                transition:   "transform 150ms ease, background 150ms ease, color 150ms ease",
                display:      "inline-block",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; (e.currentTarget as HTMLElement).style.background = "rgba(79,142,247,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)";    (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              Download Resume
            </a>
          </div>

          {/* Social row */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              aria-label="GitHub"
              title="GitHub"
              style={{ color: "var(--text-muted)", transition: "color 150ms ease", display: "flex", alignItems: "center" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              aria-label="LinkedIn"
              title="LinkedIn"
              style={{ color: "var(--text-muted)", transition: "color 150ms ease", display: "flex", alignItems: "center" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* RIGHT — Photo */}
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
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Glow blob behind photo */}
            <div
              className="photo-glow"
              style={{
                position:     "absolute",
                width:        "430px",
                height:       "430px",
                borderRadius: "50%",
                background:   "radial-gradient(circle, rgba(79,142,247,0.15) 0%, rgba(56,226,164,0.05) 50%, transparent 70%)",
                zIndex:       0,
              }}
            />

            {/* Dashed rotating ring */}
            <svg
              className="photo-ring-dashed"
              style={{
                position: "absolute",
                width:    "380px",
                height:   "380px",
                zIndex:   1,
              }}
              viewBox="0 0 380 380"
            >
              <circle
                cx="190" cy="190" r="185"
                fill="none"
                stroke="#4F8EF7"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                opacity="0.35"
              />
            </svg>

            {/* Solid ring with pulse */}
            <div
              className="photo-ring-solid"
              style={{
                position:     "absolute",
                width:        "354px",
                height:       "354px",
                borderRadius: "50%",
                border:       "2px solid rgba(79,142,247,0.6)",
                zIndex:       2,
              }}
            />

            {/* Photo */}
            <div
              style={{
                position:     "relative",
                width:        "clamp(240px, 26vw, 340px)",
                height:       "clamp(240px, 26vw, 340px)",
                borderRadius: "50%",
                overflow:     "hidden",
                zIndex:       3,
                border:       "2px solid var(--accent)",
                filter:       "brightness(0.95) contrast(1.05)",
              }}
            >
              <Image
                src="/photo.jpg"
                alt="Prashik Kadam"
                fill
                priority
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 240px, 340px"
              />
            </div>
          </div>

          {/* Stat pills */}
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

      <style>{`
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            justify-items: center;
          }
          .hero-grid > div:last-child {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
