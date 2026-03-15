'use client'
import { useTranslations } from 'next-intl'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { AnimatedCounter } from './AnimatedCounter'
import styles from '../beauty-secret.module.css'

/* ───── Module data ───── */

interface BackendModule {
  module: string
  functions: string
  purposeKey: string
}

const modules: BackendModule[] = [
  { module: 'adminDashboard', functions: '23+', purposeKey: 'adminDashboard' },
  { module: 'employeeDashboard', functions: '11+', purposeKey: 'employeeDashboard' },
  { module: 'customerDashboard', functions: '7+', purposeKey: 'customerDashboard' },
  { module: 'employees', functions: '21+', purposeKey: 'employees' },
  { module: 'services', functions: '6+', purposeKey: 'services' },
  { module: 'categories', functions: '7+', purposeKey: 'categories' },
  { module: 'appointments', functions: '8+', purposeKey: 'appointments' },
  { module: 'availability', functions: '2+', purposeKey: 'availability' },
  { module: 'stripe', functions: '10+', purposeKey: 'stripe' },
  { module: 'http', functions: '1', purposeKey: 'http' },
  { module: 'payments', functions: '3+', purposeKey: 'payments' },
  { module: 'reviews', functions: '3+', purposeKey: 'reviews' },
  { module: 'giftCards', functions: '4+', purposeKey: 'giftCards' },
  { module: 'customers', functions: '4+', purposeKey: 'customers' },
  { module: 'salaryPayments', functions: '4+', purposeKey: 'salaryPayments' },
  { module: 'loyaltyTiers', functions: '2+', purposeKey: 'loyaltyTiers' },
  { module: 'loyaltyHistory', functions: '2+', purposeKey: 'loyaltyHistory' },
  { module: 'profileChangeRequests', functions: '4+', purposeKey: 'profileChangeRequests' },
  { module: 'salonSettings', functions: '2+', purposeKey: 'salonSettings' },
  { module: 'expenses', functions: '2+', purposeKey: 'expenses' },
  { module: 'seed', functions: '1', purposeKey: 'seed' },
  { module: 'helpers/*', functions: '6+', purposeKey: 'helpers' },
]

export function BackendModules() {
  const t = useTranslations('beautySecret.backendModules')
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className={styles.section} id="backend">
      <div className={styles.container}>
        {/* Section header */}
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>{t('sectionLabel')}</div>
          <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
          <p className={styles.sectionDesc}>
            {t('sectionDesc')}
          </p>
        </div>

        {/* Hero stat */}
        <div
          className={styles.scrollAnim}
          data-reveal="100"
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <div className={styles.metricVal} style={{ fontSize: '3.5rem' }}>
            <AnimatedCounter target={157} suffix="+" />
          </div>
          <div
            className={styles.textDim}
            style={{ fontSize: '0.88rem', marginTop: 4 }}
          >
            {t('serverFunctions')}
          </div>
        </div>

        {/* Module table */}
        <div className={styles.codeBlock} style={{ overflowX: 'auto' }}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>{t('thModule')}</th>
                <th>{t('thFunctions')}</th>
                <th>{t('thPurpose')}</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((row, i) => (
                <tr key={row.module} className={styles.scrollAnimLeft} data-reveal={`${i * 30}`}>
                  <td>
                    <code>{row.module}</code>
                  </td>
                  <td>{row.functions}</td>
                  <td>{t(row.purposeKey)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
