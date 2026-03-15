import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { JsonLd } from '@/components/seo/JsonLd'
import type { Locale } from '@/i18n/config'
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getRoutePath,
} from '@/lib/seo'
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
  return createPageMetadata({
    locale: locale as Locale,
    route: 'beautySecret',
    title: t('title'),
    description: t('description'),
    type: 'article',
  })
}

export default async function BeautySecretPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const localeKey = locale as Locale

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'EMA.dev', path: getRoutePath('home', localeKey) },
    {
      name: localeKey === 'ro' ? 'Proiecte' : 'Projects',
      path: getRoutePath('projects', localeKey),
    },
    { name: 'Beauty Secret', path: getRoutePath('beautySecret', localeKey) },
  ])

  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <JsonLd data={breadcrumbJsonLd} />
      <BeautySecretCase />
    </div>
  )
}
