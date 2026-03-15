"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Home() {
  const t = useTranslations("home");
  const [noteExpanded, setNoteExpanded] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [focusedPhase, setFocusedPhase] = useState<"loading" | "showing">("loading");

  const focusedTexts = Array.from({ length: 11 }, (_, i) =>
    t(`focusedTexts.${i}`)
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (focusedPhase === "loading") {
      timeout = setTimeout(() => setFocusedPhase("showing"), 2000);
    } else {
      timeout = setTimeout(() => {
        setFocusedPhase("loading");
        setFocusedIndex((prev) => (prev + 1) % focusedTexts.length);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [focusedPhase, focusedTexts.length]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-12">
      {/* Background photo */}
      <Image
        src="/hero-bg.png"
        alt="Ocean background"
        fill
        className="object-cover"
        priority
        quality={90}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />

      {/* 2-column grid */}
      <div className="hero-grid relative z-10 mx-auto grid w-full max-w-6xl items-stretch gap-8">
        {/* Left — Hero card */}
        <div
          className="flex flex-col justify-center rounded-3xl border border-white/30 bg-white/90 px-8 py-8 shadow-2xl backdrop-blur-xl"
          style={{ animation: "fade-in-up 0.8s ease-out" }}
        >
          {/* Avatar + Name + Badge row */}
          <div className="mb-4 flex items-center gap-3">
            <div className="overflow-hidden rounded-full border-2 border-white shadow-md">
              <Image
                src="/ema.jpeg"
                alt="Ema Mocanu"
                width={44}
                height={44}
                className="h-[44px] w-[44px] object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-text-dark">Ema Mocanu</span>
              <span className="text-xs font-medium text-teal">{t("badge")}</span>
            </div>
          </div>

          <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-text-dark sm:text-6xl lg:text-7xl" style={{ lineHeight: '1.05' }}>
            {t("heading1")}
            <br />
            <span className="bg-clip-text">{t("heading2")}</span>
            <br />
            {t("heading3")}
          </h1>

          <p className="mb-5 max-w-lg text-sm leading-relaxed text-text-muted sm:text-base">
            {t("description")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/projects"
              className="rounded-full bg-gradient-to-r from-teal to-purple px-7 py-3 text-center text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
            >
              {t("viewProjects")}
            </Link>
            <a
              href="#about"
              className="rounded-full border border-border-teal bg-white/80 px-7 py-3 text-center text-sm font-semibold text-text-dark transition-transform hover:scale-105"
            >
              {t("readMore")}
            </a>
          </div>

          {/* GitHub + Email icons */}
          <div className="mt-auto pt-5 flex items-center justify-center gap-4">
            <a
              href="https://github.com/emajaffer"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-clip-icon h-6 w-6 transition-opacity hover:opacity-70"
              aria-label="GitHub"
              style={{
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z'/%3E%3C/svg%3E")`,
                maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z'/%3E%3C/svg%3E")`,
              }}
            />
            <a
              href="mailto:emajaffer@gmail.com"
              className="bg-clip-icon h-6 w-6 transition-opacity hover:opacity-70"
              aria-label="Email"
              style={{
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z'/%3E%3C/svg%3E")`,
                maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z'/%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>

        {/* Right — 3 stacked static cards */}
        <div
          className="flex flex-col gap-5 justify-center"
          style={{ animation: "fade-in-up 0.8s ease-out 0.2s both" }}
        >
          {/* Card 1 — Currently Focused On */}
          <div className="flex flex-col items-center rounded-3xl border border-white/30 bg-white/90 px-8 py-8 text-center shadow-2xl backdrop-blur-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal">
              {t("currentlyFocused")}
            </p>
            <div className="flex h-[3.5rem] items-center justify-center">
              {focusedPhase === "loading" ? (
                <span className="flex gap-2 animate-[fade-in-up_0.3s_ease-out]">
                  <span className="bg-clip-dot h-2.5 w-2.5 rounded-full" />
                  <span className="bg-clip-dot h-2.5 w-2.5 rounded-full" style={{ animationDelay: "0.2s" }} />
                  <span className="bg-clip-dot h-2.5 w-2.5 rounded-full" style={{ animationDelay: "0.4s" }} />
                </span>
              ) : (
                <p className="text-sm font-medium leading-relaxed bg-clip-text text-transparent animate-[fade-in-up_0.4s_ease-out]">
                  {focusedTexts[focusedIndex]}
                </p>
              )}
            </div>
          </div>

          {/* Card 2 — Featured Project */}
          <div className="rounded-3xl border border-white/30 bg-white/90 px-8 py-8 shadow-2xl backdrop-blur-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-teal">
              {t("featuredProject")}
            </p>
            <h2 className="mb-2 text-xl font-bold text-text-dark">
              {t("beautySecretTitle")}
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-text-muted">
              {t("beautySecretDesc")}
            </p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {["Next.js 16", "React 19", "Tailwind CSS 4", "Convex", "Clerk", "Stripe"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border-teal bg-white/80 px-2.5 py-0.5 text-[11px] font-medium text-teal"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/projects/beauty-secret"
                className="inline-flex items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-purple"
              >
                {t("viewCaseStudy")} &rarr;
              </Link>
              <span className="text-border-teal">|</span>
              <a
                href="https://b-secret.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-purple"
              >
                {t("visitSite")} &rarr;
              </a>
            </div>
          </div>

          {/* Card 3 — A Note */}
          <div className="flex items-center gap-5 rounded-3xl border border-white/30 bg-white/90 px-8 py-8 shadow-2xl backdrop-blur-xl">
            <div className="shrink-0 overflow-hidden rounded-full border-3 border-white shadow-lg">
              <Image
                src="/habib.jpg"
                alt="Habib Jaffer"
                width={64}
                height={64}
                className="h-[64px] w-[64px] object-cover"
              />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-teal">
                {t("myMentor")}
              </p>
              <p className={`mb-2 text-xs leading-relaxed text-text-muted ${noteExpanded ? "" : "line-clamp-3"}`}>
                {t("mentorText")}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNoteExpanded(!noteExpanded)}
                  className="text-xs font-medium text-teal transition-colors hover:text-purple"
                >
                  {noteExpanded ? t("showLess") : t("readMoreBtn")}
                </button>
                <a
                  href="http://habibjaffer.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal transition-colors hover:text-purple"
                >
                  {t("visitHisSite")} &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
