'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from '../beauty-secret.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ───── Architecture layers data ───── */

interface ArchBox {
  title: string
  sub: string
}

interface ArchLayer {
  label: string
  variant: string // CSS class: frontend | backend | service | infra
  boxes: ArchBox[]
}

interface ArchArrow {
  text: string
}

const layers: ArchLayer[] = [
  {
    label: 'CLIENT LAYER',
    variant: 'frontend',
    boxes: [
      { title: 'Next.js 16', sub: 'App Router + RSC' },
      { title: 'React 19', sub: '102 Components' },
      { title: 'Tailwind CSS 4', sub: 'Dark/Light Themes' },
    ],
  },
  {
    label: 'MIDDLEWARE',
    variant: 'backend',
    boxes: [
      { title: 'Clerk Auth', sub: 'JWT + RBAC' },
      { title: 'next-intl', sub: 'i18n Routing' },
      { title: 'Proxy Middleware', sub: 'Auth + Locale' },
    ],
  },
  {
    label: 'BACKEND LAYER',
    variant: 'backend',
    boxes: [
      { title: 'Convex', sub: 'Real-time Serverless DB' },
      { title: '157+ Functions', sub: 'Queries + Mutations' },
      { title: 'HTTP Actions', sub: 'Webhook Endpoints' },
    ],
  },
  {
    label: 'THIRD-PARTY SERVICES',
    variant: 'service',
    boxes: [
      { title: 'Stripe', sub: 'Payments + Webhooks' },
      { title: 'Google Maps', sub: 'Embed + Directions' },
      { title: 'Instagram', sub: 'Gallery Feed' },
      { title: 'WhatsApp', sub: 'Direct Contact' },
    ],
  },
  {
    label: 'INFRASTRUCTURE',
    variant: 'infra',
    boxes: [
      { title: 'Vercel', sub: 'Edge Network' },
      { title: 'Convex Cloud', sub: 'Serverless Backend' },
      { title: 'Clerk Hosted', sub: 'Auth Infrastructure' },
    ],
  },
]

const arrows: ArchArrow[] = [
  { text: 'WebSocket + REST' },
  { text: 'Reactive Queries + Mutations' },
  { text: 'External Integrations' },
  { text: '' },
]

/* ───── Database schema ───── */

const dbTables = [
  { name: 'categories', purpose: 'Service categories (8 types)', features: 'Slugs, display order, i18n names' },
  { name: 'services', purpose: '177+ beauty treatments', features: 'Per-unit pricing, duration, gender tags' },
  { name: 'employees', purpose: 'Team members (4 active)', features: 'Bio, specialties, commission config' },
  { name: 'employeeAvailability', purpose: 'Weekly schedules', features: 'Day-of-week + HH:mm time ranges' },
  { name: 'employeeScheduleOverrides', purpose: 'Day-offs & custom hours', features: 'Date-specific overrides' },
  { name: 'customers', purpose: 'Booking customers', features: 'Email/phone dedup, loyalty points' },
  { name: 'appointments', purpose: 'Booking records', features: 'Status machine, conflict detection' },
  { name: 'payments', purpose: 'Stripe transactions', features: 'Deposit (30%) or full, refund tracking' },
  { name: 'reviews', purpose: '5-star ratings', features: 'Tied to completed appointments' },
  { name: 'giftCards', purpose: 'Gift card system', features: 'Code generation, balance, expiry' },
  { name: 'loyaltyTiers', purpose: '4-tier rewards', features: 'Points thresholds, auto-advancement' },
  { name: 'loyaltyHistory', purpose: 'Point transactions', features: 'Earn/redeem with appointment links' },
  { name: 'salaryPayments', purpose: 'Payroll records', features: 'Commission + salary tracking' },
  { name: 'expenses', purpose: 'Operating costs', features: 'Categorized, monthly aggregation' },
  { name: 'changeLogs', purpose: 'Audit trail', features: 'Before/after values, performer' },
  { name: 'salonSettings', purpose: 'Global config', features: 'Hours, lead time, slot intervals' },
]

/* ───── Route cards ───── */

interface RouteCard {
  tag: string
  tagClass: string
  heading: string
  items: string[]
}

