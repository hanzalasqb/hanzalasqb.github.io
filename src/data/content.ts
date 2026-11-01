export const PROFILE = {
  name: "Hanzala Saqib",
  role: "Full Stack AI Developer",
  location: "Lahore, Pakistan",
  email: "hanzala7824@gmail.com",
  phone: "+92 306 192 7824",
  github: "https://github.com/hanzalasqb",
  linkedin: "https://www.linkedin.com/in/hanzalasaqib",
  cv: "assets/Hanzala-Saqib-AI-FullStack-Resume.pdf",
};

export type Category = "ai" | "commerce" | "iot" | "web";

export interface Project {
  slug: string;
  title: string;
  kicker: string;
  category: Category[];
  summary: string;
  highlights: string[];
  stack: string[];
  image?: string;
  gallery?: string[];
  demo?: string;
  code?: string;
  accent: string;
}

const gh = (repo: string) => `https://github.com/hanzalasqb/${repo}`;
const pages = (repo: string) => `https://hanzalasqb.github.io/${repo}/`;

export const FEATURED: Project[] = [
  {
    slug: "shieldmind",
    title: "ShieldMind AI",
    kicker: "Cybersecurity · AI agent",
    category: ["ai"],
    summary: "An AI copilot for SOC analysts. A tool-calling LLM agent triages logs, maps findings to MITRE ATT&CK, looks up CVEs, writes Sigma detection rules and drafts incident-response playbooks.",
    highlights: ["Detects brute force, password spraying, SQLi, XSS and Windows attack events", "Streams agent tool calls live over SSE", "Guardrails plus a deterministic fallback when no LLM key is set", "26 automated tests and GitHub Actions CI"],
    stack: ["FastAPI", "Python", "React 19", "TypeScript", "SQLAlchemy", "OpenAI tools", "Docker"],
    image: "projects/shieldmind.webp",
    gallery: ["projects/shieldmind.webp", "projects/shieldmind-2.webp"],
    demo: pages("shieldmind-ai"),
    code: gh("shieldmind-ai"),
    accent: "#22d3ee",
  },
  {
    slug: "shopsense",
    title: "ShopSense AI",
    kicker: "E-commerce · AI shopping",
    category: ["ai", "commerce"],
    summary: "An AI-powered store. Shoppers search in plain language, an assistant compares products and adds them to the cart, and admins get analytics plus an AI product copywriter.",
    highlights: ["Natural-language search with TF-IDF ranking and parsed filters", "Tool-calling shopping assistant with live cart actions", "AI review summaries and co-purchase recommendations", "Atomic stock updates on PostgreSQL with Drizzle migrations"],
    stack: ["React 19", "Node.js", "Express 5", "PostgreSQL", "Drizzle ORM", "TypeScript", "Vitest"],
    image: "projects/shopsense.webp",
    gallery: ["projects/shopsense.webp", "projects/shopsense-2.webp"],
    demo: pages("shopsense-ai"),
    code: gh("shopsense-ai"),
    accent: "#a78bfa",
  },
  {
    slug: "ember",
    title: "Ember & Saffron",
    kicker: "Restaurant platform · AI concierge",
    category: ["ai", "commerce"],
    summary: "A complete restaurant platform: allergen-aware menu and online ordering, live table reservations, a real-time kitchen display and an AI concierge, with menu-engineering insights for the owner.",
    highlights: ["Allergy-safe dish suggestions and availability checks from chat", "Kitchen display that updates in real time over SSE", "Double-booking prevented with Postgres advisory locks", "Kasavana & Smith menu-engineering matrix with pricing advice"],
    stack: ["React 19", "Node.js", "Express 5", "PostgreSQL", "SSE", "Recharts", "TypeScript"],
    image: "projects/ember.webp",
    gallery: ["projects/ember.webp", "projects/ember-2.webp"],
    demo: pages("ember-saffron-restaurant"),
    code: gh("ember-saffron-restaurant"),
    accent: "#f5c46b",
  },
  {
    slug: "edgepulse",
    title: "EdgePulse IoT AI",
    kicker: "Embedded systems · Predictive maintenance",
    category: ["ai", "iot"],
    summary: "AI monitoring for embedded systems. ESP32 firmware streams sensor data over MQTT, the backend flags anomalies and forecasts failures, and an AI assistant diagnoses faults on a live dashboard.",
    highlights: ["ESP32 firmware with MQTT last-will and reconnect backoff", "Robust z-score anomaly detection and time-to-threshold forecasts", "WebSocket dashboard with live charts and alerts", "AI assistant that proposes device commands for confirmation"],
    stack: ["ESP32 · C++", "MQTT", "FastAPI", "WebSockets", "scikit-learn", "React", "PlatformIO"],
    image: "projects/edgepulse.webp",
    gallery: ["projects/edgepulse.webp", "projects/edgepulse-2.webp"],
    demo: pages("edgepulse-iot-ai"),
    code: gh("edgepulse-iot-ai"),
    accent: "#34d399",
  },
];

