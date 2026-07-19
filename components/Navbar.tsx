"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const navLinks = [
  { label: "Home",           href: "#hero" },
  { label: "About",          href: "#about" },
  { label: "Skills",         href: "#skills" },
  { label: "Experience",     href: "#experience" },
  { label: "Projects",       href: "#projects" },
  { label: "Certifications", href: "#certifications" },
];

// Framer-motion variants defined outside component to prevent re-renders
const mobileMenuVariants = {
  hidden:  { opacity: 0, y: -12, pointerEvents: "none" as const },
  visible: { opacity: 1, y: 0,   pointerEvents: "auto"  as const },
};

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [activeSection, setActive]    = useState("hero");
  const [menuOpen,    setMenuOpen]    = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section detection
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "experience", "projects", "certifications", "contact"];
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.35, rootMargin: "-80px 0px 0px 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position:        "fixed",
        top:             0,
        left:            0,
        right:           0,
        zIndex:          100,
        backdropFilter:  scrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        background:      scrolled ? "rgba(10,15,28,0.85)" : "transparent",
        borderBottom:    scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition:      "all 300ms ease",
      }}
    >
      <div
        style={{
          maxWidth:  "1200px",
          margin:    "0 auto",
          padding:   "0 24px",
          height:    "68px",
          display:   "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
          style={{
            fontFamily:  "var(--font-mono), monospace",
            fontSize:    "20px",
            fontWeight:  600,
            color:       "var(--accent)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
          data-cursor
        >
          Prashik.
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}
             className="hidden-mobile">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive  = activeSection === sectionId;
            return (
              <div key={link.href} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`nav-link${isActive ? " active" : ""}`}
                  data-cursor
                >
                  {link.label}
                </a>
                {isActive && (
                  <span style={{
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: "var(--accent)",
                    position: "absolute", bottom: "-6px",
                    animation: "none",
                    opacity: 1,
                  }} />
                )}
              </div>
            );
          })}

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            data-cursor
            style={{
              padding:      "8px 18px",
              borderRadius: "8px",
              border:       "1px solid var(--accent)",
              color:        "var(--accent)",
              fontSize:     "14px",
              fontWeight:   500,
              textDecoration: "none",
              transition:   "all 200ms ease",
              background:   "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color      = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color      = "var(--accent)";
            }}
          >
            Contact Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border:     "none",
            color:      "var(--text-muted)",
            cursor:     "pointer",
            padding:    "4px",
            display:    "none",
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          style={{
            background:   "rgba(10,15,28,0.98)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding:      "16px 24px 24px",
            display:      "flex",
            flexDirection: "column",
            gap:          "8px",
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{
                padding:      "12px 0",
                color:        activeSection === link.href.replace("#", "") ? "var(--accent)" : "var(--text-muted)",
                fontSize:     "15px",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            style={{
              marginTop:    "8px",
              padding:      "12px 0",
              color:        "var(--accent)",
              fontSize:     "15px",
              textDecoration: "none",
              fontWeight:   500,
            }}
          >
            Contact Me
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 768px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
