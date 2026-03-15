'use client'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import styles from '../beauty-secret.module.css'

export function CaseStudyFooter() {
  const t = useTranslations('beautySecret.footer')

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.container}>
        {/* Gradient divider */}
        <div className={styles.footerDivider} />

        {/* Name + role */}
        <p className={styles.footerName}>
          Ema Mocanu
        </p>
        <p className={styles.footerRole}>
          {t('role')}
        </p>

        {/* Links */}
        <div className={styles.footerLinks}>
          <Link href="/">{t('portfolio')}</Link>
          <span className={styles.footerDot}>&middot;</span>
          <Link href="/projects">{t('projects')}</Link>
          <span className={styles.footerDot}>&middot;</span>
          <a href="https://github.com/emajaffer" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className={styles.footerDot}>&middot;</span>
          <a href="https://b-secret.com" target="_blank" rel="noopener noreferrer">b-secret.com</a>
        </div>

        {/* Tech line */}
        <p className={styles.footerTech}>
          {t('builtWith')}
        </p>

        {/* Copyright */}
        <p className={styles.footerCopy}>
          {t('copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  )
}
