"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

// ─── Raw GPA data (preserved from the provided dataset) ─────────────────────
// Two series: personal GPA (solid line) and department average (dashed line)
// Values are used only to compute relative positions; never shown to the viewer.
const MY_GPA    = [4.3, 4.6, 5.8, 6.0, 6.7, 7.7];
const DEPT_AVG  = [4.3, 4.4, 5.0, 5.3, 5.6, 5.9];

const SEMESTERS = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];

// ─── Chart geometry ──────────────────────────────────────────────────────────
const W = 580;   // viewBox width
const H = 220;   // viewBox height
const PAD_L = 28;
const PAD_R = 28;
const PAD_T = 24;
const PAD_B = 40;

// Compute a shared value-to-Y mapping across both series so their relative
// distance is faithfully preserved.
const ALL_VALUES = [...MY_GPA, ...DEPT_AVG];
const MIN_VAL    = Math.min(...ALL_VALUES);
const MAX_VAL    = Math.max(...ALL_VALUES);
const RANGE      = MAX_VAL - MIN_VAL || 1;

function toX(i: number): number {
  const slots = MY_GPA.length - 1;
  return PAD_L + (i / slots) * (W - PAD_L - PAD_R);
}

function toY(v: number): number {
  // Map value to Y, leaving a small margin so extreme points aren't flush
  const margin = 0.12;
  const usable = H - PAD_T - PAD_B;
  const norm   = (v - MIN_VAL) / RANGE; // 0 → bottom, 1 → top
  return PAD_T + usable - norm * usable * (1 - margin * 2) - usable * margin;
}

// Build an SVG polyline points string from a data array
function buildPoints(data: number[]): string {
  return data.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");
}

