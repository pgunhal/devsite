"use client";

import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Research", "Projects", "Experience", "Personal"];

const RESEARCH = [
  {
    id: 1,
    tag: "Education Equity · NLP",
    title: "Course Articulation ML",
    pi: "Prof. Nabeel Nasir · UCSB",
    period: "Jan 2026 – Present",
    desc: "First-generation and low-income students are disproportionately affected by broken course articulation between California Community Colleges and UC campuses. I am designing and evaluating NLP pipelines — TF-IDF, Sentence-Transformer Embeddings, and Course2Vec-style skip-gram models — on more than 1,000 course descriptions to establish how semantically similar courses are across institutions. Our findings suggest sentence-transformer embeddings have high potential, which we aim to extend to minimize bias in articulation policies.",
    tags: ["Python", "Sentence-Transformers", "TF-IDF", "Course2Vec"],
  },
  {
    id: 2,
    tag: "Language · AI Feedback",
    title: "Adaptive Kannada Pronunciation Feedback",
    pi: "Prof. Maung Ting Nyeu · UCSB",
    period: "2024 – Present",
    desc: "A real-time system for diaspora students studying Kannada as a second language at UCSB weekend schools. Student audio recordings are compared against reference pronunciations to provide AI-based feedback on literacy development. Building solid models for Indian languages is complex given their morphological richness — ensuring this system is robust and reliable for vulnerable learners is precisely the kind of trustworthiness problem I care about. Awarded Best Paper Presentation at KEIS 2025 (pending publication).",
    tags: ["Node.js", "Socket.IO", "Google Cloud STT", "CUDA", "MLP"],
  },
  {
    id: 3,
    tag: "Sentiment · Education",
    title: "College Admissions Stress Study",
    pi: "Independent · Bay Area",
    period: "In Progress",
    desc: "This project tries to measure the level of stress among high-achieving high school students in the college admissions process. I am developing a detailed portrait of applicant stress using a mixed-methods approach — web scraping to collect longitudinal sentiment data from r/A2C and r/CollegeResults, paired with ethnographic interviews at high schools in the Bay Area. My background in sentiment analysis and transformer-based text classification makes my experience directly applicable.",
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
    color: "#C8FF00",
  },
  {
    id: 2,
    title: "Election Sentiment Analysis",
    subtitle: "Karnataka 2023 · IJAIA Published",
    desc: "Transformer-based sentiment classifiers for the Indic language with novel data augmentation to overcome labeled data scarcity. Presented at CSSE 2023.",
    skills: ["PyTorch", "RoBERTa", "AutoML", "NLTK"],
    color: "#C8FF00",
  },
  {
    id: 3,
    title: "Semantic Coherence · Mental Health",
    subtitle: "IEEE BigData · Pending Publication",
    desc: "CNN-LSTM model assessing semantic coherence of Reddit posts as a predictive signal for mental health diagnostics. Explores how linguistic structure surfaces psychological state.",
    skills: ["TensorFlow", "Keras", "NLTK", "Reddit API"],
    color: "#C8FF00",
  },
  {
    id: 4,
    title: "Indic Language Parsing",
    subtitle: "Brahmic Script Analysis",
    desc: "Novel algorithm converting Brahmic scripts into phonetic equivalents for downstream NLP. Enables analysis of Hindu religious texts with standard ML tooling.",
    skills: ["Python", "PyTorch", "SpaCy", "Unicode"],
    color: "#C8FF00",
  },
  {
    id: 5,
    title: "Herbalyst",
    subtitle: "iOS App · 2024 – Present",
    desc: "AI-powered cross-platform app delivering personalized herbal tea recommendations via GPT-4. Firebase backend, Razorpay payments, and a medication tracker developed under Dr. Corky Wicks.",
    skills: ["Flutter", "Firebase", "GPT-4", "Razorpay"],
    color: "#C8FF00",
  },
  {
    id: 6,
    title: "UCSB Arch Lab · BACI Dataset",
    subtitle: "Supply Chain Visualization",
    desc: "Tool suite for scraping and visualizing BACI export data, mapping supply chain logistics for critical minerals used in data centers. Collaborating with PhD students.",
    skills: ["Python", "D3.js", "BeautifulSoup", "PostgreSQL"],
    color: "#C8FF00",
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

function useInView(threshold = 0.15) {
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

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function Tag({ children, accent }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      background: accent ? "rgba(200,255,0,0.12)" : "rgba(255,255,255,0.06)",
      color: accent ? "#C8FF00" : "#aaa",
      border: accent ? "1px solid rgba(200,255,0,0.3)" : "1px solid rgba(255,255,255,0.1)",
      marginRight: 6,
      marginBottom: 6,
    }}>{children}</span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, marginBottom: 56,
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
        textTransform: "uppercase", color: "#C8FF00",
      }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(200,255,0,0.4),transparent)" }} />
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function HeroSection() {
  const [tick, setTick] = useState(0);
  const phrases = ["AI & ML Researcher", "Full-Stack Engineer", "Education Equity Advocate", "NLP Enthusiast"];
  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 2800);
    return () => clearInterval(t);
  }, []);
  const phrase = phrases[tick % phrases.length];

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg,#0a0a0a 0%,#0f0f0f 50%,#0d1a00 100%)",
    }}>
      {/* grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(200,255,0,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,0.035) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      {/* glow blob */}
      <div style={{
        position: "absolute", top: "20%", left: "55%", width: 600, height: 600,
        background: "radial-gradient(ellipse,rgba(200,255,0,0.07) 0%,transparent 70%)",
        pointerEvents: "none", transform: "translate(-50%,-50%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "left", maxWidth: 860, padding: "0 40px" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#C8FF00", fontSize: 13, letterSpacing: "0.15em", marginBottom: 20 }}>
          &gt; hello_world.py
        </div>
        <h1 style={{
          fontSize: "clamp(42px,6.5vw,88px)", fontWeight: 900, lineHeight: 1.0,
          letterSpacing: "-0.03em", margin: 0, color: "#fff",
          fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap",
        }}>
          Pranav <span style={{ color: "#C8FF00" }}>Gunhal</span><span style={{ color: "#C8FF00", opacity: 0.5 }}>_</span>
        </h1>

        <div style={{
          marginTop: 24, height: 32, overflow: "hidden",
          fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(14px,2vw,18px)",
          color: "#888",
        }}>
          <span key={tick} style={{ display: "block", animation: "fadeSlideIn 0.4s ease" }}>
            // {phrase}
          </span>
        </div>

        <p style={{ marginTop: 28, maxWidth: 560, color: "#666", fontSize: 15, lineHeight: 1.7 }}>
          I design AI systems that benefit everyone. Full-stack engineer & NLP researcher at UCSB,
          studying CS + Education with a focus on language, equity, and trustworthy AI.
        </p>

        <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="#research" style={btnStyle("primary")}>View Research</a>
          <a href="#experience" style={btnStyle("ghost")}>Experience</a>
          <a href="mailto:pranav.gunhal@gmail.com" style={btnStyle("ghost")}>Get In Touch</a>
        </div>

        <div style={{ marginTop: 56, display: "flex", gap: 24 }}>
          {[
            { num: "3+", label: "Active Research Projects" },
            { num: "6+", label: "Years Teaching" },
            { num: "2", label: "IEEE Publications" },
            { num: "1K+", label: "Course Descriptions Analyzed" },
          ].map(s => (
            <div key={s.label} style={{ borderLeft: "2px solid rgba(200,255,0,0.3)", paddingLeft: 16 }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#C8FF00", fontFamily: "'JetBrains Mono',monospace" }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </section>
  );
}

function btnStyle(variant) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "12px 28px", borderRadius: 4, fontSize: 13,
    fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
    textDecoration: "none", letterSpacing: "0.05em",
    cursor: "pointer", transition: "all 0.2s",
  };
  if (variant === "primary") return { ...base, background: "#C8FF00", color: "#0a0a0a", border: "none" };
  return { ...base, background: "transparent", color: "#aaa", border: "1px solid rgba(255,255,255,0.15)" };
}

