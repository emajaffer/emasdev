'use client'
import { useState, useCallback } from 'react'
import styles from '../beauty-secret.module.css'

/* ───── Step data ───── */

const steps = [
  {
    num: 1,
    title: 'Choose Service',
    desc: 'Category-filtered service selection with gender grouping, pricing, and duration display.',
    visual: 'service-selection' as const,
  },
  {
    num: 2,
    title: 'Pick Date & Time',
    desc: 'Calendar grid with real-time slot availability. 15-minute intervals, 30-day window, 60-minute lead time.',
    visual: 'date-time' as const,
  },
  {
    num: 3,
    title: 'Choose Stylist',
    desc: 'Staff filtered by service capability, showing ratings, bio, and availability for selected time.',
    visual: 'stylist' as const,
  },
  {
    num: 4,
    title: 'Your Details',
    desc: 'Guest or authenticated booking. Email/phone deduplication. Auto-fill from profile.',
    visual: 'details' as const,
  },
  {
    num: 5,
    title: 'Confirm & Pay',
    desc: 'Booking summary with edit buttons per section. Stripe Checkout: 30% deposit or full payment.',
    visual: 'confirm' as const,
  },
]

type StepVisual = (typeof steps)[number]['visual']

/* ───── Shared inline style helpers ───── */

const brandGradient = 'linear-gradient(135deg, var(--brand), var(--brand2))'

const pill = (active: boolean): React.CSSProperties => ({
  padding: '6px 14px',
  borderRadius: '100px',
  fontSize: '0.75rem',
  fontWeight: 600,
  cursor: 'pointer',
  background: active ? brandGradient : 'var(--bg2)',
  color: active ? '#fff' : 'var(--dim)',
  border: active ? 'none' : '1px solid var(--border)',
  transition: 'all 0.2s',
})

const serviceRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottom: '1px solid rgba(52, 46, 48, 0.4)',
  fontSize: '0.85rem',
}

/* ───── Step visual sub-components ───── */

