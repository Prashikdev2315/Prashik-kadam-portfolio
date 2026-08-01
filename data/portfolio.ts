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
    "I build machine learning systems that make it out of the notebook. My work spans medical imaging, IoT agriculture, and cheminformatics — and in each case the goal was the same: a model someone can actually run, with output they can actually trust.",
    "That means pairing a 93%-accuracy CNN with Grad-CAM++ so a radiologist can see what it looked at, or wiring live ESP32 soil sensors to a Flutter app in nine Indian languages so the farmer reading it isn't forced into English. Contributor to two patent-filed innovations, GATE CSE 2025 qualified, and top 38 of 193 teams at Smart India Hackathon 2025.",
  ],
  quickFacts: [
    { label: "B.Tech — IIITDM Jabalpur", icon: "GraduationCap" },
    { label: "Pune, Maharashtra", icon: "MapPin" },
    { label: "Open to Internships & Roles", icon: "Briefcase" },
    { label: "AI/ML · Computer Vision · IoT Systems", icon: "Target" },
    { label: "Japanese 日本語 · Conversational (Level 2)", icon: "Languages" },
  ],
  heroStats: [
    { label: "93% imaging accuracy" },
    { label: "2 patents filed" },
    { label: "9 languages shipped" },
  ],
};

export interface Project {
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  tags: string[];
  github: string;
  featured: boolean;
  icon: string;
}

export const projects: Project[] = [
  {
    title: "Kisan Saathi",
    tagline: "IoT + LLM advisory for Indian farmers",
    description:
      "Soil-health guidance most Indian farmers can't get: live ESP32 sensor readings turned into plain-language fertiliser advice, delivered in the language they actually speak.",
    bullets: [
      "Streams six live soil metrics (N, P, K, pH, EC, ORP) from ESP32 hardware through Firebase RTDB",
      "Models two real field stages — dry soil prep and flooded-field ORP monitoring",
      "Converts raw readings into actionable fertiliser advice via Llama 3.1 on Groq",
      "Ships in 9 Indian languages with runtime switching, so the UI never forces English",
    ],
    tags: ["Flutter", "Firebase RTDB", "ESP32", "Llama 3.1", "Python"],
    github: "https://github.com/Prashikdev2315/KrishiLink",
    featured: true,
    icon: "Sprout",
  },
  {
    title: "Osteoporosis Detection",
    tagline: "93% accuracy with explainable output",
    description:
      "A CNN that flags osteoporosis in X-rays at 93% accuracy — and shows the radiologist exactly which region drove the call, because an unexplained diagnosis is not a usable one.",
    bullets: [
      "Grew a limited clinical dataset to 8,000+ images through targeted preprocessing and augmentation",
      "Tuned a CNN architecture to 93% classification accuracy",
      "Layered Grad-CAM++ heatmaps over predictions to expose the model's actual attention",
      "Built for the healthcare bar: every prediction ships with visual justification",
    ],
    tags: ["Python", "TensorFlow", "CNN", "Grad-CAM++", "Medical Imaging"],
    github: "https://github.com/Prashikdev2315/Osteoporosis-Detection",
    featured: true,
    icon: "ScanLine",
  },
  {
    title: "Drug Side Effect Prediction",
    tagline: "Multi-label prediction from molecular structure",
    description:
      "Predicts likely side effects straight from a molecule's structure, letting researchers screen compounds computationally before committing to lab time.",
    bullets: [
      "Trained across 1,100+ drugs spanning 20+ side-effect categories",
      "Encoded SMILES strings as ECFP molecular fingerprints via RDKit",
      "Handled true multi-label output, scored on macro and micro F1 rather than raw accuracy",
      "Wrapped the model in an interactive interface for querying unseen compounds",
    ],
    tags: ["Python", "Scikit-learn", "RDKit", "Multi-label Classification"],
    github: "https://github.com/Prashikdev2315/Drug-Side-effect-Predictor",
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
  orgSub: string;
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
    orgSub: "Vicharanashala Lab for Education Design",
    period: "May 2026 – July 2026",
    bullets: [
      "Built React frontend features for Spurti, an open-source ed-tech platform serving live users",
      "Worked the real open-source loop on a MERN codebase — pull requests, code review, merge",
    ],
    tags: ["MERN Stack", "React", "Node.js", "MongoDB", "Open Source"],
    githubLabel: "View the repo",
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
