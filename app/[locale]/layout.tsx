import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://emamocanu.com";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const isRo = locale === "ro";

  const title = t("title");
  const description = t("description");
  const canonicalPath = isRo ? `${BASE_URL}/ro` : BASE_URL;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords: [
      "full stack developer",
      "portfolio",
      "Next.js",
      "React",
      "web developer",
      "Ema Mocanu",
      "EMA.dev",
    ],
    authors: [{ name: "Ema Mocanu", url: BASE_URL }],
    creator: "Ema Mocanu",
    openGraph: {
      type: "website",
      locale: isRo ? "ro_RO" : "en_US",
      alternateLocale: isRo ? "en_US" : "ro_RO",
      siteName: "EMA.dev",
      title,
      description,
      url: canonicalPath,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
    robots: { index: true, follow: true },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: BASE_URL,
        ro: `${BASE_URL}/ro`,
      },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ema Mocanu",
  url: BASE_URL,
  jobTitle: "Software & Systems Engineer",
  sameAs: ["https://github.com/emajaffer"],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <LanguageSwitcher />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
