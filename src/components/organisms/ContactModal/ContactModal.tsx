"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/Dialog";
import { Icon } from "@/components/atoms/Icon";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_PATH,
} from "@/constants/socialMedia";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";

const rowClassName = twMerge(
  "flex h-11 items-center gap-3 rounded-md border border-border-subtle px-4 text-sm text-text-secondary transition hover:border-border-strong hover:text-text-primary",
  focusRing,
);

type ContactModalProps = {
  label: string;
  className?: string;
  onOpen?: () => void;
};

export const ContactModal = ({
  label,
  className,
  onOpen,
}: ContactModalProps) => {
  const t = useTranslations("contact");
  const tPresentation = useTranslations("presentation");
  const [isCopied, setIsCopied] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) onOpen?.();
    setIsCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setIsCopied(true);
  };

  return (
    <DialogRoot onOpenChange={handleOpenChange}>
      <DialogTrigger data-testid="contact-open-button" className={className}>
        {label}
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm" />

        <DialogContent
          data-testid="contact-dialog"
          className="fixed top-1/2 left-1/2 z-100 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-lg border border-border-subtle bg-bg-elevated p-6 text-text-primary shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-xl font-semibold tracking-tight">
                {t("title")}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-text-secondary">
                {t("description")}
              </DialogDescription>
            </div>

            <DialogClose
              data-testid="contact-close-button"
              aria-label={t("close-label")}
              className={twMerge(
                "cursor-pointer rounded-sm text-text-muted transition hover:text-text-primary",
                focusRing,
              )}
            >
              <Icon name="Cross" size="sm" />
            </DialogClose>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-border-subtle bg-bg-canvas p-1.5 pl-4">
            <a
              href={`mailto:${EMAIL}`}
              className={twMerge(
                "flex-1 truncate rounded-sm font-mono text-xs text-accent-500 underline-offset-4 hover:underline sm:text-sm",
                focusRing,
              )}
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-live="polite"
              className={twMerge(
                "h-8 shrink-0 cursor-pointer rounded-sm bg-text-primary px-3 text-xs font-medium text-bg-canvas transition hover:bg-white",
                focusRing,
              )}
            >
              {isCopied ? t("copied") : t("copy")}
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClassName}
              >
                <Icon name="LinkedIn" size="sm" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClassName}
              >
                <Icon name="Github" size="sm" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClassName}
              >
                <Icon name="Download" size="sm" />
                {tPresentation("my-resume")}
              </a>
            </li>
          </ul>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};
