import { useState, useEffect, useRef } from "react";

/* ── DATA ─────────────────────────────────────────────────── */
const SKILLS = {
  Frontend: ["HTML", "CSS", "Bootstrap", "Tailwind CSS", "JavaScript", "React.js"],
  Backend: ["Python", "Django", "Django REST Framework", "REST APIs", "OOP", "Blockchain (Solidity, Ethereum, Web3.js)"],
  "Cloud & DevOps": ["AWS EC2", "AWS S3", "AWS Lambda", "IAM", "Docker"],
  Database: ["MySQL"],
  "AI & Tools": ["Claude AI", "GitHub Copilot", "ChatGPT", "Prompt Engineering"],
  Other: ["Git", "GitHub", "Agile/Scrum", "Problem Solving", "Communication"],
};

const PROJECTS = [
  {
    title: "ShopKart",
    period: "2023",
    tags: ["Django", "MySQL", "Bootstrap 5", "Jenkins", "CI/CD"],
    desc: "Full-stack e-commerce web app with product catalogue, cart management, and user authentication. Jenkins CI/CD pipeline for automated Django testing and deployment. Normalised MySQL schema with responsive Bootstrap 5 frontend.",
    color: "#10B981",
    bg: "linear-gradient(135deg,#001a10 0%,#003a24 100%)",
    icon: "/images/image1.png",
    liveLink: "https://my-shopkart.onrender.com",
    githubLink: "https://github.com/Praneet57/MY-SHOPKART",
  },
  {
    title: "NFT Rental Platform",
    period: "2025",
    tags: ["Python", "Django", "Solidity", "Web3.js", "Ethereum"],
    desc: "Decentralized NFT rental system on Ethereum. Owners rent digital assets while retaining ownership. Solidity smart contracts handle automated rental agreements, time-bound access control, and on-chain payments.",
    color: "#7C3AED",
    bg: "linear-gradient(135deg,#1a0533 0%,#2d0a6b 100%)",
    icon: "/images/image2.png",
    liveLink: "https://rentgo-62on.onrender.com",
    githubLink: "https://github.com/Praneet57/Rentgo.git",
  },
  {
    title: "CloudFund",
    period: "2024",
    tags: ["Django", "Solidity", "Web3.js", "MySQL", "AWS EC2", "S3"],
    desc: "Transparent, trustless blockchain chit fund platform using Django REST backend and Ethereum smart contracts. Deployed on AWS EC2 with S3. Smart contract auto-selects lowest bid and distributes funds on-chain.",
    color: "#0EA5E9",
    bg: "linear-gradient(135deg,#001a2e 0%,#003a6b 100%)",
    icon: "/images/image3.png",
    liveLink: "https://cloud-fund-opbu.onrender.com",
    githubLink: "https://github.com/Praneet57/Cloud-Fund",
  },
];

const EDUCATION = [
  {
    institution: "Sri Krishna College of Engineering and Technology",
    degree: "M.E – Computer Science & Engineering",
    period: "2024 – 2026",
    grade: "Pursuing",
    desc: "Specialising in Cloud Computing. Gaining advanced expertise in distributed systems, cloud architecture, and AI-assisted software development.",
    initials: "SKCET",
    color: "#10B981",
  },
  {
    institution: "Bannari Amman Institute of Technology",
    degree: "B.E – Computer Science & Engineering",
    period: "2020 – 2024",
    grade: "Completed",
    desc: "Built a strong foundation in programming, data structures, algorithms, and software engineering principles. Participated in hackathons and technical events.",
    initials: "BAIT",
    color: "#7C3AED",
  },
];

