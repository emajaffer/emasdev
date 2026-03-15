'use client'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import styles from '../beauty-secret.module.css'

const sectionIds = [
  { id: 'top', labelKey: 'hero' },
  { id: 'overview', labelKey: 'overview' },
  { id: 'architecture', labelKey: 'architecture' },
  { id: 'features', labelKey: 'features' },
  { id: 'integrations', labelKey: 'integrations' },
  { id: 'ai-fluency', labelKey: 'aiFluency' },
  { id: 'testing', labelKey: 'testing' },
  { id: 'security', labelKey: 'security' },
  { id: 'decisions', labelKey: 'decisions' },
  { id: 'backend', labelKey: 'backend' },
]

export function SectionDots() {
  const t = useTranslations('beautySecret.sectionDots')
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

    sectionIds.forEach(({ id }) => {
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
      {sectionIds.map(({ id, labelKey }) => (
        <button
          key={id}
          className={`${styles.sectionDot} ${active === id ? styles.sectionDotActive : ''}`}
          onClick={() => scrollTo(id)}
          title={t(labelKey)}
          aria-label={t('goTo', { section: t(labelKey) })}
        />
      ))}
    </nav>
  )
}
