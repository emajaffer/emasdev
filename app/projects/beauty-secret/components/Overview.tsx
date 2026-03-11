'use client'
import Image from 'next/image'
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

const metrics = [
  { val: 16, desc: 'Database Tables' },
  { val: 102, desc: 'React Components' },
  { val: 38, desc: 'App Routes' },
  { val: 177, desc: 'Services Cataloged' },
  { val: 8, desc: 'Service Categories' },
  { val: 3, desc: 'User Roles' },
  { val: 2, desc: 'Languages (EN/RO)' },
  { val: 17, desc: 'E2E Device Profiles' },
]

export function Overview() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className={styles.section} id="overview">
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>Act I — The Challenge</div>
          <h2 className={styles.sectionTitle}>What I Built & Why</h2>
          <p className={styles.sectionDesc}>
            A real-world, client-facing platform that serves three distinct user roles,
            processes real payments, and runs in production at www.b-secret.com.
          </p>
        </div>

        <div className={styles.grid2}>
          <div className={`${styles.card} ${styles.scrollAnimLeft}`} data-reveal>
            <h3 className={styles.fw700} style={{ marginBottom: 12 }}>The Problem</h3>
            <p className={`${styles.textSm} ${styles.textMuted}`}>
              A beauty salon with 4 employees, 177+ services across 8 categories, and customers booking
              via WhatsApp and phone calls. No centralized system for availability, payments, scheduling,
              or employee performance tracking. Zero online presence for SEO discoverability.
            </p>
          </div>
          <div className={`${styles.card} ${styles.scrollAnimRight}`} data-reveal="100">
            <h3 className={styles.fw700} style={{ marginBottom: 12 }}>The Solution</h3>
            <p className={`${styles.textSm} ${styles.textMuted}`}>
              A full-stack platform with a public-facing booking experience, real-time dashboards for
              three roles (customer, employee, admin), integrated Stripe payments with deposit support,
              a loyalty rewards program, and SEO-optimized category landing pages — all
              internationalized in English and Romanian.
            </p>
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
          <h3 className={styles.fw700} style={{ marginBottom: 16 }}>Technology Stack</h3>
          <div className={styles.techGrid}>
            {techStack.map((tech, i) => (
              <span key={tech} className={styles.techBadge} style={{ animationDelay: `${i * 30}ms` }}>{tech}</span>
            ))}
          </div>
        </div>

        <div className={`${styles.grid4} ${styles.mt32}`}>
          {metrics.map((m, i) => (
            <div key={m.desc} className={`${styles.metricCard} ${styles.scrollAnim}`} data-reveal={String(i * 80)}>
              <div className={styles.metricVal}><AnimatedCounter target={m.val} /></div>
              <div className={styles.metricDesc}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
