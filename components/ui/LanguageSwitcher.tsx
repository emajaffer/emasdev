"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/config";

function RomaniaFlagIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" rx="2" fill="#002B7F" />
      <rect x="6.67" width="6.67" height="14" fill="#FCD116" />
      <rect x="13.33" width="6.67" height="14" fill="#CE1126" />
    </svg>
  );
}

function EnglishFlagIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" rx="2" fill="#B22234" />
      <rect y="2" width="20" height="1" fill="#FFF" />
      <rect y="4" width="20" height="1" fill="#FFF" />
      <rect y="6" width="20" height="1" fill="#FFF" />
      <rect y="8" width="20" height="1" fill="#FFF" />
      <rect y="10" width="20" height="1" fill="#FFF" />
      <rect y="12" width="20" height="1" fill="#FFF" />
      <rect width="9" height="7.6" rx="1" fill="#3C3B6E" />
      <circle cx="1.5" cy="1.4" r="0.35" fill="#FFF" />
      <circle cx="3.2" cy="1.4" r="0.35" fill="#FFF" />
      <circle cx="4.9" cy="1.4" r="0.35" fill="#FFF" />
      <circle cx="6.6" cy="1.4" r="0.35" fill="#FFF" />
      <circle cx="8.3" cy="1.4" r="0.35" fill="#FFF" />
      <circle cx="2.35" cy="2.4" r="0.35" fill="#FFF" />
      <circle cx="4.05" cy="2.4" r="0.35" fill="#FFF" />
      <circle cx="5.75" cy="2.4" r="0.35" fill="#FFF" />
      <circle cx="7.45" cy="2.4" r="0.35" fill="#FFF" />
      <circle cx="1.5" cy="3.4" r="0.35" fill="#FFF" />
      <circle cx="3.2" cy="3.4" r="0.35" fill="#FFF" />
      <circle cx="4.9" cy="3.4" r="0.35" fill="#FFF" />
      <circle cx="6.6" cy="3.4" r="0.35" fill="#FFF" />
      <circle cx="8.3" cy="3.4" r="0.35" fill="#FFF" />
      <circle cx="2.35" cy="4.4" r="0.35" fill="#FFF" />
      <circle cx="4.05" cy="4.4" r="0.35" fill="#FFF" />
      <circle cx="5.75" cy="4.4" r="0.35" fill="#FFF" />
      <circle cx="7.45" cy="4.4" r="0.35" fill="#FFF" />
      <circle cx="1.5" cy="5.4" r="0.35" fill="#FFF" />
      <circle cx="3.2" cy="5.4" r="0.35" fill="#FFF" />
      <circle cx="4.9" cy="5.4" r="0.35" fill="#FFF" />
      <circle cx="6.6" cy="5.4" r="0.35" fill="#FFF" />
      <circle cx="8.3" cy="5.4" r="0.35" fill="#FFF" />
      <circle cx="2.35" cy="6.4" r="0.35" fill="#FFF" />
      <circle cx="4.05" cy="6.4" r="0.35" fill="#FFF" />
      <circle cx="5.75" cy="6.4" r="0.35" fill="#FFF" />
      <circle cx="7.45" cy="6.4" r="0.35" fill="#FFF" />
    </svg>
  );
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="language-switcher-fixed" role="group" aria-label={t("toggle")}>
      {locales
        .slice()
        .reverse()
        .map((loc) => (
          <button
            key={loc}
            onClick={() => handleChange(loc)}
            disabled={locale === loc}
            className={`language-flag-btn ${locale === loc ? "active" : ""}`}
            aria-label={t(loc)}
            aria-current={locale === loc ? "true" : undefined}
            title={t(loc)}
          >
            <span className="sr-only">{t(loc)}</span>
            {loc === "ro" ? <RomaniaFlagIcon /> : <EnglishFlagIcon />}
          </button>
        ))}
    </div>
  );
}
