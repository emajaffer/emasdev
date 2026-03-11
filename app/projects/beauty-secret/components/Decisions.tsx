'use client'
import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from '../beauty-secret.module.css'

/* ───── Decision card data ───── */

interface Decision {
  title: string
  preview: string
  full: string
}

const decisions: Decision[] = [
  {
    title: 'Convex Over Prisma/Drizzle',
    preview:
      'Chose Convex for its real-time WebSocket reactivity and end-to-end type safety from database to UI.',
    full:
      'Convex provides automatic WebSocket-driven live updates without manual subscription management. ' +
      'Every query result is reactive by default -- when underlying data changes, connected clients update instantly. ' +
      'This eliminated the need for polling, cache invalidation, or manual refetch logic that Prisma/Drizzle ' +
      'would require. The trade-off is vendor lock-in to Convex\'s serverless platform, but the DX gains ' +
      '(automatic TypeScript codegen, zero-config real-time, built-in file storage) justified this for a ' +
      'client project where development velocity and reliability matter more than infrastructure portability.',
  },
  {
    title: 'Soft vs. Strict Role Checks',
    preview:
      'Implemented dual auth patterns: softRequireRole for graceful degradation, requireRole for hard blocks.',
    full:
      'Two distinct authorization helpers serve different UX needs. `softRequireRole` returns null instead of ' +
      'throwing, allowing components to gracefully degrade (e.g., show a "request access" prompt instead of a ' +
      '403 page). `requireRole` throws immediately, used for mutations and sensitive data endpoints where ' +
      'partial access makes no sense. This dual pattern means the admin dashboard can render a skeleton ' +
      'while checking permissions, while payment mutations fail fast if role checks don\'t pass. Both ' +
      'patterns verify Clerk JWT claims server-side through Convex\'s auth context.',
  },
  {
    title: 'Time-as-Minutes for Slot Computation',
    preview:
      'Store availability as minutes-since-midnight for efficient integer range comparisons.',
    full:
      'Instead of storing time as HH:MM strings or Date objects, availability windows use minutes-since-midnight ' +
      '(e.g., 9:00 AM = 540, 5:30 PM = 1050). This enables slot computation with simple integer arithmetic: ' +
      'checking if a requested time falls within a window becomes `start <= requestedMinutes && requestedMinutes + ' +
      'duration <= end`. No timezone parsing, no string comparison, no Date object overhead. The conversion ' +
      'happens once at the API boundary. Schedule overrides (day-offs, custom hours) use the same integer ' +
      'representation, making conflict detection a straightforward range overlap check.',
  },
  {
    title: 'Dual CSP Configuration Strategy',
    preview:
      'Vercel overrides Next.js headers, requiring CSP to be defined in both next.config.ts and vercel.json.',
    full:
      'Next.js `headers()` in next.config.ts works correctly in development and self-hosted deployments, but ' +
      'Vercel\'s edge network applies its own header rules that can override or conflict with Next.js headers. ' +
      'The solution: define the CSP policy in both locations and keep them synchronized. A shared constant ' +
      'generates the CSP string used in both configs, ensuring any domain allowlist change propagates ' +
      'automatically. This dual-config approach is documented as a known Vercel behavior, and the shared ' +
      'constant pattern prevents drift between the two definitions.',
  },
  {
    title: 'Locale as Route Segment',
    preview:
      'Used [locale] dynamic segment with next-intl\'s "prefix as-needed" strategy for clean URLs.',
    full:
      'The `[locale]` route segment integrates with next-intl\'s middleware to provide internationalized ' +
      'routing. The "prefix as-needed" strategy means the default locale (English) gets clean URLs without ' +
      'a prefix (`/services`), while non-default locales get prefixed (`/ro/services`). This gives the best ' +
      'SEO outcome: English pages have the shortest, most canonical URLs while Romanian pages are still ' +
      'fully indexable with their locale prefix. The middleware handles detection, redirection, and cookie ' +
      'persistence of locale preference. All 38 routes support both languages through message JSON files ' +
      'and the `useTranslations` hook.',
  },
  {
    title: 'Prices in Cents',
    preview:
      'Store all monetary values as integers (cents) for financial precision, aligning with Stripe\'s API.',
    full:
      'Floating-point arithmetic introduces rounding errors that are unacceptable for financial calculations ' +
      '(e.g., 0.1 + 0.2 !== 0.3 in JavaScript). Storing prices in cents (integer) eliminates this entirely: ' +
      'a 45.50 RON service is stored as 4550. This aligns directly with Stripe\'s API, which also uses ' +
      'cents, removing conversion at the payment boundary. Display formatting happens once in a shared ' +
      '`formatPrice` helper that divides by 100 and applies locale-appropriate formatting. Deposit ' +
      'calculations (30% of total) use integer math with `Math.round()` to handle sub-cent remainders ' +
      'deterministically.',
  },
]

export function Decisions() {
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
          <div className={styles.sectionLabel}>Engineering Decisions</div>
          <h2 className={styles.sectionTitle}>
            Architecture Trade-Offs &amp; Rationale
          </h2>
        </div>

        {/* 2-column decision cards */}
        <div className={styles.grid2}>
          {decisions.map((d, i) => {
            const isExpanded = expandedIndex === i
            return (
              <div
                key={d.title}
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
                  {d.title}
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
                    {d.preview}
                  </p>
                  {isExpanded && (
                    <p
                      className={`${styles.textSm} ${styles.textMuted}`}
                      style={{ marginTop: 12 }}
                    >
                      {d.full}
                    </p>
                  )}
                </div>
                <button
                  className={styles.expandToggle}
                  onClick={() => toggle(i)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
