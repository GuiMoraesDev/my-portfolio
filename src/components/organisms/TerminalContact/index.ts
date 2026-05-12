"use client";

import loadDynamic from "next/dynamic";

import { MascotLoading } from "./src/components/MascotLoading";

const TerminalContact = loadDynamic(
  () =>
    import("./src/views/TerminalContact").then((m) => ({
      default: m.TerminalContact,
    })),
  { ssr: false, loading: MascotLoading },
);

export { TerminalContact };
