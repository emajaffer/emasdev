'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? formatNumber(target) : '0')
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const start = performance.now()
    const durationMs = duration * 1000

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / durationMs, 1)
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress)
      setDisplay(formatNumber(Math.round(eased * target)))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [target, duration])

  useEffect(() => {
    if (reduced || !ref.current) {
      setDisplay(formatNumber(target))
      return
    }

    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, reduced, animate])

  return <span ref={ref} className={className}>{prefix}{display}{suffix}</span>
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}
