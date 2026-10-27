import { getTranslations } from "next-intl/server";

import { TerminalContact } from "@/components/organisms/TerminalContact";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/constants/socialMedia";

const linkClassName =
  "text-text-secondary underline-offset-4 transition hover:text-text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";

export const Footer = async () => {
  const t = await getTranslations();

  return (
    <footer
      id="contact"
      data-testid="footer"
      className="mt-24 border-t border-border-subtle"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-16 md:px-8">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-[20ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {t("footer.title")}
          </h2>
          <p className="max-w-[55ch] text-text-secondary">{t("footer.body")}</p>
          <a
            href={`mailto:${EMAIL}`}
            className="w-fit font-mono text-lg text-accent-500 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            {EMAIL}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-text-muted">{t("terminal.hint")}</p>
          <div>
            <TerminalContact />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-4 border-t border-border-subtle pt-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} Guilherme Moraes ·{" "}
            {t("footer.made-with-love")}
          </span>

          <ul className="flex gap-6">
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
