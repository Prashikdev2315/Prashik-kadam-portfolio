"use client";

import { motion, type Variants } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

// Extract just the username from the github URL, e.g. "Prashikdev2315"
const GITHUB_USERNAME = personalInfo.github.replace("https://github.com/", "").replace(/\/$/, "");

// ghchart.rshah.org returns a live contribution SVG — auto-updates daily, no token needed
const CHART_URL = `https://ghchart.rshah.org/${GITHUB_USERNAME}`;

const headingVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function GitHubChart() {
  return (
    <section
      id="github"
      style={{
        padding:  "0 24px 80px",
        maxWidth: "1200px",
        margin:   "0 auto",
      }}
    >
      <motion.div
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginBottom: "32px" }}
      >
        <div className="section-label">// activity</div>
        <h2 className="section-heading">GitHub Contributions</h2>
        <div className="section-divider" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="card"
        style={{
          padding:      "28px 28px 20px",
          overflowX:    "auto",
        }}
      >
        {/* Chart header row */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            marginBottom:   "20px",
            flexWrap:       "wrap",
            gap:            "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* GitHub icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-muted)">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize:   "13px",
                color:      "var(--text-muted)",
              }}
            >
              @{GITHUB_USERNAME}
            </span>
          </div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            style={{
              fontFamily:     "var(--font-mono), monospace",
              fontSize:       "12px",
              color:          "var(--accent)",
              textDecoration: "none",
              transition:     "opacity 150ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            View Profile →
          </a>
        </div>

        {/* Contribution graph — live SVG from ghchart.rshah.org, auto-refreshed daily */}
        {/* Using <img> (not next/image) because the src is a remote SVG that changes daily */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHART_URL}
          alt={`${GITHUB_USERNAME}'s GitHub contribution chart`}
          style={{
            width:     "100%",
            minWidth:  "600px",
            height:    "auto",
            display:   "block",
            filter:    "hue-rotate(200deg) saturate(1.4) brightness(1.1)",
            opacity:   0.9,
          }}
          loading="lazy"
        />

        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize:   "11px",
            color:      "var(--text-muted)",
            marginTop:  "14px",
            marginBottom: 0,
            textAlign:  "right",
            opacity:    0.6,
          }}
        >
          auto-updated daily · ghchart.rshah.org
        </p>
      </motion.div>
    </section>
  );
}
