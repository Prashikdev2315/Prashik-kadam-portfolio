"use client";

import { useState, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import emailjs from "@emailjs/browser";
import { personalInfo } from "@/data/portfolio";
import SectionHeader from "./SectionHeader";

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
const ERROR_RED = "#FF7B7A";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const mono = (size: number, color: string): React.CSSProperties => ({
  fontFamily: "var(--font-mono), monospace",
  fontSize:   `${size}px`,
  color,
});

const inputStyle: React.CSSProperties = {
  flex: 1,
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.14)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-mono), monospace",
  fontSize: "14px",
  outline: "none",
  padding: "2px 0 4px",
  lineHeight: 1.5,
  width: "100%",
  minWidth: 0,
};

const promptStyle: React.CSSProperties = {
  ...mono(14, "var(--accent-mint)"),
  flexShrink: 0,
  cursor: "pointer",
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
          from_name:  name.trim(),
          from_email: email.trim(),
          message:    message.trim(),
          to_name:    "Prashik",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
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
    <section id="contact" className="section">
      <SectionHeader
        label="// contact"
        title="Let's build something."
        intro="Open to internships, collaborations, and interesting problems."
        align="center"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            "28px",
          width:          "100%",
        }}
      >
        {/* Availability badge */}
        <div
          style={{
            display:      "inline-flex",
            alignItems:   "center",
            gap:          "7px",
            background:   "rgba(56,226,164,0.07)",
            border:       "1px solid rgba(56,226,164,0.2)",
            borderRadius: "20px",
            padding:      "5px 13px",
          }}
        >
          <span className="availability-dot" style={{ width: "6px", height: "6px" }} />
          <span style={mono(11, "var(--accent-mint)")}>Form is live · I reply within 24 h</span>
        </div>

        {/* Terminal card */}
        <div className="terminal-card" style={{ width: "100%", maxWidth: "560px" }}>
          <div className="terminal-titlebar" style={{ position: "relative" }}>
            <div className="terminal-dot" style={{ background: "#FF5F57" }} />
            <div className="terminal-dot" style={{ background: "#FFBD2E" }} />
            <div className="terminal-dot" style={{ background: "#28C840" }} />
            <span
              style={{
                position:  "absolute",
                left:      "50%",
                transform: "translateX(-50%)",
                ...mono(12, "var(--text-muted)"),
              }}
            >
              prashik@portfolio ~ contact
            </span>
          </div>

          <div
            style={{
              padding:       "24px",
              textAlign:     "left",
              display:       "flex",
              flexDirection: "column",
              gap:           "14px",
            }}
          >
            <div style={mono(14, "var(--accent-mint)")}>$ ./contact.sh</div>

            {/* Status is announced to screen readers without stealing focus */}
            <div aria-live="polite" style={{ display: "contents" }}>
              {status === "success" && (
                <>
                  <div style={mono(14, "var(--accent-mint)")}>&gt; Message sent successfully ✓</div>
                  <div style={{ ...mono(13, "var(--text-muted)"), fontStyle: "italic" }}>
                    $ # I&apos;ll get back to you soon
                  </div>
                </>
              )}
            </div>

            {status !== "success" && (
              <form
                ref={formRef}
                onSubmit={(e) => { e.preventDefault(); sendEmail(); }}
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                noValidate
              >
                {/* Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <label htmlFor="contact-name" style={promptStyle}>&gt; name:</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                      placeholder="your name"
                      disabled={isDisabled}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      style={{
                        ...inputStyle,
                        borderBottomColor: errors.name ? ERROR_RED : "rgba(255,255,255,0.14)",
                        opacity: isDisabled ? 0.5 : 1,
                      }}
                    />
                  </div>
                  {errors.name && (
                    <span id="contact-name-error" style={{ ...mono(12, ERROR_RED), paddingLeft: "64px" }}>
                      &gt; Error: {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <label htmlFor="contact-email" style={{ ...promptStyle, color: "var(--accent)" }}>&gt; email:</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                      placeholder="your@email.com"
                      disabled={isDisabled}
                      suppressHydrationWarning
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      style={{
                        ...inputStyle,
                        borderBottomColor: errors.email ? ERROR_RED : "rgba(255,255,255,0.14)",
                        opacity: isDisabled ? 0.5 : 1,
                      }}
                    />
                  </div>
                  {errors.email && (
                    <span id="contact-email-error" style={{ ...mono(12, ERROR_RED), paddingLeft: "64px" }}>
                      &gt; Error: {errors.email}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                    <label htmlFor="contact-message" style={{ ...promptStyle, paddingTop: "2px" }}>
                      &gt; message:
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((p) => ({ ...p, message: undefined })); }}
                      placeholder="what's on your mind..."
                      rows={3}
                      disabled={isDisabled}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      style={{
                        ...inputStyle,
                        resize:     "none",
                        fontSize:   "13px",
                        lineHeight: 1.6,
                        borderBottomColor: errors.message ? ERROR_RED : "rgba(255,255,255,0.14)",
                        opacity: isDisabled ? 0.5 : 1,
                      }}
                    />
                  </div>
                  {errors.message && (
                    <span id="contact-message-error" style={{ ...mono(12, ERROR_RED), paddingLeft: "20px" }}>
                      &gt; Error: {errors.message}
                    </span>
                  )}
                </div>

                <div aria-live="polite" style={{ display: "contents" }}>
                  {status === "notConfigured" && (
                    <>
                      <div style={mono(13, "#FFBD2E")}>&gt; EmailJS not configured yet</div>
                      <div style={{ ...mono(12, "var(--text-muted)"), fontStyle: "italic" }}>
                        $ # add credentials to .env.local and restart the server
                      </div>
                    </>
                  )}

                  {status === "error" && (
                    <>
                      <div style={mono(13, ERROR_RED)}>&gt; Error: failed to send message</div>
                      <div style={{ ...mono(12, "var(--text-muted)"), fontStyle: "italic" }}>
                        $ # please email{" "}
                        <a href={`mailto:${personalInfo.email}`} className="text-link">
                          {personalInfo.email}
                        </a>{" "}
                        directly
                      </div>
                    </>
                  )}
                </div>

                <button type="submit" disabled={isDisabled} className="term-btn">
                  {status === "sending" ? (
                    <>
                      $ sending...
                      <span
                        style={{
                          display:    "inline-block",
                          width:      "6px",
                          height:     "12px",
                          background: "var(--accent-mint)",
                          animation:  "blink 0.7s step-end infinite",
                          opacity:    0.8,
                        }}
                      />
                    </>
                  ) : (
                    "$ send_message.sh --submit"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Direct alternatives to the form */}
        <div
          style={{
            display:        "flex",
            flexWrap:       "wrap",
            gap:            "8px 20px",
            justifyContent: "center",
            alignItems:     "center",
          }}
        >
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
            style={mono(13, "var(--accent)")}
          >
            Connect on LinkedIn →
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-link"
            style={mono(13, "var(--text-muted)")}
          >
            {personalInfo.email}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
