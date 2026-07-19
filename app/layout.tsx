import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prashik Kadam — AI & ML Engineer",
  description:
    "Portfolio of Prashik Kadam, AI & ML student at IIITDM Jabalpur building end-to-end intelligent systems.",
  openGraph: {
    title: "Prashik Kadam — AI & ML Engineer",
    description:
      "Portfolio of Prashik Kadam, AI & ML student at IIITDM Jabalpur building end-to-end intelligent systems.",
    url: "https://prashikkadam.dev",
    siteName: "Prashik Kadam",
    images: [{ url: "/photo.jpg", width: 800, height: 800 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashik Kadam — AI & ML Engineer",
    description:
      "Portfolio of Prashik Kadam, AI & ML student at IIITDM Jabalpur.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* JSON-LD structured data — Person schema for Google Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Prashik Kadam",
              url: "https://prashikkadam.dev",
              email: "kadamprashik23@gmail.com",
              image: "https://prashikkadam.dev/photo.jpg",
              jobTitle: "AI & ML Engineer",
              description:
                "Final-year Computer Science student at IIITDM Jabalpur specializing in Machine Learning, Computer Vision, and applied AI systems.",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Indian Institute of Information Technology, Design and Manufacturing Jabalpur",
              },
              sameAs: [
                "https://github.com/Prashikdev2315",
                "https://linkedin.com/in/prashik-kadam",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {/* Scroll progress bar — hydrated client-side */}
        <div id="scroll-progress" suppressHydrationWarning />
        {/* Custom cursor */}
        <div id="cursor-dot" suppressHydrationWarning />
        <div id="cursor-ring" suppressHydrationWarning />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  // Scroll progress bar
  var bar = document.getElementById('scroll-progress');
  if (bar) bar.style.width = '0%';
  function updateProgress() {
    var scrolled = window.scrollY;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    if (total > 0 && bar) bar.style.width = (scrolled / total * 100) + '%';
  }
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  // Custom cursor (desktop only)
  var dot = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  if (window.matchMedia('(pointer: fine)').matches && dot && ring) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function(e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });
    function animateRing() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      rafId = requestAnimationFrame(animateRing);
    }
    var rafId = null;
    animateRing();

    // Pause RAF loop when tab is not visible — saves battery & GPU
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      } else if (rafId === null) {
        animateRing();
      }
    });

    var interactables = 'a, button, [data-cursor]';
    document.addEventListener('mouseover', function(e) {
      if (e.target && e.target.closest && e.target.closest(interactables)) {
        dot.style.transform = 'translate(-50%,-50%) scale(0)';
        ring.style.width = '44px';
        ring.style.height = '44px';
        ring.style.borderColor = '#4F8EF7';
        ring.style.opacity = '0.8';
      }
    });
    document.addEventListener('mouseout', function(e) {
      if (e.target && e.target.closest && e.target.closest(interactables)) {
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.width = '28px';
        ring.style.height = '28px';
        ring.style.borderColor = 'rgba(79,142,247,0.5)';
        ring.style.opacity = '1';
      }
    });
  }
})();
            `,
          }}
        />
      </body>
    </html>
  );
}
