'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { BookingWizardDemo } from './BookingWizardDemo'
import { DashboardSwitcher } from './DashboardViz'
import { BrowserFrame } from './BrowserFrame'
import styles from '../beauty-secret.module.css'

/* ───── Tab definitions ───── */

const tabs = [
  { id: 'booking', label: 'Booking System' },
  { id: 'dashboards', label: 'Dashboards' },
  { id: 'loyalty', label: 'Loyalty & Gift Cards' },
  { id: 'seo', label: 'SEO & i18n' },
  { id: 'ui', label: 'UI/UX' },
] as const

type TabId = (typeof tabs)[number]['id']

/* ───── Tab content data ───── */

const bookingTimeline = [
  { title: '1. Service Selection', desc: 'Category-filtered with gender grouping & consultation interstitial' },
  { title: '2. Employee Selection', desc: 'Filtered to staff offering the selected service' },
  { title: '3. Date & Time Picker', desc: 'Calendar grid + time slots with conflict-free availability' },
  { title: '4. Customer Form', desc: 'Guest or authenticated \u2014 email/phone deduplication' },
  { title: '5. Summary & Payment', desc: 'Stripe Checkout: 30% deposit or full payment' },
]

const availabilityFeatures = [
  'Dynamic slot computation per service duration',
  'Employee weekly schedules + day-off overrides',
  'Conflict detection prevents double-booking',
  '60-minute lead time enforcement',
  '30-day max advance booking window',
  '15-minute slot intervals',
  'Guest booking (no sign-in required)',
  'Instant booking prefill for quick re-booking',
]

const loyaltyTiers = [
  { name: 'Glow', pts: '0+', desc: 'Entry tier \u2014 earn 20 points per booking' },
  { name: 'Icon', pts: '100+', desc: 'Unlock point redemption' },
  { name: 'Luxe', pts: '300+', desc: 'Enhanced benefits' },
  { name: 'Elite', pts: '600+', desc: 'Premium tier with max discounts' },
]

const giftCardFeatures = [
  'Unique code generation (BS-XXXX-XXXX format)',
  '8 occasion templates with themed gradients',
  'Balance tracking & partial redemption',
  'Expiration management',
  'Admin creation & monitoring',
]

const seoFeatures = [
  '8 category landing pages with JSON-LD structured data',
  'FAQPage, Product, AggregateRating schemas',
  'BreadcrumbList navigation schema',
  'Dynamic sitemap (20 entries)',
  'robots.txt with optimized crawl rules',
  'Open Graph + Twitter Card meta tags',
  'Hreflang tags (EN/RO alternate links)',
  '53-test SEO regression suite',
]

const i18nFeatures = [
  'English & Romanian with next-intl',
  '500+ translation strings per locale',
  'Locale-aware routing (prefix as-needed)',
  'Cookie-based locale persistence (1-year)',
  'Diacritics-aware search (Unicode NFD normalization)',
  'Sacramento font character normalization (comma-below \u2192 cedilla)',
]

const visualDesignFeatures = [
  'Dark/Light theme with CSS variables',
  'Glass-morphism cards (backdrop-filter blur)',
  'GSAP scroll-triggered animations',
  'Radial gradient ambient backgrounds',
  'Responsive from 320px to 4K',
  'Custom scroll reveal with MutationObserver',
]

const uxFeatures = [
  'Gallery lightbox with swipe/keyboard nav',
  'Focus trap on modals (accessibility)',
  'Toast notification system',
  'WhatsApp floating action button',
  'iOS-style map provider action sheet',
  'Error boundary with graceful recovery',
]

/* ───── Feature list helper ───── */

