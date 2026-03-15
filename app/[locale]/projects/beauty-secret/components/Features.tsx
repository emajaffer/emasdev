'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useTranslations } from 'next-intl'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { BookingWizardDemo } from './BookingWizardDemo'
import { DashboardSwitcher } from './DashboardViz'
import { BrowserFrame } from './BrowserFrame'
import styles from '../beauty-secret.module.css'

/* ───── Tab definitions ───── */

const tabIds = ['booking', 'dashboards', 'loyalty', 'seo', 'ui'] as const
type TabId = (typeof tabIds)[number]

const tabLabelKeys: Record<TabId, string> = {
  booking: 'bookingSystem',
  dashboards: 'dashboards',
  loyalty: 'loyaltyGiftCards',
  seo: 'seoI18n',
  ui: 'uiUx',
}

/* ───── Feature list helper ───── */

function FeatureList({ items, dataAttr }: { items: string[]; dataAttr?: string }) {
  return (
    <ul className={styles.featureList} data-feature-list={dataAttr}>
      {items.map((item, i) => (
        <li key={i}>
          <span className={styles.featureListIcon}>&#10003;</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

/* ───── Tab panels ───── */

function BookingPanel() {
  const t = useTranslations('beautySecret.features')

  const bookingTimeline = [
    { title: t('step1Title'), desc: t('step1Desc') },
    { title: t('step2Title'), desc: t('step2Desc') },
    { title: t('step3Title'), desc: t('step3Desc') },
    { title: t('step4Title'), desc: t('step4Desc') },
    { title: t('step5Title'), desc: t('step5Desc') },
  ]

  const availabilityFeatures = [
    t('avail1'), t('avail2'), t('avail3'), t('avail4'),
    t('avail5'), t('avail6'), t('avail7'), t('avail8'),
  ]

  return (
    <div data-tab-panel="booking">
      <div className={styles.grid2}>
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('bookingWizardTitle')}</h3>
          <p className={`${styles.textSm} ${styles.textMuted}`} style={{ marginBottom: 16 }}>
            {t('bookingWizardDesc')}
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
        <div>
          <BookingWizardDemo />
        </div>
      </div>
      <div className={styles.mt32}>
        <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('smartAvailability')}</h3>
        <FeatureList items={availabilityFeatures} dataAttr="availability" />
      </div>
    </div>
  )
}

function DashboardsPanel() {
  const t = useTranslations('beautySecret.features')
  return (
    <div data-tab-panel="dashboards">
      <DashboardSwitcher />
      <p className={`${styles.textSm} ${styles.textMuted} ${styles.mt24}`}>
        {t('dashboardsDesc')}
      </p>
    </div>
  )
}

function LoyaltyPanel() {
  const t = useTranslations('beautySecret.features')

  const loyaltyTiers = [
    { name: 'Glow', pts: '0+', desc: t('tierGlow') },
    { name: 'Icon', pts: '100+', desc: t('tierIcon') },
    { name: 'Luxe', pts: '300+', desc: t('tierLuxe') },
    { name: 'Elite', pts: '600+', desc: t('tierElite') },
  ]

  const giftCardFeatures = [
    t('gift1'), t('gift2'), t('gift3'), t('gift4'), t('gift5'),
  ]

  return (
    <div data-tab-panel="loyalty">
      <div className={styles.grid2}>
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('loyaltyTitle')}</h3>
          <p className={`${styles.textSm} ${styles.textMuted}`} style={{ marginBottom: 16 }}>
            {t('loyaltyDesc')}
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
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('giftCardTitle')}</h3>
          <FeatureList items={giftCardFeatures} dataAttr="giftcards" />
        </div>
      </div>
    </div>
  )
}

function SeoPanel() {
  const t = useTranslations('beautySecret.features')

  const seoFeatures = [
    t('seo1'), t('seo2'), t('seo3'), t('seo4'),
    t('seo5'), t('seo6'), t('seo7'), t('seo8'),
  ]

  const i18nFeatures = [
    t('i18n1'), t('i18n2'), t('i18n3'), t('i18n4'), t('i18n5'), t('i18n6'),
  ]

  return (
    <div data-tab-panel="seo">
      <div className={styles.grid2}>
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('seoTitle')}</h3>
          <FeatureList items={seoFeatures} dataAttr="seo" />
        </div>
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('i18nTitle')}</h3>
          <FeatureList items={i18nFeatures} dataAttr="i18n" />
        </div>
      </div>
      <div className={styles.mt24}>
        <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('categoryLandingTitle')}</h3>
        <p className={`${styles.textSm} ${styles.textMuted}`} style={{ marginBottom: 16 }}>
          {t('categoryLandingDesc')}
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
  const t = useTranslations('beautySecret.features')
  const [isDark, setIsDark] = useState(false)
  return (
    <div className={styles.mt24}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 className={styles.fw700}>{t('darkLightTheme')}</h3>
        <button
          onClick={() => setIsDark(d => !d)}
          className={styles.themeToggleBtn}
          aria-label="Toggle theme preview"
        >
          <span className={styles.themeToggleTrack} data-active={isDark ? 'dark' : 'light'}>
            <span className={styles.themeToggleThumb} />
          </span>
          <span className={styles.textSm} style={{ marginLeft: 8 }}>
            {isDark ? t('dark') : t('light')}
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
              width: '100%', height: 'auto', display: 'block',
              opacity: isDark ? 0 : 1, transition: 'opacity 0.5s ease',
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
              width: '100%', height: 'auto', display: 'block',
              position: 'absolute', top: 0, left: 0,
              opacity: isDark ? 1 : 0, transition: 'opacity 0.5s ease',
            }}
          />
        </div>
      </BrowserFrame>
    </div>
  )
}

