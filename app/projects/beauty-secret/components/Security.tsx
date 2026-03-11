'use client'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from '../beauty-secret.module.css'

/* ───── Data ───── */

const securityHeaders = [
  'Content-Security-Policy',
  'HSTS',
  'X-Frame-Options: DENY',
  'X-Content-Type-Options: nosniff',
  'Referrer-Policy',
  'Permissions-Policy',
]

const appSecurity = [
  'Role-Based Access',
  'JWT Verification',
  'Webhook Signatures',
  'Dual CSP Sync',
  'Audit Trail',
  'Error Boundaries',
]

interface CspDomain {
  raw: string
  tooltip?: string
}

const cspDomains: CspDomain[] = [
  { raw: 'clerk.accounts.dev', tooltip: 'Authentication provider' },
  { raw: '*.convex.cloud', tooltip: 'Real-time database' },
  { raw: 'api.stripe.com', tooltip: 'Payment processing' },
  { raw: 'maps.google.com', tooltip: 'Location embed' },
]

export function Security() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className={styles.section} id="security">
      <div className={styles.container}>
        {/* Section header */}
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>Production Security</div>
          <h2 className={styles.sectionTitle}>Security &amp; Compliance</h2>
        </div>

        {/* Padlock SVG */}
        <div className={`${styles.scrollAnim}`} data-reveal="200" style={{ textAlign: 'center', marginBottom: 40 }}>
          <svg
            width="60"
            height="80"
            viewBox="0 0 60 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Padlock animation"
            role="img"
            className={styles.padlockSvg}
          >
            {/* Shackle (U-shaped top) */}
            <g className={styles.padlockShackle}>
              <path
                d="M15 35V22C15 13.716 21.716 7 30 7C38.284 7 45 13.716 45 22V35"
                stroke="var(--brand)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
            {/* Lock body */}
            <rect
              x="8"
              y="35"
              width="44"
              height="38"
              rx="6"
              fill="var(--surface)"
              stroke="var(--brand)"
              strokeWidth="3"
            />
            {/* Keyhole */}
            <circle cx="30" cy="50" r="5" fill="var(--brand)" />
            <rect x="28" y="50" width="4" height="10" rx="2" fill="var(--brand)" />
          </svg>
        </div>

        {/* Two security cards */}
        <div className={styles.grid2}>
          {/* Card 1: Security Headers */}
          <div className={`${styles.card} ${styles.scrollAnim}`} data-reveal="100">
            <h3 className={styles.fw700} style={{ marginBottom: 16 }}>
              Security Headers
            </h3>
            <ul className={styles.featureList}>
              {securityHeaders.map((item) => (
                <li key={item} data-check-item>
                  <span
                    className={styles.featureListIcon}
                    style={{ color: '#8ec07c' }}
                  >
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Application Security */}
          <div className={`${styles.card} ${styles.scrollAnim}`} data-reveal="250">
            <h3 className={styles.fw700} style={{ marginBottom: 16 }}>
              Application Security
            </h3>
            <ul className={styles.featureList}>
              {appSecurity.map((item) => (
                <li key={item} data-check-item>
                  <span
                    className={styles.featureListIcon}
                    style={{ color: '#8ec07c' }}
                  >
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CSP Domain Allowlist */}
        <div className={`${styles.mt32} ${styles.scrollAnim}`} data-reveal>
          <h3 className={styles.fw700} style={{ marginBottom: 16 }}>
            CSP Domain Allowlist
          </h3>
          <div className={styles.codeBlock}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              <span className={styles.keyword}>Content-Security-Policy</span>
              {': '}
              <span className={styles.comment}>{'// Strict policy with domain allowlist'}</span>
              {'\n'}
              {'  default-src \'self\';'}
              {'\n'}
              {'  script-src \'self\' \'unsafe-inline\' '}
              <span
                title="Authentication provider"
                style={{
                  borderBottom: '1px dashed var(--dim)',
                  cursor: 'help',
                  transition: 'border-color 0.2s',
                }}
              >
                clerk.accounts.dev
              </span>
              {' '}
              <span
                title="Real-time database"
                style={{
                  borderBottom: '1px dashed var(--dim)',
                  cursor: 'help',
                  transition: 'border-color 0.2s',
                }}
              >
                *.convex.cloud
              </span>
              {';'}
              {'\n'}
              {'  connect-src \'self\' '}
              <span
                title="Real-time database"
                style={{
                  borderBottom: '1px dashed var(--dim)',
                  cursor: 'help',
                  transition: 'border-color 0.2s',
                }}
              >
                *.convex.cloud
              </span>
              {' '}
              <span
                title="Payment processing"
                style={{
                  borderBottom: '1px dashed var(--dim)',
                  cursor: 'help',
                  transition: 'border-color 0.2s',
                }}
              >
                api.stripe.com
              </span>
              {' '}
              <span
                title="Authentication provider"
                style={{
                  borderBottom: '1px dashed var(--dim)',
                  cursor: 'help',
                  transition: 'border-color 0.2s',
                }}
              >
                clerk.accounts.dev
              </span>
              {';'}
              {'\n'}
              {'  frame-src '}
              <span
                title="Payment processing"
                style={{
                  borderBottom: '1px dashed var(--dim)',
                  cursor: 'help',
                  transition: 'border-color 0.2s',
                }}
              >
                api.stripe.com
              </span>
              {' '}
              <span
                title="Location embed"
                style={{
                  borderBottom: '1px dashed var(--dim)',
                  cursor: 'help',
                  transition: 'border-color 0.2s',
                }}
              >
                maps.google.com
              </span>
              {';'}
              {'\n'}
              {'  img-src \'self\' data: blob: *.clerk.com;'}
              {'\n'}
              {'  style-src \'self\' \'unsafe-inline\';'}
            </pre>
          </div>
          <p
            className={`${styles.textXs} ${styles.textDim}`}
            style={{ marginTop: 12 }}
          >
            Hover over highlighted domains to see their purpose. Dual CSP configuration
            syncs between <code>next.config.ts</code> headers and <code>vercel.json</code> overrides.
          </p>
        </div>
      </div>
    </section>
  )
}
