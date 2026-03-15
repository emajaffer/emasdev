import type { Metadata, MetadataRoute } from "next";
import type { Locale } from "@/i18n/config";

export const SITE_URL = "https://emamocanu.com";
export const SITE_NAME = "EMA.dev";
export const PERSON_NAME = "Ema Mocanu";
export const PERSON_ROLE = "Software & Systems Engineer";
export const GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined;

type PublicRouteKey = "home" | "projects" | "beautySecret";

type SeoImage = {
  alt: string;
  height: number;
  type?: string;
  url: string;
  width: number;
};

type RouteDefinition = {
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  image: Record<Locale, SeoImage>;
  paths: Record<Locale, string>;
  priority: Record<Locale, number>;
};

const DEFAULT_OG_IMAGE: SeoImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "EMA.dev — Software & Systems Engineer",
  type: "image/png",
};

const BEAUTY_SECRET_IMAGE_EN: SeoImage = {
  url: "/screenshots/b-secret/landing-page.png",
  width: 1440,
  height: 900,
  alt: "Beauty Secret project screenshot",
  type: "image/png",
};

const BEAUTY_SECRET_IMAGE_RO: SeoImage = {
  url: "/screenshots/b-secret/landing-ro.png",
  width: 1440,
  height: 900,
  alt: "Captura proiectului Beauty Secret",
  type: "image/png",
};

const ROUTES: Record<PublicRouteKey, RouteDefinition> = {
  home: {
    paths: {
      en: "/",
      ro: "/ro",
    },
    priority: {
      en: 1,
      ro: 0.9,
    },
    changeFrequency: "monthly",
    image: {
      en: DEFAULT_OG_IMAGE,
      ro: DEFAULT_OG_IMAGE,
    },
  },
  projects: {
    paths: {
      en: "/projects",
      ro: "/ro/projects",
    },
    priority: {
      en: 0.8,
      ro: 0.7,
    },
    changeFrequency: "monthly",
    image: {
      en: BEAUTY_SECRET_IMAGE_EN,
      ro: BEAUTY_SECRET_IMAGE_RO,
    },
  },
  beautySecret: {
    paths: {
      en: "/projects/beauty-secret",
      ro: "/ro/projects/beauty-secret",
    },
    priority: {
      en: 0.8,
      ro: 0.7,
    },
    changeFrequency: "monthly",
    image: {
      en: BEAUTY_SECRET_IMAGE_EN,
      ro: BEAUTY_SECRET_IMAGE_RO,
    },
  },
};

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return new URL(path, SITE_URL).toString();
}

export function getRoutePath(route: PublicRouteKey, locale: Locale) {
  return ROUTES[route].paths[locale];
}

export function getCanonicalUrl(route: PublicRouteKey, locale: Locale) {
  return absoluteUrl(getRoutePath(route, locale));
}

export function getAlternateLanguageUrls(route: PublicRouteKey) {
  return {
    "en-US": getCanonicalUrl(route, "en"),
    "ro-RO": getCanonicalUrl(route, "ro"),
    "x-default": getCanonicalUrl(route, "en"),
  };
}

export function getLocaleCode(locale: Locale) {
  return locale === "ro" ? "ro_RO" : "en_US";
}

export function getAlternateLocaleCodes(locale: Locale) {
  return locale === "ro" ? ["en_US"] : ["ro_RO"];
}

export function getRouteImage(route: PublicRouteKey, locale: Locale) {
  return ROUTES[route].image[locale];
}

export function getSharedSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: PERSON_NAME, url: SITE_URL }],
    creator: PERSON_NAME,
    publisher: PERSON_NAME,
    keywords: [
      "full stack developer",
      "portfolio",
      "Next.js",
      "React",
      "web developer",
      "Ema Mocanu",
      "EMA.dev",
    ],
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    verification: GOOGLE_SITE_VERIFICATION
      ? { google: GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

type PageMetadataInput = {
  description: string;
  locale: Locale;
  route: PublicRouteKey;
  title: string;
  type?: "article" | "website";
};

export function createPageMetadata({
  description,
  locale,
  route,
  title,
  type = "website",
}: PageMetadataInput): Metadata {
  const image = getRouteImage(route, locale);
  const canonical = getCanonicalUrl(route, locale);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getAlternateLanguageUrls(route),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type,
      locale: getLocaleCode(locale),
      alternateLocale: getAlternateLocaleCodes(locale),
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      images: [
        {
          url: absoluteUrl(image.url),
          width: image.width,
          height: image.height,
          alt: image.alt,
          type: image.type,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image.url)],
    },
  };
}

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME,
    jobTitle: PERSON_ROLE,
    url: SITE_URL,
    image: absoluteUrl("/ema.jpeg"),
    sameAs: ["https://github.com/emajaffer"],
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: PERSON_NAME,
    url: SITE_URL,
    inLanguage: ["en-US", "ro-RO"],
    publisher: {
      "@type": "Person",
      name: PERSON_NAME,
      url: SITE_URL,
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type ItemListEntry = {
  image?: string;
  name: string;
  path: string;
};

export function getItemListJsonLd(name: string, items: ItemListEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.path),
      name: item.name,
      image: item.image ? absoluteUrl(item.image) : undefined,
    })),
  };
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  return (Object.keys(ROUTES) as PublicRouteKey[]).flatMap((route) =>
    (["en", "ro"] as const).map((locale) => {
      const image = getRouteImage(route, locale);

      return {
        url: getCanonicalUrl(route, locale),
        changeFrequency: ROUTES[route].changeFrequency,
        priority: ROUTES[route].priority[locale],
        alternates: {
          languages: getAlternateLanguageUrls(route),
        },
        images: [absoluteUrl(image.url)],
      };
    })
  );
}
