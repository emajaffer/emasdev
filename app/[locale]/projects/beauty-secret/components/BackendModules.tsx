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
  { module: 'employees / employeeDocuments', functions: '21+', purposeKey: 'employees' },
  { module: 'services / categories', functions: '13+', purposeKey: 'services' },
  { module: 'appointments', functions: '8+', purposeKey: 'appointments' },
  { module: 'availability', functions: '2+', purposeKey: 'availability' },
  { module: 'stripe / payments', functions: '13+', purposeKey: 'stripe' },
  { module: 'http', functions: '4', purposeKey: 'http' },
  { module: 'messaging / messagingActions', functions: '10+', purposeKey: 'messaging' },
  { module: 'smsCampaigns', functions: '8+', purposeKey: 'smsCampaigns' },
  { module: 'reminders', functions: '6+', purposeKey: 'reminders' },
  { module: 'loyaltyTiers / Transactions / Benefits / Notifications', functions: '12+', purposeKey: 'loyalty' },
  { module: 'reviews / googleReviews', functions: '6+', purposeKey: 'reviews' },
  { module: 'giftCards', functions: '4+', purposeKey: 'giftCards' },
  { module: 'customers / clerkSync', functions: '8+', purposeKey: 'customers' },
  { module: 'customerOnboarding / Actions', functions: '6+', purposeKey: 'onboarding' },
  { module: 'inventory / inventoryDashboard', functions: '8+', purposeKey: 'inventory' },
  { module: 'laserConsentForms / TreatmentSheets / Tokens', functions: '10+', purposeKey: 'laser' },
  { module: 'promotions', functions: '4+', purposeKey: 'promotions' },
  { module: 'depositRequests / Mutations', functions: '4+', purposeKey: 'deposits' },
  { module: 'closingTaskRotation', functions: '3+', purposeKey: 'closingTasks' },
  { module: 'profileChangeRequests', functions: '4+', purposeKey: 'profileChangeRequests' },
  { module: 'profileTranslation', functions: '2+', purposeKey: 'profileTranslation' },
  { module: 'salaryPayments / expenses', functions: '6+', purposeKey: 'salaryPayments' },
  { module: 'instagram', functions: '3+', purposeKey: 'instagram' },
  { module: 'crons', functions: '14', purposeKey: 'crons' },
  { module: 'salonSettings', functions: '2+', purposeKey: 'salonSettings' },
  { module: 'seed', functions: '1', purposeKey: 'seed' },
  { module: 'helpers/* (21 modules)', functions: '40+', purposeKey: 'helpers' },
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
            <AnimatedCounter target={300} suffix="+" />
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
