'use client'
import { useState } from 'react'
import styles from '../beauty-secret.module.css'

const navLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#features', label: 'Features' },
  { href: '#integrations', label: 'Integrations' },
  { href: '#ai-fluency', label: 'AI Fluency' },
  { href: '#testing', label: 'Testing' },
  { href: '#security', label: 'Security' },
]

export function CaseStudyNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={styles.siteHeader}>
      <div className={styles.navInner}>
        <div className={styles.navLogo}>
          <span className={styles.navLogoGradient}>EA</span> Mocanu
        </div>
        <ul className={styles.navLinks}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={(e) => scrollTo(e, href)}>{label}</a>
            </li>
          ))}
        </ul>
        <a
          href="https://www.b-secret.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.navCta} ${styles.navCtaDesktop}`}
        >
          View Live Site →
        </a>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerOpen : ''}`} />
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerOpen : ''}`} />
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerOpen : ''}`} />
        </button>
      </div>
      {/* Mobile dropdown */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileMenuLinks}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={(e) => scrollTo(e, href)}>{label}</a>
            </li>
          ))}
        </ul>
        <a
          href="https://www.b-secret.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navCta}
          style={{ display: 'block', textAlign: 'center', marginTop: 12 }}
        >
          View Live Site →
        </a>
      </div>
    </header>
  )
}
