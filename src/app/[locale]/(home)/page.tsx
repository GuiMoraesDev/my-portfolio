import { getTranslations } from "next-intl/server";

import { SocialMedia } from "@/components/molecules/SocialMedia";
import { TerminalContact } from "@/components/organisms/TerminalContact";

export const dynamic = "force-static";

export default async function Home() {
  const t = await getTranslations();

  return (
    <div
      data-testid="presentation"
      className="relative mb-10 flex h-full w-full flex-col justify-end gap-6 font-body text-text-primary"
    >
      <header className="flex flex-col gap-4 md:gap-6">
        <p className="motion-enter text-sm font-medium tracking-widest md:text-base lg:text-lg">
          {t("presentation.name")}
        </p>

        <div className="flex w-full flex-col gap-6">
          <h1 className="motion-enter motion-enter-delay-1 font-title text-xl leading-tight font-bold tracking-tight text-accent-500 md:text-3xl lg:text-5xl">
            Guilherme Moraes
          </h1>

          <h2
            data-testid="my-title"
            className="motion-enter motion-enter-delay-2 font-title text-lg tracking-tight text-text-secondary md:text-xl lg:text-2xl"
          >
            {t("presentation.title")}
          </h2>
        </div>
      </header>

      <p className="motion-enter motion-enter-delay-2 leading-relaxed tracking-wide text-text-secondary md:max-w-[75%] md:text-lg">
        {t("presentation.subtitle")}
      </p>

      <p className="motion-enter motion-enter-delay-3 text-sm tracking-wide text-text-muted">
        {t("presentation.stack")}
      </p>

      <SocialMedia className="justify-start" />

      <section className="absolute top-0 right-0 -translate-x-1/3">
        <TerminalContact />
      </section>
    </div>
  );
}
