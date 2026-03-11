'use client'
import styles from '../beauty-secret.module.css'

export function CaseStudyFooter() {
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
          Software & Systems Engineer
        </p>

        {/* Links */}
        <div className={styles.footerLinks}>
          <a href="/">Portfolio</a>
          <span className={styles.footerDot}>&middot;</span>
          <a href="/projects">Projects</a>
          <span className={styles.footerDot}>&middot;</span>
          <a href="https://github.com/emajaffer" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className={styles.footerDot}>&middot;</span>
          <a href="https://b-secret.com" target="_blank" rel="noopener noreferrer">b-secret.com</a>
        </div>

        {/* Tech line */}
        <p className={styles.footerTech}>
          Built with Next.js, React, TypeScript, Convex, Stripe & Clerk
        </p>

        {/* Copyright */}
        <p className={styles.footerCopy}>
          &copy; {new Date().getFullYear()} Ema Mocanu. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
