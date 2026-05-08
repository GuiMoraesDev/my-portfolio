"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { TerminalMascot } from "../components/Mascot";
import { TerminalWindow } from "../components/TerminalWindow";

import { DialogRoot } from "@/components/atoms/Dialog";

export const TerminalContact = () => {
  const t = useTranslations("terminal");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-40">
      <button
        data-testid="terminal-open-button"
        type="button"
        aria-label={t("open-label")}
        onClick={() => setIsOpen(true)}
        className="flex size-14 cursor-pointer items-center justify-center"
      >
        <TerminalMascot isOpen={isOpen} />
      </button>

      <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
        <TerminalWindow onClose={() => setIsOpen(false)} />
      </DialogRoot>
    </nav>
  );
};
