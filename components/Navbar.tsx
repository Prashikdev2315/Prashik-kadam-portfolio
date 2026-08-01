"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About",          href: "#about" },
  { label: "Experience",     href: "#experience" },
  { label: "Projects",       href: "#projects" },
  { label: "Skills",         href: "#skills" },
  { label: "Certifications", href: "#certifications" },
];

const SECTION_IDS = [
  "hero",
  "about",
  "experience",
  "projects",
  "skills",
  "certifications",
  "contact",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the section closest to the top of the viewport, so the active link
  // stays correct when several sections are visible at once.
  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        if (visible.size === 0) return;
        const [topMost] = [...visible.entries()].sort((a, b) => a[1] - b[1]);
        setActive(topMost[0]);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav
      aria-label="Main"
      style={{
        position:             "fixed",
        top:                  0,
        left:                 0,
        right:                0,
        zIndex:               100,
        backdropFilter:       scrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        background:           scrolled ? "rgba(10,15,28,0.85)" : "transparent",
        borderBottom:         `1px solid ${scrolled ? "rgba(255,255,255,0.06)" : "transparent"}`,
        transition:           "background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease",
      }}
    >
      <div
        style={{
          maxWidth:       "1200px",
          margin:         "0 auto",
          padding:        "0 var(--gutter)",
          height:         "var(--nav-h)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily:     "var(--font-mono), monospace",
            fontSize:       "20px",
            fontWeight:     600,
            color:          "var(--accent)",
            textDecoration: "none",
            letterSpacing:  "-0.02em",
          }}
        >
          Prashik.
        </a>

        {/* Desktop nav */}
        <div
          className="hidden-mobile"
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link${isActive ? " active" : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                {link.label}
              </a>
            );
          })}

          <a
            href="#contact"
            className="nav-cta"
            style={{
              padding:        "8px 18px",
              borderRadius:   "8px",
              border:         "1px solid var(--accent)",
              color:          "var(--accent)",
              fontSize:       "14px",
              fontWeight:     500,
              textDecoration: "none",
              transition:     "background 200ms ease, color 200ms ease",
            }}
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{
            background: "none",
            border:     "none",
            color:      "var(--text-primary)",
            cursor:     "pointer",
            padding:    "8px",
            display:    "none",
            alignItems: "center",
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          style={{
            background:     "rgba(10,15,28,0.98)",
            backdropFilter: "blur(16px)",
            borderBottom:   "1px solid rgba(255,255,255,0.07)",
            padding:        "8px var(--gutter) 24px",
            display:        "flex",
            flexDirection:  "column",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding:        "14px 0",
                color:          activeSection === link.href.slice(1) ? "var(--accent)" : "var(--text-muted)",
                fontSize:       "15px",
                textDecoration: "none",
                borderBottom:   "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop:      "16px",
              padding:        "12px 0",
              textAlign:      "center",
              borderRadius:   "8px",
              border:         "1px solid var(--accent)",
              color:          "var(--accent)",
              fontSize:       "15px",
              fontWeight:     500,
              textDecoration: "none",
            }}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
