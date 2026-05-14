import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type PropsWithChildren } from "react";

import { LanguageProvider } from "./src/LanguageProvider";
import { MixpanelProvider } from "./src/MixpanelProvider";

export const AppProvider = ({ children }: PropsWithChildren) => (
  <LanguageProvider>
    <MixpanelProvider>
      {children}
      <Analytics />
      <SpeedInsights />
    </MixpanelProvider>
  </LanguageProvider>
);
