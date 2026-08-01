import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/data/portfolio";

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

const SITE_URL = "https://prashikkadam.dev";
const TITLE = "Prashik Kadam — AI & ML Engineer";
const DESCRIPTION =
  "AI & ML engineer building end-to-end systems that ship — explainable medical imaging at 93% accuracy, IoT agriculture in 9 languages, and molecular property prediction.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Prashik Kadam",
    "AI Engineer",
    "Machine Learning Engineer",
    "Computer Vision",
    "IIITDM Jabalpur",
  ],
  authors: [{ name: personalInfo.name, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: personalInfo.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0F1C",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  url: SITE_URL,
  email: personalInfo.email,
  image: `${SITE_URL}/photo.jpg`,
  jobTitle: "AI & ML Engineer",
  description:
    "Computer Science undergraduate at IIITDM Jabalpur specializing in Machine Learning, Computer Vision, and applied AI systems.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Information Technology, Design and Manufacturing Jabalpur",
  },
  knowsAbout: [
    "Machine Learning",
    "Computer Vision",
    "Explainable AI",
    "IoT Systems",
  ],
  sameAs: [personalInfo.github, personalInfo.linkedin],
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
      <body className="min-h-screen antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/* Scroll progress bar — width driven by the inline script below */}
        <div id="scroll-progress" aria-hidden="true" suppressHydrationWarning />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  var ticking = false;
  function update() {
    var total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
    ticking = false;
  }
  update();
  window.addEventListener('scroll', function() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
})();
            `,
          }}
        />
      </body>
    </html>
  );
}