function BilingualComparison() {
  const t = useTranslations('beautySecret.features')
  return (
    <div className={styles.mt24}>
      <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('bilingualTitle')}</h3>
      <p className={`${styles.textSm} ${styles.textMuted}`} style={{ marginBottom: 16 }}>
        {t('bilingualDesc')}
      </p>
      <div className={styles.grid2}>
        <div>
          <div className={`${styles.textXs} ${styles.textDim}`} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            {t('english')}
          </div>
          <BrowserFrame url="b-secret.com/en">
            <Image
              src="/screenshots/b-secret/landing-page.png"
              alt="Beauty Secret English landing page"
              width={1440} height={900} quality={80}
              sizes="(max-width: 768px) 100vw, 540px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </BrowserFrame>
        </div>
        <div>
          <div className={`${styles.textXs} ${styles.textDim}`} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            {t('romana')}
          </div>
          <BrowserFrame url="b-secret.com/ro">
            <Image
              src="/screenshots/b-secret/landing-ro.png"
              alt="Beauty Secret Romanian landing page"
              width={1440} height={900} quality={80}
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
  const t = useTranslations('beautySecret.features')

  const visualDesignFeatures = [
    t('vis1'), t('vis2'), t('vis3'), t('vis4'), t('vis5'), t('vis6'),
  ]

  const uxFeatures = [
    t('ux1'), t('ux2'), t('ux3'), t('ux4'), t('ux5'), t('ux6'),
  ]

  return (
    <div data-tab-panel="ui">
      <div className={styles.grid2}>
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('visualDesignTitle')}</h3>
          <FeatureList items={visualDesignFeatures} dataAttr="visual" />
        </div>
        <div>
          <h3 className={styles.fw700} style={{ marginBottom: 12 }}>{t('uxTitle')}</h3>
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
  const t = useTranslations('beautySecret.features')
  const [activeTab, setActiveTab] = useState<TabId>('booking')
  const sectionRef = useScrollReveal()
  const tabNavRef = useRef<HTMLDivElement>(null)
  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const tabs = tabIds.map(id => ({ id, label: t(tabLabelKeys[id]) }))

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
  }, [activeTab, tabs])

  useEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

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

    gsap.to(panelRef.current, {
      opacity: 0,
      x: direction * -30,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(newTab)
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
  }, [activeTab, reduced, tabs])

  useEffect(() => {
    if (reduced || !panelRef.current) return

    const featureLists = panelRef.current.querySelectorAll('[data-feature-list] li')
    if (featureLists.length) {
      gsap.fromTo(featureLists,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.04, ease: 'power2.out', delay: 0.15 }
      )
    }

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
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>{t('sectionLabel')}</div>
          <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
        </div>

        <div className={`${styles.tabContainer} ${styles.scrollAnim}`} data-reveal="200">
          <div className={styles.tabNav} ref={tabNavRef}>
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                ref={el => { tabBtnRefs.current[i] = el }}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
                onClick={() => switchTab(tab.id as TabId)}
              >
                {tab.label}
              </button>
            ))}
            <div ref={indicatorRef} className={styles.tabIndicator} />
          </div>

          <div ref={panelRef}>
            <ActivePanel />
          </div>
        </div>
      </div>
    </section>
  )
}
