"use client";

import { motion, useDragControls } from "framer-motion";
import { useRef, useState } from "react";

import { TerminalMascot } from "../components/Mascot";
import { TerminalWindow } from "../components/TerminalWindow";

export const TerminalContact = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dragControls = useDragControls();

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
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center border-0 bg-transparent p-0 open:flex"
      >
        <motion.div
          drag
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={dialogRef}
          dragElastic={0}
          dragMomentum={false}
          className="flex h-[min(30rem,85dvh)] w-full max-w-2xl flex-col overflow-hidden rounded border border-border-strong bg-[#0d0d0d] shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
        >
          <TerminalWindow
            onClose={handleClose}
            onDragStart={(e) => dragControls.start(e)}
          />
        </motion.div>
      </dialog>
    </nav>
  );
};
