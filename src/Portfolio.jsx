"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLess, FaLinkedin, FaGamepad } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import { MdSports, MdSportsSoccer } from "react-icons/md"
import { Typewriter } from "react-simple-typewriter"
import profilePics from "./assets/candid.png"
import "./background.css"
import "./redesign.css"
import TiltedCard from "../Reactbits/TiltedCard/TiltedCard";
import Starfield from "./Starfield" // Starry background with shooting stars

/* ============================================================
   RESUME DATA — single source of truth (edit here to update)
   ============================================================ */
const EXPERIENCE = [
  {
    company: "CodePath | Anthropic",
    role: "Applied AI Engineering",
    location: "Remote",
    date: "May 2026 – Present",
    rank: "S-RANK",
    accent: "gold",
    points: [
      "Navigated enterprise codebases with AI-assisted tools, cutting issue reproduction time by 60% via structured debugging.",
      "Shipped production-grade PRs with full test coverage across all 4 phase deliverables in a 10-week capstone.",
      "Collaborated with open-source maintainers, iterating from issue selection to merged PR.",
    ],
  },
  {
    company: "Nittany Motorsports",
    role: "Applied Data Science Engineer",
    location: "University Park, PA",
    date: "Dec 2025 – Present",
    rank: "A-RANK",
    accent: "cyan",
    points: [
      "Built a Grafana analytics dashboard over 10+ sensor streams (speed, RPM, temps), cutting post-session analysis from 30 min to under 5.",
      "Automated GitHub-to-Grafana ingestion via Python, eliminating manual uploads across 3+ vehicle subsystems.",
      "Raised data consistency to 95% schema compliance by standardizing inconsistent DAQ CSV formats.",
    ],
  },
  {
    company: "Englishly",
    role: "Software Engineer Intern",
    location: "Jeddah, Saudi Arabia",
    date: "May 2025 – May 2026",
    rank: "A-RANK",
    accent: "pink",
    points: [
      "Built an AI-powered English tutor for Arabic speakers (React, AWS Lambda, Python NLP) with under 400ms real-time latency.",
      "Improved Arabic-accented transcription accuracy by 35% by fine-tuning OpenAI Whisper and integrating a LiveKit AI avatar.",
      "Optimized a FastAPI feedback pipeline with async queues, cutting manual corrections by 40% and boosting retention by 25%.",
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    location: "University Park, PA",
    date: "Jun 2025 – Dec 2025",
    rank: "B-RANK",
    accent: "green",
    points: [
      "Built interactive portals for Penn State student clubs (React, TailwindCSS, Firebase), increasing event participation by 40%.",
      "Implemented dynamic polls, calendar scheduling, and cloud dashboards with Firestore triggers, lifting recurring traffic 25%.",
    ],
  },
  {
    company: "NomadAI",
    role: "Software Engineer Intern",
    location: "Remote",
    date: "Nov 2024 – Feb 2025",
    rank: "B-RANK",
    accent: "cyan",
    points: [
      "Formulated an AI-driven itinerary generator that cut trip-planning time by 30% through real-time data processing.",
      "Designed the matching engine with Python REST, JavaScript, and NLP libraries (spaCy, OpenAI) to analyze travel patterns.",
    ],
  },
]

const PROJECTS = [
  {
    name: "Fantasy Premier League Match Predictor",
    accent: "pink",
    date: "Aug 2025 – Present",
    points: [
      "Engineering an EPL match-prediction system with rolling averages and historical metrics, improving baseline accuracy by 15%.",
      "Built a full-stack app (FastAPI, React, PostgreSQL) with dynamic dashboards and cross-validation to reduce model variance.",
    ],
    tech: ["Python", "Scikit-Learn", "PyTorch", "FastAPI", "React", "PostgreSQL", "AWS"],
  },
  {
    name: "EmpathAI",
    accent: "cyan",
    date: "May 2025 – Aug 2025",
    points: [
      "Built a full-stack AI Therapist (FastAPI, React, LLaMA 3 via Ollama) enabling secure real-time voice therapy at sub-400ms latency with 95% crisis-detection accuracy.",
      "Engineered emotion & sentiment monitoring with Hugging Face and low-latency bidirectional audio via LiveKit.",
    ],
    tech: ["Python", "Ollama", "LLaMA 3", "React", "FastAPI", "LiveKit", "Hugging Face", "NLP"],
  },
]

const SKILLS = [
  { name: "Languages", level: 90, accent: "cyan", items: ["Python", "Java", "JavaScript", "SQL", "C", "Verilog", "HTML/CSS"] },
  { name: "Frameworks", level: 85, accent: "pink", items: ["React", "Node.js", "FastAPI", "Spring Boot", "Tailwind", "Flask", "PyTorch"] },
  { name: "ML / Data", level: 80, accent: "gold", items: ["Scikit-Learn", "Hugging Face", "OpenAI", "Ollama", "Pandas", "NumPy", "Matplotlib"] },
  { name: "Cloud & DevOps", level: 75, accent: "green", items: ["AWS (Lambda, S3)", "LiveKit", "Docker", "GitHub Actions", "Unix/Linux"] },
]

/* Reusable section title */
function SectionTitle({ title, subtitle }) {
  return (
    <>
      <h2 className="rd-title">{title}</h2>
      {subtitle && <p className="rd-subtitle">{subtitle}</p>}
    </>
  )
}

/* Pixel tech chips */
function Chips({ items, accent }) {
  return (
    <div className={`chips panel-${accent}`}>
      {items.map((t) => (
        <span key={t} className="chip">{t}</span>
      ))}
    </div>
  )
}

/* Animated XP / stat bar (fills when scrolled into view) */
function SkillBar({ name, level, accent, items }) {
  return (
    <div className={`skill-block panel-${accent}`}>
      <div className="skill-row">
        <span className="skill-name">{name}</span>
        <span className="skill-lvl">LV {level}</span>
      </div>
      <div className="xp-track">
        <motion.div
          className="xp-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </div>
      <div className="chips" style={{ marginTop: "0.6rem" }}>
        {items.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>
    </div>
  )
}

// Gaming Background Component - Creates floating geometric shapes and circuit patterns
function GamingBackground() {
  const [shapes, setShapes] = useState([])

  useEffect(() => {
    // Generate random floating shapes for gaming aesthetic
    const generateShapes = () => {
      const newShapes = []
      for (let i = 0; i < 15; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * 100, // Random position (percentage)
          y: Math.random() * 100,
          size: Math.random() * 20 + 10, // Random size between 10-30px
          type: Math.random() > 0.5 ? "square" : "diamond", // Random shape type
          animationDelay: Math.random() * 5, // Staggered animation start
          duration: Math.random() * 10 + 15, // Animation duration 15-25s
        })
      }
      setShapes(newShapes)
    }

    generateShapes()
  }, [])

  return (
    <div className="gaming-background">
      {/* Main gradient background */}
      <div className="gradient-bg"></div>

      {/* Circuit pattern overlay */}
      <div className="circuit-pattern"></div>

      {/* Floating geometric shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`floating-shape ${shape.type}`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            animationDelay: `${shape.animationDelay}s`,
            animationDuration: `${shape.duration}s`,
          }}
        ></div>
      ))}

      {/* Subtle glow orbs for ambient lighting */}
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>
      <div className="glow-orb glow-orb-3"></div>
    </div>
  )
}

