"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TerminalContactLabels = {
  trigger: string;
  close: string;
  messageLabel: string;
  messagePlaceholder: string;
  sendCta: string;
  whoamiOutput: string;
  contactMethodsOutput: string;
};

type TerminalContactProps = {
  email: string;
  labels: TerminalContactLabels;
};

export const TerminalContact = ({ email, labels }: TerminalContactProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    textareaRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll<
        HTMLButtonElement | HTMLAnchorElement | HTMLTextAreaElement
      >("button, a[href], textarea");
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const mailToHref = useMemo(() => {
    const params = new URLSearchParams({
      subject: "Portfolio contact",
      body: message,
    });
    return `mailto:${email}?${params.toString()}`;
  }, [email, message]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-elevated)] px-4 py-2 text-[var(--text-caption)] font-medium text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-accent-400)] hover:text-[color:var(--color-accent-400)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent-400)]"
      >
        {labels.trigger}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-8"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label={labels.trigger}
            ref={dialogRef}
            className="w-full max-w-3xl overflow-hidden rounded border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-elevated)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-[color:var(--color-border-subtle)] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded px-2 py-1 text-[var(--text-caption)] text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent-400)]"
              >
                {labels.close}
              </button>
            </header>

            <div className="space-y-4 p-4 font-mono text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
              <p>
                <span className="text-[color:var(--color-accent-400)]">$</span>{" "}
                whoami
              </p>
              <p className="pl-4 text-[color:var(--color-text-primary)]">
                {labels.whoamiOutput}
              </p>

              <p>
                <span className="text-[color:var(--color-accent-400)]">$</span>{" "}
                contact --methods
              </p>
              <p className="pl-4 text-[color:var(--color-text-primary)]">
                {labels.contactMethodsOutput}
              </p>

              <div className="space-y-2">
                <p>
                  <span className="text-[color:var(--color-accent-400)]">$</span>{" "}
                  send-message
                </p>
                <label className="sr-only" htmlFor="terminal-message">
                  {labels.messageLabel}
                </label>
                <div className="relative rounded border border-[color:var(--color-border-subtle)] bg-black/20 p-3 focus-within:border-[color:var(--color-accent-400)]">
                  <textarea
                    id="terminal-message"
                    ref={textareaRef}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={labels.messagePlaceholder}
                    className="min-h-28 w-full resize-y bg-transparent pr-4 text-[color:var(--color-text-primary)] outline-none placeholder:text-[color:var(--color-text-muted)]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 bottom-3 inline-block h-4 w-px bg-[color:var(--color-accent-400)] animate-terminal-caret"
                  />
                </div>
              </div>
            </div>

            <footer className="flex justify-end border-t border-[color:var(--color-border-subtle)] px-4 py-3">
              <a
                href={mailToHref}
                className="rounded border border-[color:var(--color-accent-400)] px-3 py-2 text-[var(--text-caption)] font-semibold text-[color:var(--color-accent-400)] transition-colors hover:bg-[color:var(--color-accent-400)] hover:text-[color:var(--color-bg-canvas)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent-400)]"
              >
                {labels.sendCta}
              </a>
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
};
