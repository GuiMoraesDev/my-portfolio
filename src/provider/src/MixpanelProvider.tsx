"use client";

import mixpanel from "mixpanel-browser";
import { useEffect, type PropsWithChildren } from "react";

const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export const MixpanelProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if (!token) return;
    mixpanel.init(token, {
      autocapture: true,
      record_sessions_percent: 100,
      track_pageview: true,
      persistence: "localStorage",
    });
  }, []);

  return <>{children}</>;
};
