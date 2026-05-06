"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useControlCommandLine } from "../hooks/useControlCommandLine";

import { Icon } from "@/components/atoms/Icon";

export const TerminalContact = () => {
  const [input, setInput] = useState("");

  const {
    lines,
    history,
    currentHistoryIndex,
    onSubmitCommand,
    onUpdateCurrentHistoryIndex,
  } = useControlCommandLine();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleScrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleClearInput = () => {
    setInput("");
  };

  const handleEnterKeyPress = () => {
    onSubmitCommand(input);
    handleScrollToBottom();
    handleClearInput();
  };

  const handleArrowUpKeypress = () => {
    const next = Math.min(currentHistoryIndex + 1, history.length - 1);

    onUpdateCurrentHistoryIndex(next);
    setInput(history[next] ?? "");
  };

  const handleArrowDownKeypress = () => {
    const next = currentHistoryIndex - 1;

    if (next < 0) {
      onUpdateCurrentHistoryIndex(-1);
      handleClearInput();

      return;
    }

    onUpdateCurrentHistoryIndex(next);
    setInput(history[next] ?? "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter": {
        return handleEnterKeyPress();
      }
      case "ArrowUp": {
        return handleArrowUpKeypress();
      }
      case "ArrowDown": {
        return handleArrowDownKeypress();
      }
    }
  };

  const handleOpenModal = () => dialogRef.current?.showModal();

  const handleCloseModal = () => dialogRef.current?.close();

  return (
    <nav className="relative top-60 right-6 z-40">
      <button
        data-testid="terminal-open-button"
        type="button"
        aria-label="Open terminal"
        onClick={handleOpenModal}
        className="flex size-14 cursor-pointer items-center justify-center"
      >
        <Mascot />
      </button>

      <dialog
        data-testid="terminal-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        ref={dialogRef}
        className={twMerge(
          "invisible fixed top-1/2 left-1/2 h-0 w-0 border-0",
          "open:visible open:h-120 open:w-[90%] open:border",
          "z-50 flex max-w-2xl origin-center -translate-1/2 flex-col overflow-hidden rounded border-border-strong bg-[#0d0d0d] shadow-[0_16px_48px_rgba(0,0,0,0.7)] transition-all",
        )}
      >
        <header className="flex shrink-0 items-center gap-2 border-b border-border-subtle bg-[#111] px-4 py-2.5">
          <button
            data-testid="terminal-close-button"
            type="button"
            aria-label="Close terminal"
            onClick={handleCloseModal}
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
          {lines.map((line, lineIndex) => (
            <li key={lineIndex} className="flex flex-col">
              {line.type === "input" && (
                <div data-testid="terminal-line-input" className="flex gap-2">
                  <span className="text-plum-300 select-none">$</span>
                  <span className="text-text-primary">{line.text}</span>
                </div>
              )}
              {line.type === "link" && (
                <div key={lineIndex + "_link"} className="pl-4">
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
                  key={lineIndex + "_error"}
                  className="pl-4 text-red-400"
                >
                  {line.text}
                </div>
              )}
              {line.type === "output" && (
                <div
                  data-testid="terminal-line-output"
                  key={lineIndex + "_text"}
                  className="pl-4 text-text-secondary"
                >
                  {line.text}
                </div>
              )}
            </li>
          ))}
          <div ref={bottomRef} />
        </ul>

        <footer className="flex shrink-0 items-center gap-2 border-t border-border-subtle px-4 py-3 font-mono text-sm">
          <span aria-hidden className="text-plum-300 select-none">
            $
          </span>
          <input
            data-testid="terminal-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-text-primary caret-plum-300 outline-none placeholder:text-text-muted"
            placeholder="type a command..."
            aria-label="Terminal input"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </footer>
      </dialog>
    </nav>
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

const Mascot = () => (
  <motion.svg
    animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    width="300"
    height="300"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-auto"
  >
    <motion.g
      id="right-leg"
      className="origin-center"
      animate={{ translateY: [0, -1, -2, -3, -2, -1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    >
      <path
        d="M167.702 279.503C167.702 278.268 168.703 277.267 169.938 277.267H251.925C253.16 277.267 254.161 278.268 254.161 279.503V286.957C254.161 288.191 253.16 289.193 251.925 289.193H169.938C168.703 289.193 167.702 288.191 167.702 286.957V279.503Z"
        fill="#04363D"
      />
      <path
        d="M213.168 258.634H250.435V277.267H213.168V258.634Z"
        fill="#1C6E77"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M246.708 277.267V258.634H250.435V277.267H246.708ZM216.894 277.267V258.634H213.168V277.267H216.894Z"
        fill="#1B3137"
      />
      <path
        d="M181.863 258.634H219.13V277.267H181.863V258.634Z"
        fill="#00B7BC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M215.404 277.267V258.634H219.13V277.267H215.404ZM185.59 277.267V258.634H181.863V277.267H185.59Z"
        fill="#1B3137"
      />
    </motion.g>

    <motion.g
      id="left-leg"
      className="origin-center"
      animate={{ translateY: [-3, -2, -1, 0, -1, -2] }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    >
      <path
        d="M44.3478 279.503C44.3478 278.268 45.3489 277.267 46.5839 277.267H128.571C129.806 277.267 130.807 278.268 130.807 279.503V286.957C130.807 288.191 129.806 289.193 128.571 289.193H46.5839C45.3489 289.193 44.3478 288.191 44.3478 286.957V279.503Z"
        fill="#04363D"
      />
      <path
        d="M91.677 258.634H128.944V277.267H91.677V258.634Z"
        fill="#1C6E77"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M125.217 277.267V258.634H128.944V277.267H125.217ZM95.4037 277.267V258.634H91.677V277.267H95.4037Z"
        fill="#1B3137"
      />
      <path
        d="M64.0994 258.634H101.366V277.267H64.0994V258.634Z"
        fill="#00B7BC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M97.6397 277.267V258.634H101.366V277.267H97.6397ZM67.8261 277.267V258.634H64.0994V277.267H67.8261Z"
        fill="#1B3137"
      />
    </motion.g>

    <g id="antena">
      <path
        d="M198.634 26.4596C198.634 35.3099 191.459 42.4845 182.609 42.4845C173.758 42.4845 166.584 35.3099 166.584 26.4596C166.584 17.6094 173.758 10.4348 182.609 10.4348C191.459 10.4348 198.634 17.6094 198.634 26.4596Z"
        fill="#00B4D8"
        className="animate-pulse"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M182.609 38.0124C188.989 38.0124 194.161 32.8401 194.161 26.4596C194.161 20.0792 188.989 14.9068 182.609 14.9068C176.228 14.9068 171.056 20.0792 171.056 26.4596C171.056 32.8401 176.228 38.0124 182.609 38.0124ZM182.609 42.4845C191.459 42.4845 198.634 35.3099 198.634 26.4596C198.634 17.6094 191.459 10.4348 182.609 10.4348C173.758 10.4348 166.584 17.6094 166.584 26.4596C166.584 35.3099 173.758 42.4845 182.609 42.4845Z"
        fill="#1B3137"
      />
    </g>

    <g id="body">
      <path
        d="M165.093 36.8944H201.988C236.977 36.8944 265.342 65.259 265.342 100.248V247.453C265.342 253.628 260.336 258.634 254.161 258.634H165.093V36.8944Z"
        fill="#1F6D75"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M201.988 40.6211H168.82V254.907H254.161C258.278 254.907 261.615 251.57 261.615 247.453V100.248C261.615 67.3172 234.919 40.6211 201.988 40.6211ZM165.093 36.8944V258.634H254.161C260.336 258.634 265.342 253.628 265.342 247.453V100.248C265.342 65.259 236.977 36.8944 201.988 36.8944H165.093Z"
        fill="#1B3137"
      />
      <path
        d="M54.0373 92.795C54.0373 61.922 79.0648 36.8944 109.938 36.8944H175.901C206.774 36.8944 231.801 61.922 231.801 92.795V251.18C231.801 255.297 228.464 258.634 224.348 258.634H61.4907C57.3743 258.634 54.0373 255.297 54.0373 251.18V92.795Z"
        fill="#00B7BC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M175.901 40.6211H109.938C81.123 40.6211 57.764 63.9802 57.764 92.795V251.18C57.764 253.238 59.4325 254.907 61.4907 254.907H224.348C226.406 254.907 228.075 253.238 228.075 251.18V92.795C228.075 63.9802 204.715 40.6211 175.901 40.6211ZM109.938 36.8944C79.0648 36.8944 54.0373 61.922 54.0373 92.795V251.18C54.0373 255.297 57.3743 258.634 61.4907 258.634H224.348C228.464 258.634 231.801 255.297 231.801 251.18V92.795C231.801 61.922 206.774 36.8944 175.901 36.8944H109.938Z"
        fill="#1B3137"
      />
      <path
        d="M239.627 151.304C239.627 150.069 240.628 149.068 241.863 149.068H252.671C253.906 149.068 254.907 150.069 254.907 151.304C254.907 152.539 253.906 153.54 252.671 153.54H241.863C240.628 153.54 239.627 152.539 239.627 151.304Z"
        fill="#1C3339"
      />
      <path
        d="M239.627 162.484C239.627 161.25 240.628 160.248 241.863 160.248H252.671C253.906 160.248 254.907 161.25 254.907 162.484C254.907 163.719 253.906 164.721 252.671 164.721H241.863C240.628 164.721 239.627 163.719 239.627 162.484Z"
        fill="#1C3339"
      />
      <path
        d="M239.627 173.665C239.627 172.43 240.628 171.429 241.863 171.429H252.671C253.906 171.429 254.907 172.43 254.907 173.665C254.907 174.9 253.906 175.901 252.671 175.901H241.863C240.628 175.901 239.627 174.9 239.627 173.665Z"
        fill="#1C3339"
      />
      <path
        d="M239.627 184.845C239.627 183.61 240.628 182.609 241.863 182.609H252.671C253.906 182.609 254.907 183.61 254.907 184.845C254.907 186.08 253.906 187.081 252.671 187.081H241.863C240.628 187.081 239.627 186.08 239.627 184.845Z"
        fill="#1C3339"
      />
      <path
        d="M239.627 196.025C239.627 194.79 240.628 193.789 241.863 193.789H252.671C253.906 193.789 254.907 194.79 254.907 196.025C254.907 197.26 253.906 198.261 252.671 198.261H241.863C240.628 198.261 239.627 197.26 239.627 196.025Z"
        fill="#1C3339"
      />
      <path
        d="M239.627 207.205C239.627 205.97 240.628 204.969 241.863 204.969H252.671C253.906 204.969 254.907 205.97 254.907 207.205C254.907 208.44 253.906 209.441 252.671 209.441H241.863C240.628 209.441 239.627 208.44 239.627 207.205Z"
        fill="#1C3339"
      />
      <path
        d="M239.627 218.385C239.627 217.15 240.628 216.149 241.863 216.149H252.671C253.906 216.149 254.907 217.15 254.907 218.385C254.907 219.62 253.906 220.621 252.671 220.621H241.863C240.628 220.621 239.627 219.62 239.627 218.385Z"
        fill="#1C3339"
      />
    </g>

    <g id="red-button">
      <path
        d="M219.876 179.255C219.876 188.517 212.368 196.025 203.106 196.025C193.844 196.025 186.335 188.517 186.335 179.255C186.335 169.993 193.844 162.484 203.106 162.484C212.368 162.484 219.876 169.993 219.876 179.255Z"
        fill="#F36353"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M203.106 192.298C210.309 192.298 216.149 186.458 216.149 179.255C216.149 172.051 210.309 166.211 203.106 166.211C195.902 166.211 190.062 172.051 190.062 179.255C190.062 186.458 195.902 192.298 203.106 192.298ZM203.106 196.025C212.368 196.025 219.876 188.517 219.876 179.255C219.876 169.993 212.368 162.484 203.106 162.484C193.844 162.484 186.335 169.993 186.335 179.255C186.335 188.517 193.844 196.025 203.106 196.025Z"
        fill="#1B3137"
      />
    </g>

    <g id="orange-button">
      <path
        d="M195.652 210C195.652 217.718 189.395 223.975 181.677 223.975C173.959 223.975 167.702 217.718 167.702 210C167.702 202.282 173.959 196.025 181.677 196.025C189.395 196.025 195.652 202.282 195.652 210Z"
        fill="#FFBF3F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M181.677 220.248C187.337 220.248 191.925 215.66 191.925 210C191.925 204.34 187.337 199.752 181.677 199.752C176.017 199.752 171.429 204.34 171.429 210C171.429 215.66 176.017 220.248 181.677 220.248ZM181.677 223.975C189.395 223.975 195.652 217.718 195.652 210C195.652 202.282 189.395 196.025 181.677 196.025C173.959 196.025 167.702 202.282 167.702 210C167.702 217.718 173.959 223.975 181.677 223.975Z"
        fill="#1B3137"
      />
    </g>

    <g id="eye-mask">
      <path
        d="M49.1925 83.1056C49.1925 71.5797 58.5362 62.236 70.0621 62.236H215.031C226.557 62.236 235.901 71.5797 235.901 83.1056V124.845C235.901 136.371 226.557 145.714 215.031 145.714H70.0621C58.5362 145.714 49.1925 136.371 49.1925 124.845V83.1056Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M215.031 65.9627H70.0621C60.5944 65.9627 52.9193 73.6379 52.9193 83.1056V124.845C52.9193 134.312 60.5944 141.988 70.0621 141.988H215.031C224.499 141.988 232.174 134.312 232.174 124.845V83.1056C232.174 73.6379 224.499 65.9627 215.031 65.9627ZM70.0621 62.236C58.5362 62.236 49.1925 71.5797 49.1925 83.1056V124.845C49.1925 136.371 58.5362 145.714 70.0621 145.714H215.031C226.557 145.714 235.901 136.371 235.901 124.845V83.1056C235.901 71.5797 226.557 62.236 215.031 62.236H70.0621Z"
        fill="#202D33"
      />

      <motion.g
        id="brown-eye"
        className="origin-center"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <path
          d="M173.292 89.0683C173.292 82.8937 178.297 77.8882 184.472 77.8882H203.106C209.28 77.8882 214.286 82.8937 214.286 89.0683V118.882C214.286 125.057 209.28 130.062 203.106 130.062H184.472C178.297 130.062 173.292 125.057 173.292 118.882V89.0683Z"
          fill="#91513C"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M203.106 81.6149H184.472C180.356 81.6149 177.019 84.9519 177.019 89.0683V118.882C177.019 122.998 180.356 126.335 184.472 126.335H203.106C207.222 126.335 210.559 122.998 210.559 118.882V89.0683C210.559 84.9519 207.222 81.6149 203.106 81.6149ZM184.472 77.8882C178.297 77.8882 173.292 82.8937 173.292 89.0683V118.882C173.292 125.057 178.297 130.062 184.472 130.062H203.106C209.28 130.062 214.286 125.057 214.286 118.882V89.0683C214.286 82.8937 209.28 77.8882 203.106 77.8882H184.472Z"
          fill="#202D33"
        />
      </motion.g>

      <motion.g
        className="origin-center"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{
          duration: 0.2,
          delay: 0.5,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        id="orange-eye"
      >
        <path
          d="M118.137 89.0683C118.137 82.8937 123.142 77.8882 129.317 77.8882H147.95C154.125 77.8882 159.13 82.8937 159.13 89.0683V118.882C159.13 125.057 154.125 130.062 147.95 130.062H129.317C123.142 130.062 118.137 125.057 118.137 118.882V89.0683Z"
          fill="#C6966D"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M147.95 81.6149H129.317C125.2 81.6149 121.863 84.9519 121.863 89.0683V118.882C121.863 122.998 125.2 126.335 129.317 126.335H147.95C152.067 126.335 155.404 122.998 155.404 118.882V89.0683C155.404 84.9519 152.067 81.6149 147.95 81.6149ZM129.317 77.8882C123.142 77.8882 118.137 82.8937 118.137 89.0683V118.882C118.137 125.057 123.142 130.062 129.317 130.062H147.95C154.125 130.062 159.13 125.057 159.13 118.882V89.0683C159.13 82.8937 154.125 77.8882 147.95 77.8882H129.317Z"
          fill="#202D33"
        />
      </motion.g>

      <motion.g
        className="origin-center"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        id="yellow-eye"
      >
        <path
          d="M62.9814 89.0683C62.9814 82.8937 67.9869 77.8882 74.1615 77.8882H92.795C98.9696 77.8882 103.975 82.8937 103.975 89.0683V118.882C103.975 125.057 98.9696 130.062 92.795 130.062H74.1615C67.9869 130.062 62.9814 125.057 62.9814 118.882V89.0683Z"
          fill="#FFBF36"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M92.795 81.6149H74.1615C70.0451 81.6149 66.7081 84.9519 66.7081 89.0683V118.882C66.7081 122.998 70.0451 126.335 74.1615 126.335H92.795C96.9114 126.335 100.248 122.998 100.248 118.882V89.0683C100.248 84.9519 96.9114 81.6149 92.795 81.6149ZM74.1615 77.8882C67.9869 77.8882 62.9814 82.8937 62.9814 89.0683V118.882C62.9814 125.057 67.9869 130.062 74.1615 130.062H92.795C98.9696 130.062 103.975 125.057 103.975 118.882V89.0683C103.975 82.8937 98.9696 77.8882 92.795 77.8882H74.1615Z"
          fill="#202D33"
        />
      </motion.g>
    </g>
  </motion.svg>
);
