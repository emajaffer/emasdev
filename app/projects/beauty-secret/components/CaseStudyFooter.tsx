'use client'
import styles from '../beauty-secret.module.css'

export function CaseStudyFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.container}>
        <p style={{ marginBottom: 8 }}>
          <strong>Emmanuella Andrea Mocanu</strong> — Software &amp; Systems Engineer
        </p>
        <p>
          Built with Next.js 16, React 19, TypeScript, Convex, Stripe, Clerk — deployed at{' '}
          <a href="https://www.b-secret.com" target="_blank" rel="noopener noreferrer">
            www.b-secret.com
          </a>
        </p>
        <p style={{ marginTop: 12, fontSize: '0.75rem' }}>
          This portfolio case study was generated from a private repository. No sensitive information,
          API keys, or environment variables are included.
        </p>
      </div>
    </footer>
  )
}
