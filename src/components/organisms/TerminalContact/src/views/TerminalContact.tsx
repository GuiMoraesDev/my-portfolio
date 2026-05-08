"use client";

import { motion, useDragControls } from "motion/react";
import { useState } from "react";

import { TerminalMascot } from "../components/Mascot";
import { TerminalWindow } from "../components/TerminalWindow";

import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from "@/components/atoms/Dialog";

export const TerminalContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dragControls = useDragControls();

  return (
    <nav className="z-40">
      <button
        data-testid="terminal-open-button"
        type="button"
        aria-label="Open terminal"
        onClick={() => setIsOpen(true)}
        className="flex size-14 cursor-pointer items-center justify-center"
      >
        <TerminalMascot isOpen={isOpen} />
      </button>

      <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0" />
          <DialogContent
            data-testid="terminal-dialog"
            className="fixed inset-0 flex items-center justify-center bg-transparent p-0"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <motion.div
              drag
              dragControls={dragControls}
              dragListener={false}
              dragElastic={0}
              dragMomentum={false}
              className="flex h-[min(30rem,85dvh)] w-full max-w-2xl flex-col overflow-hidden rounded border border-border-strong bg-[#0d0d0d] shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
            >
              <TerminalWindow
                onClose={() => setIsOpen(false)}
                onDragStart={(e) => dragControls.start(e)}
              />
            </motion.div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </nav>
  );
};
