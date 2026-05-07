import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type PropsWithChildren } from "react";

import { LanguageProvider } from "./src/LanguageProvider";
import { QueryProvider } from "./src/QueryProvider";

export const AppProvider = ({ children }: PropsWithChildren) => (
  <QueryProvider>
    <LanguageProvider>
      {children}
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  </QueryProvider>
);
