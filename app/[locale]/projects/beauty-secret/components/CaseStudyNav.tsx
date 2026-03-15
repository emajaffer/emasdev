'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from '../beauty-secret.module.css'

export function CaseStudyNav() {
  const t = useTranslations('beautySecret.nav')
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '#overview', labelKey: 'overview' },
    { href: '#architecture', labelKey: 'architecture' },
    { href: '#features', labelKey: 'features' },
    { href: '#integrations', labelKey: 'integrations' },
    { href: '#ai-fluency', labelKey: 'aiFluency' },
    { href: '#testing', labelKey: 'testing' },
    { href: '#security', labelKey: 'security' },
  ]

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
          {navLinks.map(({ href, labelKey }) => (
            <li key={href}>
              <a href={href} onClick={(e) => scrollTo(e, href)}>{t(labelKey)}</a>
            </li>
          ))}
        </ul>
        <a
          href="https://www.b-secret.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.navCta} ${styles.navCtaDesktop}`}
        >
          {t('viewLiveSite')}
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
          {navLinks.map(({ href, labelKey }) => (
            <li key={href}>
              <a href={href} onClick={(e) => scrollTo(e, href)}>{t(labelKey)}</a>
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
          {t('viewLiveSite')}
        </a>
      </div>
    </header>
  )
}
