import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: `${t("title")} | EMA.dev — Ema Mocanu`,
    description: t("description"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });

  const project = {
    slug: "beauty-secret",
    title: "Beauty Secret",
    image: "/screenshots/b-secret/landing-page.png",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Convex",
      "Clerk",
      "Stripe",
    ],
    liveUrl: "https://b-secret.com",
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden px-4 py-12">
      {/* Background */}
      <Image
        src="/hero-bg.png"
        alt="Ocean background"
        fill
        className="object-cover"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />

      {/* Content */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center"
        style={{ animation: "fade-in-up 0.8s ease-out" }}
      >
        {/* Header card */}
        <div className="mb-10 w-full rounded-3xl border border-white/30 bg-white/90 px-8 py-10 text-center shadow-2xl backdrop-blur-xl sm:px-12">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-text-muted transition-colors hover:text-teal"
          >
            {t("backToHome")}
          </Link>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-text-dark sm:text-5xl">
            <span className="bg-clip-text">{t("title")}</span>
          </h1>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-text-muted sm:text-base">
            {t("description")}
          </p>
        </div>

        {/* Project cards */}
        <div className="flex w-full flex-col gap-8">
          <div
            className="grid overflow-hidden rounded-3xl border border-white/30 bg-white/90 shadow-2xl backdrop-blur-xl md:grid-cols-[1fr_1.1fr]"
            style={{ animation: "fade-in-up 0.8s ease-out 0.15s both" }}
          >
            {/* Info — left */}
            <div className="flex flex-col justify-center px-8 py-8 sm:px-10">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal">
                {t("featuredProject")}
              </p>
              <h2 className="mb-1 text-2xl font-bold text-text-dark">
                {project.title}
              </h2>
              <p className="mb-4 text-sm font-medium text-text-muted/70">
                {t("subtitle")}
              </p>
              <p className="mb-5 text-sm leading-relaxed text-text-muted">
                {t("projectDesc")}
              </p>

              {/* Tech badges */}
              <div className="mb-6 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border-teal bg-white/80 px-2.5 py-0.5 text-[11px] font-medium text-teal"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="rounded-full bg-gradient-to-r from-teal to-purple px-7 py-3 text-center text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
                >
                  {t("viewCaseStudy")}
                </Link>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border-teal bg-white/80 px-7 py-3 text-center text-sm font-semibold text-text-dark transition-transform hover:scale-105"
                >
                  {t("visitLiveSite")}
                </a>
              </div>
            </div>

            {/* Screenshot — right */}
            <div className="flex items-center justify-center p-6 sm:p-8">
              <Link
                href={`/projects/${project.slug}`}
                className="block overflow-hidden rounded-xl border border-black/10 shadow-lg transition-transform duration-500 hover:scale-[1.02]"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} — project screenshot`}
                  width={1440}
                  height={900}
                  className="block"
                  sizes="(max-width: 768px) 100vw, 520px"
                  quality={80}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
