import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emamocanu.com"),
  title: "EMA.dev | Full Stack Developer — Ema Mocanu",
  description:
    "Hi, I'm Ema — a full stack developer building with code, creativity, and AI. Explore my projects and the future I'm building, one idea at a time.",
  keywords: [
    "full stack developer",
    "portfolio",
    "Next.js",
    "React",
    "web developer",
    "Ema Mocanu",
    "EMA.dev",
  ],
  authors: [{ name: "Ema Mocanu", url: "https://emamocanu.com" }],
  creator: "Ema Mocanu",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "EMA.dev",
    title: "EMA.dev | Full Stack Developer — Ema Mocanu",
    description:
      "Hi, I'm Ema — a full stack developer building with code, creativity, and AI. Explore my projects and the future I'm building, one idea at a time.",
    url: "https://emamocanu.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMA.dev | Full Stack Developer — Ema Mocanu",
    description:
      "Hi, I'm Ema — a full stack developer building with code, creativity, and AI. Explore my projects and the future I'm building, one idea at a time.",
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
  alternates: { canonical: "https://emamocanu.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ema Mocanu",
  url: "https://emamocanu.com",
  jobTitle: "Full Stack Developer",
  sameAs: ["https://github.com/emajaffer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
