import { getTranslations } from "next-intl/server";

import { SocialMedia } from "@/components/molecules/SocialMedia";
import { getYearsOfExperience } from "@/utils/yearsOfExperience";

const FOCUS_AREAS = ["design-systems", "web-apps", "product"] as const;

export default async function Home() {
  const t = await getTranslations();

  const stack = t("presentation.stack").split(" · ");

  return (
    <div className="flex flex-col gap-24 md:gap-32">
      <section
        data-testid="presentation"
        className="flex flex-col justify-center gap-8 pt-10 md:pt-24"
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
        <ul className="flex flex-col gap-3">
          {[
            {
              href: "https://github.com/GuiMoraesDev/taskflow",
              title: t("home.projects.taskflow.title"),
              description: t("home.projects.taskflow.description"),
              cta: t("home.projects.cta-code"),
            },
            {
              href: "https://github.com/GuiMoraesDev/cria-virtual",
              title: t("home.projects.cria-virtual.title"),
              description: t("home.projects.cria-virtual.description"),
              cta: t("home.projects.cta-code"),
            },
            {
              href: "https://rock-paper-scissor.guimoraes.dev/",
              title: t("terminal.commands.games.rps-title"),
              description: t("terminal.commands.games.rps-description"),
              cta: t("home.projects.cta"),
            },
          ].map((project) => (
            <li key={project.href}>
              <ProjectCard {...project} />
            </li>
          ))}
        </ul>
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

type ProjectCardProps = {
  href: string;
  title: string;
  description: string;
  cta: string;
};

const ProjectCard = ({ href, title, description, cta }: ProjectCardProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col gap-3 rounded-lg border border-border-subtle bg-bg-elevated p-6 transition hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 md:flex-row md:items-center md:justify-between md:gap-8"
  >
    <div className="flex flex-col gap-2">
      <h3 className="font-medium">{title}</h3>
      <p className="max-w-[60ch] text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
    <span className="font-mono text-sm whitespace-nowrap text-accent-500">
      {cta}{" "}
      <span
        aria-hidden
        className="inline-block transition group-hover:translate-x-1"
      >
        →
      </span>
    </span>
  </a>
);
