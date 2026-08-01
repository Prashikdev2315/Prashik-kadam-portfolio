"use client";

import { ArrowUpRight, Sprout, ScanLine, FlaskConical } from "lucide-react";
import type { Project } from "@/data/portfolio";

const ICONS: Record<string, React.ReactNode> = {
  Sprout:       <Sprout       size={20} color="var(--accent)" />,
  ScanLine:     <ScanLine     size={20} color="var(--accent)" />,
  FlaskConical: <FlaskConical size={20} color="var(--accent)" />,
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="card project-card"
      style={{
        padding:       "24px",
        display:       "flex",
        flexDirection: "column",
        height:        "100%",
        width:         "100%",
      }}
    >
      <div
        className="card-icon-box"
        style={{
          width:          "44px",
          height:         "44px",
          borderRadius:   "10px",
          background:     "rgba(79,142,247,0.1)",
          border:         "1px solid rgba(79,142,247,0.2)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
        }}
      >
        {ICONS[project.icon]}
      </div>

      <h3
        style={{
          fontSize:      "var(--step-2)",
          fontWeight:    600,
          letterSpacing: "-0.02em",
          color:         "var(--text-primary)",
          margin:        "16px 0 4px",
        }}
      >
        {/* Whole card is clickable via this stretched link */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          {project.title}
        </a>
      </h3>

      <div
        style={{
          fontFamily:    "var(--font-mono), monospace",
          fontSize:      "12px",
          color:         "var(--accent-mint)",
          marginBottom:  "12px",
          letterSpacing: "0.02em",
        }}
      >
        {project.tagline}
      </div>

      <p
        style={{
          fontSize:   "var(--step--1)",
          color:      "var(--text-muted)",
          lineHeight: 1.65,
          margin:     0,
        }}
      >
        {project.description}
      </p>

      <ul
        style={{
          listStyle:     "none",
          padding:       0,
          margin:        "16px 0 0",
          display:       "flex",
          flexDirection: "column",
          gap:           "8px",
        }}
      >
        {project.bullets.map((bullet) => (
          <li
            key={bullet}
            style={{
              display:    "flex",
              alignItems: "flex-start",
              gap:        "10px",
              fontSize:   "var(--step--1)",
              color:      "var(--text-muted)",
              lineHeight: 1.55,
            }}
          >
            <span
              aria-hidden
              style={{
                width:        "5px",
                height:       "5px",
                borderRadius: "50%",
                background:   "var(--accent)",
                opacity:      0.6,
                flexShrink:   0,
                marginTop:    "7px",
              }}
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div style={{ flex: 1, minHeight: "20px" }} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "16px" }}>
        {project.tags.map((tag) => (
          <span key={tag} className="skill-tag" style={{ fontSize: "12px", padding: "4px 10px" }}>
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          borderTop:  "1px solid rgba(255,255,255,0.05)",
          paddingTop: "14px",
          marginTop:  "14px",
        }}
      >
        <span
          className="view-code-link"
          style={{
            display:    "inline-flex",
            alignItems: "center",
            gap:        "6px",
            fontSize:   "13px",
            color:      "var(--text-muted)",
            transition: "color 200ms ease",
          }}
        >
          View source
          <ArrowUpRight size={14} className="view-code-icon" aria-hidden />
        </span>
      </div>
    </article>
  );
}
