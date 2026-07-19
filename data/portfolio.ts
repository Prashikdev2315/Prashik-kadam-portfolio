// ============================================================
// portfolio.ts — Single source of truth for all portfolio data
// ============================================================

export const personalInfo = {
  name: "Prashik Kadam",
  title: "AI & ML Engineer",
  college: "IIITDM Jabalpur",
  location: "Pune, Maharashtra",
  email: "kadamprashik23@gmail.com",
  github: "https://github.com/Prashikdev2315",
  linkedin: "https://linkedin.com/in/prashik-kadam",
  resumeUrl: "/Prashik_Kadam_Resume.pdf",
  photo: "/photo.jpg",
  taglines: [
    "From raw sensor data to farmer decisions.",
    "93% accuracy on medical imaging, built from scratch.",
    "End-to-end AI systems. No shortcuts.",
  ],
  aboutParagraphs: [
    "Final-year Computer Science undergraduate at IIITDM Jabalpur, specialising in Machine Learning, Computer Vision, and AI-driven system development. I ship end-to-end intelligent systems — from model development and explainability to Flask-based deployment — across domains like healthcare imaging, IoT agriculture, and cheminformatics.",
    "Contributor to two patent-filed innovations in healthcare and agri-tech. GATE CSE 2025 qualified. Selected among top 38 out of 193 teams at Smart India Hackathon 2025. I care about building AI that is interpretable, deployable, and genuinely useful.",
  ],
  quickFacts: [
    { label: "B.Tech — IIITDM Jabalpur", icon: "GraduationCap" },
    { label: "Pune, Maharashtra", icon: "MapPin" },
    { label: "Open to Internships & Roles", icon: "Briefcase" },
    { label: "AI/ML · Computer Vision · IoT Systems", icon: "Target" },
    { label: "Japanese 日本語 · Conversational (Level 2)", icon: "Languages" },
  ],
  heroStats: [
    { label: "3 AI Projects" },
    { label: "93% Accuracy" },
    { label: "9 Languages Supported" },
  ],
};

export interface Project {
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
  github: string;
  featured: boolean;
  icon: string;
}

export const projects: Project[] = [
  {
    title: "Kisan Saathi — IoT Smart Agriculture App",
    description:
      "A Flutter mobile app helping Indian farmers monitor soil health via ESP32 IoT sensors and AI-driven fertiliser recommendations.",
    bullets: [
      "Live ESP32 sensor data (N, P, K, pH, EC, ORP) via Firebase RTDB",
      "Two-phase field analysis — soil prep and flooded-field ORP monitoring",
      "AI fertiliser recommendations using Llama 3.1 via Groq API",
      "Multilingual UI across 9 Indian languages with real-time switching",
    ],
    tags: ["Flutter", "Firebase RTDB", "ESP32", "Llama 3.1", "Python"],
    github: "https://github.com/Prashikdev2315/kisan_saathi",
    featured: true,
    icon: "Sprout",
  },
  {
    title: "AI Driven Osteoporosis Detection",
    description:
      "ML pipelines for medical image classification to detect osteoporosis from X-ray images with explainable AI.",
    bullets: [
      "Expanded dataset to 8,000+ images via preprocessing & augmentation",
      "Achieved 93% accuracy with optimized CNN architecture",
      "Grad-CAM++ for model interpretability and explainability",
      "Focused on healthcare-grade explainable AI output",
    ],
    tags: ["Python", "TensorFlow", "CNN", "Grad-CAM++", "Medical Imaging"],
    github: "https://github.com/Prashikdev2315/osteoporosis-detection",
    featured: true,
    icon: "ScanLine",
  },
  {
    title: "Drug Side Effect Prediction Using AI",
    description:
      "Intelligent system predicting potential drug side effects using molecular fingerprints and multi-label ML models.",
    bullets: [
      "Analyzed data from 1,100+ drugs across 20+ side-effect categories",
      "Converted SMILES strings to ECFP molecular fingerprints",
      "Built multi-label classifiers evaluated on macro & micro F1-scores",
      "Delivered insights via an interactive prediction interface",
    ],
    tags: ["Python", "Scikit-learn", "RDKit", "Multi-label Classification"],
    github: "https://github.com/Prashikdev2315/drug-side-effects",
    featured: true,
    icon: "FlaskConical",
  },
];

export interface SkillGroup {
  category: string;
  skills: string[];
  highlight?: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "C++", "Java", "SQL", "Dart"],
    highlight: ["Python"],
  },
  {
    category: "AI / ML",
    skills: ["TensorFlow", "Scikit-learn", "OpenCV", "Grad-CAM++", "Llama 3.1"],
    highlight: ["TensorFlow"],
  },
  {
    category: "Tools & Infra",
    skills: ["Firebase", "ESP32", "FastAPI", "Git", "Linux"],
    highlight: ["Firebase"],
  },
  {
    category: "Mobile & Web",
    skills: ["Flutter", "Next.js", "Tailwind CSS"],
    highlight: ["Flutter"],
  },
  {
    category: "Data & Analysis",
    skills: ["Pandas", "NumPy", "Matplotlib", "RDKit"],
    highlight: [],
  },
];

export interface Experience {
  role: string;
  org: string;
  orgFull: string;
  period: string;
  bullets: string[];
  tags: string[];
  githubLabel?: string;
  githubUrl?: string;
}

export const experiences: Experience[] = [
  {
    role: "Software Engineering Intern",
    org: "IIT Ropar — VLED Lab",
    orgFull: "Indian Institute of Technology Ropar, Vicharanashala Lab for Education Design (VLED Lab)",
    period: "May 2026 – July 2026",
    bullets: [
      "Contributed to Spurti, an open-source ed-tech platform, using the MERN Stack",
      "Submitted pull requests for React frontend feature development on a live production codebase",
    ],
    tags: ["MERN Stack", "React", "Node.js", "MongoDB", "Open Source"],
    githubLabel: "GitHub",
    githubUrl: "https://github.com/Prashikdev2315/spurti",
  },
];

export interface Certification {
  title: string;
  org: string;
  note: string;
  year?: string;
}

export const certifications: Certification[] = [
  {
    title: "GATE 2025 Qualified — Computer Science Engineering",
    org: "IIT Roorkee / Ministry of Education, Govt. of India",
    note: "Qualified Graduate Aptitude Test in Engineering (CS) — a nationally competitive exam",
    year: "2025",
  },
  {
    title: "Smart India Hackathon (SIH) 2025 — College Level Selection",
    org: "Ministry of Education, Govt. of India",
    note: "Selected among top 38 teams out of 193 at college level",
    year: "2025",
  },
  {
    title: "NPTEL–SWAYAM Silver Medal — Business Intelligence & Analytics",
    org: "NPTEL / IIT (12-week course)",
    note: "Awarded Silver Medal for top performance in a 12-week rigorous online course",
    year: "2024",
  },
  {
    title: "NPTEL–SWAYAM Silver Medal — Ethical Hacking",
    org: "NPTEL / IIT (12-week course)",
    note: "Awarded Silver Medal for top performance in a 12-week rigorous online course",
    year: "2024",
  },
];
