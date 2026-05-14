import { type PropsWithChildren } from "react";

import { LanguageProvider } from "./src/LanguageProvider";
import { MixpanelProvider } from "./src/MixpanelProvider";

export const AppProvider = ({ children }: PropsWithChildren) => (
  <LanguageProvider>
    <MixpanelProvider>{children}</MixpanelProvider>
  </LanguageProvider>
);
