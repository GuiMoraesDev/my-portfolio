"use client";

import { DialogOverlay } from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { useState } from "react";

import {
  TerminalTriggerLabel,
  terminalTriggerClassName,
} from "../components/TerminalTrigger";
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
        className={terminalTriggerClassName}
      >
        <TerminalTriggerLabel label={t("open-label")} />
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 top-0 left-0 z-100 flex h-dvh w-dvw items-center justify-center bg-ink-900/50">
          <DialogContent data-testid="terminal-dialog">
            <TerminalWindow />
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  );
};
