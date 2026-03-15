import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { getTranslations, setRequestLocale } from 'next-intl/server'
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'beautySecret.metadata' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'article',
    },
  }
}

export default async function BeautySecretPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <BeautySecretCase />
    </div>
  )
}
