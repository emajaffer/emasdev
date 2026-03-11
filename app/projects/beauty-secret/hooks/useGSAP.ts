'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useGSAP(setup: (ctx: gsap.Context) => void, deps: unknown[] = []) {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || !containerRef.current) return

    const ctx = gsap.context(() => {
      setup(ctx as unknown as gsap.Context)
    }, containerRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps])

  return { containerRef, reduced }
}

export { gsap, ScrollTrigger }
