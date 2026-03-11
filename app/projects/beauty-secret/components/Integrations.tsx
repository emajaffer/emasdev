'use client'
import { useRef, useCallback } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from '../beauty-secret.module.css'

/* ───── Integration card data ───── */

interface IntegrationCard {
  tag: string
  tagClass: string
  title: string
  items: string[]
}

const integrations: IntegrationCard[] = [
  {
    tag: 'Backend',
    tagClass: 'tagPurple',
    title: 'Convex \u2014 Real-Time Database',
    items: [
      '16 tables with optimized indexes for query patterns',
      '157+ server functions (queries, mutations, actions)',
      'WebSocket-driven reactive queries (auto-updating UI)',
      'HTTP actions for webhook endpoints',
      'Convex validators for schema-level type safety',
      'Built-in file storage for uploads',
      'Server-side auth integration with Clerk JWT verification',
    ],
  },
  {
    tag: 'Payments',
    tagClass: 'tagGreen',
    title: 'Stripe \u2014 Payment Processing',
    items: [
      'Checkout session creation (booking + gift card flows)',
      'Flexible payment: 30% deposit or full amount',
      'Webhook handler: checkout.session.completed, charge.refunded',
      'Signature verification on all webhooks',
      'Product catalog sync script',
      'Custom salon branding on checkout pages',
      'Appointment auto-confirmation on payment success',
    ],
  },
  {
    tag: 'Authentication',
    tagClass: 'tagPink',
    title: 'Clerk \u2014 Auth & Identity',
    items: [
      '3-level RBAC: customer, employee, admin',
      'JWT metadata-based role storage',
      'Combined middleware (Clerk auth + next-intl routing)',
      'Server-side role gating (requirePageRole())',
      'Client-side soft checks (softRequireRole())',
      'Convex server-side JWT verification',
      'Phone verification + autofill support',
    ],
  },
  {
    tag: 'Platform',
    tagClass: 'tagYellow',
    title: 'Maps, Social & Messaging',
    items: [
      'Google Maps embed with styled border, glow, loading shimmer',
      'Address click \u2192 native map picker (Google Maps, Waze, Apple Maps)',
      'Geo URI deep links for mobile, HTTPS fallback for desktop',
      'Instagram gallery integration',
      'WhatsApp floating action button for direct salon contact',
      'Vercel Analytics & Speed Insights',
    ],
  },
]

/* ───── Payment flow step data ───── */

interface FlowStep {
  layer: string
  variant: 'frontend' | 'backend' | 'service'
  description: string
}

const flowSteps: FlowStep[] = [
  { layer: 'Customer', variant: 'frontend', description: 'Completes Booking' },
  { layer: 'Convex Mutation', variant: 'backend', description: 'Creates Appointment (PENDING)' },
  { layer: 'Convex Action', variant: 'backend', description: 'Creates Stripe Checkout Session' },
  { layer: 'Stripe Checkout', variant: 'service', description: '30% Deposit or Full Payment' },
  { layer: 'Stripe Webhook', variant: 'service', description: 'checkout.session.completed' },
  { layer: 'Convex HTTP Action', variant: 'backend', description: 'Verifies Signature & Processes' },
  { layer: 'Internal Mutations', variant: 'backend', description: 'Record Payment + Confirm Appointment + Award Loyalty Points' },
]

/* ───── Variant CSS class lookup ───── */

const variantClass: Record<string, string> = {
  frontend: 'archBoxFrontend',
  backend: 'archBoxBackend',
  service: 'archBoxService',
}

/* ───── SVG Arrow between flow steps ───── */

function FlowArrow({ id }: { id: string }) {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}
      data-flow-arrow={id}
    >
      <svg
        width="2"
        height="36"
        viewBox="0 0 2 36"
        aria-hidden="true"
      >
        <defs>
          <marker
            id={`flow-arrowhead-${id}`}
            markerWidth="8"
            markerHeight="6"
            refX="4"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="var(--dim, #766d70)" />
          </marker>
        </defs>
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="30"
          stroke="var(--dim, #766d70)"
          strokeWidth="1.5"
          markerEnd={`url(#flow-arrowhead-${id})`}
        />
      </svg>
    </div>
  )
}

/* ───── 3D Tilt handler ───── */

const MAX_ROTATION = 3

function useTilt() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const setRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width   // 0..1
    const y = (e.clientY - rect.top) / rect.height    // 0..1
    const rotateY = (x - 0.5) * 2 * MAX_ROTATION      // -3..3
    const rotateX = (0.5 - y) * 2 * MAX_ROTATION      // -3..3
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`
  }, [])

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (!card) return
    card.style.transform = ''
  }, [])

  return { setRef, handleMouseMove, handleMouseLeave }
}

/* ───── Main component ───── */

export function Integrations() {
  const sectionRef = useScrollReveal()
  const { setRef, handleMouseMove, handleMouseLeave } = useTilt()

  return (
    <section ref={sectionRef} className={styles.section} id="integrations">
      <div className={styles.container}>
        {/* ── Section header ── */}
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>API Integrations</div>
          <h2 className={styles.sectionTitle}>External Services &amp; How They Connect</h2>
        </div>

        {/* ── Integration cards — 2-column grid with 3D tilt ── */}
        <div className={styles.grid2}>
          {integrations.map((card, i) => (
            <div
              key={card.title}
              ref={setRef(i)}
              className={`${styles.card} ${styles.tiltCard} ${styles.scrollAnim}`}
              data-reveal={`${i * 120}`}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span className={`${styles.tag} ${styles[card.tagClass]}`}>{card.tag}</span>
                <h3 className={styles.fw700}>{card.title}</h3>
              </div>
              <ul className={styles.featureList}>
                {card.items.map((item) => (
                  <li key={item}>
                    <span className={styles.featureListIcon}>&bull;</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Payment Flow Diagram ── */}
        <div className={`${styles.mt32} ${styles.scrollAnim}`} data-reveal>
          <h3 className={`${styles.fw700} ${styles.mb16}`}>
            Payment Flow &mdash; End to End
          </h3>
          <div className={styles.archDiagram}>
            {flowSteps.map((step, i) => (
              <div key={step.layer}>
                {/* Step box */}
                <div className={`${styles.archRow} ${styles.scrollAnim}`} data-reveal={`${i * 80}`}>
                  <div className={`${styles.archBox} ${styles[variantClass[step.variant]]}`}>
                    <strong>{step.layer}</strong>
                    <br />
                    <span style={{ fontWeight: 400, fontSize: '0.75rem' }}>{step.description}</span>
                  </div>
                </div>

                {/* Arrow between steps (not after last) */}
                {i < flowSteps.length - 1 && (
                  <FlowArrow id={`flow-${i}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
