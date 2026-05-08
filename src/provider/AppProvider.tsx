import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type PropsWithChildren } from "react";

import { LanguageProvider } from "./src/LanguageProvider";

export const AppProvider = ({ children }: PropsWithChildren) => (
  <LanguageProvider>
    {children}
    <Analytics />
    <SpeedInsights />
  </LanguageProvider>
);
