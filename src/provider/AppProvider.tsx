/* eslint-disable no-console */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, type PropsWithChildren } from "react";

import { Toaster } from "@/components/atoms/Toaster";

declare global {
  interface Window {
    hunt?: () => void;
    answer?: (response: string) => void;
    resetHunt?: () => void;
    reward?: () => void;
  }
}

const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const EasterEggProvider = () => {
  type Stage = 1 | 2 | 3 | 4; // 4 = finished

  const STORAGE_KEY = "gm_treasure_stage_v1";

  useEffect(() => {
    const styleTitle =
      "font-weight:800;font-size:15px;color:#a2d6d8;background:#0d020d;padding:8px 12px;border-radius:10px;";
    const stylePoem = "color:#F2E2EC;font-size:13px;line-height:1.45;";
    const styleHint = "color:#ae8724;font-size:12px;";
    const styleOk = "color:#39d98a;font-weight:700;";
    const styleNo = "color:#ff5c7a;font-weight:700;";

    const getStage = (): Stage => {
      const raw = localStorage.getItem(STORAGE_KEY);
      const n = raw ? Number(raw) : 1;
      return (n >= 1 && n <= 4 ? n : 1) as Stage;
    };

    const setStage = (stage: Stage) => {
      localStorage.setItem(STORAGE_KEY, String(stage));
    };

    const normalize = (s: unknown) =>
      String(s ?? "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

    const printIntro = () => {
      console.log("%c🧩 Console Treasure Hunt", styleTitle);
      console.log(
        '%cType `hunt()` to see your current riddle. Use `answer("...")` to respond.',
        stylePoem,
      );
      console.log(
        "%cTip: this is just for fun — no security tricks, no tracking.",
        styleHint,
      );
    };

    const printJP = () => {
      console.log("%cStage I — The Park", styleTitle);
      console.log(
        `%cI asked for access, soft and polite,
But pride replied: “Not here tonight.”
A system fell with a single word,
A childish lock, absurdly blurred.

When fences failed and warnings spoke,
What was the word that should’ve broke
The stubborn grin, the bold facade?
Say it — and pass beyond the gate.`,
        stylePoem,
      );
      console.log("%cHint: it’s the “magic word”.", styleHint);
    };

    const printMatrix = () => {
      console.log("%cStage II — The Choice", styleTitle);
      console.log(
        `%cTwo paths diverge inside the mind:
One keeps you warm, one makes you blind.
A bitter truth, a sweeter lie,
Green rain of code drips from the sky.

Name the moment, sharp and small:
The choice that makes illusion fall.
Speak the token, simple, stark —
And wake inside the endless dark.`,
        stylePoem,
      );
      console.log(
        "%cHint: it’s a single color, famously paired with a pill.",
        styleHint,
      );
    };

    const printLOTR = () => {
      console.log("%cStage III — The Burden", styleTitle);
      console.log(
        `%cA circle sings: “Wear me, win.”
It crowns the strong, corrupts within.
Not blade nor banner earns the day,
But feet that choose the harder way.

Name the virtue, quiet, plain,
That beats the fire, defeats the chain.
The smallest hands, the longest road —
What keeps the heart from taking hold?`,
        stylePoem,
      );
      console.log(
        "%cHint: the opposite of “giving in” to temptation.",
        styleHint,
      );
    };

    const printDone = () => {
      console.log("%c🏁 You finished the hunt.", styleTitle);
      console.log(
        "%cReward: type `reward()` for a little surprise.",
        stylePoem,
      );
    };

    const hunt = () => {
      const stage = getStage();
      if (stage === 1) return printJP();
      if (stage === 2) return printMatrix();
      if (stage === 3) return printLOTR();
      return printDone();
    };

    const answer = (value: string) => {
      const stage = getStage();
      const a = normalize(value);

      // Stage I — Jurassic Park
      if (stage === 1) {
        if (a === "please") {
          console.log("%c✅ Gate unlocked. The park remembers.", styleOk);
          setStage(2);
          return printMatrix();
        }
        console.log("%c❌ Ah ah ah… you didn’t say the magic word.", styleNo);
        return;
      }

      // Stage II — Matrix
      if (stage === 2) {
        // Accept a few variants, keep it friendly.
        const ok = a === "red" || a === "red pill" || a === "the red pill";
        if (ok) {
          console.log("%c✅ You chose to see.", styleOk);
          setStage(3);
          return printLOTR();
        }
        console.log("%c❌ That keeps you asleep. Try again.", styleNo);
        return;
      }

      // Stage III — LOTR
      if (stage === 3) {
        const ok =
          a === "resistance" ||
          a === "self-control" ||
          a === "self control" ||
          a === "humility";
        if (ok) {
          console.log("%c✅ The burden doesn’t own you.", styleOk);
          setStage(4);
          return printDone();
        }
        console.log("%c❌ Tempting… but not the answer.", styleNo);
        return;
      }

      console.log("%cYou already finished. Type `reward()`.", styleHint);
    };

    const reset = () => {
      setStage(1);
      console.log("%cReset done. Type `hunt()`.", styleHint);
    };

    const reward = () => {
      const stage = getStage();
      if (stage !== 4) {
        console.log("%cFinish all stages first. Type `hunt()`.", styleHint);
        return;
      }

      console.log(
        "%c🦖 💊 💍",
        "font-size:22px;font-weight:900;letter-spacing:2px;",
      );
      console.log(
        "%cCuriosity is power — but humility is the safety switch.",
        stylePoem,
      );
    };

    // Expose commands
    window.hunt = hunt;
    window.answer = answer;
    window.resetHunt = reset;
    window.reward = reward;

    // First-time greeting (or reminder)
    printIntro();

    return () => {
      delete window.hunt;
      delete window.answer;
      delete window.resetHunt;
      delete window.reward;
    };
  }, []);

  return null;
};

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      {children}

      <Toaster />
      <Analytics />
      <SpeedInsights />

      <EasterEggProvider />
    </QueryProvider>
  );
};
