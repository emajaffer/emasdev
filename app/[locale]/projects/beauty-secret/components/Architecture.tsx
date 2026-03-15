'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from '../beauty-secret.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ───── Architecture layers data ───── */

interface ArchBox {
  title: string
  subKey: string
}

interface ArchLayer {
  labelKey: string
  variant: string
  boxes: ArchBox[]
}

interface ArchArrow {
  textKey: string
}

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
  const t = useTranslations('beautySecret.architecture')
  const sectionRef = useScrollReveal()
  const diagramRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const layers: ArchLayer[] = [
    {
      labelKey: 'clientLayer',
      variant: 'frontend',
      boxes: [
        { title: 'Next.js 16', subKey: 'appRouterRsc' },
        { title: 'React 19', subKey: 'components102' },
        { title: 'Tailwind CSS 4', subKey: 'darkLightThemes' },
      ],
    },
    {
      labelKey: 'middleware',
      variant: 'backend',
      boxes: [
        { title: 'Clerk Auth', subKey: 'jwtRbac' },
        { title: 'next-intl', subKey: 'i18nRouting' },
        { title: 'Proxy Middleware', subKey: 'authLocale' },
      ],
    },
    {
      labelKey: 'backendLayer',
      variant: 'backend',
      boxes: [
        { title: 'Convex', subKey: 'realtimeServerlessDb' },
        { title: '157+ Functions', subKey: 'queriesMutations' },
        { title: 'HTTP Actions', subKey: 'webhookEndpoints' },
      ],
    },
    {
      labelKey: 'thirdPartyServices',
      variant: 'service',
      boxes: [
        { title: 'Stripe', subKey: 'paymentsWebhooks' },
        { title: 'Google Maps', subKey: 'embedDirections' },
        { title: 'Instagram', subKey: 'galleryFeed' },
        { title: 'WhatsApp', subKey: 'directContact' },
      ],
    },
    {
      labelKey: 'infrastructure',
      variant: 'infra',
      boxes: [
        { title: 'Vercel', subKey: 'edgeNetwork' },
        { title: 'Convex Cloud', subKey: 'serverlessBackend' },
        { title: 'Clerk Hosted', subKey: 'authInfrastructure' },
      ],
    },
  ]

  const arrows: ArchArrow[] = [
    { textKey: 'websocketRest' },
    { textKey: 'reactiveQueriesMutations' },
    { textKey: 'externalIntegrations' },
    { textKey: '' },
  ]

  const dbTables = [
    { name: 'categories', purposeKey: 'dbCategories', featuresKey: 'dbCategoriesFeatures' },
    { name: 'services', purposeKey: 'dbServices', featuresKey: 'dbServicesFeatures' },
    { name: 'employees', purposeKey: 'dbEmployees', featuresKey: 'dbEmployeesFeatures' },
    { name: 'employeeAvailability', purposeKey: 'dbEmployeeAvailability', featuresKey: 'dbEmployeeAvailabilityFeatures' },
    { name: 'employeeScheduleOverrides', purposeKey: 'dbEmployeeScheduleOverrides', featuresKey: 'dbEmployeeScheduleOverridesFeatures' },
    { name: 'customers', purposeKey: 'dbCustomers', featuresKey: 'dbCustomersFeatures' },
    { name: 'appointments', purposeKey: 'dbAppointments', featuresKey: 'dbAppointmentsFeatures' },
    { name: 'payments', purposeKey: 'dbPayments', featuresKey: 'dbPaymentsFeatures' },
    { name: 'reviews', purposeKey: 'dbReviews', featuresKey: 'dbReviewsFeatures' },
    { name: 'giftCards', purposeKey: 'dbGiftCards', featuresKey: 'dbGiftCardsFeatures' },
    { name: 'loyaltyTiers', purposeKey: 'dbLoyaltyTiers', featuresKey: 'dbLoyaltyTiersFeatures' },
    { name: 'loyaltyHistory', purposeKey: 'dbLoyaltyHistory', featuresKey: 'dbLoyaltyHistoryFeatures' },
    { name: 'salaryPayments', purposeKey: 'dbSalaryPayments', featuresKey: 'dbSalaryPaymentsFeatures' },
    { name: 'expenses', purposeKey: 'dbExpenses', featuresKey: 'dbExpensesFeatures' },
    { name: 'changeLogs', purposeKey: 'dbChangeLogs', featuresKey: 'dbChangeLogsFeatures' },
    { name: 'salonSettings', purposeKey: 'dbSalonSettings', featuresKey: 'dbSalonSettingsFeatures' },
  ]

  const routeCards = [
    {
      tagKey: 'public',
      tagClass: 'tagGreen',
      headingKey: 'customerFacing',
      itemKeys: ['landingPage', 'serviceBrowsing', 'seoLandingPages', 'signInUp'],
    },
    {
      tagKey: 'protected',
      tagClass: 'tagPurple',
      headingKey: 'customerDashboard',
      itemKeys: ['appointmentsUpcoming', 'loyaltyTierPoints', 'profileManagement', 'bookingPreferences'],
    },
    {
      tagKey: 'protected',
      tagClass: 'tagPink',
      headingKey: 'employeeDashboard',
      itemKeys: ['todaysSchedule', 'earningsPerformance', 'availabilityManagement', 'achievementsReviews'],
    },
  ]

  const adminSubPages = [
    'Appointments', 'Calendar + Heatmap', 'Staff Management',
    'Service Catalog', 'Customer CRM', 'Financial Reports',
    'Performance Analytics', 'Review Moderation', 'Gift Cards',
    'Activity / Audit Log', 'Alerts System', 'Salary Payouts',
  ]

  /* ── GSAP: pinned scrollytelling for architecture diagram only ── */
  useEffect(() => {
    if (reduced || !diagramRef.current) return

    const diagram = diagramRef.current
    const layerGroups = diagram.querySelectorAll<HTMLElement>('[data-layer]')
    const arrowWraps = diagram.querySelectorAll<HTMLElement>('[data-arrow]')

    gsap.set(layerGroups, { opacity: 0, y: 20 })
    gsap.set(arrowWraps, { opacity: 0 })

    const isDesktop = window.matchMedia('(min-width: 769px)').matches

    const ctx = gsap.context(() => {
      if (isDesktop) {
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
  }, [reduced, layers.length, arrows.length])

  return (
    <section ref={sectionRef} className={styles.section} id="architecture">
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>{t('sectionLabel')}</div>
          <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
          <p className={styles.sectionDesc}>{t('sectionDesc')}</p>
        </div>

        <div ref={diagramRef} className={styles.archDiagram}>
          {layers.map((layer, i) => (
            <div key={layer.labelKey}>
              <div className={styles.archLayerGroup} data-layer={i}>
                <div className={styles.archLayerLabel}>{t(layer.labelKey)}</div>
                <div className={styles.archRow}>
                  {layer.boxes.map((box) => (
                    <div
                      key={box.title}
                      className={`${styles.archBox} ${styles[layer.variant] || ''}`}
                    >
                      <strong>{box.title}</strong>
                      <br />
                      <span className={styles.archBoxSub}>{t(box.subKey)}</span>
                    </div>
                  ))}
                </div>
              </div>
              {i < arrows.length && (
                <ArrowSVG label={arrows[i].textKey ? t(arrows[i].textKey) : ''} id={`arrow-${i}`} />
              )}
            </div>
          ))}
        </div>

        <div className={`${styles.mt32} ${styles.scrollAnim}`} data-reveal>
          <h3 className={styles.fw700} style={{ marginBottom: 16 }}>
            {t('dbSchemaTitle')}
          </h3>
          <p className={`${styles.textSm} ${styles.textMuted}`} style={{ marginBottom: 16 }}>
            {t('dbSchemaDesc')}
          </p>
          <div className={styles.codeBlock} style={{ overflowX: 'auto' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>{t('thTable')}</th>
                  <th>{t('thPurpose')}</th>
                  <th>{t('thKeyFeatures')}</th>
                </tr>
              </thead>
              <tbody>
                {dbTables.map((row) => (
                  <tr key={row.name}>
                    <td><code>{row.name}</code></td>
                    <td>{t(row.purposeKey)}</td>
                    <td>{t(row.featuresKey)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.mt32}>
          <h3 className={styles.fw700} style={{ marginBottom: 16 }}>
            {t('appRoutesTitle')}
          </h3>

          <div className={styles.grid3}>
            {routeCards.map((card, i) => (
              <div key={card.headingKey} className={`${styles.card} ${styles.scrollAnim}`} data-reveal={`${i * 120}`}>
                <h4
                  className={`${styles.textSm} ${styles.fw600}`}
                  style={{ marginBottom: 12 }}
                >
                  <span className={`${styles.tag} ${styles[card.tagClass]}`}>{t(card.tagKey)}</span>
                  &nbsp;{t(card.headingKey)}
                </h4>
                <ul className={styles.featureList}>
                  {card.itemKeys.map((itemKey) => (
                    <li key={itemKey}>
                      <span className={styles.icon}>&bull;</span> {t(itemKey)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={`${styles.mt16} ${styles.scrollAnim}`} data-reveal>
            <div className={styles.card}>
              <h4
                className={`${styles.textSm} ${styles.fw600}`}
                style={{ marginBottom: 12 }}
              >
                <span className={`${styles.tag} ${styles.tagYellow}`}>Admin</span>
                &nbsp;{t('adminFullSuite')}
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
