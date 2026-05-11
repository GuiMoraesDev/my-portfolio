import { getTranslations } from "next-intl/server";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default async function Philosophy() {
  const t = await getTranslations();

  return (
    <PageWrapper>
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
    </PageWrapper>
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

const PageWrapper = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={twMerge(
      "relative z-10 flex w-full max-w-480 flex-col items-start py-8 font-body max-ultra:px-[10vw] md:py-12 lg:py-16",
      "mt-8 mb-8 md:mt-12 md:mb-12 lg:mt-16 lg:mb-16",
      className,
    )}
    {...props}
  />
);