const routeCards: RouteCard[] = [
  {
    tag: 'Public',
    tagClass: 'tagGreen',
    heading: 'Customer-Facing',
    items: [
      'Landing page (7 sections)',
      'Service browsing & category pages',
      '8 SEO category landing pages',
      'Sign-in / Sign-up (Clerk)',
    ],
  },
  {
    tag: 'Protected',
    tagClass: 'tagPurple',
    heading: 'Customer Dashboard',
    items: [
      'Appointments (upcoming & past)',
      'Loyalty tier & points history',
      'Profile management',
      'Booking preferences',
    ],
  },
  {
    tag: 'Protected',
    tagClass: 'tagPink',
    heading: 'Employee Dashboard',
    items: [
      "Today's schedule & calendar",
      'Earnings & performance',
      'Availability management',
      'Achievements & reviews',
    ],
  },
]

const adminSubPages = [
  'Appointments',
  'Calendar + Heatmap',
  'Staff Management',
  'Service Catalog',
  'Customer CRM',
  'Financial Reports',
  'Performance Analytics',
  'Review Moderation',
  'Gift Cards',
  'Activity / Audit Log',
  'Alerts System',
  'Salary Payouts',
]

/* ───── SVG arrow component between layers ───── */

function ArrowSVG({ label, id }: { label: string; id: string }) {
  return (
    <div className={styles.archArrowWrap} data-arrow={id}>
      <svg
        width="2"
        height="48"
        viewBox="0 0 2 48"
        className={styles.archArrowSvg}
        aria-hidden="true"
      >
        <defs>
          <marker
            id={`arrowhead-${id}`}
            markerWidth="8"
            markerHeight="6"
            refX="4"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="var(--text-dim, #888)" />
          </marker>
        </defs>
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="42"
          stroke="var(--text-dim, #888)"
          strokeWidth="1.5"
          strokeDasharray="42"
          strokeDashoffset="42"
          markerEnd={`url(#arrowhead-${id})`}
          className={styles.archArrowPath}
          data-arrow-path={id}
        />
      </svg>
      {label && (
        <span className={styles.archArrowLabel} data-arrow-label={id}>
          {label}
        </span>
      )}
    </div>
  )
}

/* ───── Main component ───── */

