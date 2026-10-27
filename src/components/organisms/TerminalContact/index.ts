"use client";

import loadDynamic from "next/dynamic";

import { TerminalTriggerPlaceholder } from "./src/components/TerminalTrigger";

const TerminalContact = loadDynamic(
  () =>
    import("./src/views/TerminalContact").then((m) => ({
      default: m.TerminalContact,
    })),
  { ssr: false, loading: TerminalTriggerPlaceholder },
);

export { TerminalContact };