/* ── HELPERS ──────────────────────────────────────────────── */
const getIcon = (skill) => {
  if (skill.includes("HTML")) return "🌐";
  if (skill.includes("CSS")) return "🎨";
  if (skill.includes("Bootstrap")) return "🅱️";
  if (skill.includes("Tailwind")) return "💨";
  if (skill.includes("JavaScript")) return "🟨";
  if (skill.includes("React")) return "⚛️";
  if (skill.includes("Python")) return "🐍";
  if (skill.includes("Django")) return "🟢";
  if (skill.includes("AWS")) return "☁️";
  if (skill.includes("Docker")) return "🐳";
  if (skill.includes("MySQL")) return "🗄️";
  if (skill.includes("Blockchain")) return "⛓️";
  if (skill.includes("Git")) return "🔧";
  if (skill.includes("AI")) return "🤖";
  return "💡";
};

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [form, setForm] = useState({ email: "", name: "", subject: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(''); // '', 'success', 'error'

  const roles = useMemo(() => ["Python Developer", "DevOps Engineer", "Backend Developer", "AI-Powered Developer"], []); // Stable for useEffect deps
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  const viewResume = () => {
    window.open('/Praneet_Resume.pdf', '_blank');
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Praneet_Resume.pdf";
    link.download = "Praneet_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!form.email || !form.name || !form.subject || !form.message.trim()) {
      alert('Please fill all fields');
      return;
    }
    setIsSending(true);
    setStatus('');
    const formData = new FormData(e.target);
    try {
      const response = await fetch('/', {
        method: 'POST',
        body: new URLSearchParams(formData).toString(),
      });
      if (response.ok) {
        setStatus('success');
        setForm({ email: "", name: "", subject: "", message: "" });
      } else {
        throw new Error('Server response not ok');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

// ── Typewriter effect ──────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const cur = roles[roleRef.current];
      if (!deletingRef.current) {
        setTypedText(cur.slice(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === cur.length) {
          deletingRef.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        setTypedText(cur.slice(0, charRef.current - 1));
        charRef.current--;
        if (charRef.current === 0) {
          deletingRef.current = false;
          roleRef.current = (roleRef.current + 1) % roles.length;
        }
      }
      setTimeout(tick, deletingRef.current ? 55 : 90);
    };
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [roles]);

// ── Scroll spy ─────────────────────────────────────────────
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-35% 0px -60% 0px" }
    );
    ["about", "skills", "projects", "education", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const D = darkMode;
  const accent = "#10B981";

  const theme = {
    bg:       D ? "#0D1117"              : "#F8FAFC",
    bgSec:    D ? "#161B22"              : "#FFFFFF",
    bgTer:    D ? "#1C2128"              : "#F1F5F9",
    border:   D ? "#30363D"              : "#E2E8F0",
    text:     D ? "#E6EDF3"              : "#1E293B",
    textMuted:D ? "#8B949E"              : "#64748B",
    navBg:    D ? "rgba(13,17,23,0.96)"  : "rgba(248,250,252,0.96)",
    cardBg:   D ? "#161B22"              : "#FFFFFF",
    inputBg:  D ? "#0D1117"              : "#F8FAFC",
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  /* ── RENDER ─────────────────────────────────────────────── */
  return (
    <div style={{ background: theme.bg, minHeight: "100vh", fontFamily: "'Segoe UI',system-ui,sans-serif", color: theme.text, transition: "background 0.3s,color 0.3s" }}>

      {/* ════════════════════════════ NAV ════════════════════ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: theme.navBg, backdropFilter: "blur(16px)", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6%", height: 68 }}>
        
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", border: `2px solid ${accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
          <span style={{ fontSize: 18, fontWeight: 700, color: theme.text }}>Portfolio</span>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 4 }}>
          {["About", "Skills", "Projects", "Education", "Contact"].map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              style={{
                background: "none",
                border: "none",
                borderBottom: `2px solid ${activeSection === link.toLowerCase() ? accent : "transparent"}`,
                padding: "6px 16px",
                fontSize: 15,
                fontWeight: 500,
                color: activeSection === link.toLowerCase() ? accent : theme.textMuted,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right buttons */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a
            href="https://www.linkedin.com/in/praneet-s/"
            target="_blank"
            rel="noreferrer"
            style={{ border: `1px solid ${accent}`, color: accent, padding: "6px 16px", borderRadius: 20, fontSize: 14, fontWeight: 600, textDecoration: "none" }}
          >
            LinkedIn Profile
          </a>
          <button
            onClick={() => setDarkMode(!D)}
            style={{ background: "none", border: `1px solid ${theme.border}`, color: theme.text, padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            {D ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          {/* Hamburger — shown only on mobile via CSS */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", color: theme.text, fontSize: 22, cursor: "pointer", display: "none" }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: theme.bgSec, borderBottom: `1px solid ${theme.border}`, padding: "10px 6%", position: "sticky", top: 68, zIndex: 99 }}>
          {["About", "Skills", "Projects", "Education", "Contact"].map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              style={{ display: "block", width: "100%", background: "none", border: "none", borderBottom: `1px solid ${theme.border}`, color: theme.text, fontSize: 15, padding: "12px 0", textAlign: "left", cursor: "pointer" }}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      {/* ════════════════════════════ HERO ═══════════════════ */}
      <section id="about" style={{ padding: "90px 6% 100px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 60, alignItems: "center" }}>
          
          {/* Left text */}
          <div style={{ animation: "fadeUp 0.7s ease" }}>
            <p style={{ color: accent, fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
              👋 Hello, World!
            </p>

            <h1 style={{
              fontSize: "clamp(2.8rem,5vw,4.2rem)",
              fontWeight: 800,
              color: theme.text,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 10
            }}>
              Hi, I am<br />Praneet S
            </h1>

            <h2 style={{
              fontSize: "clamp(1.1rem,2.5vw,1.5rem)",
              fontWeight: 600,
              color: theme.textMuted,
              marginBottom: 24
            }}>
              I am a{" "}
              <span style={{ color: accent, fontWeight: 700 }}>
                {typedText}
                <span style={{ animation: "blink 1s step-end infinite", color: accent }}>|</span>
              </span>
            </h2>

            <p style={{
              fontSize: 16,
              color: theme.textMuted,
              lineHeight: 1.85,
              marginBottom: 36,
              maxWidth: 540
            }}>
              Python Developer & DevOps Engineer with 1 year of hands-on experience in Django REST API
              development, CI/CD pipeline management, AWS cloud infrastructure, and blockchain development.
              Passionate about leveraging AI tools to build scalable, production-grade solutions.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
              <button
                onClick={viewResume}
                style={{
                  background: accent,
                  color: "#fff",
                  border: "none",
                  padding: "13px 28px",
                  borderRadius: 30,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                📄 View Resume
              </button>
              <button
                onClick={downloadResume}
                style={{
                  background: accent,
                  color: "#fff",
                  border: "none",
                  padding: "13px 28px",
                  borderRadius: 30,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                ⬇️ Download Resume
              </button>
            </div>
          </div>

            {/* Right avatar */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ width: 300, height: 300, borderRadius: "50%", border: `4px solid ${accent}`, boxShadow: `0 0 60px ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", background: D ? "linear-gradient(135deg,#161B22,#1C2128)" : "#F1F5F9" }}>
                <div style={{ width: 270, height: 270, borderRadius: "50%", background: D ? "linear-gradient(135deg,#0D2818,#1a4030)" : "linear-gradient(135deg,#D1FAE5,#A7F3D0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100 }}>
                  👨‍💻
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* ════════════════════════════ SKILLS ═════════════════ */}
      <section id="skills" style={{ padding: "80px 6%", background: theme.bgSec }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, textAlign: "center", color: theme.text, marginBottom: 12 }}>Skills</h2>
          <p style={{ textAlign: "center", color: theme.textMuted, fontSize: 16, marginBottom: 56 }}>
            Technologies and tools I've been working with for the past 2 years.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div
                key={cat}
                className="skill-card"
                style={{ background: theme.bgTer, border: `1px solid ${theme.border}`, borderRadius: 16, padding: "28px 24px", transition: "border-color 0.2s,transform 0.2s" }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 700, color: accent, marginBottom: 18 }}>{cat}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      style={{ background: D ? "#0D1117" : "#F1F5F9", border: `1px solid ${theme.border}`, color: theme.text, padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}
                    >
                      {getIcon(skill)} {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certification badge */}
          <div style={{ marginTop: 36, background: D ? "linear-gradient(135deg,#0D2818,#1a4030)" : "linear-gradient(135deg,#D1FAE5,#A7F3D0)", border: `1px solid ${accent}`, borderRadius: 16, padding: "22px 28px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ fontSize: 36 }}>🏆</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 16, color: accent, marginBottom: 4 }}>Claude Code in Action — Anthropic</p>
              <p style={{ color: theme.textMuted, fontSize: 14 }}>Certificate No: pjjm8hmqdpg4 · March 25, 2026 · Hooks, MCP Server Integration, Claude Agent SDK</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════ PROJECTS ═══════════════ */}
      <section id="projects" style={{ padding: "80px 6%", background: theme.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, textAlign: "center", color: theme.text, marginBottom: 12 }}>Projects</h2>
          <p style={{ textAlign: "center", color: theme.textMuted, fontSize: 16, marginBottom: 56 }}>
            I have worked on web applications, blockchain DApps, and REST API backends.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 28 }}>
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="proj-card"
                style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 18, overflow: "hidden", transition: "transform 0.25s,box-shadow 0.25s" }}
              >
                {/* Thumbnail */}
                <div style={{ height: 180, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  {p.icon.startsWith("/") ? <img src={p.icon} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "18px 18px 0 0" }} /> : <div style={{ fontSize: 64 }}>{p.icon}</div>}
                  <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} style={{ background: "rgba(0,0,0,0.55)", color: "#fff", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{t}</span>
                    ))}
                    {p.tags.length > 3 && (
                      <span style={{ background: "rgba(0,0,0,0.55)", color: "#fff", padding: "3px 10px", borderRadius: 6, fontSize: 11 }}>+{p.tags.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "22px 22px 24px" }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 4 }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 12, fontWeight: 500 }}>{p.period}</p>
                  <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 10 }}>
                    <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ background: p.color, color: "#fff", padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                      🔗 View Live
                    </a>
                    <a href={p.githubLink} target="_blank" rel="noreferrer" style={{ background: "transparent", border: `1px solid ${theme.border}`, color: theme.text, padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                      💻 GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ EDUCATION ══════════════ */}
      <section id="education" style={{ padding: "80px 6%", background: theme.bgSec }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, textAlign: "center", color: theme.text, marginBottom: 12 }}>Education</h2>
          <p style={{ textAlign: "center", color: theme.textMuted, fontSize: 16, marginBottom: 56 }}>
            My academic journey has been a foundation for building real-world solutions.
          </p>

          <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
            {/* Timeline vertical line */}
            <div style={{ position: "absolute", right: 20, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${accent}, #7C3AED)`, borderRadius: 2 }} />

            {EDUCATION.map((edu, i) => (
              <div key={i} style={{ marginBottom: i < EDUCATION.length - 1 ? 32 : 0, paddingRight: 60, position: "relative" }}>
                {/* Dot */}
                <div style={{ position: "absolute", right: 10, top: 24, width: 22, height: 22, borderRadius: "50%", background: edu.color, border: `3px solid ${theme.bgSec}`, boxShadow: `0 0 0 3px ${edu.color}40` }} />
                <div className="edu-card" style={{ background: theme.bgTer, border: `1px solid ${theme.border}`, borderRadius: 16, padding: "24px 28px", transition: "border-color 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: edu.color + "20", border: `1px solid ${edu.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: edu.color, flexShrink: 0, letterSpacing: "-0.5px", textAlign: "center" }}>
                      {edu.initials}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 3, lineHeight: 1.3 }}>{edu.institution}</h3>
                      <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 3 }}>{edu.degree}</p>
                      <p style={{ fontSize: 13, color: theme.textMuted }}>{edu.period}</p>
                    </div>
                  </div>
                  <span style={{ background: edu.color + "20", color: edu.color, padding: "4px 12px", borderRadius: 6, fontSize: 13, fontWeight: 700, display: "inline-block", marginBottom: 12 }}>
                    Grade: {edu.grade}
                  </span>
                  <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7 }}>{edu.desc}</p>
                </div>
              </div>
            ))}

            {/* Internship card */}
            <div style={{ marginTop: 32, paddingRight: 60, position: "relative" }}>
              <div style={{ position: "absolute", right: 10, top: 24, width: 22, height: 22, borderRadius: "50%", background: "#F59E0B", border: `3px solid ${theme.bgSec}`, boxShadow: "0 0 0 3px #F59E0B40" }} />
              <div style={{ background: theme.bgTer, border: `1px solid ${theme.border}`, borderRadius: 16, padding: "24px 28px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: "#F59E0B20", border: "1px solid #F59E0B40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>💼</div>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 3 }}>Pinnacle Labs</h3>
                    <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 3 }}>Python Developer Intern</p>
                    <p style={{ fontSize: 13, color: theme.textMuted }}>Work Experience</p>
                  </div>
                </div>
                <span style={{ background: "#F59E0B20", color: "#F59E0B", padding: "4px 12px", borderRadius: 6, fontSize: 13, fontWeight: 700, display: "inline-block", marginBottom: 12 }}>
                  Internship
                </span>
                <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7 }}>
                  Developed production-grade Python & Django applications. Leveraged GitHub Copilot & AI tools
                  to cut debugging time by ~30%. Managed Jenkins CI/CD pipelines and worked in Agile sprints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════ CONTACT ════════════════ */}
      <section id="contact" style={{ padding: "80px 6%", background: D ? "linear-gradient(135deg,#0D1117 0%,#0D2818 50%,#1a0533 100%)" : "linear-gradient(135deg,#F8FAFC 0%,#D1FAE5 50%,#EDE9FE 100%)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, textAlign: "center", color: theme.text, marginBottom: 12 }}>Contact</h2>
          <p style={{ textAlign: "center", color: theme.textMuted, fontSize: 16, marginBottom: 48 }}>
            Feel free to reach out to me for any questions or opportunities!
          </p>
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSend}>
            <input type="hidden" name="form-name" value="contact" />
            <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 20, padding: "36px 40px" }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: theme.text, marginBottom: 28 }}>Email Me 🚀</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[["email", "Your Email", "email"], ["name", "Your Name", "text"], ["subject", "Subject", "text"]].map(([key, placeholder, type]) => (
                  <input
                    name={key}
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    style={{ width: "100%", background: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "14px 16px", fontSize: 15, color: theme.text, outline: "none", boxSizing: "border-box" }}
                  />
                ))}
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ width: "100%", background: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "14px 16px", fontSize: 15, color: theme.text, outline: "none", resize: "vertical", boxSizing: "border-box" }}
                />
                <button
                  type="submit"
                  disabled={isSending}
                  style={{ 
                    background: status === 'success' ? '#059669' : accent, 
                    color: "#fff", 
                    border: "none", 
                    padding: "16px 32px", 
                    borderRadius: 10, 
                    fontSize: 16, 
                    fontWeight: 700, 
                    cursor: isSending ? 'default' : 'pointer', 
                    width: "100%",
                    opacity: isSending ? 0.8 : 1
                  }}
                >
                  {isSending ? 'Sending...' : status === 'success' ? 'Sent! 🎉' : 'Send Message 🚀'}
                </button>
                {status === 'success' && (
                  <p style={{ color: accent, fontSize: 14, margin: 0, textAlign: 'center', fontWeight: 500 }}>
                    Thanks! Your message has been sent. I'll reply within 24 hours.
                  </p>
                )}
                {status === 'error' && (
                  <p style={{ color: '#EF4444', fontSize: 14, margin: 0, textAlign: 'center' }}>
                    Failed to send. Please <a href="mailto:praneetsatheeshraj@gmail.com" style={{ color: accent, textDecoration: 'none' }}>email directly</a>.
                  </p>
                )}
              </div>

              {/* Contact info strip */}
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${theme.border}`, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:praneetsatheeshraj@gmail.com" style={{ color: theme.textMuted, fontSize: 14, textDecoration: "none" }}>📧 praneetsatheeshraj@gmail.com</a>
                <a href="tel:+917548882265" style={{ color: theme.textMuted, fontSize: 14, textDecoration: "none" }}>📞 +91 7548882265</a>
                <span style={{ color: theme.textMuted, fontSize: 14 }}>📍 Sathyamangalam, Erode, TN</span>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ════════════════════════════ FOOTER ═════════════════ */}
      <footer style={{ background: theme.bgSec, borderTop: `1px solid ${theme.border}`, padding: "24px 6%", textAlign: "center" }}>
        <p style={{ color: theme.textMuted, fontSize: 14 }}>
          Built with ❤️ by <span style={{ color: accent, fontWeight: 600 }}>Praneet S</span> · Python Developer & DevOps Engineer · {new Date().getFullYear()}
        </p>
      </footer>

      {/* ════════════════════════════ GLOBAL CSS ═════════════ */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .skill-card:hover { border-color: #10B981 !important; transform: translateY(-3px); }
        .proj-card:hover  { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(0,0,0,0.35) !important; }
        .edu-card:hover   { border-color: #10B981 !important; }
        input::placeholder, textarea::placeholder { color: #8B949E; }
        @media (max-width: 768px) {
          #about > div { grid-template-columns: 1fr !important; }
          #about > div > div:last-child { display: none !important; }
          nav > div:nth-child(2) { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}

