"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLess, FaLinkedin, FaGamepad } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import { MdSports, MdSportsSoccer } from "react-icons/md"
import { Typewriter } from "react-simple-typewriter"
import profilePics from "./assets/candid.png"
import "./background.css"
import TiltedCard from "../Reactbits/TiltedCard/TiltedCard";
import ShinyText from "../Reactbits/ShinyText/ShinyText";
import Starfield from "./Starfield" // Starry background with shooting stars

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
              gap: "1.5rem",
              alignItems: "center"
            }}>
              {/* ABOUT BUTTON - FIXED: removed parameter from onClick */}
              <button
                onClick={() => {
                  console.log('🖱️ About button clicked') // Debug log
                  scrollToSection('about-section')
                }}
                style={{
                  background: "transparent",
                  border: "2px solid #00ffe7",
                  color: "#00ffe7",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  textShadow: "0 0 5px #00ffe7"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#00ffe7"
                  e.target.style.color = "#000"
                  e.target.style.boxShadow = "0 0 15px #00ffe7"
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent"
                  e.target.style.color = "#00ffe7"
                  e.target.style.boxShadow = "none"
                }}
              >
                About
              </button>

              {/* PROJECTS BUTTON */}
              <button
                onClick={() => {
                  console.log('🖱️ Projects button clicked') // Debug log
                  scrollToSection('projects-section')
                }}
                style={{
                  background: "transparent",
                  border: "2px solid #ff0099",
                  color: "#ff0099",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  textShadow: "0 0 5px #ff0099"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#ff0099"
                  e.target.style.color = "#000"
                  e.target.style.boxShadow = "0 0 15px #ff0099"
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent"
                  e.target.style.color = "#ff0099"
                  e.target.style.boxShadow = "none"
                }}
              >
                Projects
              </button>

              {/* ACTIVITIES BUTTON */}
              <button
                onClick={() => scrollToSection('activities-section')} // Scroll to Activities section
                style={{
                  background: "transparent",
                  border: "2px solid gold",
                  color: "gold",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  textShadow: "0 0 5px gold"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "gold"
                  e.target.style.color = "#000"
                  e.target.style.boxShadow = "0 0 15px gold"
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent"
                  e.target.style.color = "gold"
                  e.target.style.boxShadow = "none"
                }}
              >
                Activities
              </button>

              {/* LIFE BUTTON */}
              <button
                onClick={() => scrollToSection('life-section')} // Scroll to Life section
                style={{
                  background: "transparent",
                  border: "2px solid #32cd32",
                  color: "#32cd32",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  textShadow: "0 0 5px #32cd32"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#32cd32"
                  e.target.style.color = "#000"
                  e.target.style.boxShadow = "0 0 15px #32cd32"
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent"
                  e.target.style.color = "#32cd32"
                  e.target.style.boxShadow = "none"
                }}
              >
                Life
              </button>
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
                  fontSize: "1.75rem", 
                  color: "#ccc",
                  marginBottom: "2rem"
                }}>
                  I Am Into Full-Stack Development, & Working With AI/ML
                </p>
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
            <section id="about-section" style={{ padding: "4rem 0" }}>
            <h2 className="center font" style={{ color: "gold", textShadow: "0 0 20px gold", fontSize: "2.5rem", marginBottom: "2rem" }}>
                About Me
              </h2>
              <div className="center" style={{ width: "60%", margin: "0 auto", fontSize: "20px" }}>
                <ShinyText 
                  text="Welcome Player 2. I’m Rayyan Syed, an aspiring Software Engineer on a mission to level up and break into big tech. Obsessed with clean code, clever systems, and boss-level challenges." 
                  disabled={false} 
                  speed={3} 
                  className='center'
                />
                
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

            {/* PROJECTS SECTION */}
            <section id="projects-section" style={{ padding: "4rem 0" }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="center font" style={{ color: "gold", textShadow: " 0 0 20px gold", fontSize: "2.5rem", marginBottom: "3rem" }}>
                  My Projects
                </h2>
                <div
                  className="center"
                  style={{ display: "flex", gap: "4rem", justifyContent: "center", flexWrap: "wrap" }}
                >

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
                    <h3 className="font"> EmpathAI</h3>
                    <p> This is an AI Therapist that uses reactjs, Python and NLP models like Hugging face. Uses Livekit tooks to allow verbal conversation with the AI therapist. </p>

                  
                  </div>



                  <div className="card" style={{
                    border: "2px solid #00ffe7",
                    boxShadow: "0 4px 16px #00ffe7",
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
                    <b>
                      <h3 className="text-xl font-semibold font size:12">AI Study Planner </h3>
                    </b>
                    <p>
                      Developed a dynamic AI-powered task and study planner with a React frontend and Python backend,
                      enhancing productivity by 15%. Integrated a chatbot using the Ollama API and LangChain,
                      achieving 95% response accuracy.
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
                    <b>
                      <h3 className="center font">AI Expense Tracker</h3>
                    </b>
                    <p>
                      Developed a full-stack expense tracking app with a Python backend and React frontend, featuring
                      AI-powered categorization for 80% improved accuracy. Optimized backend with FastAPI and JWT,
                      boosting performance by 30%.
                    </p>
                  </div>
                </div>
              </motion.div>
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
                      When I'm not coding, you'll find me immersed in the latest games. From competitive multiplayer 
                      to story-driven adventures, gaming helps me unwind and often inspires creative solutions for my projects.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* CONTACT SECTION */}
            <div style={{ padding: "4rem 0" }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="center font" style={{ color: "gold", textShadow: " 0 0 20px gold", fontSize: "2.5rem", marginBottom: "3rem" }}>
                  Reach Me On 
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 center">
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
                    <p>
                      <h3 className="font">US Number:</h3>
                      +1 (717) 648 7215
                    </p>
                  </div>
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
                    <p>
                      <h3 className="font"> Dubai Number:</h3>
                      +971 50 581 6195
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Portfolio