"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "From raw sensor data to farmer decisions.",
  "93% accuracy on medical imaging, built from scratch.",
  "End-to-end AI systems. No shortcuts.",
];

export default function TypingText() {
  const [display, setDisplay]   = useState("");
  const [showCursor, setCursor] = useState(true);
  const indexRef  = useRef(0);
  const charRef   = useRef(0);
  const phaseRef  = useRef<"type" | "hold" | "delete">("type");
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = () => {
      const line  = LINES[indexRef.current];
      const phase = phaseRef.current;

      if (phase === "type") {
        charRef.current++;
        setDisplay(line.slice(0, charRef.current));
        if (charRef.current >= line.length) {
          phaseRef.current = "hold";
          timerRef.current = setTimeout(tick, 2200);
        } else {
          timerRef.current = setTimeout(tick, 45);
        }
      } else if (phase === "hold") {
        phaseRef.current = "delete";
        timerRef.current = setTimeout(tick, 25);
      } else {
        charRef.current--;
        setDisplay(line.slice(0, charRef.current));
        if (charRef.current <= 0) {
          indexRef.current  = (indexRef.current + 1) % LINES.length;
          phaseRef.current  = "type";
          timerRef.current = setTimeout(tick, 300);
        } else {
          timerRef.current = setTimeout(tick, 25);
        }
      }
    };
    timerRef.current = setTimeout(tick, 600);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // Blink cursor interval
  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize:   "clamp(16px, 2.2vw, 22px)",
        color:      "var(--text-muted)",
        minHeight:  "64px",
        lineHeight: 1.5,
      }}
      aria-label="Typing animation"
    >
      {display}
      <span
        style={{
          color:      "var(--accent)",
          opacity:    showCursor ? 1 : 0,
          marginLeft: "1px",
          fontWeight: 300,
        }}
      >|</span>
    </div>
  );
}