// Build a smooth cubic-bezier path string (Catmull-Rom → cubic Bézier)
function buildSmoothPath(data: number[]): string {
  const pts = data.map((v, i) => ({ x: toX(i), y: toY(v) }));
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur  = pts[i];
    const cp1x = prev.x + (cur.x - prev.x) / 3;
    const cp1y = prev.y;
    const cp2x = cur.x  - (cur.x - prev.x) / 3;
    const cp2y = cur.y;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${cur.x},${cur.y}`;
  }
  return d;
}

// Filled area below the main series (closed path)
function buildAreaPath(data: number[]): string {
  const linePath = buildSmoothPath(data);
  const lastX = toX(data.length - 1);
  const baseY = H - PAD_B;
  return `${linePath} L ${lastX},${baseY} L ${toX(0)},${baseY} Z`;
}

// ─── Gradient / color tokens ─────────────────────────────────────────────────
const COLOR_MAIN  = "#4F8EF7";  // --accent
const COLOR_DEPT  = "#38E2A4";  // --accent-mint
const AREA_STOP1  = "rgba(79,142,247,0.18)";
const AREA_STOP2  = "rgba(79,142,247,0)";

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const lineVariants: Variants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.4, ease: "easeInOut" } },
};

const dotVariants: Variants = {
  hidden:  { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3, type: "spring", stiffness: 260 } },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function GPATrendGraph() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const mainPath = buildSmoothPath(MY_GPA);
  const deptPath = buildSmoothPath(DEPT_AVG);
  const areaPath = buildAreaPath(MY_GPA);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        marginTop:    "52px",
        padding:      "32px 28px 24px",
        background:   "var(--card-surface)",
        border:       "1px solid var(--card-border)",
        borderRadius: "16px",
        position:     "relative",
        overflow:     "hidden",
      }}
    >
      {/* Decorative ambient glow */}
      <div
        aria-hidden
        style={{
          position:    "absolute",
          top:         "-60px",
          right:       "-60px",
          width:       "260px",
          height:      "260px",
          borderRadius:"50%",
          background:  "radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)",
          pointerEvents:"none",
        }}
      />

      {/* Header */}
      <div
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          marginBottom:   "24px",
          flexWrap:       "wrap",
          gap:            "12px",
        }}
      >
        <div>
          <div className="section-label" style={{ marginBottom: "4px" }}>
            // academic_trend
          </div>
          <h3
            style={{
              fontSize:   "16px",
              fontWeight: 600,
              color:      "var(--text-primary)",
              margin:     0,
            }}
          >
            GPA Trajectory
          </h3>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <LegendItem color={COLOR_MAIN} label="My SPI" dashed={false} />
          <LegendItem color={COLOR_DEPT} label="CPI" dashed />
        </div>
      </div>

      {/* SVG Chart */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: "block", overflow: "visible" }}
        aria-label="GPA trend chart showing upward trajectory across six semesters"
        role="img"
      >
        <defs>
          {/* Area gradient */}
          <linearGradient id="gpa-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={AREA_STOP1} />
            <stop offset="100%" stopColor={AREA_STOP2} />
          </linearGradient>

          {/* Glow filter for dots */}
          <filter id="gpa-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dash pattern for department line */}
          <pattern id="dash" patternUnits="userSpaceOnUse" width="10" height="1">
            <line x1="0" y1="0" x2="7" y2="0" stroke={COLOR_DEPT} strokeWidth="2" />
          </pattern>
        </defs>

        {/* ── Subtle horizontal guide lines (no labels) ── */}
        {[0.25, 0.5, 0.75].map((frac) => {
          const y = PAD_T + frac * (H - PAD_T - PAD_B);
          return (
            <line
              key={frac}
              x1={PAD_L} y1={y}
              x2={W - PAD_R} y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          );
        })}

        {/* ── Peak reference line — aligned to the top SPI point ── */}
        <motion.line
          x1={PAD_L} y1={toY(Math.max(...MY_GPA))}
          x2={W - PAD_R} y2={toY(Math.max(...MY_GPA))}
          stroke={COLOR_MAIN}
          strokeWidth="0.8"
          strokeDasharray="4 5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.28 } : { opacity: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        />

        {/* ── Filled area under main line ── */}
        <motion.path
          d={areaPath}
          fill="url(#gpa-area-grad)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        {/* ── Department average line (dashed) ── */}
        <motion.path
          d={deptPath}
          fill="none"
          stroke={COLOR_DEPT}
          strokeWidth="1.8"
          strokeDasharray="6 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
          style={{ opacity: 0.65 }}
        />

        {/* ── My GPA line (solid) ── */}
        <motion.path
          d={mainPath}
          fill="none"
          stroke={COLOR_MAIN}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0 }}
        />

        {/* ── Data point dots — MY GPA ── */}
        {MY_GPA.map((v, i) => (
          <motion.g
            key={`my-${i}`}
            variants={dotVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.3, delay: 1.0 + i * 0.08, type: "spring", stiffness: 260 }}
            filter="url(#gpa-glow)"
          >
            {/* Outer pulse ring */}
            <motion.circle
              cx={toX(i)} cy={toY(v)} r={9}
              fill="none"
              stroke={COLOR_MAIN}
              strokeWidth="1"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={inView
                ? { opacity: [0.5, 0, 0.5], scale: [1, 1.6, 1] }
                : { opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.2, ease: "easeInOut" }}
            />
            {/* Inner dot */}
            <circle
              cx={toX(i)} cy={toY(v)} r={4.5}
              fill={COLOR_MAIN}
              stroke="var(--card-surface)"
              strokeWidth="1.5"
            />
          </motion.g>
        ))}

        {/* ── Data point dots — DEPT AVG ── */}
        {DEPT_AVG.map((v, i) => (
          <motion.circle
            key={`dept-${i}`}
            cx={toX(i)} cy={toY(v)} r={3.5}
            fill={COLOR_DEPT}
            stroke="var(--card-surface)"
            strokeWidth="1.5"
            variants={dotVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.3, delay: 1.05 + i * 0.08, type: "spring", stiffness: 260 }}
            style={{ opacity: 0.75 }}
          />
        ))}

        {/* ── X-axis semester labels (no GPA values shown) ── */}
        {SEMESTERS.map((label, i) => (
          <text
            key={label}
            x={toX(i)}
            y={H - PAD_B + 20}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono), monospace"
            fill="rgba(136,146,164,0.7)"
            letterSpacing="0.04em"
          >
            {label}
          </text>
        ))}

        {/* ── "Upward" trend arrow annotation ── */}
        <motion.g
          initial={{ opacity: 0, x: -6 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <text
            x={toX(5) - 4}
            y={toY(MY_GPA[5]) - 14}
            textAnchor="end"
            fontSize="9.5"
            fontFamily="var(--font-mono), monospace"
            fill={COLOR_MAIN}
            letterSpacing="0.06em"
            fontWeight="600"
          >
            ↑ consistent growth
          </text>
        </motion.g>
      </svg>

      {/* Footer row: disclaimer + semester info */}
      <div
        style={{
          marginTop:      "12px",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          flexWrap:       "wrap",
          gap:            "6px",
        }}
      >
        <p
          style={{
            margin:        0,
            fontSize:      "10.5px",
            color:         "rgba(136,146,164,0.5)",
            fontFamily:    "var(--font-mono), monospace",
            letterSpacing: "0.03em",
            fontStyle:     "italic",
          }}
        >
          * Exact values are intentionally omitted for privacy.
        </p>
        <p
          style={{
            margin:        0,
            fontSize:      "10.5px",
            color:         "rgba(136,146,164,0.45)",
            fontFamily:    "var(--font-mono), monospace",
            letterSpacing: "0.04em",
          }}
        >
          6 semesters · B.Tech CSE · IIITDM Jabalpur
        </p>
      </div>
    </motion.div>
  );
}

// ─── Legend pill ──────────────────────────────────────────────────────────────
function LegendItem({
  color,
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <svg width="28" height="10" viewBox="0 0 28 10" aria-hidden>
        {dashed ? (
          <line
            x1="0" y1="5" x2="28" y2="5"
            stroke={color} strokeWidth="2"
            strokeDasharray="5 3"
            strokeLinecap="round"
            opacity="0.75"
          />
        ) : (
          <line
            x1="0" y1="5" x2="28" y2="5"
            stroke={color} strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
        <circle cx="14" cy="5" r="3.5" fill={color} />
      </svg>
      <span
        style={{
          fontSize:   "11px",
          color:      "var(--text-muted)",
          fontFamily: "var(--font-mono), monospace",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </span>
    </div>
  );
}
