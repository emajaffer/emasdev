'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import styles from '../beauty-secret.module.css'

/* ───── Shared helpers ───── */

const brandGradient = 'linear-gradient(135deg, var(--brand), var(--brand2))'

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className={styles.wizardDemo}>
      <div className={styles.browserTitleBar}>
        <div className={styles.browserDots}>
          <span className={styles.browserDot} style={{ background: '#ff5f57' }} />
          <span className={styles.browserDot} style={{ background: '#febc2e' }} />
          <span className={styles.browserDot} style={{ background: '#28c840' }} />
        </div>
        <div className={styles.browserUrlBar}>{url}</div>
      </div>
      <div style={{ padding: 20 }}>
        {children}
      </div>
    </div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.dashStat}>
      <div className={styles.dashStatVal}>{value}</div>
      <div className={styles.dashStatLabel}>{label}</div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   1. Customer Dashboard Visualization
   ═══════════════════════════════════════════════════ */

export function CustomerDashViz() {
  const t = useTranslations('beautySecret.dashboards')

  return (
    <BrowserChrome url="b-secret.com/dashboard">
      {/* Stat cards */}
      <div className={styles.dashStatRow}>
        <StatCard value="2" label={t('upcoming')} />
        <StatCard value="8" label={t('completed')} />
        <StatCard value="450" label={t('totalSpent')} />
        <StatCard value="160" label={t('loyaltyPoints')} />
      </div>

      {/* Next appointment */}
      <div style={{
        marginTop: 16,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        padding: 16,
      }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 8 }}>
          {t('nextAppointment')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>
              Haircut & Style
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 2 }}>
              Mar 15, 10:30 &middot; with Oana
            </div>
          </div>
          <div style={{
            padding: '4px 10px',
            borderRadius: 6,
            fontSize: '0.72rem',
            fontWeight: 600,
            background: 'rgba(142, 192, 124, 0.15)',
            color: '#8ec07c',
          }}>
            {t('confirmed')}
          </div>
        </div>
      </div>

      {/* Loyalty progress */}
      <div style={{
        marginTop: 16,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        padding: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            {t('loyaltyTier')}
          </div>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            background: brandGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Icon
          </div>
        </div>
        {/* Progress bar */}
        <div style={{
          background: 'var(--bg2)',
          borderRadius: 100,
          height: 8,
          overflow: 'hidden',
          position: 'relative' as const,
        }}>
          <div style={{
            width: `${(160 / 300) * 100}%`,
            height: '100%',
            background: brandGradient,
            borderRadius: 100,
            transition: 'width 0.6s ease',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--dim)' }}>160 pts</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--dim)' }}>300 pts (Luxe)</span>
        </div>
      </div>
    </BrowserChrome>
  )
}

/* ═══════════════════════════════════════════════════
   2. Employee Dashboard Visualization
   ═══════════════════════════════════════════════════ */

