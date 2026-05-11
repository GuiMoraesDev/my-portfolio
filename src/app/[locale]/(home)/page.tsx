import { getTranslations } from "next-intl/server";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { SocialMedia } from "@/components/molecules/SocialMedia";
import { TerminalContact } from "@/components/organisms/TerminalContact";

export default async function Home() {
  const t = await getTranslations();

  return (
    <>
      <SessionWrapper id="presentation">
        <section className="flex w-full flex-col gap-10 text-text-primary md:gap-12">
          <header className="flex flex-col gap-4 md:gap-6">
            <p className="motion-enter text-sm font-medium tracking-widest md:text-base lg:text-lg">
              {t("presentation.name")}
            </p>

            <div className="flex w-full gap-6">
              <section className="flex flex-col gap-6">
                <h1 className="motion-enter motion-enter-delay-1 font-title text-xl leading-tight font-bold tracking-tight text-accent-500 md:text-3xl lg:text-5xl">
                  Guilherme Moraes
                </h1>

                <h2
                  id="my-title"
                  className="motion-enter motion-enter-delay-2 font-title text-lg tracking-tight text-text-secondary md:text-xl lg:text-2xl"
                >
                  {t("presentation.title")}
                </h2>
              </section>

              <TerminalContact />
            </div>
          </header>

          <p className="motion-enter motion-enter-delay-2 leading-relaxed tracking-wide text-text-secondary md:max-w-[75%] md:text-lg">
            {t("presentation.subtitle")}
          </p>

          <SocialMedia className="justify-start" />
        </section>
      </SessionWrapper>
    </>
  );
}

const SessionWrapper = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={twMerge(
      "relative z-10 flex w-full max-w-480 flex-col items-center justify-between py-8 font-body max-ultra:px-[10vw] md:py-12 lg:py-16",
      "first-of-type:mt-8 last-of-type:mb-8 md:first-of-type:mt-12 md:last-of-type:mb-12 lg:first-of-type:mt-16 lg:last-of-type:mb-16",
      className,
    )}
    {...props}
  />
);