function ServiceSelectionVisual() {
  const categories = ['Hairdressing', 'Lashes', 'Nails', 'Waxing', 'Makeup']
  const services = [
    { name: 'Haircut & Style', duration: '45 min', price: '120 lei', gender: 'F' },
    { name: 'Balayage Full', duration: '180 min', price: '450 lei', gender: 'F' },
    { name: "Men's Haircut", duration: '30 min', price: '60 lei', gender: 'M' },
    { name: 'Root Touch-Up', duration: '90 min', price: '180 lei', gender: 'F' },
  ]

  return (
    <div>
      <div style={{ fontSize: '0.78rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, fontWeight: 600 }}>
        Select a Service
      </div>
      {/* Category pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {categories.map((cat, i) => (
          <span key={cat} style={pill(i === 0)}>{cat}</span>
        ))}
      </div>
      {/* Service rows */}
      <div style={{ background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        {services.map((svc, i) => (
          <div key={svc.name} style={{
            ...serviceRow,
            background: i === 0 ? 'rgba(196, 106, 134, 0.08)' : 'transparent',
            borderLeft: i === 0 ? '3px solid var(--brand)' : '3px solid transparent',
            borderBottom: i === services.length - 1 ? 'none' : serviceRow.borderBottom,
          }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{svc.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--dim)' }}>
                {svc.duration} &middot; {svc.gender === 'M' ? 'Men' : 'Women'}
              </div>
            </div>
            <div style={{
              fontWeight: 700,
              fontSize: '0.9rem',
              background: brandGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {svc.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DateTimeVisual() {
  const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const dates = [
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
  ]
  const slots = ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45']

  return (
    <div className={styles.dateTimeGrid}>
      {/* Calendar */}
      <div>
        <div style={{ fontSize: '0.78rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, fontWeight: 600 }}>
          March 2026
        </div>
        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', marginBottom: 8 }}>
          {dayNames.map(d => (
            <div key={d} style={{ fontSize: '0.7rem', color: 'var(--dim)', fontWeight: 600, padding: 4 }}>{d}</div>
          ))}
        </div>
        {/* Date grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
          {dates.map(d => {
            const isSelected = d === 15
            const isPast = d < 11
            return (
              <div
                key={d}
                style={{
                  padding: '8px 4px',
                  borderRadius: 8,
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: isPast ? 'default' : 'pointer',
                  background: isSelected ? brandGradient : 'transparent',
                  color: isSelected ? '#fff' : isPast ? 'var(--dim)' : 'var(--text)',
                  opacity: isPast ? 0.4 : 1,
                  transition: 'all 0.15s',
                }}
              >
                {d}
              </div>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 20 }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, fontWeight: 600 }}>
          Available Slots
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {slots.map(s => {
            const isSelected = s === '10:30'
            const isUnavailable = s === '09:45'
            return (
              <div
                key={s}
                style={{
                  padding: '8px 20px',
                  borderRadius: 8,
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
                  cursor: isUnavailable ? 'default' : 'pointer',
                  background: isSelected ? brandGradient : 'var(--bg2)',
                  color: isSelected ? '#fff' : isUnavailable ? 'var(--dim)' : 'var(--text)',
                  border: `1px solid ${isSelected ? 'transparent' : 'var(--border)'}`,
                  opacity: isUnavailable ? 0.4 : 1,
                  textDecoration: isUnavailable ? 'line-through' : 'none',
                  textAlign: 'center',
                  transition: 'all 0.15s',
                }}
              >
                {s}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StylistVisual() {
  const stylists = [
    { name: 'Oana', role: 'Senior Stylist', rating: '4.9', reviews: 42, selected: true, initials: 'O' },
    { name: 'Maria', role: 'Lash Technician', rating: '4.8', reviews: 28, selected: false, initials: 'M' },
  ]

  return (
    <div>
      <div style={{ fontSize: '0.78rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, fontWeight: 600 }}>
        Choose Your Stylist
      </div>
      <div className={styles.stylistGrid}>
        {stylists.map(s => (
          <div
            key={s.name}
            style={{
              background: 'var(--bg2)',
              border: `2px solid ${s.selected ? 'var(--brand)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-sm)',
              padding: 24,
              textAlign: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'border-color 0.2s',
            }}
          >
            {/* Selected indicator */}
            {s.selected && (
              <div style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: brandGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                color: '#fff',
                fontWeight: 700,
              }}>
                ✓
              </div>
            )}
            {/* Avatar circle */}
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: s.selected ? brandGradient : 'var(--surface2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: s.selected ? '#fff' : 'var(--muted)',
            }}>
              {s.initials}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 2 }}>
              {s.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--dim)', marginBottom: 10 }}>
              {s.role}
            </div>
            {/* Rating */}
            <div style={{ fontSize: '0.82rem' }}>
              <span style={{ color: '#fabd2f' }}>★</span>
              <span style={{ color: 'var(--text)', fontWeight: 600, marginLeft: 4 }}>{s.rating}</span>
              <span style={{ color: 'var(--dim)', marginLeft: 4 }}>({s.reviews})</span>
            </div>
          </div>
        ))}
      </div>
      {/* "Any available" option */}
      <div style={{
        marginTop: 12,
        padding: '12px 16px',
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.85rem',
        color: 'var(--muted)',
        textAlign: 'center',
        cursor: 'pointer',
      }}>
        No preference &mdash; any available stylist
      </div>
    </div>
  )
}

function DetailsVisual() {
  const fields = [
    { label: 'Full Name', value: 'Elena Popescu', icon: '👤' },
    { label: 'Email', value: 'elena@example.com', icon: '✉' },
    { label: 'Phone', value: '+40 712 345 678', icon: '📱' },
    { label: 'Notes (optional)', value: 'First time client, prefer natural look', icon: '📝' },
  ]

  return (
    <div>
      <div style={{ fontSize: '0.78rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, fontWeight: 600 }}>
        Your Details
      </div>
      {/* Guest/Sign in toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <span style={pill(true)}>Guest Booking</span>
        <span style={pill(false)}>Sign In</span>
      </div>
      {/* Form fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {fields.map(f => (
          <div key={f.label}>
            <div style={{ fontSize: '0.75rem', color: 'var(--dim)', marginBottom: 6, fontWeight: 500 }}>
              {f.label}
            </div>
            <div style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '10px 14px',
              fontSize: '0.85rem',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>{f.icon}</span>
              <span>{f.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConfirmVisual() {
  const summaryRows = [
    { label: 'Service', value: 'Haircut & Style', detail: '45 min' },
    { label: 'Date & Time', value: 'Mar 15, 2026', detail: '10:30' },
    { label: 'Stylist', value: 'Oana', detail: 'Senior Stylist' },
    { label: 'Customer', value: 'Elena Popescu', detail: 'elena@example.com' },
  ]

  return (
    <div>
      <div style={{ fontSize: '0.78rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, fontWeight: 600 }}>
        Booking Summary
      </div>
      {/* Summary rows */}
      <div style={{
        background: 'var(--bg2)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        marginBottom: 20,
      }}>
        {summaryRows.map((row, i) => (
          <div key={row.label} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            borderBottom: i === summaryRows.length - 1 ? 'none' : '1px solid rgba(52, 46, 48, 0.4)',
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--dim)', marginBottom: 2 }}>{row.label}</div>
              <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>{row.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{row.detail}</div>
            </div>
            <div style={{
              padding: '4px 12px',
              borderRadius: 6,
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--brand)',
              background: 'rgba(196, 106, 134, 0.1)',
              border: '1px solid rgba(196, 106, 134, 0.2)',
              cursor: 'pointer',
            }}>
              Edit
            </div>
          </div>
        ))}
      </div>
      {/* Total */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: '0 4px',
      }}>
        <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Total</span>
        <span style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          background: brandGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          120 lei
        </span>
      </div>
      {/* Payment options */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <div style={{
          flex: 1,
          padding: '10px 14px',
          borderRadius: 8,
          background: 'rgba(196, 106, 134, 0.08)',
          border: '2px solid var(--brand)',
          textAlign: 'center',
          cursor: 'pointer',
        }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--brand)' }}>30% Deposit</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--dim)', marginTop: 2 }}>36 lei now</div>
        </div>
        <div style={{
          flex: 1,
          padding: '10px 14px',
          borderRadius: 8,
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          textAlign: 'center',
          cursor: 'pointer',
        }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)' }}>Full Payment</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--dim)', marginTop: 2 }}>120 lei now</div>
        </div>
      </div>
      {/* CTA */}
      <div style={{
        background: brandGradient,
        color: '#fff',
        padding: '14px 20px',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '0.95rem',
        cursor: 'pointer',
        letterSpacing: '-0.01em',
      }}>
        Confirm & Pay
      </div>
    </div>
  )
}

/* ───── Step visual dispatcher ───── */

function WizardStepVisual({ step }: { step: (typeof steps)[number] }) {
  const visualMap: Record<StepVisual, React.ReactNode> = {
    'service-selection': <ServiceSelectionVisual />,
    'date-time': <DateTimeVisual />,
    'stylist': <StylistVisual />,
    'details': <DetailsVisual />,
    'confirm': <ConfirmVisual />,
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: 4,
        }}>
          {step.title}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--dim)' }}>
          {step.desc}
        </div>
      </div>
      {visualMap[step.visual]}
    </div>
  )
}

