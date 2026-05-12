"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { TerminalMascot } from "../components/Mascot";
import { TerminalWindow } from "../components/TerminalWindow";

import {
  DialogContent,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from "@/components/atoms/Dialog";

export const TerminalContact = () => {
  const t = useTranslations("terminal");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        data-testid="terminal-open-button"
        aria-label={t("open-label")}
        className="flex size-14 cursor-pointer md:size-32"
      >
        <TerminalMascot isOpen={isOpen} />
      </DialogTrigger>

      <DialogPortal>
        <DialogContent
          data-testid="terminal-dialog"
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink-900/50 p-0"
        >
          <TerminalWindow />
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};
