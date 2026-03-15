'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from '../beauty-secret.module.css'

/* ───── Decision card keys ───── */

const decisionKeys = [
  'decision1',
  'decision2',
  'decision3',
  'decision4',
  'decision5',
  'decision6',
] as const

export function Decisions() {
  const t = useTranslations('beautySecret.decisions')
  const sectionRef = useScrollReveal()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setExpandedIndex((prev) => (prev === i ? null : i))
  }

  return (
    <section ref={sectionRef} className={styles.section} id="decisions">
      <div className={styles.container}>
        {/* Section header */}
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>{t('sectionLabel')}</div>
          <h2 className={styles.sectionTitle}>
            {t('sectionTitle')}
          </h2>
        </div>

        {/* 2-column decision cards */}
        <div className={styles.grid2}>
          {decisionKeys.map((key, i) => {
            const isExpanded = expandedIndex === i
            return (
              <div
                key={key}
                className={`${styles.card} ${styles.scrollAnim}`}
                data-reveal={`${i * 100}`}
                style={{
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  if (expandedIndex !== i) {
                    ;(e.currentTarget as HTMLElement).style.transform =
                      'translateY(-2px) scale(1.02)'
                  }
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'none'
                }}
              >
                <h4 className={styles.fw700} style={{ marginBottom: 8 }}>
                  {t(`${key}Title`)}
                </h4>
                <div
                  className={`${styles.expandPanel} ${
                    isExpanded ? styles.expandPanelExpanded : ''
                  }`}
                >
                  <p
                    className={`${styles.textSm} ${styles.textMuted}`}
                    style={{ marginBottom: 8 }}
                  >
                    {t(`${key}Preview`)}
                  </p>
                  {isExpanded && (
                    <p
                      className={`${styles.textSm} ${styles.textMuted}`}
                      style={{ marginTop: 12 }}
                    >
                      {t(`${key}Full`)}
                    </p>
                  )}
                </div>
                <button
                  className={styles.expandToggle}
                  onClick={() => toggle(i)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? t('showLess') : t('readMore')}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
