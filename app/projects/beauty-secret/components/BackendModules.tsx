'use client'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { AnimatedCounter } from './AnimatedCounter'
import styles from '../beauty-secret.module.css'

/* ───── Module data ───── */

interface BackendModule {
  module: string
  functions: string
  purpose: string
}

const modules: BackendModule[] = [
  { module: 'adminDashboard', functions: '23+', purpose: 'Revenue stats, pending appointments, staff metrics' },
  { module: 'employeeDashboard', functions: '11+', purpose: "Today's schedule, weekly appointments, earnings" },
  { module: 'customerDashboard', functions: '7+', purpose: 'Appointment history, loyalty points, tier status' },
  { module: 'employees', functions: '21+', purpose: 'CRUD, role assignment, availability mutations' },
  { module: 'services', functions: '6+', purpose: 'Service catalog management with category filtering' },
  { module: 'categories', functions: '7+', purpose: 'Category CRUD and slug-based lookups' },
  { module: 'appointments', functions: '8+', purpose: 'Booking CRUD with conflict detection' },
  { module: 'availability', functions: '2+', purpose: 'Smart slot computation with overrides' },
  { module: 'stripe', functions: '10+', purpose: 'Checkout sessions, branding, metadata' },
  { module: 'http', functions: '1', purpose: 'Stripe webhook endpoint router' },
  { module: 'payments', functions: '3+', purpose: 'Payment tracking and status management' },
  { module: 'reviews', functions: '3+', purpose: 'Rating aggregation and listing' },
  { module: 'giftCards', functions: '4+', purpose: 'Code generation, balance, redemption' },
  { module: 'customers', functions: '4+', purpose: 'CRUD with email/phone deduplication' },
  { module: 'salaryPayments', functions: '4+', purpose: 'Payroll and commission tracking' },
  { module: 'loyaltyTiers', functions: '2+', purpose: 'Tier definitions and point thresholds' },
  { module: 'loyaltyHistory', functions: '2+', purpose: 'Point transaction history' },
  { module: 'profileChangeRequests', functions: '4+', purpose: 'Employee profile edit approval workflow' },
  { module: 'salonSettings', functions: '2+', purpose: 'Global settings singleton' },
  { module: 'expenses', functions: '2+', purpose: 'Operating cost management' },
  { module: 'seed', functions: '1', purpose: 'Database seeding (177 services, 4 employees, 4 tiers)' },
  { module: 'helpers/*', functions: '6+', purpose: 'Auth, conflicts, pricing, loyalty, changelog, dedup' },
]

export function BackendModules() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className={styles.section} id="backend">
      <div className={styles.container}>
        {/* Section header */}
        <div className={`${styles.sectionHeader} ${styles.scrollAnim}`} data-reveal>
          <div className={styles.sectionLabel}>Backend Deep Dive</div>
          <h2 className={styles.sectionTitle}>Convex Module Architecture</h2>
          <p className={styles.sectionDesc}>
            22 backend modules with 157+ server functions powering the entire application.
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
            Server Functions
          </div>
        </div>

        {/* Module table */}
        <div className={styles.codeBlock} style={{ overflowX: 'auto' }}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Module</th>
                <th>Functions</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((row, i) => (
                <tr key={row.module} className={styles.scrollAnimLeft} data-reveal={`${i * 30}`}>
                  <td>
                    <code>{row.module}</code>
                  </td>
                  <td>{row.functions}</td>
                  <td>{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