function FeatureList({ items, dataAttr }: { items: string[]; dataAttr?: string }) {
  return (
    <ul className={styles.featureList} data-feature-list={dataAttr}>
      {items.map(item => (
        <li key={item}>
          <span className={styles.featureListIcon}>&#10003;</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

/* ───── Tab panels ───── */

function BookingPanel() {
  return (
    <div data-tab-panel="booking">
      <div className={styles.grid2}>
        {/* Left: Timeline */}
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>5-Step Booking Wizard</h3>
          <p className={`${styles.textSm} ${styles.textMuted}`} style={{ marginBottom: 16 }}>
            A guided flow that walks customers through service selection, employee preference,
            date/time picking with real-time availability, customer details, and a summary with
            payment options.
          </p>
          <div className={styles.timeline}>
            {bookingTimeline.map(step => (
              <div key={step.title} className={`${styles.timelineItem} ${styles.timelineItemActive}`}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineTitle}>{step.title}</div>
                <div className={styles.timelineDesc}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Interactive Wizard Demo */}
        <div>
          <BookingWizardDemo />
        </div>
      </div>
      {/* Smart Availability Engine */}
      <div className={styles.mt32}>
        <h3 className={styles.fw700} style={{ marginBottom: 12 }}>Smart Availability Engine</h3>
        <FeatureList items={availabilityFeatures} dataAttr="availability" />
      </div>
    </div>
  )
}

function DashboardsPanel() {
  return (
    <div data-tab-panel="dashboards">
      <DashboardSwitcher />
      <p className={`${styles.textSm} ${styles.textMuted} ${styles.mt24}`}>
        All dashboards use Convex reactive queries for real-time data synchronization &mdash;
        no polling, automatic cache invalidation on mutations, instant UI updates.
      </p>
    </div>
  )
}

function LoyaltyPanel() {
  return (
    <div data-tab-panel="loyalty">
      <div className={styles.grid2}>
        {/* Left: Loyalty tiers timeline */}
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>4-Tier Loyalty Program</h3>
          <p className={`${styles.textSm} ${styles.textMuted}`} style={{ marginBottom: 16 }}>
            Points-based rewards with automatic tier advancement and discount redemption.
          </p>
          <div className={styles.timeline}>
            {loyaltyTiers.map(tier => (
              <div key={tier.name} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineTitle}>{tier.name} ({tier.pts} pts)</div>
                <div className={styles.timelineDesc}>{tier.desc}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Gift card features */}
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>Gift Card System</h3>
          <FeatureList items={giftCardFeatures} dataAttr="giftcards" />
        </div>
      </div>
    </div>
  )
}

function SeoPanel() {
  return (
    <div data-tab-panel="seo">
      <div className={styles.grid2}>
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>SEO Implementation</h3>
          <FeatureList items={seoFeatures} dataAttr="seo" />
        </div>
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>Internationalization</h3>
          <FeatureList items={i18nFeatures} dataAttr="i18n" />
        </div>
      </div>
      <div className={styles.mt24}>
        <h3 className={styles.fw700} style={{ marginBottom: 12 }}>Category Landing Page</h3>
        <p className={`${styles.textSm} ${styles.textMuted}`} style={{ marginBottom: 16 }}>
          Each service category has a dedicated landing page with JSON-LD structured data, breadcrumbs, FAQ schema, and pricing tables — fully optimized for search engine discoverability.
        </p>
        <BrowserFrame url="b-secret.com/en/services/coafor">
          <Image
            src="/screenshots/b-secret/hairdressing-category.png"
            alt="Hairdressing category page with SEO structured data"
            width={1440}
            height={900}
            quality={80}
            sizes="(max-width: 768px) 100vw, 1100px"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </BrowserFrame>
      </div>
    </div>
  )
}

function ThemeToggleDemo() {
  const [isDark, setIsDark] = useState(false)
  return (
    <div className={styles.mt24}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 className={styles.fw700}>Dark / Light Theme</h3>
        <button
          onClick={() => setIsDark(d => !d)}
          className={styles.themeToggleBtn}
          aria-label="Toggle theme preview"
        >
          <span className={styles.themeToggleTrack} data-active={isDark ? 'dark' : 'light'}>
            <span className={styles.themeToggleThumb} />
          </span>
          <span className={styles.textSm} style={{ marginLeft: 8 }}>
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>
      </div>
      <BrowserFrame url="b-secret.com">
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src="/screenshots/b-secret/landing-page.png"
            alt="Beauty Secret light mode"
            width={1440}
            height={900}
            quality={80}
            sizes="(max-width: 768px) 100vw, 1100px"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              opacity: isDark ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          />
          <Image
            src="/screenshots/b-secret/landing-dark.png"
            alt="Beauty Secret dark mode"
            width={1440}
            height={900}
            quality={80}
            sizes="(max-width: 768px) 100vw, 1100px"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: isDark ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        </div>
      </BrowserFrame>
    </div>
  )
}

function BilingualComparison() {
  return (
    <div className={styles.mt24}>
      <h3 className={styles.fw700} style={{ marginBottom: 12 }}>Bilingual Interface</h3>
      <p className={`${styles.textSm} ${styles.textMuted}`} style={{ marginBottom: 16 }}>
        Full English and Romanian support — locale-aware routing, 500+ translation strings, and diacritics-aware search.
      </p>
      <div className={styles.grid2}>
        <div>
          <div className={`${styles.textXs} ${styles.textDim}`} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            English
          </div>
          <BrowserFrame url="b-secret.com/en">
            <Image
              src="/screenshots/b-secret/landing-page.png"
              alt="Beauty Secret English landing page"
              width={1440}
              height={900}
              quality={80}
              sizes="(max-width: 768px) 100vw, 540px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </BrowserFrame>
        </div>
        <div>
          <div className={`${styles.textXs} ${styles.textDim}`} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            Rom&acirc;n&#259;
          </div>
          <BrowserFrame url="b-secret.com/ro">
            <Image
              src="/screenshots/b-secret/landing-ro.png"
              alt="Beauty Secret Romanian landing page"
              width={1440}
              height={900}
              quality={80}
              sizes="(max-width: 768px) 100vw, 540px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </BrowserFrame>
        </div>
      </div>
    </div>
  )
}

function UiPanel() {
  return (
    <div data-tab-panel="ui">
      <div className={styles.grid2}>
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>Visual Design</h3>
          <FeatureList items={visualDesignFeatures} dataAttr="visual" />
        </div>
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>UX Patterns</h3>
          <FeatureList items={uxFeatures} dataAttr="ux" />
        </div>
      </div>
      <ThemeToggleDemo />
      <BilingualComparison />
    </div>
  )
}

/* ───── Tab panel map ───── */

const panelMap: Record<TabId, React.ComponentType> = {
  booking: BookingPanel,
  dashboards: DashboardsPanel,
  loyalty: LoyaltyPanel,
  seo: SeoPanel,
  ui: UiPanel,
}

/* ═══════════════════════════════════════════════════
   Main Features component
   ═══════════════════════════════════════════════════ */

export function Features() {
  const [activeTab, setActiveTab] = useState<TabId>('booking')
  const sectionRef = useScrollReveal()
  const tabNavRef = useRef<HTMLDivElement>(null)
  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  /* ── Update sliding indicator position ── */
  const updateIndicator = useCallback(() => {
    const activeIndex = tabs.findIndex(t => t.id === activeTab)
    const btn = tabBtnRefs.current[activeIndex]
    const indicator = indicatorRef.current
    const nav = tabNavRef.current
    if (!btn || !indicator || !nav) return

    const navRect = nav.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()

    indicator.style.left = `${btnRect.left - navRect.left}px`
    indicator.style.width = `${btnRect.width}px`
  }, [activeTab])

  /* ── Indicator update on tab change + resize ── */
  useEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  /* ── Tab switch animation ── */
  const switchTab = useCallback((newTab: TabId) => {
    if (newTab === activeTab || !panelRef.current) {
      setActiveTab(newTab)
      return
    }

    if (reduced) {
      setActiveTab(newTab)
      return
    }

    const currentIndex = tabs.findIndex(t => t.id === activeTab)
    const newIndex = tabs.findIndex(t => t.id === newTab)
    const direction = newIndex > currentIndex ? 1 : -1

    // Animate out
    gsap.to(panelRef.current, {
      opacity: 0,
      x: direction * -30,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(newTab)
        // After state update, animate in
        requestAnimationFrame(() => {
          if (!panelRef.current) return
          gsap.fromTo(
            panelRef.current,
            { opacity: 0, x: direction * 30 },
            { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
          )
        })
      },
    })
  }, [activeTab, reduced])

  /* ── Feature list stagger reveals on tab switch ── */
  useEffect(() => {
    if (reduced || !panelRef.current) return

    const featureLists = panelRef.current.querySelectorAll('[data-feature-list] li')
    if (featureLists.length) {
      gsap.fromTo(featureLists,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.04, ease: 'power2.out', delay: 0.15 }
      )
    }

    // Timeline items
    const timelineItems = panelRef.current.querySelectorAll(`.${styles.timelineItem}`)
    if (timelineItems.length) {
      gsap.fromTo(timelineItems,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
      )
    }
  }, [activeTab, reduced])

  const ActivePanel = panelMap[activeTab]

  return (
    <section ref={sectionRef} className={styles.section} id="features">
      <div className={styles.container}>
        {/* Section header */}
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>Core Features</div>
          <h2 className={styles.sectionTitle}>What the Platform Does</h2>
        </div>

        {/* Tab container */}
        <div className={`${styles.tabContainer} ${styles.scrollAnim}`} data-reveal="200">
          {/* Tab navigation */}
          <div className={styles.tabNav} ref={tabNavRef}>
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                ref={el => { tabBtnRefs.current[i] = el }}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
                onClick={() => switchTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            {/* Sliding indicator */}
            <div ref={indicatorRef} className={styles.tabIndicator} />
          </div>

          {/* Tab panel */}
          <div ref={panelRef}>
            <ActivePanel />
          </div>
        </div>
      </div>
    </section>
  )
}