export function Architecture() {
  const sectionRef = useScrollReveal()
  const diagramRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  /* ── GSAP: pinned scrollytelling for architecture diagram only ── */
  useEffect(() => {
    if (reduced || !diagramRef.current) return

    const diagram = diagramRef.current
    const layerGroups = diagram.querySelectorAll<HTMLElement>('[data-layer]')
    const arrowWraps = diagram.querySelectorAll<HTMLElement>('[data-arrow]')

    // Set initial state: all layers and arrows hidden
    gsap.set(layerGroups, { opacity: 0, y: 20 })
    gsap.set(arrowWraps, { opacity: 0 })

    const isDesktop = window.matchMedia('(min-width: 769px)').matches

    const ctx = gsap.context(() => {
      if (isDesktop) {
        /* ── Desktop: pinned reveal ── */
        const totalSteps = layerGroups.length + arrowWraps.length
        const stepDuration = 100

        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: diagram,
            start: 'top 15%',
            end: `+=${totalSteps * stepDuration}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        })

        let position = 0
        for (let i = 0; i < layers.length; i++) {
          pinTl.to(
            layerGroups[i],
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
            position,
          )
          position += 1

          if (i < arrows.length && arrowWraps[i]) {
            pinTl.to(
              arrowWraps[i],
              { opacity: 1, duration: 0.3, ease: 'none' },
              position,
            )
            const pathEl = arrowWraps[i].querySelector('[data-arrow-path]')
            if (pathEl) {
              pinTl.to(
                pathEl,
                { strokeDashoffset: 0, duration: 0.7, ease: 'power1.inOut' },
                position,
              )
            }
            const labelEl = arrowWraps[i].querySelector('[data-arrow-label]')
            if (labelEl) {
              pinTl.fromTo(
                labelEl,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'none' },
                position + 0.4,
              )
            }
            position += 1
          }
        }
      } else {
        /* ── Mobile: sequential scroll reveals (no pin) ── */
        layerGroups.forEach((el) => {
          gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          })
        })

        arrowWraps.forEach((el) => {
          gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            opacity: 1,
            duration: 0.4,
            ease: 'none',
          })

          const pathEl = el.querySelector('[data-arrow-path]')
          if (pathEl) {
            gsap.to(pathEl, {
              scrollTrigger: { trigger: el, start: 'top 92%', once: true },
              strokeDashoffset: 0,
              duration: 0.6,
              ease: 'power1.inOut',
            })
          }

          const labelEl = el.querySelector('[data-arrow-label]')
          if (labelEl) {
            gsap.to(labelEl, {
              scrollTrigger: { trigger: el, start: 'top 92%', once: true },
              opacity: 1,
              duration: 0.4,
              delay: 0.2,
              ease: 'none',
            })
          }
        })
      }
    }, diagram)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} className={styles.section} id="architecture">
      <div className={styles.container}>
        {/* ── Section header ── */}
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>Act II &mdash; The Build</div>
          <h2 className={styles.sectionTitle}>How It All Fits Together</h2>
          <p className={styles.sectionDesc}>
            A serverless architecture built for real-time reactivity, type safety end-to-end, and
            production-grade security.
          </p>
        </div>

        {/* ── Architecture diagram ── */}
        <div ref={diagramRef} className={styles.archDiagram}>
          {layers.map((layer, i) => (
            <div key={layer.label}>
              {/* Layer group: label + boxes */}
              <div className={styles.archLayerGroup} data-layer={i}>
                <div className={styles.archLayerLabel}>{layer.label}</div>
                <div className={styles.archRow}>
                  {layer.boxes.map((box) => (
                    <div
                      key={box.title}
                      className={`${styles.archBox} ${styles[layer.variant] || ''}`}
                    >
                      <strong>{box.title}</strong>
                      <br />
                      <span className={styles.archBoxSub}>{box.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow between layers (except after last) */}
              {i < arrows.length && (
                <ArrowSVG label={arrows[i].text} id={`arrow-${i}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── Database schema ── */}
        <div className={`${styles.mt32} ${styles.scrollAnim}`} data-reveal>
          <h3 className={styles.fw700} style={{ marginBottom: 16 }}>
            Database Schema &mdash; 16 Tables
          </h3>
          <p className={`${styles.textSm} ${styles.textMuted}`} style={{ marginBottom: 16 }}>
            Convex serverless database with real-time reactive queries, automatic cache invalidation,
            and WebSocket-driven live updates. All prices stored in cents for precision.
          </p>
          <div className={styles.codeBlock} style={{ overflowX: 'auto' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Table</th>
                  <th>Purpose</th>
                  <th>Key Features</th>
                </tr>
              </thead>
              <tbody>
                {dbTables.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <code>{row.name}</code>
                    </td>
                    <td>{row.purpose}</td>
                    <td>{row.features}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Application routes ── */}
        <div className={styles.mt32}>
          <h3 className={styles.fw700} style={{ marginBottom: 16 }}>
            Application Routes &mdash; 38 Pages
          </h3>

          {/* 3-column grid for Public / Customer / Employee */}
          <div className={styles.grid3}>
            {routeCards.map((card, i) => (
              <div key={card.heading} className={`${styles.card} ${styles.scrollAnim}`} data-reveal={`${i * 120}`}>
                <h4
                  className={`${styles.textSm} ${styles.fw600}`}
                  style={{ marginBottom: 12 }}
                >
                  <span className={`${styles.tag} ${styles[card.tagClass]}`}>{card.tag}</span>
                  &nbsp;{card.heading}
                </h4>
                <ul className={styles.featureList}>
                  {card.items.map((item) => (
                    <li key={item}>
                      <span className={styles.icon}>&bull;</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Admin card — full width */}
          <div className={`${styles.mt16} ${styles.scrollAnim}`} data-reveal>
            <div className={styles.card}>
              <h4
                className={`${styles.textSm} ${styles.fw600}`}
                style={{ marginBottom: 12 }}
              >
                <span className={`${styles.tag} ${styles.tagYellow}`}>Admin</span>
                &nbsp;Full Management Suite &mdash; 12 Sub-pages
              </h4>
              <div className={styles.techGrid} style={{ marginTop: 16 }}>
                {adminSubPages.map((page) => (
                  <span key={page} className={styles.techBadge}>
                    {page}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
