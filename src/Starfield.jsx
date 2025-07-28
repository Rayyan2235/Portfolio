import React, { useEffect, useRef } from "react"

// Starfield: renders static twinkling stars and shooting stars
function Starfield() {
  const starCanvas = useRef(null)
  const shootingCanvas = useRef(null)

  // Draw static stars
  useEffect(() => {
    const canvas = starCanvas.current
    const ctx = canvas.getContext("2d")
    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height
    // Generate random stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.1 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
    }))
    let frame = 0
    function drawStars() {
      ctx.clearRect(0, 0, width, height)
      stars.forEach((star) => {
        // Twinkle effect
        const alpha = 0.7 + 0.3 * Math.sin(frame / 20 + star.twinkle)
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI)
        ctx.fillStyle = "#fff"
        ctx.shadowColor = "#fff"
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })
      ctx.globalAlpha = 1
      frame++
      requestAnimationFrame(drawStars)
    }
    drawStars()
    // Clean up
    return () => {
      ctx.clearRect(0, 0, width, height)
    }
  }, [])

  // Draw shooting stars
  useEffect(() => {
    const canvas = shootingCanvas.current
    const ctx = canvas.getContext("2d")
    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height
    let shootingStars = []
    let animationId
    function spawnShootingStar() {
      // Shooting star starts at random x, y near top, random angle
      const startX = Math.random() * width
      const startY = Math.random() * height * 0.4
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3 // ~45deg
      const speed = 8 + Math.random() * 4
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 180 + Math.random() * 60,
        life: 0,
        maxLife: 60 + Math.random() * 20,
      })
    }
    function animate() {
      ctx.clearRect(0, 0, width, height)
      shootingStars.forEach((star, i) => {
        // Draw shooting star as a fading line
        ctx.save()
        ctx.globalAlpha = 1 - star.life / star.maxLife
        ctx.strokeStyle = "#fff"
        ctx.shadowColor = "#fff"
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x - star.vx * 8, star.y - star.vy * 8)
        ctx.lineWidth = 2.2
        ctx.stroke()
        ctx.restore()
        // Update position
        star.x += star.vx
        star.y += star.vy
        star.life++
      })
      // Remove dead shooting stars
      shootingStars = shootingStars.filter((star) => star.life < star.maxLife)
      animationId = requestAnimationFrame(animate)
    }
    // Spawn a shooting star every 1.5-3.5 seconds
    let spawnTimeout
    function scheduleSpawn() {
      spawnShootingStar()
      spawnTimeout = setTimeout(scheduleSpawn, 1500 + Math.random() * 2000)
    }
    scheduleSpawn()
    animate()
    // Clean up
    return () => {
      clearTimeout(spawnTimeout)
      cancelAnimationFrame(animationId)
      ctx.clearRect(0, 0, width, height)
    }
  }, [])

  // The two canvases are stacked absolutely, covering the viewport
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none" }}>
      {/* Static twinkling stars */}
      <canvas ref={starCanvas} style={{ position: "absolute", width: "100vw", height: "100vh" }} />
      {/* Shooting stars */}
      <canvas ref={shootingCanvas} style={{ position: "absolute", width: "100vw", height: "100vh" }} />
    </div>
  )
}

export default Starfield 