/* ───── Main component ───── */

export function BookingWizardDemo() {
  const [current, setCurrent] = useState(0)

  const goNext = useCallback(() => setCurrent(c => Math.min(c + 1, 4)), [])
  const goPrev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), [])

  return (
    <div className={styles.wizardDemo}>
      {/* Browser chrome */}
      <div className={styles.browserTitleBar}>
        <div className={styles.browserDots}>
          <span className={styles.browserDot} style={{ background: '#ff5f57' }} />
          <span className={styles.browserDot} style={{ background: '#febc2e' }} />
          <span className={styles.browserDot} style={{ background: '#28c840' }} />
        </div>
        <div className={styles.browserUrlBar}>b-secret.com/booking</div>
      </div>

      {/* Step indicators */}
      <div className={styles.wizardSteps}>
        {steps.map((step, i) => (
          <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: i < 4 ? 1 : 'none' }}>
            <button
              className={`${styles.wizardStep} ${i <= current ? styles.wizardStepActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Step ${step.num}: ${step.title}`}
            >
              {i < current ? '✓' : step.num}
            </button>
            {i < 4 && (
              <div className={`${styles.wizardLine} ${i < current ? styles.wizardLineCompleted : ''}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className={styles.wizardContent}>
        <div className={styles.wizardPanel}>
          <WizardStepVisual step={steps[current]} />
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.wizardNav}>
        <button
          onClick={goPrev}
          disabled={current === 0}
          className={styles.wizardNavBtn}
          style={{
            opacity: current === 0 ? 0.3 : 1,
            background: 'none',
            border: '1px solid var(--border)',
            color: 'var(--muted)',
            padding: '8px 18px',
            borderRadius: 8,
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: current === 0 ? 'default' : 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}
        >
          ← Previous
        </button>
        <span className={styles.textDim} style={{ fontSize: '0.82rem' }}>
          Step {current + 1} of 5
        </span>
        <button
          onClick={goNext}
          disabled={current === 4}
          className={styles.wizardNavBtn}
          style={{
            opacity: current === 4 ? 0.3 : 1,
            background: current === 4 ? 'var(--surface2)' : brandGradient,
            border: 'none',
            color: '#fff',
            padding: '8px 18px',
            borderRadius: 8,
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: current === 4 ? 'default' : 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
