"use client";

import { GitFork, Sprout, ScanLine, FlaskConical } from "lucide-react";
import type { Project } from "@/data/portfolio";

const ICONS: Record<string, React.ReactNode> = {
  Sprout:       <Sprout       size={20} color="var(--accent)" />,
  ScanLine:     <ScanLine     size={20} color="var(--accent)" />,
  FlaskConical: <FlaskConical size={20} color="var(--accent)" />,
};

interface Props {
  project: Project;
  index:   number;
}

export default function ProjectCard({ project }: Props) {
  return (
    <article
      className="card project-card"
      style={{
        padding:       "24px",
        display:       "flex",
        flexDirection: "column",
        height:        "100%",
      }}
    >
      {/* Top row: icon + featured badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          className="card-icon-box"
          style={{
            width:        "44px",
            height:       "44px",
            borderRadius: "10px",
            background:   "rgba(79,142,247,0.1)",
            border:       "1px solid rgba(79,142,247,0.2)",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            flexShrink:   0,
          }}
        >
          {ICONS[project.icon] ?? <Sprout size={20} color="var(--accent)" />}
        </div>

        {project.featured && (
          <span
            style={{
              fontFamily:   "var(--font-mono), monospace",
              fontSize:     "11px",
              color:        "var(--accent-mint)",
              background:   "rgba(56,226,164,0.1)",
              border:       "1px solid rgba(56,226,164,0.2)",
              borderRadius: "4px",
              padding:      "4px 10px",
            }}
          >
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize:   "17px",
          fontWeight: 500,
          color:      "var(--text-primary)",
          marginTop:  "16px",
          marginBottom: "6px",
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize:   "13px",
          color:      "var(--text-muted)",
          lineHeight: 1.6,
          margin:     0,
        }}
      >
        {project.description}
      </p>

      {/* Bullets */}
      <ul
        style={{
          listStyle:    "none",
          padding:      0,
          margin:       "16px 0 0",
          display:      "flex",
          flexDirection: "column",
          gap:          "8px",
        }}
      >
        {project.bullets.slice(0, 3).map((bullet, bi) => (
          <li
            key={bi}
            style={{
              display:    "flex",
              alignItems: "flex-start",
              gap:        "10px",
              fontSize:   "13px",
              color:      "var(--text-muted)",
              lineHeight: 1.55,
            }}
          >
            <span
              className="bullet-dot"
              style={{
                width:        "5px",
                height:       "5px",
                borderRadius: "50%",
                background:   "var(--accent)",
                opacity:      0.6,
                flexShrink:   0,
                marginTop:    "6px",
              }}
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Spacer pushes tags/footer to bottom */}
      <div style={{ flex: 1 }} />

      {/* Tags */}
      <div
        style={{
          display:     "flex",
          flexWrap:    "wrap",
          gap:         "6px",
          paddingTop:  "16px",
          marginTop:   "auto",
        }}
      >
        {project.tags.map((tag) => (
          <span key={tag} className="skill-tag" style={{ fontSize: "12px", padding: "4px 10px" }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Footer — View Code */}
      <div
        style={{
          borderTop:   "1px solid rgba(255,255,255,0.05)",
          paddingTop:  "14px",
          marginTop:   "12px",
        }}
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="view-code-link"
          data-cursor
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "6px",
            fontSize:       "13px",
            color:          "var(--text-muted)",
            textDecoration: "none",
            transition:     "color 200ms ease",
          }}
        >
          <GitFork size={14} className="view-code-icon" />
          View Code
        </a>
      </div>
    </article>
  );
}
