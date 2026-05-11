"use client";

import { motion, useDragControls } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { useControlCommandLine } from "../hooks/useControlCommandLine";

import { TerminalInput } from "./TerminalInput";

import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/atoms/Dialog";
import { Icon } from "@/components/atoms/Icon";

type TerminalWindowProps = {
  onClose: VoidFunction;
};

export const TerminalWindow = ({ onClose }: TerminalWindowProps) => {
  const t = useTranslations("terminal");
  const dragControls = useDragControls();
  const {
    lines,
    history,
    currentHistoryIndex,
    slashCommands,
    onSubmitCommand,
    onUpdateCurrentHistoryIndex,
  } = useControlCommandLine();

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0" />
      <DialogContent
        data-testid="terminal-dialog"
        className="fixed inset-0 z-100 flex items-center justify-center bg-transparent p-0"
      >
        <motion.div
          drag
          dragControls={dragControls}
          dragListener={false}
          dragElastic={0}
          dragMomentum={false}
          className="flex h-[min(30rem,85dvh)] w-full max-w-2xl flex-col overflow-hidden rounded border border-border-strong bg-terminal-surface shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
        >
          <DialogTitle>
            <header
              data-testid="terminal-drag-handle"
              onPointerDown={(e) => dragControls.start(e)}
              className="flex shrink-0 cursor-grab items-center gap-2 border-b border-border-subtle bg-terminal-titlebar px-4 py-2.5 active:cursor-grabbing"
            >
              <button
                data-testid="terminal-close-button"
                type="button"
                aria-label={t("close-label")}
                onClick={onClose}
                onPointerDown={(e) => e.stopPropagation()}
                className="group relative h-3.5 w-3.5 rounded-full bg-terminal-close focus-visible:outline-2 focus-visible:outline-offset-1"
              >
                <Icon
                  name="Cross"
                  className="absolute top-1/2 left-1/2 flex size-3.5! -translate-1/2 items-center justify-center stroke-2 font-medium text-black opacity-0 transition-opacity group-hover:opacity-100"
                />
              </button>
              <span className="h-3.5 w-3.5 rounded-full bg-terminal-minimize" />
              <span className="h-3.5 w-3.5 rounded-full bg-terminal-maximize" />
            </header>

            <div className="flex shrink-0 items-center gap-3 border-b border-border-subtle bg-terminal-surface px-4 py-3">
              <MascotPixel className="h-10 w-auto" />
              <div className="font-mono text-xs leading-5">
                <p>
                  <span className="font-bold text-text-primary">
                    guimoraes.dev
                  </span>
                  <span className="text-text-muted"> · portfolio</span>
                </p>
                <p className="text-text-muted">{t("tagline")}</p>
                <p data-testid="terminal-path" className="text-text-muted">
                  ~/.guimoraes.dev
                </p>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t("description")}
          </DialogDescription>

          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
            {lines.map((line, index) => (
              <li key={index} className="flex flex-col">
                {line.type === "input" && (
                  <div data-testid="terminal-line-input" className="flex gap-2">
                    <span className="text-plum-300 select-none">$</span>
                    <span className="text-text-primary">{line.text}</span>
                  </div>
                )}
                {line.type === "link" && (
                  <div className="pl-4">
                    <a
                      data-testid="terminal-line-link"
                      href={line.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-plum-300 underline hover:opacity-80"
                    >
                      {line.text}
                    </a>
                  </div>
                )}
                {line.type === "error" && (
                  <div
                    data-testid="terminal-line-error"
                    className="pl-4 text-red-400"
                  >
                    {line.text}
                  </div>
                )}
                {line.type === "output" && (
                  <div
                    data-testid="terminal-line-output"
                    className="pl-4 text-text-secondary"
                  >
                    {line.text}
                  </div>
                )}
              </li>
            ))}
            <div ref={bottomRef} />
          </ul>

          <TerminalInput
            slashCommands={slashCommands}
            history={history}
            currentHistoryIndex={currentHistoryIndex}
            onSubmitCommand={onSubmitCommand}
            onUpdateCurrentHistoryIndex={onUpdateCurrentHistoryIndex}
            scrollToBottom={scrollToBottom}
          />
        </motion.div>
      </DialogContent>
    </DialogPortal>
  );
};

const MascotPixel = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 40 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Antenna */}
    <rect
      x="26"
      y="0"
      width="6"
      height="6"
      fill="#49213b"
      className="animate-pulse"
    />
    <rect x="24" y="5" width="10" height="3" fill="#421138" />
    {/* Head */}
    <rect x="2" y="8" width="36" height="16" fill="#49213b" />
    {/* Visor */}
    <rect x="4" y="10" width="32" height="10" fill="white" />

    {/* Eyes */}
    <motion.rect
      className="origin-center"
      animate={{ scaleY: [1, 0.1, 1] }}
      transition={{
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 3,
      }}
      x="7"
      y="12"
      width="6"
      height="6"
      fill="#57123f"
    />
    <motion.rect
      className="origin-center"
      animate={{ scaleY: [1, 0.1, 1] }}
      transition={{
        duration: 0.2,
        delay: 0.5,
        repeat: Infinity,
        repeatDelay: 3,
      }}
      x="17"
      y="12"
      width="6"
      height="6"
      fill="#ce8bb3"
    />
    <motion.rect
      className="origin-center"
      animate={{ scaleY: [1, 0.1, 1] }}
      transition={{
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 3,
      }}
      x="27"
      y="12"
      width="6"
      height="6"
      fill="#FFBF36"
    />
    {/* Body */}
    <rect x="2" y="26" width="36" height="18" fill="#49213b" />
    {/* Right panel */}
    <rect x="28" y="26" width="10" height="18" fill="#57123f" />
    {/* Red button */}
    <rect x="30" y="29" width="6" height="6" fill="#ce8bb3" />
    {/* Orange button */}
    <rect x="30" y="37" width="5" height="5" fill="#daa8c6" />
    {/* Legs */}
    <rect x="6" y="44" width="10" height="5" fill="#49213b" />
    <rect x="24" y="44" width="10" height="5" fill="#49213b" />
    {/* Feet */}
    <rect x="3" y="47" width="16" height="5" fill="#0d020d" />
    <rect x="21" y="47" width="16" height="5" fill="#0d020d" />
  </svg>
);
