"use client";

import { useState, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import emailjs from "@emailjs/browser";
import { personalInfo } from "@/data/portfolio";

// ─── EmailJS config — set these in .env.local ─────────────────────────────
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";
// ──────────────────────────────────────────────────────────────────────────


type Status = "idle" | "sending" | "success" | "error" | "notConfigured";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Shared input style — terminal aesthetic
const inputStyle: React.CSSProperties = {
  flex: 1,
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  color: "#F0F4FF",
  fontFamily: "var(--font-mono), monospace",
  fontSize: "14px",
  outline: "none",
  padding: "2px 0 4px",
  lineHeight: 1.5,
  width: "100%",
  minWidth: 0,
};

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!name.trim()) e.name = "name is required";
    if (!EMAIL_REGEX.test(email.trim())) e.email = "valid email is required";
    if (message.trim().length < 10) e.message = "message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendEmail = async () => {
    if (!validate()) return;
    // Guard: env vars not yet configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY ||
        EMAILJS_SERVICE_ID.startsWith("service_xxx")) {
      setStatus("notConfigured");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name.trim(),
          from_email: email.trim(),
          message: message.trim(),
          to_name: "Prashik",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      // Reset after 4 seconds
      setTimeout(() => {
        setStatus("idle");
        setName("");
        setEmail("");
        setMessage("");
        setErrors({});
      }, 4000);
    } catch {
      setStatus("error");
    }
  };

  const isDisabled = status === "sending" || status === "success";

  return (
    <section
      id="contact"
      style={{
        padding: "96px 24px 80px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          width: "100%",
        }}
      >
        {/* Section heading */}
        <div>
          <div className="section-label" style={{ textAlign: "center" }}>// contact</div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 40px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "8px 0 12px",
            }}
          >
            Let&apos;s build something.
          </h2>
          <p style={{ fontSize: "15px", color: "var(--text-muted)", margin: "0 0 14px" }}>
            Open to internships, collaborations, and interesting problems.
          </p>
          {/* Live indicator */}
          <div
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "7px",
              background:     "rgba(56,226,164,0.07)",
              border:         "1px solid rgba(56,226,164,0.2)",
              borderRadius:   "20px",
              padding:        "5px 13px",
            }}
          >
            <span className="availability-dot" style={{ width: "6px", height: "6px" }} />
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11px", color: "var(--accent-mint)" }}>
              Form is live · I reply within 24 h
            </span>
          </div>
        </div>

        {/* Terminal card */}
        <div
          className="terminal-card"
          style={{ width: "100%", maxWidth: "560px" }}
        >
          {/* Title bar — unchanged */}
          <div className="terminal-titlebar" style={{ position: "relative" }}>
            <div className="terminal-dot" style={{ background: "#FF5F57" }} />
            <div className="terminal-dot" style={{ background: "#FFBD2E" }} />
            <div className="terminal-dot" style={{ background: "#28C840" }} />
            <span
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              prashik@portfolio ~ contact
            </span>
          </div>

          {/* Terminal body */}
          <div
            style={{
              padding: "24px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* Static first line */}
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "14px", color: "var(--accent-mint)" }}>
              $ ./contact.sh
            </div>

            {/* ── SUCCESS STATE ── */}
            {status === "success" && (
              <>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "14px", color: "var(--accent-mint)" }}>
                  &gt; Message sent successfully ✓
                </div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "13px", color: "var(--text-muted)", fontStyle: "italic" }}>
                  $ # I&apos;ll get back to you soon
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "13px", color: "var(--accent-mint)" }}>$ </span>
                  <span style={{ display: "inline-block", width: "8px", height: "14px", background: "var(--accent)", marginLeft: "4px", animation: "blink 0.7s step-end infinite", opacity: 0.8 }} />
                </div>
              </>
            )}

            {/* ── FORM FIELDS (idle / sending / error) ── */}
            {status !== "success" && (
              <form
                ref={formRef}
                onSubmit={(e) => { e.preventDefault(); sendEmail(); }}
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                noValidate
              >
                {/* Name field */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "14px", color: "var(--accent-mint)", flexShrink: 0 }}>
                      &gt; name:
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                      placeholder="your name"
                      disabled={isDisabled}
                      style={{
                        ...inputStyle,
                        borderBottomColor: errors.name ? "#E24B4A" : "rgba(255,255,255,0.1)",
                        opacity: isDisabled ? 0.5 : 1,
                      }}
                    />
                  </div>
                  {errors.name && (
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "12px", color: "#E24B4A", paddingLeft: "64px" }}>
                      &gt; Error: {errors.name}
                    </span>
                  )}
                </div>

                {/* Email field */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "14px", color: "var(--accent)", flexShrink: 0 }}>
                      &gt; email:
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                      placeholder="your@email.com"
                      disabled={isDisabled}
                      suppressHydrationWarning
                      style={{
                        ...inputStyle,
                        borderBottomColor: errors.email ? "#E24B4A" : "rgba(255,255,255,0.1)",
                        opacity: isDisabled ? 0.5 : 1,
                      }}
                    />
                  </div>
                  {errors.email && (
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "12px", color: "#E24B4A", paddingLeft: "64px" }}>
                      &gt; Error: {errors.email}
                    </span>
                  )}
                </div>

                {/* Comment line */}
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "13px", color: "var(--text-muted)", fontStyle: "italic" }}>
                  $ # write your message below
                </div>

                {/* Message textarea */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "14px", color: "var(--accent-mint)", flexShrink: 0, paddingTop: "2px" }}>
                      &gt;
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((p) => ({ ...p, message: undefined })); }}
                      placeholder="what's on your mind..."
                      rows={3}
                      disabled={isDisabled}
                      style={{
                        ...inputStyle,
                        resize: "none",
                        fontSize: "13px",
                        borderBottomColor: errors.message ? "#E24B4A" : "rgba(255,255,255,0.1)",
                        opacity: isDisabled ? 0.5 : 1,
                        lineHeight: 1.6,
                      }}
                    />
                  </div>
                  {errors.message && (
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "12px", color: "#E24B4A", paddingLeft: "20px" }}>
                      &gt; Error: {errors.message}
                    </span>
                  )}
                </div>

                {/* Not-configured state */}
                {status === "notConfigured" && (
                  <>
                    <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "13px", color: "#FFBD2E" }}>
                      &gt; EmailJS not configured yet
                    </div>
                    <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic" }}>
                      $ # add credentials to .env.local and restart the server
                    </div>
                  </>
                )}

                {/* Error state message */}
                {status === "error" && (
                  <>
                    <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "13px", color: "#E24B4A" }}>
                      &gt; Error: failed to send message
                    </div>
                    <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic" }}>
                      $ # please try{" "}
                      <a href={`mailto:${personalInfo.email}`} style={{ color: "var(--accent)", textDecoration: "none" }}>
                        {personalInfo.email}
                      </a>{" "}
                      directly
                    </div>
                  </>
                )}

                {/* Submit button — terminal command style */}
                <button
                  type="submit"
                  disabled={isDisabled}
                  data-cursor
                  style={{
                    alignSelf: "flex-start",
                    background: "transparent",
                    border: "1px solid transparent",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "13px",
                    color: status === "sending" ? "var(--text-muted)" : "var(--accent-mint)",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    transition: "all 150ms ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    opacity: isDisabled ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(56,226,164,0.1)";
                      el.style.borderColor = "rgba(56,226,164,0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "transparent";
                    el.style.borderColor = "transparent";
                  }}
                >
                  {status === "sending" ? (
                    <>
                      $ sending...
                      <span style={{ display: "inline-block", width: "6px", height: "12px", background: "var(--accent-mint)", animation: "blink 0.7s step-end infinite", opacity: 0.8 }} />
                    </>
                  ) : (
                    "$ send_message.sh --submit"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* LinkedIn text link — replaces the two big buttons */}
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "13px",
            color: "var(--text-muted)",
            textDecoration: "none",
            transition: "color 150ms ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
        >
          Connect on LinkedIn →
        </a>

        {/* Email address in mono */}
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "12px",
            color: "#555",
          }}
        >
          {personalInfo.email}
        </span>
      </motion.div>
    </section>
  );
}
