'use client'
import { useEffect, useRef } from 'react'
import styles from '../beauty-secret.module.css'

/**
 * Attaches an IntersectionObserver to the container ref.
 * Any child with [data-reveal] will get styles.scrollAnimVisible added when it enters the viewport.
 * The data-reveal attribute can optionally specify a delay in ms: data-reveal="200"
 */
export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const elements = ref.current.querySelectorAll('[data-reveal]')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.reveal
            if (delay && parseInt(delay) > 0) {
              setTimeout(() => {
                el.classList.add(styles.scrollAnimVisible)
              }, parseInt(delay))
            } else {
              el.classList.add(styles.scrollAnimVisible)
            }
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.08 }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}
