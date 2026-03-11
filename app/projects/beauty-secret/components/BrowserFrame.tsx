'use client'
import { useState } from 'react'
import styles from '../beauty-secret.module.css'

interface BrowserFrameProps {
  url: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function BrowserFrame({ url, children, className = '', onClick }: BrowserFrameProps) {
  return (
    <div className={`${styles.browserFrame} ${className}`} onClick={onClick}>
      <div className={styles.browserTitleBar}>
        <div className={styles.browserDots}>
          <span className={styles.browserDot} style={{ background: '#ff5f57' }} />
          <span className={styles.browserDot} style={{ background: '#febc2e' }} />
          <span className={styles.browserDot} style={{ background: '#28c840' }} />
        </div>
        <div className={styles.browserUrlBar}>{url}</div>
      </div>
      <div className={styles.browserContent}>
        {children}
      </div>
    </div>
  )
}
