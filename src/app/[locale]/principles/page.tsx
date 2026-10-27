import { getTranslations } from "next-intl/server";

const PRINCIPLES = ["think", "decide", "start", "ship", "collaborate"] as const;

export default async function Principles() {
  const t = await getTranslations();

  return (
    <div className="flex flex-col gap-16 py-16 md:py-24">
      <header className="flex flex-col gap-5">
        <p className="motion-enter font-mono text-sm text-accent-500">
          {t("principles.hero.label")}
        </p>
        <h1 className="motion-enter motion-enter-delay-1 max-w-[20ch] text-4xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
          {t("principles.hero.heading")}
        </h1>
        <p className="motion-enter motion-enter-delay-2 max-w-[60ch] text-lg leading-relaxed text-text-secondary">
          {t("principles.hero.body")}
        </p>
      </header>

      <ol className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
        {PRINCIPLES.map((principle, index) => (
          <li
            key={principle}
            className="motion-enter grid gap-3 py-10 md:grid-cols-[10rem_1fr] md:gap-10 md:py-12"
          >
            <p className="font-mono text-xs tracking-wide text-text-muted uppercase md:pt-1.5">
              {String(index + 1).padStart(2, "0")} ·{" "}
              {t(`how-i-work.${principle}.label`)}
            </p>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                {t(`how-i-work.${principle}.heading`)}
              </h2>
              <p className="max-w-[62ch] text-lg leading-relaxed text-text-secondary">
                {t(`how-i-work.${principle}.body`)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
