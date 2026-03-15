'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { AnimatedCounter } from './AnimatedCounter'
import { BrowserFrame } from './BrowserFrame'
import styles from '../beauty-secret.module.css'

const techStack = [
  'Next.js 16', 'React 19', 'TypeScript 5', 'Tailwind CSS 4',
  'Convex', 'Clerk Auth', 'Stripe', 'next-intl',
  'next-themes', 'GSAP', 'Recharts', 'date-fns',
  'Vitest', 'Playwright', 'Vercel', 'Google Maps',
]

export function Overview() {
  const t = useTranslations('beautySecret.overview')
  const sectionRef = useScrollReveal()

  const metrics = [
    { val: 16, descKey: 'databaseTables' },
    { val: 102, descKey: 'reactComponents' },
    { val: 38, descKey: 'appRoutes' },
    { val: 177, descKey: 'servicesCataloged' },
    { val: 8, descKey: 'serviceCategories' },
    { val: 3, descKey: 'userRoles' },
    { val: 2, descKey: 'languages' },
    { val: 17, descKey: 'e2eDeviceProfiles' },
  ]

  return (
    <section ref={sectionRef} className={styles.section} id="overview">
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>{t('sectionLabel')}</div>
          <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
          <p className={styles.sectionDesc}>{t('sectionDesc')}</p>
        </div>

        <div className={styles.grid2}>
          <div className={`${styles.card} ${styles.scrollAnimLeft}`} data-reveal>
            <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('theProblem')}</h3>
            <p className={`${styles.textSm} ${styles.textMuted}`}>{t('problemDesc')}</p>
          </div>
          <div className={`${styles.card} ${styles.scrollAnimRight}`} data-reveal="100">
            <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('theSolution')}</h3>
            <p className={`${styles.textSm} ${styles.textMuted}`}>{t('solutionDesc')}</p>
          </div>
        </div>

        <div className={`${styles.mt32} ${styles.scrollAnim}`} data-reveal>
          <BrowserFrame url="b-secret.com">
            <Image
              src="/screenshots/b-secret/landing-page.png"
              alt="Beauty Secret landing page — premium beauty salon in Bucharest"
              width={1440}
              height={900}
              quality={80}
              sizes="(max-width: 768px) 100vw, 1100px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </BrowserFrame>
        </div>

        <div className={`${styles.mt32} ${styles.scrollAnim}`} data-reveal>
          <h3 className={styles.fw700} style={{ marginBottom: 16 }}>{t('techStack')}</h3>
          <div className={styles.techGrid}>
            {techStack.map((tech, i) => (
              <span key={tech} className={styles.techBadge} style={{ animationDelay: `${i * 30}ms` }}>{tech}</span>
            ))}
          </div>
        </div>

        <div className={`${styles.grid4} ${styles.mt32}`}>
          {metrics.map((m, i) => (
            <div key={m.descKey} className={`${styles.metricCard} ${styles.scrollAnim}`} data-reveal={String(i * 80)}>
              <div className={styles.metricVal}><AnimatedCounter target={m.val} /></div>
              <div className={styles.metricDesc}>{t(m.descKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
