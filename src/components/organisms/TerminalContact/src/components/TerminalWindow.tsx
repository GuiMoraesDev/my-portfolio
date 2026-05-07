"use client";

import { motion } from "framer-motion";

import { useTerminalInput } from "../hooks/useTerminalInput";

import { TerminalInput } from "./TerminalInput";

import { Icon } from "@/components/atoms/Icon";

type TerminalWindowProps = {
  onClose: VoidFunction;
};

export const TerminalWindow = ({ onClose }: TerminalWindowProps) => {
  const {
    input,
    inputRef,
    bottomRef,
    lines,
    filteredSuggestions,
    suggestionIndex,
    onSelectSuggestion,
    onKeyDown,
    onInputChange,
  } = useTerminalInput();

  return (
    <>
      <header className="flex shrink-0 items-center gap-2 border-b border-border-subtle bg-[#111] px-4 py-2.5">
        <button
          data-testid="terminal-close-button"
          type="button"
          aria-label="Close terminal"
          onClick={onClose}
          className="group relative h-3.5 w-3.5 rounded-full bg-[#ff5f56] focus-visible:outline-2 focus-visible:outline-offset-1"
        >
          <Icon
            name="Cross"
            className="absolute top-1/2 left-1/2 flex size-3.5! -translate-1/2 items-center justify-center stroke-2 font-medium opacity-0 transition-opacity group-hover:opacity-100"
          />
        </button>
        <span className="h-3.5 w-3.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-3.5 w-3.5 rounded-full bg-[#27c93f]" />
      </header>

      <div className="flex shrink-0 items-center gap-3 border-b border-border-subtle bg-[#0d0d0d] px-4 py-3">
        <MascotPixel className="h-10 w-auto" />
        <div className="font-mono text-xs leading-5">
          <p>
            <span className="font-bold text-text-primary">guimoraes.dev</span>
            <span className="text-text-muted"> · portfolio</span>
          </p>
          <p className="text-text-muted">Full-stack developer</p>
          <p data-testid="terminal-path" className="text-text-muted">
            ~/.guimoraes.dev
          </p>
        </div>
      </div>

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
        input={input}
        inputRef={inputRef}
        filteredSuggestions={filteredSuggestions}
        suggestionIndex={suggestionIndex}
        onSelectSuggestion={onSelectSuggestion}
        onKeyDown={onKeyDown}
        onInputChange={onInputChange}
      />
    </>
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
      fill="#00B7BC"
      className="animate-pulse"
    />
    <rect x="24" y="5" width="10" height="3" fill="#1B3137" />
    {/* Head */}
    <rect x="2" y="8" width="36" height="16" fill="#00B7BC" />
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
      fill="#91513C"
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
      fill="#C6966D"
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
    <rect x="2" y="26" width="36" height="18" fill="#00B7BC" />
    {/* Right panel */}
    <rect x="28" y="26" width="10" height="18" fill="#1C6E77" />
    {/* Red button */}
    <rect x="30" y="29" width="6" height="6" fill="#F36353" />
    {/* Orange button */}
    <rect x="30" y="37" width="5" height="5" fill="#FFBF3F" />
    {/* Legs */}
    <rect x="6" y="44" width="10" height="5" fill="#00B7BC" />
    <rect x="24" y="44" width="10" height="5" fill="#00B7BC" />
    {/* Feet */}
    <rect x="3" y="47" width="16" height="5" fill="#04363D" />
    <rect x="21" y="47" width="16" height="5" fill="#04363D" />
  </svg>
);
