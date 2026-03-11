'use client'
import { useState, useEffect } from 'react'
import styles from '../beauty-secret.module.css'

const sections = [
  { id: 'top', label: 'Hero' },
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'features', label: 'Features' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'ai-fluency', label: 'AI Fluency' },
  { id: 'testing', label: 'Testing' },
  { id: 'security', label: 'Security' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'backend', label: 'Backend' },
]

export function SectionDots() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={styles.sectionDots} aria-label="Section navigation">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.sectionDot} ${active === id ? styles.sectionDotActive : ''}`}
          onClick={() => scrollTo(id)}
          title={label}
          aria-label={`Go to ${label}`}
        />
      ))}
    </nav>
  )
}
