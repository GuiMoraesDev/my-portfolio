import { Analytics } from "@vercel/analytics/next";
import { type PropsWithChildren } from "react";

import { LanguageProvider } from "./src/LanguageProvider";

import { isTrackingEnabled } from "@/utils/tracking";

export const AppProvider = ({ children }: PropsWithChildren) => (
  <LanguageProvider>
    {children}
    {isTrackingEnabled() && <Analytics />}
  </LanguageProvider>
);
