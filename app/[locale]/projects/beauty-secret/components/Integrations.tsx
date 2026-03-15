'use client'
import { useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from '../beauty-secret.module.css'

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
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateY = (x - 0.5) * 2 * MAX_ROTATION
    const rotateX = (0.5 - y) * 2 * MAX_ROTATION
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`
  }, [])

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (!card) return
    card.style.transform = ''
  }, [])

  return { setRef, handleMouseMove, handleMouseLeave }
}

/* ───── SVG Arrow between flow steps ───── */

function FlowArrow({ id }: { id: string }) {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}
      data-flow-arrow={id}
    >
      <svg width="2" height="36" viewBox="0 0 2 36" aria-hidden="true">
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
          x1="1" y1="0" x2="1" y2="30"
          stroke="var(--dim, #766d70)"
          strokeWidth="1.5"
          markerEnd={`url(#flow-arrowhead-${id})`}
        />
      </svg>
    </div>
  )
}

/* ───── Variant CSS class lookup ───── */

const variantClass: Record<string, string> = {
  frontend: 'archBoxFrontend',
  backend: 'archBoxBackend',
  service: 'archBoxService',
}

/* ───── Main component ───── */

export function Integrations() {
  const t = useTranslations('beautySecret.integrations')
  const sectionRef = useScrollReveal()
  const { setRef, handleMouseMove, handleMouseLeave } = useTilt()

  const integrations = [
    {
      tagKey: 'backendTag', tagClass: 'tagPurple', titleKey: 'convexTitle',
      itemKeys: ['convex1', 'convex2', 'convex3', 'convex4', 'convex5', 'convex6', 'convex7'],
    },
    {
      tagKey: 'paymentsTag', tagClass: 'tagGreen', titleKey: 'stripeTitle',
      itemKeys: ['stripe1', 'stripe2', 'stripe3', 'stripe4', 'stripe5', 'stripe6', 'stripe7'],
    },
    {
      tagKey: 'authTag', tagClass: 'tagPink', titleKey: 'clerkTitle',
      itemKeys: ['clerk1', 'clerk2', 'clerk3', 'clerk4', 'clerk5', 'clerk6', 'clerk7'],
    },
    {
      tagKey: 'platformTag', tagClass: 'tagYellow', titleKey: 'mapsTitle',
      itemKeys: ['maps1', 'maps2', 'maps3', 'maps4', 'maps5', 'maps6'],
    },
  ]

  const flowSteps = [
    { layerKey: 'flowCustomer', variant: 'frontend' as const, descKey: 'flowCustomerDesc' },
    { layerKey: 'flowConvexMutation', variant: 'backend' as const, descKey: 'flowConvexMutationDesc' },
    { layerKey: 'flowConvexAction', variant: 'backend' as const, descKey: 'flowConvexActionDesc' },
    { layerKey: 'flowStripeCheckout', variant: 'service' as const, descKey: 'flowStripeCheckoutDesc' },
    { layerKey: 'flowStripeWebhook', variant: 'service' as const, descKey: 'flowStripeWebhookDesc' },
    { layerKey: 'flowConvexHttp', variant: 'backend' as const, descKey: 'flowConvexHttpDesc' },
    { layerKey: 'flowInternalMutations', variant: 'backend' as const, descKey: 'flowInternalMutationsDesc' },
  ]

  return (
    <section ref={sectionRef} className={styles.section} id="integrations">
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>{t('sectionLabel')}</div>
          <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
        </div>

        <div className={styles.grid2}>
          {integrations.map((card, i) => (
            <div
              key={card.titleKey}
              ref={setRef(i)}
              className={`${styles.card} ${styles.tiltCard} ${styles.scrollAnim}`}
              data-reveal={`${i * 120}`}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span className={`${styles.tag} ${styles[card.tagClass]}`}>{t(card.tagKey)}</span>
                <h3 className={styles.fw700}>{t(card.titleKey)}</h3>
              </div>
              <ul className={styles.featureList}>
                {card.itemKeys.map((itemKey) => (
                  <li key={itemKey}>
                    <span className={styles.featureListIcon}>&bull;</span> {t(itemKey)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`${styles.mt32} ${styles.scrollAnim}`} data-reveal>
          <h3 className={`${styles.fw700} ${styles.mb16}`}>
            {t('paymentFlowTitle')}
          </h3>
          <div className={styles.archDiagram}>
            {flowSteps.map((step, i) => (
              <div key={step.layerKey}>
                <div className={`${styles.archRow} ${styles.scrollAnim}`} data-reveal={`${i * 80}`}>
                  <div className={`${styles.archBox} ${styles[variantClass[step.variant]]}`}>
                    <strong>{t(step.layerKey)}</strong>
                    <br />
                    <span style={{ fontWeight: 400, fontSize: '0.75rem' }}>{t(step.descKey)}</span>
                  </div>
                </div>
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
