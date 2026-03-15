'use client'
import { useTranslations } from 'next-intl'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from '../beauty-secret.module.css'

/* ───── Data ───── */

const securityHeaderKeys = [
  'contentSecurityPolicy',
  'hsts',
  'xFrameOptions',
  'xContentTypeOptions',
  'referrerPolicy',
  'permissionsPolicy',
] as const

const appSecurityKeys = [
  'roleBasedAccess',
  'jwtVerification',
  'webhookSignatures',
  'dualCspSync',
  'auditTrail',
  'errorBoundaries',
] as const

export function Security() {
  const t = useTranslations('beautySecret.security')
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className={styles.section} id="security">
      <div className={styles.container}>
        {/* Section header */}
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>{t('sectionLabel')}</div>
          <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
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
              {t('securityHeadersTitle')}
            </h3>
            <ul className={styles.featureList}>
              {securityHeaderKeys.map((key) => (
                <li key={key} data-check-item>
                  <span
                    className={styles.featureListIcon}
                    style={{ color: '#8ec07c' }}
                  >
                    &#10003;
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Application Security */}
          <div className={`${styles.card} ${styles.scrollAnim}`} data-reveal="250">
            <h3 className={styles.fw700} style={{ marginBottom: 16 }}>
              {t('applicationSecurityTitle')}
            </h3>
            <ul className={styles.featureList}>
              {appSecurityKeys.map((key) => (
                <li key={key} data-check-item>
                  <span
                    className={styles.featureListIcon}
                    style={{ color: '#8ec07c' }}
                  >
                    &#10003;
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CSP Domain Allowlist */}
        <div className={`${styles.mt32} ${styles.scrollAnim}`} data-reveal>
          <h3 className={styles.fw700} style={{ marginBottom: 16 }}>
            {t('cspTitle')}
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
            {t.rich('cspDesc', {
              code1: (chunks) => <code>{chunks}</code>,
              code2: (chunks) => <code>{chunks}</code>,
            })}
          </p>
        </div>
      </div>
    </section>
  )
}
