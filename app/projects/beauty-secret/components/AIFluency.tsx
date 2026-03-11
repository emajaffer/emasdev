'use client'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { AnimatedCounter } from './AnimatedCounter'
import styles from '../beauty-secret.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ───── Metric data ───── */

interface Metric {
  val: number
  suffix?: string
  desc: string
}

const metrics: Metric[] = [
  { val: 93, desc: 'AI Co-Authored Commits' },
  { val: 83, suffix: '%', desc: 'of Commits AI-Assisted' },
  { val: 112, desc: 'Total Commits' },
  { val: 1, desc: 'Developer (Solo)' },
]

/* ───── AI info cards ───── */

interface AIInfoCard {
  title: string
  description: string
}

const aiInfoCards: AIInfoCard[] = [
  {
    title: 'CLAUDE.md \u2014 AI Agent Configuration',
    description:
      'A comprehensive 310-line configuration file that serves as the "brain" for Claude Code \u2014 ' +
      'documenting the entire architecture, database schema, routing structure, component organization, ' +
      'data access patterns, authentication flow, and testing strategy. This enables the AI agent to ' +
      'make context-aware decisions across the full stack.',
  },
  {
    title: 'Structured CLAUDE.md Sections',
    description:
      'The configuration includes: project purpose, implemented features, remaining roadmap, ' +
      'CLI commands, architecture decisions, Convex module reference table, routing structure, ' +
      'data access patterns, booking system logic, auth flow, i18n config, component organization, ' +
      'styling system, testing strategy, and a key files reference table.',
  },
]

/* ───── "How AI Was Leveraged" cards ───── */

interface LeverageCard {
  title: string
  description: string
}

const leverageCards: LeverageCard[] = [
  {
    title: 'Architecture & Schema Design',
    description:
      'Collaborative design of the 16-table database schema, index optimization strategy, ' +
      'and the reactive query architecture. The AI agent reasoned about normalization trade-offs, ' +
      'Convex-specific patterns, and real-time query performance.',
  },
  {
    title: 'Feature Implementation',
    description:
      'Complex features like the availability slot algorithm, conflict detection, loyalty tier ' +
      'computation, and Stripe webhook handling were developed iteratively with Claude Code, ' +
      'leveraging its ability to reason about edge cases and time-based logic.',
  },
  {
    title: 'Testing & SEO Regression',
    description:
      'The 53-test SEO regression suite and comprehensive E2E test strategy across 17 device ' +
      'profiles were designed and implemented with AI assistance, ensuring coverage of ' +
      'critical SEO signals and responsive layout integrity.',
  },
  {
    title: 'Security Hardening',
    description:
      'Content Security Policy configuration, HSTS preload setup, dual CSP sync strategy ' +
      '(next.config.ts + vercel.json), and role-based access control patterns were developed ' +
      'with AI guidance on production security best practices.',
  },
  {
    title: 'i18n & Unicode Handling',
    description:
      'Bilingual support with next-intl, 500+ translation strings, diacritics-aware search ' +
      'using Unicode NFD normalization, and Sacramento font character normalization for Romanian ' +
      'characters (comma-below to cedilla mapping).',
  },
  {
    title: 'Iterative UI Polish',
    description:
      'Glass-morphism design system, GSAP animations, responsive breakpoint tuning across ' +
      'commit iterations, and mobile-first layout fixes \u2014 reflecting the rapid ' +
      'iteration cycle enabled by AI-augmented development.',
  },
]

/* ───── CLAUDE.md typewriter lines ───── */

interface TypewriterLine {
  text: string
  type: 'comment' | 'keyword' | 'func' | 'blank'
}

const typewriterLines: TypewriterLine[] = [
  { text: '# CLAUDE.md \u2014 310 lines of structured agent context', type: 'comment' },
  { text: '', type: 'blank' },
  { text: '## Purpose', type: 'keyword' },
  { text: '          # Business domain + target users', type: 'comment' },
  { text: '## Current Status', type: 'keyword' },
  { text: '    # Implemented features + remaining roadmap', type: 'comment' },
  { text: '## Commands', type: 'keyword' },
  { text: '          # All npm scripts for dev, build, test, deploy', type: 'comment' },
  { text: '## Architecture', type: 'keyword' },
  { text: '      # Tech stack + data access patterns', type: 'comment' },
  { text: '  ### Database', type: 'func' },
  { text: '       # Convex schema overview + pricing convention', type: 'comment' },
  { text: '  ### Convex Modules', type: 'func' },
  { text: ' # 22-row reference table (module \u2192 purpose)', type: 'comment' },
  { text: '  ### Routing', type: 'func' },
  { text: '        # Full app/ directory tree + route security', type: 'comment' },
  { text: '  ### Data Access', type: 'func' },
  { text: '    # Server vs. client component pattern + code sample', type: 'comment' },
  { text: '  ### Booking System', type: 'func' },
  { text: ' # Wizard flow + validation rules + guest dedup', type: 'comment' },
  { text: '  ### Authentication', type: 'func' },
  { text: ' # Clerk roles, middleware, JWT metadata', type: 'comment' },
  { text: '  ### i18n', type: 'func' },
  { text: '           # Locales, config, prefix strategy', type: 'comment' },
  { text: '  ### Components', type: 'func' },
  { text: '     # Organization by domain + barrel imports', type: 'comment' },
  { text: '  ### Props Pattern', type: 'func' },
  { text: '  # Callback prop conventions', type: 'comment' },
  { text: '  ### Styling', type: 'func' },
  { text: '        # Brand colors, glass-morphism, gradients', type: 'comment' },
  { text: '  ### Testing', type: 'func' },
  { text: '        # Vitest + Playwright patterns + SEO regression', type: 'comment' },
  { text: '## Key Files', type: 'keyword' },
  { text: '        # 30-row reference table (file \u2192 purpose)', type: 'comment' },
  { text: '## Assets', type: 'keyword' },
  { text: '           # Logo + favicon locations', type: 'comment' },
  { text: '## Env Variables', type: 'keyword' },
  { text: '   # Template (no secrets, just structure)', type: 'comment' },
]

