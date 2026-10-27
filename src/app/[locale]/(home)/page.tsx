import { getTranslations } from "next-intl/server";

import { SocialMedia } from "@/components/molecules/SocialMedia";
import { Link } from "@/i18n/navigation";
import { getYearsOfExperience } from "@/utils/yearsOfExperience";

const FOCUS_AREAS = ["design-systems", "web-apps", "product"] as const;

const FEATURED_PRINCIPLES = ["think", "decide", "ship"] as const;

const RPS_URL = "https://rock-paper-scissor.guimoraes.dev/";

export default async function Home() {
  const t = await getTranslations();

  const stack = t("presentation.stack").split(" · ");

  return (
    <div className="flex flex-col gap-24 md:gap-32">
      <section
        data-testid="presentation"
        className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center gap-8 py-16"
      >
        <div className="flex flex-col gap-5">
          <p
            data-testid="my-title"
            className="motion-enter font-mono text-sm text-accent-500"
          >
            {t("presentation.title")}
          </p>

          <h1 className="motion-enter motion-enter-delay-1 max-w-[18ch] text-4xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
            {t("presentation.headline")}
          </h1>

          <p className="motion-enter motion-enter-delay-2 max-w-[58ch] text-lg leading-relaxed text-text-secondary">
            <span className="text-text-primary">Guilherme Moraes</span> —{" "}
            {t("presentation.subtitle", { years: getYearsOfExperience() })}
          </p>
        </div>

        <SocialMedia className="motion-enter motion-enter-delay-3" />
      </section>

      <Section label={t("home.focus.label")}>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle md:grid-cols-3">
          {FOCUS_AREAS.map((area) => (
            <li key={area} className="flex flex-col gap-2 bg-bg-canvas p-6">
              <h3 className="font-medium">{t(`home.focus.${area}.title`)}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {t(`home.focus.${area}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label={t("home.stack.label")}>
        <ul className="flex flex-wrap gap-2">
          {stack.map((tool) => (
            <li
              key={tool}
              className="rounded-md border border-border-subtle px-3 py-1.5 font-mono text-xs text-text-secondary"
            >
              {tool}
            </li>
          ))}
        </ul>
      </Section>

      <Section label={t("home.projects.label")}>
        <a
          href={RPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-3 rounded-lg border border-border-subtle bg-bg-elevated p-6 transition hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 md:flex-row md:items-center md:justify-between md:gap-8"
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">
              {t("terminal.commands.games.rps-title")}
            </h3>
            <p className="max-w-[60ch] text-sm leading-relaxed text-text-secondary">
              {t("terminal.commands.games.rps-description")}
            </p>
          </div>
          <span className="font-mono text-sm whitespace-nowrap text-accent-500">
            {t("home.projects.cta")}{" "}
            <span
              aria-hidden
              className="inline-block transition group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </a>
      </Section>

      <Section label={t("home.principles.label")}>
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t("home.principles.heading")}
          </h2>

          <ol className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
            {FEATURED_PRINCIPLES.map((principle, index) => (
              <li key={principle} className="flex gap-6 py-5">
                <span className="font-mono text-sm text-text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg">
                  {t(`how-i-work.${principle}.heading`)}
                </p>
              </li>
            ))}
          </ol>

          <Link
            href="/principles"
            className="w-fit rounded-sm text-sm text-text-secondary underline underline-offset-4 transition hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            {t("home.principles.cta")} →
          </Link>
        </div>
      </Section>
    </div>
  );
}

type SectionProps = {
  label: string;
  children: React.ReactNode;
};

const Section = ({ label, children }: SectionProps) => (
  <section className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-10">
    <h2 className="font-mono text-xs tracking-wide text-text-muted uppercase md:pt-1">
      {label}
    </h2>
    <div>{children}</div>
  </section>
);