export function EmployeeDashViz() {
  const t = useTranslations('beautySecret.dashboards')

  const schedule = [
    { time: '09:00', service: 'Haircut', client: 'Maria', status: 'done' },
    { time: '10:30', service: 'Lashes', client: 'Elena', status: 'active' },
    { time: '13:00', service: 'Extensions', client: 'Ana', status: 'upcoming' },
  ]

  const badges = [
    { emoji: '🏆', label: t('topPerformer'), bg: 'rgba(250, 189, 47, 0.12)', color: '#fabd2f' },
    { emoji: '⭐', label: t('fiveStarStreak'), bg: 'rgba(196, 106, 134, 0.12)', color: 'var(--brand)' },
    { emoji: '🎯', label: t('consistency'), bg: 'rgba(142, 192, 124, 0.12)', color: '#8ec07c' },
  ]

  return (
    <BrowserChrome url="b-secret.com/employee">
      {/* Stat cards */}
      <div className={styles.dashStatRow}>
        <StatCard value="3" label={t('todaysAppts')} />
        <StatCard value="12" label={t('thisWeek')} />
        <StatCard value="4,200" label={t('monthRevenue')} />
        <StatCard value="94%" label={t('completion')} />
      </div>

      {/* Mini schedule table */}
      <div style={{
        marginTop: 16,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            {t('todaysSchedule')}
          </span>
        </div>
        {schedule.map((row, i) => {
          const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
            done: { bg: 'rgba(142, 192, 124, 0.15)', color: '#8ec07c', label: t('done') },
            active: { bg: 'rgba(196, 106, 134, 0.15)', color: 'var(--brand)', label: t('now') },
            upcoming: { bg: 'rgba(167, 123, 214, 0.15)', color: 'var(--brand2)', label: t('next') },
          }
          const st = statusStyles[row.status]
          return (
            <div key={row.time} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderBottom: i < schedule.length - 1 ? '1px solid rgba(52, 46, 48, 0.4)' : 'none',
              fontSize: '0.82rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--dim)', fontSize: '0.78rem', fontWeight: 600 }}>
                  {row.time}
                </span>
                <span style={{ color: 'var(--text)', fontWeight: 600 }}>{row.service}</span>
                <span style={{ color: 'var(--muted)' }}>&mdash; {row.client}</span>
              </div>
              <span style={{
                padding: '3px 8px',
                borderRadius: 5,
                fontSize: '0.68rem',
                fontWeight: 600,
                background: st.bg,
                color: st.color,
              }}>
                {st.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Achievement badges */}
      <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
        {badges.map(b => (
          <div key={b.label} style={{
            flex: 1,
            background: b.bg,
            border: `1px solid ${b.color}33`,
            borderRadius: 'var(--radius-sm)',
            padding: '10px 8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.1rem', marginBottom: 4 }}>{b.emoji}</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: b.color }}>{b.label}</div>
          </div>
        ))}
      </div>
    </BrowserChrome>
  )
}

/* ═══════════════════════════════════════════════════
   3. Admin Dashboard Visualization
   ═══════════════════════════════════════════════════ */

const revenueData = [
  { d: 'Mon', v: 320 },
  { d: 'Tue', v: 450 },
  { d: 'Wed', v: 380 },
  { d: 'Thu', v: 520 },
  { d: 'Fri', v: 610 },
  { d: 'Sat', v: 480 },
  { d: 'Sun', v: 200 },
]

export function AdminDashViz() {
  const t = useTranslations('beautySecret.dashboards')

  const alerts = [
    { color: '#fabd2f', label: t('pendingConfirmation'), detail: t('pendingConfirmationDetail') },
    { color: '#ff5f57', label: t('conflictDetected'), detail: t('conflictDetectedDetail') },
  ]

  return (
    <BrowserChrome url="b-secret.com/admin">
      {/* 5 stat cards — use custom 5-col grid */}
      <div className={styles.adminStatGrid}>
        <StatCard value="12" label={t('appointments')} />
        <StatCard value="47" label={t('clients')} />
        <StatCard value="78%" label={t('occupancy')} />
        <StatCard value="2,400" label={t('revenueLei')} />
        <StatCard value="3" label={t('pending')} />
      </div>

      {/* Revenue chart */}
      <div style={{
        marginTop: 16,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        padding: 16,
      }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 12 }}>
          {t('weeklyRevenue')}
        </div>
        <div style={{ width: '100%', height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData} margin={{ top: 4, right: 8, bottom: 0, left: 8 }}>
              <XAxis
                dataKey="d"
                tick={{ fill: '#766d70', fontSize: 11 }}
                axisLine={{ stroke: '#342e30' }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#1e1a1c',
                  border: '1px solid #342e30',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  color: '#f5f0f1',
                }}
                labelStyle={{ color: '#a8999c' }}
                formatter={(value) => [`${value} lei`, t('revenue')]}
              />
              <Line
                type="monotone"
                dataKey="v"
                stroke="#c46a86"
                strokeWidth={2}
                dot={{ fill: '#c46a86', r: 3, strokeWidth: 0 }}
                activeDot={{ fill: '#a77bd6', r: 5, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Needs Attention */}
      <div style={{
        marginTop: 16,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            {t('needsAttention')}
          </span>
        </div>
        {alerts.map((alert, i) => (
          <div key={alert.label} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            padding: '12px 16px',
            borderBottom: i < alerts.length - 1 ? '1px solid rgba(52, 46, 48, 0.4)' : 'none',
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: alert.color,
              marginTop: 5,
              flexShrink: 0,
            }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text)' }}>
                {alert.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--dim)', marginTop: 2 }}>
                {alert.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </BrowserChrome>
  )
}

/* ═══════════════════════════════════════════════════
   4. Dashboard Switcher — tabbed viewer
   ═══════════════════════════════════════════════════ */

type DashTabId = 'customer' | 'employee' | 'admin'

const dashPanels: Record<DashTabId, React.ComponentType> = {
  customer: CustomerDashViz,
  employee: EmployeeDashViz,
  admin: AdminDashViz,
}

export function DashboardSwitcher() {
  const t = useTranslations('beautySecret.dashboards')
  const [active, setActive] = useState<DashTabId>('customer')
  const Panel = dashPanels[active]

  const dashTabs = [
    { id: 'customer' as const, label: t('customer') },
    { id: 'employee' as const, label: t('employee') },
    { id: 'admin' as const, label: t('admin') },
  ]

  return (
    <div className={styles.dashSwitcher}>
      <div className={styles.dashSwitcherTabs}>
        {dashTabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.dashSwitcherTab} ${active === tab.id ? styles.dashSwitcherTabActive : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div key={active} className={styles.dashSwitcherPanel}>
        <Panel />
      </div>
    </div>
  )
}