export const MORE: Project[] = [
  {
    slug: "copilot",
    title: "AI Engineering Copilot",
    kicker: "AI workspace",
    category: ["ai"],
    summary: "An AI workspace for engineers with multi-model streaming chat, persistent memory, a knowledge base, file intelligence and a Monaco code editor.",
    highlights: [],
    stack: ["React", "TypeScript", "tRPC", "Drizzle", "MySQL", "S3"],
    image: "projects/hs-space.webp",
    code: gh("ai-engineering-copilot"),
    accent: "#f5c46b",
  },
  {
    slug: "documind",
    title: "DocuMind AI",
    kicker: "RAG · Chat with documents",
    category: ["ai"],
    summary: "Upload documents and ask questions. Answers come with citations, stream over SSE and run on OpenAI or a local Ollama model.",
    highlights: [],
    stack: ["FastAPI", "Python", "Embeddings", "React", "Docker"],
    code: gh("documind-ai"),
    accent: "#60a5fa",
  },
  {
    slug: "resume",
    title: "AI Resume Analyzer",
    kicker: "Hiring · AI scoring",
    category: ["ai"],
    summary: "Compares a resume with a job description and returns a hybrid AI and keyword fit score, skill gaps and tailored interview questions.",
    highlights: [],
    stack: ["Node.js", "Express", "TypeScript", "Zod", "React"],
    code: gh("ai-resume-analyzer"),
    accent: "#f472b6",
  },
  {
    slug: "hs-space",
    title: "HS Space",
    kicker: "Multi-model AI SaaS",
    category: ["ai"],
    summary: "A multi-model AI platform for GPT-4o, Claude and Gemini with role-based access, an admin approval workflow and usage analytics.",
    highlights: [],
    stack: ["React", "TypeScript", "tRPC", "MySQL", "S3"],
    image: "projects/ai-saas.webp",
    code: gh("hs-space"),
    accent: "#a78bfa",
  },
  {
    slug: "by-salma",
    title: "By Salma",
    kicker: "Jewelry e-commerce",
    category: ["commerce"],
    summary: "A luxury jewelry storefront with cart, cash-on-delivery checkout, coupons and a role-based admin panel.",
    highlights: [],
    stack: ["React", "Node.js", "tRPC", "Drizzle", "MySQL"],
    image: "projects/by-salma.webp",
    code: gh("by-salma"),
    accent: "#f5c46b",
  },
  {
    slug: "zyvenox",
    title: "Zyvenox Lab",
    kicker: "Digital agency website",
    category: ["web"],
    summary: "An agency website that presents services, capabilities and selected work, with an admin area and AWS deployment.",
    highlights: [],
    stack: ["React", "TypeScript", "tRPC", "AWS"],
    image: "projects/zyvenox.webp",
    code: gh("zyvenoxNew"),
    accent: "#e5e7eb",
  },
  {
    slug: "smart-home",
    title: "Smart Home Dashboard",
    kicker: "IoT control panel",
    category: ["iot"],
    summary: "An interactive smart-home control panel for lights, climate and devices, with C++ firmware for the connected hardware.",
    highlights: [],
    stack: ["JavaScript", "C++", "HTML", "CSS"],
    code: gh("smart-home-dashboard"),
    accent: "#34d399",
  },
  {
    slug: "portfolio-cms",
    title: "Portfolio CMS",
    kicker: "Content management",
    category: ["web"],
    summary: "A server-rendered CMS for managing portfolio projects and content, with templated pages and an editing workflow.",
    highlights: [],
    stack: ["Node.js", "Express", "EJS", "JavaScript"],
    code: gh("hanzala-portfolio-cms"),
    accent: "#60a5fa",
  },
  {
    slug: "portfolio-3d",
    title: "3D Developer Portfolio",
    kicker: "This website",
    category: ["web"],
    summary: "The site you're on: a real-time WebGL scene, 3D tilt cards and scroll-driven motion, built to stay fast and accessible.",
    highlights: [],
    stack: ["React 19", "Three.js", "React Three Fiber", "Motion", "Tailwind CSS"],
    code: gh("hanzalasqb.github.io"),
    accent: "#f5c46b",
  },
];

export const SKILLS: { title: string; items: string[] }[] = [
  { title: "AI & LLM", items: ["OpenAI tool calling", "AI agents", "RAG & embeddings", "Ollama", "Prompt engineering", "scikit-learn"] },
  { title: "Frontend", items: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Three.js", "Recharts"] },
  { title: "Backend", items: ["Node.js", "Express", "tRPC", "Python", "FastAPI", "WebSockets & SSE"] },
  { title: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLAlchemy", "Drizzle ORM", "Redis"] },
  { title: "IoT & Security", items: ["ESP32", "MQTT", "PlatformIO", "MITRE ATT&CK", "Sigma rules", "JWT & RBAC"] },
  { title: "DevOps", items: ["Docker", "GitHub Actions", "AWS EC2 & S3", "Nginx", "Pytest", "Vitest"] },
];

export const EXPERIENCE = [
  { date: "Mar 2026 — Present", role: "Full Stack MERN Developer", company: "MBU Devs · United States", detail: "Building secure, scalable business applications and shipping production workflows across React, Node.js, MongoDB, Docker and AWS EC2." },
  { date: "Mar 2026 — May 2026", role: "Analytics & Monitoring", company: "Contract Bazaar · Lahore", detail: "Used GA4, Search Console, log analysis and traffic monitoring to find performance and growth opportunities." },
  { date: "Oct 2025 — Feb 2026", role: "Full Stack Developer", company: "Digis · A Fiverr company", detail: "Delivered responsive business applications, secure APIs, payment integrations and cloud deployments for customer workflows." },
];

export const STATS = [
  { value: 14, suffix: "", label: "Public projects" },
  { value: 4, suffix: "", label: "Live AI demos" },
  { value: 3, suffix: "", label: "Industry roles" },
  { value: 60, suffix: "+", label: "Automated tests" },
];
