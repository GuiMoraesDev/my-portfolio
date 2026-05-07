"use client";

import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { TerminalMascot } from "../components/Mascot";
import { TerminalWindow } from "../components/TerminalWindow";

export const TerminalContact = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const handleClose = () => {
    dialogRef.current?.close();
    setIsOpen(false);
  };

  return (
    <nav className="z-40">
      <button
        data-testid="terminal-open-button"
        type="button"
        aria-label="Open terminal"
        onClick={handleOpen}
        className="flex size-14 cursor-pointer items-center justify-center"
      >
        <TerminalMascot isOpen={isOpen} />
      </button>

      <dialog
        data-testid="terminal-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        ref={dialogRef}
        className={twMerge(
          "invisible h-0 w-0 border-0",
          "open:visible open:h-[min(30rem,85dvh)] open:w-screen open:border",
          "fixed top-1/2 left-1/2 z-50 flex max-w-2xl origin-center flex-col overflow-hidden rounded border-border-strong bg-[#0d0d0d] shadow-[0_16px_48px_rgba(0,0,0,0.7)] transition-all open:-translate-1/2",
        )}
      >
        <TerminalWindow onClose={handleClose} />
      </dialog>
    </nav>
  );
};
