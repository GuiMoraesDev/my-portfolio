import { getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { SocialMedia } from "@/components/molecules/SocialMedia";

export default async function Philosophy() {
  const t = await getTranslations();

  return (
    <div className="relative z-10 mt-auto flex w-full flex-col justify-end gap-8 font-body text-text-primary">
      <header className="flex w-full flex-col gap-4 border-b border-white/5 pb-16">
        <p className="motion-enter text-xs font-medium tracking-widest text-accent-500 uppercase">
          {t("philosophy.hero.label")}
        </p>
        <h1 className="motion-enter motion-enter-delay-1 font-title text-3xl leading-tight font-bold tracking-tight text-text-primary md:text-5xl">
          {t("philosophy.hero.heading")}
        </h1>
        <p className="motion-enter motion-enter-delay-2 max-w-[65ch] text-lg leading-relaxed tracking-wide text-text-secondary">
          {t("philosophy.hero.body")}
        </p>
      </header>

      <div className="flex w-full flex-col divide-y divide-white/5">
        <ContentBlock
          label={t("how-i-work.think.label")}
          heading={t("how-i-work.think.heading")}
          body={t("how-i-work.think.body")}
        />
        <ContentBlock
          label={t("how-i-work.decide.label")}
          heading={t("how-i-work.decide.heading")}
          body={t("how-i-work.decide.body")}
        />
        <ContentBlock
          label={t("philosophy.from-scratch.label")}
          heading={t("philosophy.from-scratch.heading")}
          body={t("philosophy.from-scratch.body")}
        />
        <ContentBlock
          label={t("philosophy.legacy.label")}
          heading={t("philosophy.legacy.heading")}
          body={t("philosophy.legacy.body")}
        />
        <ContentBlock
          label={t("how-i-work.ship.label")}
          heading={t("how-i-work.ship.heading")}
          body={t("how-i-work.ship.body")}
        />
        <ContentBlock
          label={t("how-i-work.collaborate.label")}
          heading={t("how-i-work.collaborate.heading")}
          body={t("how-i-work.collaborate.body")}
        />
      </div>

      <footer
        className={twMerge(
          "relative container flex h-full w-full flex-col items-center justify-between gap-4 py-10 font-body text-sm text-white md:flex-row lg:items-end",
          "before:absolute before:bottom-0 before:left-1/2 before:-z-10 before:h-full before:w-screen before:-translate-x-1/2 before:bg-black/90 before:opacity-95 before:content-['']",
        )}
        id="footer"
      >
        <div className="flex flex-col gap-3">
          <strong
            className={twMerge(
              "mb-2 text-2xl leading-normal tracking-wide",
              "inline-block animate-gradient-x bg-linear-to-r from-plum-200 via-plum-400 to-plum-50 bg-clip-text text-transparent",
            )}
          >
            {t("footer.title")}
          </strong>

          <p className="inline-block leading-normal tracking-wide">
            {t("footer.contact-me-by")}
            <a href="mailto:guimoraes.dev@gmail.com" className="ml-1 underline">
              guimoraes.dev@gmail.com
            </a>
          </p>

          <span className="inline-block leading-relaxed tracking-wider">
            <span className="mr-1 uppercase">{t("footer.made-with-love")}</span>{" "}
            © {new Date().getFullYear()} Guilherme Moraes
          </span>
        </div>

        <SocialMedia />
      </footer>
    </div>
  );
}

type ContentBlockProps = {
  label: string;
  heading: string;
  body: string;
};

const ContentBlock = ({ label, heading, body }: ContentBlockProps) => (
  <section className="motion-enter flex flex-col gap-3 py-12 md:py-14">
    <p className="text-xs font-medium tracking-widest text-accent-500 uppercase">
      {label}
    </p>
    <h2 className="font-title text-xl font-bold tracking-tight text-text-primary md:text-2xl">
      {heading}
    </h2>
    <p className="max-w-[65ch] text-lg leading-relaxed tracking-wide text-text-secondary">
      {body}
    </p>
  </section>
);
