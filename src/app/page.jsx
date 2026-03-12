"use client";

import { useState, useEffect, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  bg:          "#f9f9f7",
  bgAlt:       "#f2f2ef",
  bgDark:      "#0f0f0d",
  green:       "#2d6a00",
  greenBright: "#4a9c00",
  greenMuted:  "#e8f2e0",
  black:       "#111110",
  mid:         "#444440",
  muted:       "#888884",
  border:      "#ddddd8",
  borderDark:  "#c8c8c2",
  white:       "#ffffff",
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["about","research","projects","experience","personal"];

const RESEARCH = [
  {
    id: 1,
    tag: "Education Equity · NLP",
    title: "Course Articulation ML",
    pi: "Prof. Nabeel Nasir · UCSB",
    period: "Jan 2026 – Present",
    desc: "First-generation and low-income students are disproportionately affected by the complex course articulation between California Community Colleges and UC campuses, especially for Engineering curriculum. I am designing and evaluating NLP pipelines (with TF-IDF, Sentence-Transformer Embeddings, and skip-gram models) on more than 1,000 course descriptions to explore semantic similarity between courses across institutions. Our preliminary findings suggest that sentence-transformer embeddings have high potential, which we aim to extend to minimize bias in articulation policies.",
    tags: ["Python", "Sentence-Transformers", "TF-IDF", "Course2Vec"],
  },
  {
    id: 2,
    tag: "Language · AI Feedback",
    title: "Adaptive Kannada Pronunciation Feedback",
    pi: "Prof. Maung Ting Nyeu · UCSB",
    period: "2024 – Present",
    desc: "A real-time system for diaspora students studying Kannada as a second language at UCSB weekend schools. Student audio recordings are compared against reference pronunciations to provide AI-based feedback on literacy development. Building solid models for Indian languages is complex given their morphological richness. Awarded Best Paper Presentation at KEIS 2025. This work serves as the foundation for a current project in collaboration with Bay Area Kannada Kali.",
    tags: ["Node.js", "Socket.IO", "Google Cloud STT", "CUDA", "MLP"],
  },
  {
    id: 3,
    tag: "Sentiment · Education",
    title: "College Admissions Stress Study",
    pi: "Independent · Bay Area",
    period: "In Progress",
    desc: "This project seeks to measure the level of stress among high-achieving high school students in the college admissions process. I am developing a detailed analysis of applicant stress using a mixed-methods approach. First is web scraping to collect longitudinal sentiment data from r/A2C and r/CollegeResults. This will be paired with in-depth interviews at high schools in the Bay Area.",
    tags: ["Python", "PRAW", "Transformers", "Ethnography"],
  },
];

const PROJECTS = [
  {
    id: 1,
    title: "Earthquake Modeling & Prediction",
    subtitle: "UCSB · Nov 2024 – Present",
    desc: "CNN-LSTM models mapping Mercalli to Community Intensity using large geospatial datasets. Optimized model inference on HPC/GPU clusters with parallelization for latency-sensitive alerts.",
    skills: ["CNN-LSTM", "HPC", "CUDA", "Geospatial ML"],
  },
  {
    id: 2,
    title: "Election Sentiment Analysis",
    subtitle: "Karnataka 2023 · IJAIA Published",
    desc: "Transformer-based sentiment classifiers for the Indic language with novel data augmentation to overcome labeled data scarcity. Presented at CSSE 2023.",
    skills: ["PyTorch", "RoBERTa", "AutoML", "NLTK"],
  },
  {
    id: 3,
    title: "Semantic Coherence · Mental Health",
    subtitle: "IEEE BigData · Pending Publication",
    desc: "CNN-LSTM model assessing semantic coherence of Reddit posts as a predictive signal for mental health diagnostics. Explores how linguistic structure surfaces psychological state.",
    skills: ["TensorFlow", "Keras", "NLTK", "Reddit API"],
  },
  {
    id: 4,
    title: "Indic Language Parsing",
    subtitle: "Brahmic Script Analysis",
    desc: "Novel algorithm converting Brahmic scripts into phonetic equivalents for downstream NLP. Enables analysis of Hindu religious texts with standard ML tooling.",
    skills: ["Python", "PyTorch", "SpaCy", "Unicode"],
  },
  {
    id: 5,
    title: "Herbalyst",
    subtitle: "iOS App · 2024 – Present",
    desc: "AI-powered cross-platform app delivering personalized herbal tea recommendations via GPT-4. Firebase backend, Razorpay payments, and a medication tracker developed under Dr. Corky Wicks.",
    skills: ["Flutter", "Firebase", "GPT-4", "Razorpay"],
  },
  {
    id: 6,
    title: "UCSB Arch Lab · BACI Dataset",
    subtitle: "Supply Chain Visualization",
    desc: "Tool suite for scraping and visualizing BACI export data, mapping supply chain logistics for critical minerals used in data centers. Collaborating with PhD students.",
    skills: ["Python", "D3.js", "BeautifulSoup", "PostgreSQL"],
  },
];

const EXPERIENCE = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Ourfreedom.ai",
    period: "Jan 2026 – Present",
    location: "Remote",
    bullets: [
      "Building Reddit-style community feeds for a social networking platform connecting incarcerated individuals' families — 2,000+ active users.",
      "Implemented Sign in with Apple & Facebook OAuth, boosting onboarding rate by 35% and reducing login friction on iOS.",
      "Reviewed 50+ PRs; led iOS production deployments and TestFlight builds with zero critical regressions across 3 versions.",
    ],
    skills: ["React", "TypeScript", "iOS", "OAuth"],
  },
  {
    id: 2,
    role: "Software Engineering Intern",
    company: "Shaachi.ai",
    period: "Sep 2025 – Dec 2025",
    location: "Remote",
    bullets: [
      "Built ChatGPT connectors via Auth0-based OAuth for 300+ users; cut integration setup time significantly.",
      "Architected a web scraping pipeline indexing 10,000+ profiles across 200+ companies, increasing qualified alumni lead generation by 65%.",
      "Created a deep research feature for Claude Desktop with Firebase-backed persistent storage; cut context reload latency 40%.",
    ],
    skills: ["Auth0", "Firebase", "Claude API", "Web Scraping"],
  },
  {
    id: 3,
    role: "STEM Teacher",
    company: "Young Gates",
    period: "Summer 2025",
    location: "San Jose, CA",
    bullets: [
      "Taught robotics, science, and Python to elementary and middle schoolers; designed hands-on projects for technical growth.",
      "Adapted lessons for special needs students; managed a full classroom independently 8 AM – 3 PM.",
    ],
    skills: ["Python", "Robotics", "Curriculum Design"],
  },
  {
    id: 4,
    role: "Software Engineering Intern",
    company: "NextFoundArtist",
    period: "Jan 2025 – May 2025",
    location: "Remote",
    bullets: [
      "Built a full-stack streaming platform (Next.js, Node.js, MySQL, FastAPI) using microservices architecture.",
      "Developed data-driven insights tools helping filmmakers track engagement, demographics, and trailer performance — improving retention by 25%.",
      "Designed responsive sign-up, onboarding, and login flows in React.js from Figma designs.",
    ],
    skills: ["Next.js", "FastAPI", "MySQL", "React.js"],
  },
  {
    id: 5,
    role: "Kannada Language Instructor",
    company: "Kannada Kali School",
    period: "2018 – Present",
    location: "San Jose, CA",
    bullets: [
      "Teaching weekly K–12 classes in Kannada language, culture, and reading comprehension for 6+ years.",
      "Developed progressive curriculum blending grammar, vocabulary, and storytelling; mentored 50+ students across fluency levels.",
      "Built a full-stack web app (React.js, Node.js) helping 400 students submit homework with real-time updates.",
    ],
    skills: ["React", "Node.js", "Curriculum Design", "GCP"],
  },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Tag({ children, accent }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 3,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
      background: accent ? T.greenMuted : "#ebebea",
      color: accent ? T.green : T.mid,
      border: `1px solid ${accent ? "#c2ddb0" : T.border}`,
      marginRight: 6, marginBottom: 6,
    }}>{children}</span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.2em", textTransform: "uppercase", color: T.green,
      }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${T.green}55,transparent)` }} />
    </div>
  );
}

function btnStyle(variant) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 26px",
    borderRadius: 4, fontSize: 13, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
    textDecoration: "none", letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.2s",
  };
  if (variant === "primary") return { ...base, background: T.green, color: "#fff", border: "none" };
  return { ...base, background: "transparent", color: T.mid, border: `1px solid ${T.borderDark}` };
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 48px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(249,249,247,0.95)" : T.bg,
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
      transition: "all 0.3s",
    }}>
      <button onClick={() => scrollTo("about")} style={{
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 15,
        color: T.green, background: "none", border: "none", cursor: "pointer", padding: 0,
      }}>
        pg<span style={{ opacity: 0.35 }}>_</span>
      </button>

      <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
        {NAV_LINKS.map((l, i) => (
          <li key={l}>
            <button onClick={() => scrollTo(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: T.muted, fontSize: 12, padding: 0,
              fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = T.green}
              onMouseLeave={e => e.currentTarget.style.color = T.muted}
            >
              <span style={{ color: T.green, marginRight: 4, opacity: 0.5 }}>0{i + 1}.</span>
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <a href="/resume.pdf" target="_blank" style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#fff",
        background: T.green, padding: "7px 18px", borderRadius: 4,
        textDecoration: "none", fontWeight: 700,
      }}>Resume</a>
    </nav>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function AboutSection() {
  const [ref, visible] = useInView(0.02);
  return (
    <section id="about" ref={ref} style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: T.bg, padding: "100px 48px 80px",
      scrollMarginTop: 60,
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>

        {/* Name + photo */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 52 }}>
          <div style={{
            width: 110, height: 110, borderRadius: "50%", flexShrink: 0, overflow: "hidden",
            border: `3px solid ${T.green}`, boxShadow: `0 0 0 6px ${T.greenMuted}`,
          }}>
            <img src="/images/pranav.png" alt="Pranav Gunhal"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", color: T.green, fontSize: 11, letterSpacing: "0.15em", marginBottom: 8 }}>
              &gt; pranav_gunhal.py
            </div>
            <h1 style={{
              fontSize: "clamp(34px,5vw,68px)", fontWeight: 900, lineHeight: 1.0,
              letterSpacing: "-0.03em", margin: "0 0 10px", color: T.black,
              fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap",
            }}>
              Pranav <span style={{ color: T.green }}>Gunhal</span><span style={{ color: T.green, opacity: 0.35 }}>_</span>
            </h1>
            <p style={{ color: T.muted, fontSize: 13, fontFamily: "'JetBrains Mono',monospace", margin: 0 }}>
              CS + Education · UCSB · NLP & Education Equity Research
            </p>
          </div>
        </div>

        {/* Content grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: "clamp(20px,2.2vw,30px)", fontWeight: 800, lineHeight: 1.25, margin: "0 0 24px", color: T.black }}>
              The best researchers and teachers are the ones who teach  <span style={{ color: T.green }}>people</span>, not just curriculum.
            </h2>
            <p style={{ color: T.mid, lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
              My overarching goal is to create AI that benefits structurally underserved students, whether they are transfer students navigating complex articulation pathways, diaspora students learning their mothertongues, or high schoolers stressed by college admissions.
            </p>
            <p style={{ color: T.mid, lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
              I study CS + Education at UCSB. My research focus is the intersection of machine learning and education equity. I want to investigate not just whether AI systems perform well, but whether they can be trusted when deployed in high-stakes learning environments.
            </p>
        
            <p style={{ color: T.mid, lineHeight: 1.8, fontSize: 15, marginBottom: 36 }}>
              My software engineering background gives me the foundations to design new, inclusive systems, and I want to apply these skills in novel research contexts.
            </p>
            <div style={{ display: "flex", gap: 28 }}>
              {[
                { num: "6", label: "Research Projects" },
                { num: "7+", label: "Years Teaching" },
                { num: "4", label: "Publications" },
              ].map(s => (
                <div key={s.label} style={{ borderLeft: `3px solid ${T.green}`, paddingLeft: 14 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: T.green, fontFamily: "'JetBrains Mono',monospace" }}>{s.num}</div>
                  <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: T.white, border: `1px solid ${T.border}`,
            borderRadius: 8, padding: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", color: T.green, fontSize: 11, marginBottom: 18 }}>// tech stack</div>
            {[
              { label: "Languages", val: "Python, C++, Java, JS/TS, SQL, R, Swift" },
              { label: "ML / AI",   val: "PyTorch, TensorFlow, HuggingFace, AutoML, Keras" },
              { label: "Web",       val: "React, Next.js, FastAPI, Node.js, Flutter" },
              { label: "Cloud",     val: "AWS (Certified), GCP, Azure, Firebase" },
              { label: "Teaching",  val: "Kannada, Curriculum Design, K–12, ESL-adaptable methods" },
            ].map((r, idx, arr) => (
              <div key={r.label} style={{
                marginBottom: idx < arr.length - 1 ? 13 : 0,
                display: "grid", gridTemplateColumns: "110px 1fr", gap: 12,
                borderBottom: idx < arr.length - 1 ? `1px solid ${T.bgAlt}` : "none",
                paddingBottom: idx < arr.length - 1 ? 13 : 0,
              }}>
                <span style={{ color: T.muted, fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>{r.label}</span>
                <span style={{ color: T.mid, fontSize: 13 }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeSlideIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
}

// ─── RESEARCH ────────────────────────────────────────────────────────────────

function ResearchSection() {
  const [ref, visible] = useInView();
  const [active, setActive] = useState(0);
  return (
    <section id="research" ref={ref} style={{
      padding: "100px 48px", background: T.bgAlt, scrollMarginTop: 60,
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>02 · Research</SectionLabel>
        <h2 style={{ fontSize: "clamp(24px,3vw,42px)", fontWeight: 800, marginBottom: 48, color: T.black }}>
          AI for <span style={{ color: T.green }}>Educational Equity</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr" }}>
          <div style={{ borderRight: `1px solid ${T.border}` }}>
            {RESEARCH.map((r, i) => (
              <button key={r.id} onClick={() => setActive(i)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: `16px ${active === i ? "20px" : "20px"} 16px ${active === i ? "14px" : "0"}`,
                background: "none", border: "none", cursor: "pointer",
                borderBottom: `1px solid ${T.border}`,
                borderLeft: active === i ? `3px solid ${T.green}` : "3px solid transparent",
                transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 10, color: active === i ? T.green : T.muted, fontFamily: "'JetBrains Mono',monospace", marginBottom: 4 }}>{r.tag}</div>
                <div style={{ fontSize: 14, color: active === i ? T.black : T.mid, fontWeight: 600 }}>{r.title}</div>
              </button>
            ))}
          </div>
          <div key={active} style={{ padding: "0 0 0 44px", animation: "fadeSlideIn 0.3s ease" }}>
            <div style={{ fontSize: 10, color: T.green, fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>{RESEARCH[active].tag}</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px", color: T.black }}>{RESEARCH[active].title}</h3>
            <div style={{ color: T.muted, fontSize: 12, marginBottom: 20, fontFamily: "'JetBrains Mono',monospace" }}>
              {RESEARCH[active].pi} · {RESEARCH[active].period}
            </div>
            <p style={{ color: T.mid, lineHeight: 1.8, fontSize: 15, maxWidth: 540, margin: "0 0 24px" }}>
              {RESEARCH[active].desc}
            </p>
            <div>{RESEARCH[active].tags.map(t => <Tag key={t} accent>{t}</Tag>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function ProjectsSection() {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(null);
  return (
    <section id="projects" ref={ref} style={{
      padding: "100px 48px", background: T.bg, scrollMarginTop: 60,
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>03 · Projects</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: 16 }}>
          {PROJECTS.map((p, i) => (
            <div key={p.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "26px 22px",
                background: hovered === i ? T.white : T.bgAlt,
                border: `1px solid ${hovered === i ? T.green : T.border}`,
                borderRadius: 6, cursor: "default", transition: "all 0.22s",
                boxShadow: hovered === i ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
                position: "relative", overflow: "hidden",
              }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: hovered === i ? T.green : "transparent", transition: "all 0.25s",
              }} />
              <div style={{ fontSize: 11, color: T.muted, fontFamily: "'JetBrains Mono',monospace", marginBottom: 10 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 5px", color: T.black }}>{p.title}</h3>
              <div style={{ fontSize: 11, color: T.muted, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>{p.subtitle}</div>
              <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.7, margin: "0 0 18px" }}>{p.desc}</p>
              <div>{p.skills.map(s => <Tag key={s}>{s}</Tag>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function ExperienceSection() {
  const [ref, visible] = useInView();
  const [active, setActive] = useState(0);
  return (
    <section id="experience" ref={ref} style={{
      padding: "100px 48px", background: T.bgAlt, scrollMarginTop: 60,
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>04 · Experience</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr" }}>
          <div style={{ borderRight: `1px solid ${T.border}` }}>
            {EXPERIENCE.map((e, i) => (
              <button key={e.id} onClick={() => setActive(i)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: `14px ${active === i ? "20px" : "20px"} 14px ${active === i ? "14px" : "0"}`,
                background: "none", border: "none", cursor: "pointer",
                borderBottom: `1px solid ${T.border}`,
                borderLeft: active === i ? `3px solid ${T.green}` : "3px solid transparent",
                transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 13, color: active === i ? T.black : T.mid, fontWeight: 600 }}>{e.company}</div>
                <div style={{ fontSize: 10, color: active === i ? T.green : T.muted, fontFamily: "'JetBrains Mono',monospace", marginTop: 3 }}>{e.period}</div>
              </button>
            ))}
          </div>
          <div key={active} style={{ padding: "0 0 0 44px", animation: "fadeSlideIn 0.3s ease" }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 4px", color: T.black }}>
              {EXPERIENCE[active].role}{" "}
              <span style={{ color: T.green }}>@ {EXPERIENCE[active].company}</span>
            </h3>
            <div style={{ color: T.muted, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", marginBottom: 20 }}>
              {EXPERIENCE[active].period} · {EXPERIENCE[active].location}
            </div>
            <ul style={{ paddingLeft: 0, listStyle: "none", margin: "0 0 24px" }}>
              {EXPERIENCE[active].bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ color: T.green, marginTop: 3, flexShrink: 0, fontSize: 10 }}>▸</span>
                  <span style={{ color: T.mid, fontSize: 14, lineHeight: 1.7 }}>{b}</span>
                </li>
              ))}
            </ul>
            <div>{EXPERIENCE[active].skills.map(s => <Tag key={s}>{s}</Tag>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PERSONAL ────────────────────────────────────────────────────────────────

function PersonalSection() {
  const [ref, visible] = useInView();
  return (
    <section id="personal" ref={ref} style={{
      padding: "100px 48px", background: T.bg, scrollMarginTop: 60,
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>05 · Personal</SectionLabel>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <div>
            <div style={{
              width: "100%", aspectRatio: "4/3", borderRadius: 8, overflow: "hidden",
              border: `1px solid ${T.border}`, marginBottom: 28,
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            }}>
              <img src="/images/leisure.png" alt="Pranav outside of work"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", color: T.green, fontSize: 11, marginBottom: 16 }}>// campus & community</div>
            {[
              { label: "Secretary General", sub: "SBIMUN · UCSB Model UN", detail: "Leading UCSB's Model UN conference" },
              { label: "Co-President", sub: "SB Hacks · UCSB's Student-Run Hackathon", detail: "Organizing one of the largest collegiate hackathons in the UC system" },
              { label: "Art Blog", sub: "narasimhasniche.weebly.com", href: "https://narasimhasniche.weebly.com" },
            ].map(item => (
              <div key={item.label} style={{
                display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 0",
                borderBottom: `1px solid ${T.border}`,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.green, flexShrink: 0, marginTop: 5 }} />
                <div>
                  <div style={{ fontSize: 14, color: T.black, fontWeight: 600 }}>
                    {item.href
                      ? <a href={item.href} style={{ color: T.black, textDecoration: "none" }}>{item.label}</a>
                      : item.label}
                  </div>
                  <div style={{ fontSize: 11, color: T.muted, fontFamily: "'JetBrains Mono',monospace", marginTop: 3 }}>{item.sub}</div>
                  {item.detail && <div style={{ fontSize: 13, color: T.mid, marginTop: 4 }}>{item.detail}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ padding: "72px 48px", textAlign: "center", background: T.bgDark, color: "#fff" }}>
      <h2 style={{ fontSize: "clamp(28px,4vw,56px)", fontWeight: 900, margin: "0 0 14px", fontFamily: "'JetBrains Mono',monospace" }}>
        Let's <span style={{ color: "#a3d96a" }}>build</span> something.
      </h2>
      <p style={{ color: "#666", marginBottom: 36, fontSize: 15 }}>
        Open to research collaborations, internships, and interesting conversations.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Email",    href: "mailto:pranav.gunhal@gmail.com" },
          { label: "LinkedIn", href: "https://linkedin.com/in/pranav-gunhal" },
          { label: "GitHub",   href: "https://github.com/pgunhal" },
        ].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
            padding: "10px 22px", border: "1px solid #333", borderRadius: 4,
            color: "#aaa", textDecoration: "none", fontSize: 13,
            fontFamily: "'JetBrains Mono',monospace", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#a3d96a"; e.currentTarget.style.color = "#a3d96a"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#aaa"; }}
          >{l.label}</a>
        ))}
      </div>
      <div style={{ marginTop: 40, color: "#333", fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>
        © 2026 Pranav Gunhal
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: T.bg, color: T.black, fontFamily: "'JetBrains Mono',monospace", minHeight: "100vh" }}>
      <Navbar />
      <AboutSection />
      <ResearchSection />
      <ProjectsSection />
      <ExperienceSection />
      <PersonalSection />
      <Footer />
    </div>
  );
}