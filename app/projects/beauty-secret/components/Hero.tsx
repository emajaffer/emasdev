'use client'
import { AnimatedCounter } from './AnimatedCounter'
import { ParticleCanvas } from './ParticleCanvas'
import styles from '../beauty-secret.module.css'

const stats = [
  { target: 48000, suffix: '+', label: 'Lines of Code' },
  { target: 227, suffix: '', label: 'Source Files' },
  { target: 157, suffix: '+', label: 'Backend Functions' },
  { target: 414, suffix: '+', label: 'Test Cases' },
  { target: 112, suffix: '', label: 'Git Commits' },
]

const delays = [styles.delay600, styles.delay700, styles.delay800, styles.delay900, styles.delay1000]

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <ParticleCanvas />
      <div className={`${styles.container} ${styles.heroInner}`}>
        <div className={`${styles.heroLabel} ${styles.animInLeft}`}>
          <span className={styles.dot} />
          Featured Project — Production Deployed
        </div>
        <h1 className={`${styles.heroH1} ${styles.animInUp} ${styles.delay200}`}>
          Beauty Secret<br />
          <span className={styles.heroGradient}>Salon Management Platform</span>
        </h1>
        <p className={`${styles.heroSub} ${styles.animIn} ${styles.delay400}`}>
          A production-grade full-stack SaaS application for a luxury beauty salon in Bucharest, Romania.
          End-to-end: real-time booking, Stripe payments, role-based dashboards, internationalization,
          and comprehensive test coverage — built with AI-augmented development workflows.
        </p>
        <div className={styles.heroStats}>
          {stats.map((stat, i) => (
            <div key={stat.label} className={`${styles.heroStat} ${styles.animIn} ${delays[i]}`}>
              <div className={styles.heroStatNum}>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className={styles.heroStatLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
