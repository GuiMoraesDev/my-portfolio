import { getTranslations } from "next-intl/server";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { BentoCell } from "@/components/molecules/BentoCell";
import { SocialMedia } from "@/components/molecules/SocialMedia";

export default async function Home() {
  const t = await getTranslations();

  return (
    <>
      <SessionWrapper id="presentation">
        <section className="flex w-full flex-col gap-10 text-text-primary md:gap-16">
          <header className="flex flex-col gap-3 md:gap-4">
            <p className="motion-enter text-sm font-medium tracking-widest uppercase">
              {t("presentation.name")}
            </p>

            <h1 className="motion-enter motion-enter-delay-1 font-title text-4xl leading-tight font-bold tracking-tight text-accent-500 md:text-5xl lg:text-6xl">
              Guilherme Moraes
            </h1>

            <h2
              id="my-title"
              className="motion-enter motion-enter-delay-2 font-title text-2xl tracking-tight text-text-secondary md:text-3xl"
            >
              {t("presentation.title")}
            </h2>
          </header>

          <p className="motion-enter motion-enter-delay-2 text-lg leading-relaxed tracking-wide text-text-secondary md:max-w-[65%]">
            {t("presentation.subtitle")}
          </p>

          <SocialMedia className="justify-start" />
        </section>
      </SessionWrapper>

      <SessionWrapper id="about-me">
        <div className="grid w-full grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-3">
          <BentoCell.Wrapper className="motion-enter bg-bg-elevated/70 lg:col-span-2">
            <BentoCell.Label>{t("how-i-work.think.label")}</BentoCell.Label>
            <BentoCell.Heading>
              {t("how-i-work.think.heading")}
            </BentoCell.Heading>
            <BentoCell.Body>{t("how-i-work.think.body")}</BentoCell.Body>
          </BentoCell.Wrapper>

          <BentoCell.Wrapper className="motion-enter motion-enter-delay-1 bg-plum-700/60">
            <BentoCell.Label>{t("how-i-work.decide.label")}</BentoCell.Label>
            <BentoCell.Heading>
              {t("how-i-work.decide.heading")}
            </BentoCell.Heading>
            <BentoCell.Body>{t("how-i-work.decide.body")}</BentoCell.Body>
          </BentoCell.Wrapper>

          <BentoCell.Wrapper className="motion-enter motion-enter-delay-2 bg-plum-500/40">
            <BentoCell.Label>{t("how-i-work.ship.label")}</BentoCell.Label>
            <BentoCell.Heading>
              {t("how-i-work.ship.heading")}
            </BentoCell.Heading>
            <BentoCell.Body>{t("how-i-work.ship.body")}</BentoCell.Body>
          </BentoCell.Wrapper>

          <BentoCell.Wrapper className="motion-enter motion-enter-delay-1 bg-bg-elevated/40 md:col-span-2 lg:col-span-2">
            <BentoCell.Label>
              {t("how-i-work.collaborate.label")}
            </BentoCell.Label>
            <BentoCell.Heading>
              {t("how-i-work.collaborate.heading")}
            </BentoCell.Heading>
            <BentoCell.Body>{t("how-i-work.collaborate.body")}</BentoCell.Body>
          </BentoCell.Wrapper>
        </div>
      </SessionWrapper>
    </>
  );
}

const SessionWrapper = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={twMerge(
      "relative z-10 flex h-full w-full max-w-480 flex-col items-center justify-between py-14 font-body max-[2000px]:px-[10vw]",
      "first-of-type:mt-14 last-of-type:mb-14",
      className,
    )}
    {...props}
  />
);
