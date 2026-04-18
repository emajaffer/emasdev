'use client'
import { useTranslations } from 'next-intl'
import { AnimatedCounter } from './AnimatedCounter'
import { ParticleCanvas } from './ParticleCanvas'
import styles from '../beauty-secret.module.css'

export function Hero() {
  const t = useTranslations('beautySecret.hero')

  const stats = [
    { target: 113000, suffix: '+', labelKey: 'linesOfCode' },
    { target: 413, suffix: '', labelKey: 'sourceFiles' },
    { target: 300, suffix: '+', labelKey: 'backendFunctions' },
    { target: 600, suffix: '+', labelKey: 'testCases' },
    { target: 468, suffix: '', labelKey: 'gitCommits' },
  ]

  const delays = [styles.delay600, styles.delay700, styles.delay800, styles.delay900, styles.delay1000]

  return (
    <section className={styles.hero} id="top">
      <ParticleCanvas />
      <div className={`${styles.container} ${styles.heroInner}`}>
        <div className={`${styles.heroLabel} ${styles.animInLeft}`}>
          <span className={styles.dot} />
          {t('label')}
        </div>
        <h1 className={`${styles.heroH1} ${styles.animInUp} ${styles.delay200}`}>
          {t('title')}<br />
          <span className={styles.heroGradient}>{t('subtitle')}</span>
        </h1>
        <p className={`${styles.heroSub} ${styles.animIn} ${styles.delay400}`}>
          {t('description')}
        </p>
        <div className={styles.heroStats}>
          {stats.map((stat, i) => (
            <div key={stat.labelKey} className={`${styles.heroStat} ${styles.animIn} ${delays[i]}`}>
              <div className={styles.heroStatNum}>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className={styles.heroStatLabel}>{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
