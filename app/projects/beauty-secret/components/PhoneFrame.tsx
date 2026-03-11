'use client'
import styles from '../beauty-secret.module.css'

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function PhoneFrame({ children, className = '' }: PhoneFrameProps) {
  return (
    <div className={`${styles.phoneFrame} ${className}`}>
      <div className={styles.phoneNotch} />
      <div className={styles.phoneContent}>
        {children}
      </div>
    </div>
  )
}
