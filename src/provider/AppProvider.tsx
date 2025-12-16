/* eslint-disable no-console */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, type PropsWithChildren } from "react";

import { Toaster } from "@/components/atoms/Toaster";

const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const logToConsole = () => {
  if (process.env.NODE_ENV === "production") {
    console.clear();
  }

  console.log(`%c   __________________  `, "color: #F2E2EC; font-size: 1.15em");
  console.log(`%c  |                 |  `, "color: #F2E2EC; font-size: 1.15em");
  console.log(`%c  | Ah ah ah        |  `, "color: #F2E2EC; font-size: 1.15em");
  console.log(`%c  | you didn't say  |  `, "color: #F2E2EC; font-size: 1.15em");
  console.log(`%c  | the magic word! |  `, "color: #F2E2EC; font-size: 1.15em");
  console.log(`%c  |_________________|  `, "color: #F2E2EC; font-size: 1.15em");
  console.log(`%c          |            `, "color: #F2E2EC; font-size: 1.15em");
  console.log(`%c       O  |            `, "color: #F2E2EC; font-size: 1.15em");
  console.log(`%c      /|\\/            `, "color: #F2E2EC; font-size: 1.15em");
  console.log(`%c       |               `, "color: #F2E2EC; font-size: 1.15em");
  console.log(`%c      / \\          🦖 `, "color: #F2E2EC; font-size: 1.15em");
};

export const AppProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    logToConsole();
  }, []);

  return (
    <QueryProvider>
      {children}

      <Toaster />
      <Analytics />
      <SpeedInsights />
    </QueryProvider>
  );
};