//This is the typing effect for the name of the website
function TypingEffect() {
  return (
    <div
      className="hover1"
      style={{
        background: "#18181b",
        color: "#00ffe7",
        borderRadius: "12px",
        padding: "2rem 2.5rem",
        display: "inline-block",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "1.1rem",
        margin: "2rem auto",
        boxShadow: "0 0 16px #ff0099, 0 0 32px #222831",
        border: "3px solid #ff0099",
        textShadow: "0 0 4px #00ffe7, 0 0 8px #00ffe7",
        letterSpacing: "1.5px",
      }}
    >
      <span style={{ color: "pink", marginRight: 8 }}>{">"}</span>
      <Typewriter
        words={[
          " Player: Aspiring Developer",
          " Mission: Learn, Build, and Ship Meaningful Software",
          " Status: Gaining XP in Web Dev, AI, and Game Tech",
        ]}
        loop={0}
        cursor
        cursorStyle="_"
        typeSpeed={60}
        deleteSpeed={40}
        delaySpeed={2000}
      />
    </div>
  )
}

function Portfolio() {
  const [navVisible, setNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // SCROLL DETECTION - This controls when navbar shows/hides
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY // Get current scroll position
      
      // Hide navbar when scrolling down and past 100px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false) // User is scrolling DOWN - hide navbar
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setNavVisible(true) // User is scrolling UP or near top - show navbar
      }
      
      setLastScrollY(currentScrollY) // Remember this scroll position for next time
    }
    
    // Add the scroll listener to the window
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Cleanup function - removes the listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY]) // Re-run this effect when lastScrollY changes

  // SMOOTH SCROLL FUNCTION - This handles clicking on navbar buttons
  const scrollToSection = (sectionId) => {
    console.log(`🔍 Attempting to scroll to: ${sectionId}`) // Debug log
    
    const attemptScroll = (retries = 5) => {
      const element = document.getElementById(sectionId)
  
      if (element) {
        console.log(`✅ Found element: ${sectionId}`) // Debug log
        
        // Use scroll-margin-top from CSS (120px) instead of hardcoded value
        const navbarHeight = 120 // Match the scroll-margin-top in CSS
        const elementPosition = element.offsetTop - navbarHeight
        
        // Alternative method - use scrollIntoView for better browser compatibility
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        })
        
        console.log(`📍 Scrolled to element at position: ${elementPosition}`) // Debug log
      } else if (retries > 0) {
        console.log(`⏳ Element not found, retrying... (${retries} attempts left)`) // Debug log
        setTimeout(() => attemptScroll(retries - 1), 100)
      } else {
        console.error(`❌ Could not find element with ID: ${sectionId}`)
      }
    }
  
    attemptScroll()
  }

  return (
    <div className="stars">
      {/* Starfield background with static and shooting stars */}
      <Starfield />
      {/* Gaming-themed background component */}
      <GamingBackground />
      <div className="pixel-grid"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ opacity: 1.7 }}
      >
        <div className="min-h-screen bg-transparent">
          
          {/* NAVBAR - Fixed navigation bar that hides/shows based on scroll direction */}
          <nav 
            style={{
              position: "fixed", // Stays in place when scrolling
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000, // Appears above all other content
              background: "rgba(0, 0, 0, 0.95)", // Semi-transparent black
              backdropFilter: "blur(15px)", // Glassmorphism effect
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // ANIMATION: Transform and opacity controlled by navVisible state
              transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
              transform: navVisible ? "translateY(0)" : "translateY(-100%)", // Slide up/down
              opacity: navVisible ? 1 : 0, // Fade in/out
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 32px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* LOGO - Click to scroll to top */}
            <h1 
              onClick={() => scrollToSection('hero')} // When clicked, scroll to hero section
              style={{ 
                color: "#00ffe7", 
                fontSize: "1.8rem",
                textShadow: "0 0 10px #00ffe7",
                fontFamily: "'Press Start 2P', monospace",
                margin: 0,
                cursor: "pointer", // Show it's clickable
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"} // Slight grow on hover
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              R.S
            </h1>

            {/* NAVIGATION MENU - Buttons to scroll to different sections */}
            <div style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              {[
                { label: "About", id: "about-section", color: "#00ffe7" },
                { label: "Experience", id: "experience-section", color: "#ffd447" },
                { label: "Projects", id: "projects-section", color: "#ff0099" },
                { label: "Skills", id: "skills-section", color: "#32cd32" },
                { label: "Contact", id: "contact-section", color: "#00ffe7" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    background: "transparent",
                    border: `2px solid ${item.color}`,
                    color: item.color,
                    padding: "0.55rem 1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                    textShadow: `0 0 5px ${item.color}`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = item.color
                    e.target.style.color = "#000"
                    e.target.style.boxShadow = `0 0 15px ${item.color}`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent"
                    e.target.style.color = item.color
                    e.target.style.boxShadow = "none"
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* SOCIAL MEDIA ICONS */}
            <section style={{ 
              display: "flex", 
              gap: "1.2rem",
              alignItems: "center"
            }}>
              <a 
                href="https://github.com/rayyan2235" 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  color: "#fff", 
                  transition: "all 0.3s ease",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#00ffe7"
                  e.target.style.transform = "scale(1.2)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#fff"
                  e.target.style.transform = "scale(1)"
                }}
              >
                <FaGithub size={28} />
              </a>
              <a 
                href="https://www.linkedin.com/in/rayyan-syed-5a846725a/" 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  color: "#fff", 
                  transition: "all 0.3s ease",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#0077b5"
                  e.target.style.transform = "scale(1.2)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#fff"
                  e.target.style.transform = "scale(1)"
                }}
              >
                <FaLinkedin size={28} />
              </a>
              <a 
                href="mailto:rayyan2235@gmail.com"
                style={{ 
                  color: "#fff", 
                  transition: "all 0.3s ease",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ff0099"
                  e.target.style.transform = "scale(1.2)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#fff"
                  e.target.style.transform = "scale(1)"
                }}
              >
                <HiOutlineMail size={28} />
              </a>
            </section>
          </nav>

          {/* MAIN CONTENT - All sections with proper spacing for fixed navbar */}
          <div style={{ paddingTop: "100px" }}>
            
            {/* HERO SECTION - Landing area with intro and profile image */}
            <div 
              id="hero" // ID for navbar logo click
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                paddingTop: "2rem",
                paddingBottom:"2rem",
                maxWidth: "1200px",
                margin: "0 auto",

                minHeight: "80vh"
                
              }}
            >
              {/* Left side - Intro text */}
              <div style={{ flex: "1", paddingRight: "2.5rem", height:"2 rem"}}>
                <p style={{ fontFamily: "'Press Start 2P', monospace", color: "#00ffe7", fontSize: "0.8rem", marginBottom: "1rem", textShadow: "0 0 8px #00ffe7" }}>
                  PLAYER 1 CONNECTED
                </p>
                <h1 style={{
                  fontSize: "3.6rem",
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "1rem"

                }}>
                  Hi There, I'm{" "}
                  <span style={{ color: "#ff6b35" }}>Rayyan Syed</span>
                </h1>
                <p style={{
                  fontSize: "0.95rem",
                  color: "#ccc",
                  marginBottom: "1rem",
                  lineHeight: 1.9,
                  fontFamily: "'Press Start 2P', monospace"
                }}>
                  Software Engineer building full-stack apps &amp; applied AI/ML.
                </p>
                <p style={{ fontSize: "0.6rem", color: "#9aa0b5", marginBottom: "2rem", lineHeight: 1.9, fontFamily: "'Press Start 2P', monospace" }}>
                  B.S. Computer Science (Engineering) @ Penn State &middot; Class of 2027
                </p>
                <a
                  className="rd-btn"
                  href="https://github.com/rayyan2235"
                  target="_blank"
                  rel="noreferrer"
                >
                  &gt; VIEW GITHUB
                </a>
              </div>

              {/* Right side - Profile image */}
              <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
                <TiltedCard
                  imageSrc={profilePics}
                  altText={false}
                  captionText={false}
                  containerHeight="390px"
                  containerWidth="300px"
                  imageHeight="350px"
                  imageWidth="350px"
                  rotateAmplitude={12}
                  scaleOnHover={1.12}
                  showMobileWarning={false}
                  showTooltip={false}
                />
              </div>
            </div>
           
            {/* ABOUT ME SECTION */}
            <section id="about-section" className="rd rd-section">
              <SectionTitle title="About Me" subtitle="// player profile" />
              <div className="panel panel-cyan" style={{ maxWidth: "780px" }}>
                <p style={{ color: "#d4d7e6", fontSize: "0.72rem", lineHeight: 2, margin: 0 }}>
                  I'm a Computer Science (Engineering) student at Penn State and a software
                  engineer focused on <b style={{ color: "#fff" }}>full-stack development</b> and
                  <b style={{ color: "#fff" }}> applied AI/ML</b>. I've shipped production features
                  across startups and open source &mdash; from real-time voice AI and NLP pipelines
                  to data dashboards and full-stack web apps. I care about clean code, low latency,
                  and shipping things people actually use.
                </p>
              </div>
            </section>

            {/* TYPING EFFECT SECTION */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: "5rem 0",
              }}
            >
              <TypingEffect />
            </div>

            {/* EXPERIENCE SECTION - quest log timeline */}
            <section id="experience-section" className="rd rd-section">
              <SectionTitle title="Experience" subtitle="// quest log — cleared missions" />
              <motion.div
                className="quest-log"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {EXPERIENCE.map((job) => (
                  <div key={job.company} className={`quest panel-${job.accent}`}>
                    <div className="panel-head">
                      <h3 className="panel-title">
                        {job.company}
                        <span className="rank">{job.rank}</span>
                      </h3>
                      <span className="panel-date">{job.date}</span>
                    </div>
                    <span className="panel-sub">{job.role} &middot; {job.location}</span>
                    <ul>
                      {job.points.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </section>

            {/* PROJECTS SECTION - achievement panels */}
            <section id="projects-section" className="rd rd-section">
              <SectionTitle title="Projects" subtitle="// achievements unlocked" />
              <div className="rd-grid">
                {PROJECTS.map((proj) => (
                  <motion.div
                    key={proj.name}
                    className={`panel panel-${proj.accent}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="panel-head">
                      <h3 className="panel-title">{proj.name}</h3>
                      <span className="panel-date">{proj.date}</span>
                    </div>
                    <ul>
                      {proj.points.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                    <Chips items={proj.tech} accent={proj.accent} />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SKILLS SECTION - XP / stat bars */}
            <section id="skills-section" className="rd rd-section">
              <SectionTitle title="Skills" subtitle="// character stats" />
              <div className="rd-grid">
                {SKILLS.map((cat) => (
                  <motion.div
                    key={cat.name}
                    className={`panel panel-${cat.accent}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <SkillBar {...cat} />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ACTIVITIES & LEADERSHIP SECTION */}
            <section id="activities-section" style={{ padding: "4rem 0" }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="center font" style={{ color: "gold", textShadow: " 0 0 20px gold", fontSize: "2.5rem", marginBottom: "3rem" }}>
                  Activities & Leadership
                </h2>
                <div className="center" style={{ display: "flex", gap: "4rem", justifyContent: "center", flexWrap: "wrap" }}>
                <div className="card" style={{
                    border: "2px solid #00ffe7",
                    boxShadow: "0 4px 16px  #00ffe7",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 18px 2px  #00ffe7"
                    e.currentTarget.style.transform = "scale(1.025)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 16px  #00ffe7"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                  >
                    <h3 className="font"> Advisor of The Indian Social Outreach</h3>
                    <p>
                      As the advisor for the Indian Social, I led resource allocation and event planning for three key
                      initiatives, driving participation growth by 25%. Coordinated resource allocation and event
                      planning, ensuring smooth execution and timely delivery.
                    </p>
                  </div>
                  <div className="card" style={{
                    border: "2px solid #ff0099",
                    boxShadow: "0 4px 16px #ff0099",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 18px 2px #ff0099"
                    e.currentTarget.style.transform = "scale(1.025)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 16px #ff0099"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                  >
                    <h3 className="font"> Penn State THON</h3>
                    <p>
                      Engaged in outreach and fundraising efforts, collaborating with a diverse team to help raise
                      over $10 million. Assisted in planning large-scale events, ensuring smooth execution and
                      positive experiences.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* LIFE OUTSIDE OF CODE SECTION */}
            <section id="life-section" style={{ padding: "4rem 0" }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="center font" style={{ color: "gold", textShadow: " 0 0 20px gold", fontSize: "2.5rem", marginBottom: "3rem" }}>
                  Life Outside of Code
                </h2>
                <div className="center" style={{ display: "flex", gap: "4rem", justifyContent: "center", flexWrap: "wrap" }}>
                <div className="card" style={{
                    border: "2px solid #00ffe7",
                    boxShadow: "0 4px 16px  #00ffe7",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 18px 2px  #00ffe7"
                    e.currentTarget.style.transform = "scale(1.025)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 16px  #00ffe7"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                  >
                    <div style={{ 
                      fontSize: "3rem", 
                      marginBottom: "1rem",
                      color: "#ff0099",
                      textShadow: "0 0 10px #ff0099"
                    }}>
                      <MdSportsSoccer />
                    </div>
                    <h3 className="font" style={{ marginBottom: "1rem" }}>
                      Manchester United Fan
                    </h3>
                    <p style={{ color: "#fff" }}>
                      Die-hard Manchester United supporter! Nothing beats the thrill of watching the Red Devils play. 
                      Whether it's celebrating victories at Old Trafford or analyzing transfer news, football is my passion outside of coding.
                    </p>
                  </div>
                  
                  <div className="card" style={{
                    border: "2px solid #ff0099",
                    boxShadow: "0 4px 16px #ff0099",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 18px 2px #ff0099"
                    e.currentTarget.style.transform = "scale(1.025)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 16px #ff0099"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                  >
                    <div style={{ 
                      fontSize: "3rem", 
                      marginBottom: "1rem",
                      color: "#00ffe7",
                      textShadow: "0 0 10px #00ffe7"
                    }}>
                      <FaGamepad />
                    </div>
                    <h3 className="font" style={{ color: "#00ffe7", marginBottom: "1rem" }}>
                      Gaming Enthusiast
                    </h3>
                    <p style={{ color: "#fff" }}>
                      When I'm not coding, you'll find me immersed in games like CS2, Valorant and Fortnite. Gaming helps me unwind and often inspires creative solutions for my projects.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact-section" className="rd rd-section">
              <SectionTitle title="Contact" subtitle="// press start to connect" />
              <motion.div
                className="rd-grid"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <a className="panel panel-cyan" href="mailto:rayyan2235@gmail.com" style={{ textDecoration: "none" }}>
                  <h3 className="panel-title">Email</h3>
                  <p style={{ color: "#d4d7e6", margin: "0.4rem 0 0" }}>rayyan2235@gmail.com</p>
                </a>
                <a className="panel panel-pink" href="https://www.linkedin.com/in/rayyan-syed-5a846725a/" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  <h3 className="panel-title">LinkedIn</h3>
                  <p style={{ color: "#d4d7e6", margin: "0.4rem 0 0" }}>in/RayyanSyed</p>
                </a>
                <a className="panel panel-gold" href="https://github.com/rayyan2235" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  <h3 className="panel-title">GitHub</h3>
                  <p style={{ color: "#d4d7e6", margin: "0.4rem 0 0" }}>github.com/Rayyan2235</p>
                </a>
                <div className="panel panel-green">
                  <h3 className="panel-title">Phone</h3>
                  <p style={{ color: "#d4d7e6", margin: "0.4rem 0 0" }}>US &middot; +1 (717) 648 7215</p>
                  <p style={{ color: "#d4d7e6", margin: "0.2rem 0 0" }}>UAE &middot; +971 50 581 6195</p>
                </div>
              </motion.div>
            </section>

          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Portfolio