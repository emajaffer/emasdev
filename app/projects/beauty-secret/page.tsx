import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import BeautySecretCase from './BeautySecretCase'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Beauty Secret — Case Study | EMA.dev',
  description:
    'A deep dive into building Beauty Secret, a production-grade salon management platform with Next.js 16, React 19, Convex, Stripe, and Clerk. 48,000+ lines of code, 414+ tests, AI-augmented development.',
  openGraph: {
    title: 'Beauty Secret — Case Study | EMA.dev',
    description:
      'How I built a full-stack salon management platform from scratch. Architecture, features, testing, and the AI-augmented development workflow.',
    type: 'article',
  },
}

export default function BeautySecretPage() {
  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <BeautySecretCase />
    </div>
  )
}