// Merge heading + comment on same conceptual line for display
interface DisplayLine {
  parts: { text: string; className: string }[]
}

function buildDisplayLines(): DisplayLine[] {
  const lines: DisplayLine[] = []
  let i = 0
  while (i < typewriterLines.length) {
    const curr = typewriterLines[i]
    // If this is a keyword/func and next is a comment, merge them
    if (
      (curr.type === 'keyword' || curr.type === 'func') &&
      i + 1 < typewriterLines.length &&
      typewriterLines[i + 1].type === 'comment'
    ) {
      lines.push({
        parts: [
          { text: curr.text, className: curr.type === 'keyword' ? styles.keyword : styles.func },
          { text: typewriterLines[i + 1].text, className: styles.comment },
        ],
      })
      i += 2
    } else if (curr.type === 'blank') {
      lines.push({ parts: [{ text: '', className: '' }] })
      i++
    } else {
      const cls =
        curr.type === 'comment'
          ? styles.comment
          : curr.type === 'keyword'
            ? styles.keyword
            : curr.type === 'func'
              ? styles.func
              : ''
      lines.push({ parts: [{ text: curr.text, className: cls }] })
      i++
    }
  }
  return lines
}

/* ───── Main component ───── */

export function AIFluency() {
  const sectionRef = useScrollReveal()
  const typewriterRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [visibleLines, setVisibleLines] = useState(reduced ? Infinity : 0)
  const displayLines = useRef(buildDisplayLines()).current

  /* ── GSAP: typewriter scroll-driven line reveal only ── */
  useEffect(() => {
    if (reduced) {
      setVisibleLines(Infinity)
      return
    }

    const twEl = typewriterRef.current
    if (!twEl) return

    const totalLines = displayLines.length
    const progressObj = { val: 0 }

    const st = ScrollTrigger.create({
      trigger: twEl,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 0.3,
      onUpdate: (self) => {
        const newVal = Math.floor(self.progress * totalLines)
        if (newVal !== Math.floor(progressObj.val)) {
          progressObj.val = newVal
          setVisibleLines(newVal)
        }
      },
    })

    return () => st.kill()
  }, [reduced, displayLines])

  return (
    <section ref={sectionRef} className={styles.section} id="ai-fluency">
      <div className={styles.container}>
        {/* ── Section header ── */}
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>AI-Augmented Development</div>
          <h2 className={styles.sectionTitle}>Building with Claude Code</h2>
          <p className={styles.sectionDesc}>
            This project demonstrates fluency in AI-augmented software development,
            using Claude Code as a development partner across the entire lifecycle.
          </p>
        </div>

        {/* ── Metric cards ── */}
        <div className={`${styles.grid4} ${styles.mb16}`}>
          {metrics.map((m, i) => (
            <div key={m.desc} className={`${styles.metricCard} ${styles.scrollAnim}`} data-reveal={`${i * 100}`}>
              <div className={styles.metricVal}>
                <AnimatedCounter target={m.val} suffix={m.suffix} />
              </div>
              <div className={styles.metricDesc}>{m.desc}</div>
            </div>
          ))}
        </div>

        {/* ── AI info cards ── */}
        <div className={styles.grid2}>
          {aiInfoCards.map((card, i) => (
            <div key={card.title} className={`${styles.aiCard} ${styles.scrollAnim}`} data-reveal={`${i * 150}`}>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        {/* ── How AI Was Leveraged ── */}
        <div className={styles.mt24}>
          <h3 className={`${styles.fw700} ${styles.mb16} ${styles.scrollAnim}`} data-reveal>How AI Was Leveraged</h3>
          <div className={styles.grid3}>
            {leverageCards.map((card, i) => {
              const col = i % 3
              const row = Math.floor(i / 3)
              const delay = col * 150 + row * 100
              return (
                <div key={card.title} className={`${styles.card} ${styles.scrollAnim}`} data-reveal={`${delay}`}>
                  <h4 className={`${styles.fw600} ${styles.textBrand} ${styles.mb12}`}>
                    {card.title}
                  </h4>
                  <p className={`${styles.textSm} ${styles.textMuted}`}>{card.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── CLAUDE.md Typewriter Code Block ── */}
        <div className={styles.mt32}>
          <h3 className={`${styles.fw700} ${styles.mb16}`}>
            CLAUDE.md Configuration Structure
          </h3>
          <p className={`${styles.textSm} ${styles.textMuted} ${styles.mb16}`}>
            The project&apos;s CLAUDE.md file acts as persistent context for the AI agent.
            Here&apos;s how it&apos;s organized to maximize AI effectiveness:
          </p>
          <div ref={typewriterRef} className={styles.codeBlock}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {displayLines.map((line, i) => {
                if (i >= visibleLines) return null
                return (
                  <div key={i}>
                    {line.parts.map((part, j) => (
                      <span key={j} className={part.className}>
                        {part.text}
                      </span>
                    ))}
                    {/* Blinking cursor on the last visible line */}
                    {i === visibleLines - 1 && <span className={styles.cursor} />}
                  </div>
                )
              })}
              {/* Show cursor even when no lines visible yet */}
              {visibleLines === 0 && <span className={styles.cursor} />}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