function AboutSection() {
  const [ref, visible] = useInView();
  return (
    <section id="about" ref={ref} style={{
      padding: "120px 40px", maxWidth: 1100, margin: "0 auto",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: "all 0.8s cubic-bezier(.16,1,.3,1)",
    }}>
      <SectionLabel>01 · Who Am I</SectionLabel>

      {/* Profile photo + intro row */}
      <div style={{ display: "flex", alignItems: "center", gap: 48, marginBottom: 64 }}>
        <div style={{
          width: 160, height: 160, borderRadius: "50%", flexShrink: 0, overflow: "hidden",
          border: "2px solid rgba(200,255,0,0.3)",
          background: "rgba(255,255,255,0.03)",
        }}>
          <img src="/images/pranav.png" alt="Pranav Gunhal" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
        </div>
        <div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 16px" }}>
            I build AI that works<br />
            <span style={{ color: "#C8FF00" }}>for the people it forgets.</span>
          </h2>
          <p style={{ color: "#555", fontSize: 14, fontFamily: "'JetBrains Mono',monospace", margin: 0 }}>
            CS + Education · UCSB · NLP & Education Equity Research
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div>
          <p style={{ color: "#777", lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            My overarching goal is to create AI that benefits structurally underserved students — transfer students navigating broken articulation systems, diaspora students learning their heritage language, and high schoolers stressed by college admissions processes designed without them in mind.
          </p>
          <p style={{ color: "#777", lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            I study CS + Education at UCSB. My research sits at the intersection of machine learning, natural language processing, and education equity. I want to investigate not just whether AI systems perform well, but whether they can be trusted when deployed in high-stakes learning environments.
          </p>
          <p style={{ color: "#777", lineHeight: 1.8, fontSize: 15 }}>
            My software engineering background gives me the foundations to build new, inclusive systems — and I want to acquire the scientific communication skills to make that work matter in a PhD program and beyond.
          </p>
        </div>
        <div>
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8, padding: 32,
          }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#C8FF00", fontSize: 11, marginBottom: 20 }}>// tech stack</div>
            {[
              { label: "Languages", val: "Python, C++, Java, JS/TS, SQL, R, Swift" },
              { label: "ML / AI", val: "PyTorch, TensorFlow, HuggingFace, AutoML, Keras" },
              { label: "Web", val: "React, Next.js, FastAPI, Node.js, Flutter" },
              { label: "Cloud", val: "AWS (Certified), GCP, Azure, Firebase" },
              { label: "Teaching", val: "Kannada, Curriculum Design, K–12, ESL-adaptable methods" },
            ].map(r => (
              <div key={r.label} style={{ marginBottom: 14, display: "grid", gridTemplateColumns: "130px 1fr", gap: 12 }}>
                <span style={{ color: "#444", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>{r.label}</span>
                <span style={{ color: "#bbb", fontSize: 13 }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResearchSection() {
  const [ref, visible] = useInView();
  const [active, setActive] = useState(0);
  return (
    <section id="research" ref={ref} style={{
      padding: "120px 40px",
      background: "linear-gradient(180deg,#0a0a0a 0%,#0c120a 100%)",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: "all 0.8s cubic-bezier(.16,1,.3,1)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>02 · Research</SectionLabel>
        <h2 style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 800, marginBottom: 56 }}>
          AI for <span style={{ color: "#C8FF00" }}>Educational Equity</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0 }}>
          {/* tabs */}
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
            {RESEARCH.map((r, i) => (
              <button key={r.id} onClick={() => setActive(i)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "18px 24px 18px 0", background: "none", border: "none", cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                borderLeft: active === i ? "3px solid #C8FF00" : "3px solid transparent",
                transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 11, color: active === i ? "#C8FF00" : "#444", fontFamily: "'JetBrains Mono',monospace", marginBottom: 4 }}>{r.tag}</div>
                <div style={{ fontSize: 14, color: active === i ? "#fff" : "#666", fontWeight: 600 }}>{r.title}</div>
              </button>
            ))}
          </div>
          {/* panel */}
          <div key={active} style={{ padding: "0 0 0 48px", animation: "fadeSlideIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: "#C8FF00", fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>{RESEARCH[active].tag}</div>
                <h3 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>{RESEARCH[active].title}</h3>
                <div style={{ color: "#555", fontSize: 13, marginTop: 6 }}>{RESEARCH[active].pi} · {RESEARCH[active].period}</div>
              </div>
            </div>
            <p style={{ color: "#888", lineHeight: 1.8, fontSize: 15, maxWidth: 560, margin: "0 0 28px" }}>
              {RESEARCH[active].desc}
            </p>
            <div>{RESEARCH[active].tags.map(t => <Tag key={t} accent>{t}</Tag>)}</div>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeSlideIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
}

function ProjectsSection() {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(null);
  return (
    <section id="projects" ref={ref} style={{
      padding: "120px 40px", maxWidth: 1100, margin: "0 auto",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: "all 0.8s cubic-bezier(.16,1,.3,1)",
    }}>
      <SectionLabel>03 · Projects</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 2 }}>
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "32px 28px",
              background: hovered === i ? "rgba(200,255,0,0.04)" : "rgba(255,255,255,0.02)",
              border: hovered === i ? "1px solid rgba(200,255,0,0.25)" : "1px solid rgba(255,255,255,0.06)",
              cursor: "default",
              transition: "all 0.25s",
              borderRadius: 4,
              position: "relative",
              overflow: "hidden",
            }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: hovered === i ? "linear-gradient(90deg,#C8FF00,transparent)" : "transparent",
              transition: "all 0.3s",
            }} />
            <div style={{ fontSize: 11, color: "#555", fontFamily: "'JetBrains Mono',monospace", marginBottom: 10 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px", color: hovered === i ? "#fff" : "#ccc" }}>
              {p.title}
            </h3>
            <div style={{ fontSize: 12, color: "#444", marginBottom: 14, fontFamily: "'JetBrains Mono',monospace" }}>{p.subtitle}</div>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 20px" }}>{p.desc}</p>
            <div>{p.skills.map(s => <Tag key={s}>{s}</Tag>)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref, visible] = useInView();
  const [active, setActive] = useState(0);
  return (
    <section id="experience" ref={ref} style={{
      padding: "120px 40px",
      background: "linear-gradient(180deg,#0a0a0a 0%,#0c120a 50%,#0a0a0a 100%)",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: "all 0.8s cubic-bezier(.16,1,.3,1)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>04 · Experience</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 0 }}>
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
            {EXPERIENCE.map((e, i) => (
              <button key={e.id} onClick={() => setActive(i)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "16px 24px 16px 0", background: "none", border: "none", cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                borderLeft: active === i ? "3px solid #C8FF00" : "3px solid transparent",
                transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 13, color: active === i ? "#fff" : "#555", fontWeight: 600 }}>{e.company}</div>
                <div style={{ fontSize: 11, color: active === i ? "#C8FF00" : "#333", fontFamily: "'JetBrains Mono',monospace", marginTop: 3 }}>{e.period}</div>
              </button>
            ))}
          </div>
          <div key={active} style={{ padding: "0 0 0 48px", animation: "fadeSlideIn 0.3s ease" }}>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>
                {EXPERIENCE[active].role} <span style={{ color: "#C8FF00" }}>@ {EXPERIENCE[active].company}</span>
              </h3>
              <div style={{ color: "#555", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
                {EXPERIENCE[active].period} · {EXPERIENCE[active].location}
              </div>
            </div>
            <ul style={{ paddingLeft: 0, listStyle: "none", margin: "0 0 28px" }}>
              {EXPERIENCE[active].bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <span style={{ color: "#C8FF00", marginTop: 2, flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>▸</span>
                  <span style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>{b}</span>
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

function PersonalSection() {
  const [ref, visible] = useInView();
  return (
    <section id="personal" ref={ref} style={{
      padding: "120px 40px",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: "all 0.8s cubic-bezier(.16,1,.3,1)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>05 · Personal</SectionLabel>

        {/* Teaching philosophy callout */}
        <div style={{
          borderLeft: "3px solid #C8FF00", paddingLeft: 28, marginBottom: 72, maxWidth: 720,
        }}>
          <p style={{ fontSize: "clamp(17px,2vw,22px)", color: "#ccc", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
            "Teaching has been central to my life — whether I'm in a Kannada classroom, running a Python workshop,
            or helping first graders with their reading and math skills. The best researchers and teachers are the
            ones who teach people, not just curriculum."
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            {/* Photo */}
            <div style={{
              width: "100%", aspectRatio: "4/3", borderRadius: 6, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)", marginBottom: 36,
              background: "rgba(255,255,255,0.03)",
            }}>
              <img
                src="/images/leisure.png"
                alt="Pranav outside of work"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <p style={{ color: "#777", lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
              When I'm not writing code or reading papers, you'll find me biking, sketching, or experimenting with new vegan recipes.
            </p>
            <p style={{ color: "#777", lineHeight: 1.8, fontSize: 15 }}>
              I also run an art <a href="https://narasimhasniche.weebly.com" style={{ color: "#C8FF00", textDecoration: "none" }}>blog</a> with some of my sketches. Teaching Kannada for 6 years has deepened my connection to my roots and directly fuels my research on diaspora language learning.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#C8FF00", fontSize: 11, marginBottom: 20 }}>// campus & community</div>
            {[
              {
                label: "Secretary General",
                sub: "SBIMUN · UCSB Model UN",
                detail: "Leading UCSB's Model UN conference",
              },
              {
                label: "Co-President",
                sub: "SB Hacks · UCSB's Student-Run Hackathon",
                detail: "Organizing one of the largest collegiate hackathons in the UC system",
              },
              {
                label: "Gaucho Racing",
                sub: "UCSB Formula SAE Team",
              },
              {
                label: "Art Blog",
                sub: "narasimhasniche.weebly.com",
                href: "https://narasimhasniche.weebly.com",
              },
              {
                label: "Biking · Vegan Cooking · Sketching",
                sub: "How I decompress",
              },
            ].map(item => (
              <div key={item.label} style={{
                display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C8FF00", flexShrink: 0, marginTop: 6 }} />
                <div>
                  <div style={{ fontSize: 14, color: "#ddd", fontWeight: 600 }}>
                    {item.href
                      ? <a href={item.href} style={{ color: "#ddd", textDecoration: "none" }}>{item.label}</a>
                      : item.label}
                  </div>
                  <div style={{ fontSize: 12, color: "#555", fontFamily: "'JetBrains Mono',monospace", marginTop: 3 }}>{item.sub}</div>
                  {item.detail && <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{item.detail}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.07)",
      padding: "60px 40px", textAlign: "center",
      background: "#080808",
    }}>
      <h2 style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 900, margin: "0 0 16px", fontFamily: "'JetBrains Mono',monospace" }}>
        Let's <span style={{ color: "#C8FF00" }}>build</span> something.
      </h2>
      <p style={{ color: "#555", marginBottom: 40, fontSize: 15 }}>
        Open to research collaborations, internships, and interesting conversations.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        {[
          { label: "Email", href: "mailto:pranav.gunhal@gmail.com" },
          { label: "LinkedIn", href: "https://linkedin.com/in/pranav-gunhal" },
          { label: "GitHub", href: "https://github.com/pgunhal" },
          { label: "Portfolio", href: "https://pgunhal.netlify.app" },
        ].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
            padding: "12px 24px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4,
            color: "#aaa", textDecoration: "none", fontSize: 13,
            fontFamily: "'JetBrains Mono',monospace",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#C8FF00"; e.target.style.color = "#C8FF00"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.color = "#aaa"; }}
          >{l.label}</a>
        ))}
      </div>
      <div style={{ marginTop: 48, color: "#333", fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>
        © 2026 Pranav Gunhal
      </div>
    </footer>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.3s",
    }}>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16, color: "#C8FF00" }}>
        pg<span style={{ opacity: 0.4 }}>_</span>
      </span>
      <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
        {NAV_LINKS.map((l, i) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              textDecoration: "none", color: "#666", fontSize: 12,
              fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#C8FF00"}
              onMouseLeave={e => e.target.style.color = "#666"}
            >
              <span style={{ color: "#C8FF00", marginRight: 4, opacity: 0.5 }}>0{i + 1}.</span>{l}
            </a>
          </li>
        ))}
      </ul>
      <a href="https://pgunhal.netlify.app" style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#0a0a0a",
        background: "#C8FF00", padding: "8px 20px", borderRadius: 4, textDecoration: "none", fontWeight: 700,
      }}>Resume</a>
    </nav>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: "#0a0a0a", color: "#fff", fontFamily: "'JetBrains Mono',monospace", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ResearchSection />
      <ProjectsSection />
      <ExperienceSection />
      <PersonalSection />
      <Footer />
    </div>
  );
}