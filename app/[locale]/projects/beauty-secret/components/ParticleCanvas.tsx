'use client'
import { useRef, useEffect } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import styles from '../beauty-secret.module.css'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Particle[] = []
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 25 : 50

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()

    const colors = ['rgba(196,106,134,', 'rgba(167,123,214,']
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let time = 0
    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      particles.forEach((p) => {
        p.x += p.speedX + Math.sin(time + p.y * 0.01) * 0.15
        p.y += p.speedY + Math.cos(time + p.x * 0.01) * 0.15

        if (p.x < -10) p.x = canvas.offsetWidth + 10
        if (p.x > canvas.offsetWidth + 10) p.x = -10
        if (p.y < -10) p.y = canvas.offsetHeight + 10
        if (p.y > canvas.offsetHeight + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.opacity})`
        ctx.fill()
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  if (reduced) return null

  return <canvas ref={canvasRef} className={styles.particleCanvas} />
}
