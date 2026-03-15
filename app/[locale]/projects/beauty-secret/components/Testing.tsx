'use client'
import { useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from '../beauty-secret.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ───── Unit test modules ───── */

interface TestModule {
  nameKey: string
  count: number
}

const unitTestModules: TestModule[] = [
  { nameKey: 'seoRegression', count: 53 },
  { nameKey: 'giftCards', count: 45 },
  { nameKey: 'proxyAuthPolicy', count: 35 },
  { nameKey: 'stripeCheckout', count: 15 },
  { nameKey: 'roleManagement', count: 13 },
  { nameKey: 'dateUtilities', count: 12 },
  { nameKey: 'scrollReveal', count: 10 },
  { nameKey: 'loyaltySystem', count: 7 },
  { nameKey: 'authProxy', count: 3 },
]

const MAX_UNIT_COUNT = 53

/* ───── E2E spec rows ───── */

interface E2ESpec {
  spec: string
  scenarios: number
  descKey: string
}

const e2eSpecs: E2ESpec[] = [
  { spec: 'public', scenarios: 47, descKey: 'e2ePublic' },
  { spec: 'customer', scenarios: 38, descKey: 'e2eCustomer' },
  { spec: 'employee', scenarios: 42, descKey: 'e2eEmployee' },
  { spec: 'admin', scenarios: 56, descKey: 'e2eAdmin' },
  { spec: 'functional', scenarios: 38, descKey: 'e2eFunctional' },
]

const deviceBadges = [
  'iPhone SE',
  'iPhone 12',
  'iPhone 14 Pro',
  'iPhone 15 Pro Max',
  'iPhone 16 Pro Max',
  'Pixel 5',
  'Pixel 7',
  'Galaxy S24',
  'Galaxy S25 Ultra',
  'iPad Mini',
  'iPad Pro 11"',
]

export function Testing() {
  const t = useTranslations('beautySecret.testing')
  const sectionRef = useScrollReveal()
  const barContainerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  /* ── GSAP: progress bar width animation only ── */
  useEffect(() => {
    if (reduced || !barContainerRef.current) return

    const bars = barContainerRef.current.querySelectorAll<HTMLElement>('[data-test-bar]')
    if (!bars.length) return

    const ctx = gsap.context(() => {
      bars.forEach((bar, i) => {
        const targetWidth = bar.dataset.targetWidth || '0%'
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: targetWidth,
            scrollTrigger: { trigger: bar, start: 'top 90%', once: true },
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
          },
        )
      })
    }, barContainerRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} className={styles.section} id="testing">
      <div className={styles.container}>
        {/* Section header */}
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>{t('sectionLabel')}</div>
          <div
            className={styles.textXs}
            style={{
              color: 'var(--brand2)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            {t('qualityAssurance')}
          </div>
          <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
        </div>

        {/* Two-column layout */}
        <div className={styles.grid2}>
          {/* ─── Left: Unit Tests ─── */}
          <div ref={barContainerRef} className={`${styles.card} ${styles.scrollAnim}`} data-reveal>
            <h3 className={styles.fw700} style={{ marginBottom: 4 }}>
              {t('unitTestsTitle')}
            </h3>
            <p
              className={`${styles.textXs} ${styles.textDim}`}
              style={{ marginBottom: 20 }}
            >
              Vitest
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {unitTestModules.map((mod) => {
                const pct = Math.round((mod.count / MAX_UNIT_COUNT) * 100)
                return (
                  <div key={mod.nameKey}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 4,
                        fontSize: '0.82rem',
                      }}
                    >
                      <span style={{ color: 'var(--muted)' }}>{t(mod.nameKey)}</span>
                      <span style={{ color: 'var(--dim)', fontWeight: 600 }}>
                        {mod.count}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 3,
                        background: 'var(--bg2)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        data-test-bar
                        data-target-width={`${pct}%`}
                        style={{
                          height: '100%',
                          borderRadius: 3,
                          background: 'linear-gradient(90deg, var(--brand), var(--brand2))',
                          width: reduced ? `${pct}%` : '0%',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ─── Right: E2E Tests ─── */}
          <div className={`${styles.card} ${styles.scrollAnim}`} data-reveal="150">
            <h3 className={styles.fw700} style={{ marginBottom: 4 }}>
              {t('e2eTestsTitle')}
            </h3>
            <p
              className={`${styles.textXs} ${styles.textDim}`}
              style={{ marginBottom: 12 }}
            >
              Playwright
            </p>
            <p
              className={`${styles.textSm} ${styles.textMuted}`}
              style={{ marginBottom: 16 }}
            >
              {t.rich('e2eDesc', {
                strong: (chunks) => <strong style={{ color: 'var(--text)' }}>{chunks}</strong>,
                count: 17,
              })}
            </p>

            {/* E2E spec table */}
            <div style={{ overflowX: 'auto', marginBottom: 20 }}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>{t('columnSpec')}</th>
                    <th>{t('columnScenarios')}</th>
                    <th>{t('columnCoverage')}</th>
                  </tr>
                </thead>
                <tbody>
                  {e2eSpecs.map((row, i) => (
                    <tr key={row.spec} className={styles.scrollAnimLeft} data-reveal={`${i * 60}`}>
                      <td>
                        <code>{row.spec}</code>
                      </td>
                      <td>{row.scenarios}</td>
                      <td>{t(row.descKey)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Device profile badges */}
            <p
              className={`${styles.textXs} ${styles.fw600}`}
              style={{ marginBottom: 10, color: 'var(--dim)' }}
            >
              {t('deviceProfiles')}
            </p>
            <div className={styles.techGrid}>
              {deviceBadges.map((device, i) => (
                <span
                  key={device}
                  className={`${styles.techBadge} ${styles.scrollAnim}`}
                  data-reveal={`${i * 50}`}
                >
                  {device}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
