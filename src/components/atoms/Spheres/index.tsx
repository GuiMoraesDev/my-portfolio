"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type SphereConfig = {
  top: string;
  left: string;
  size: string;
  // 0..1: 0 = far (moves little), 1 = near (moves more)
  depth: number;
  // base intensity in px for a “near” object
  maxDriftPx?: number;
  className?: string;
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

const Sphere = ({
  mx,
  my,
  cfg,
}: {
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
  cfg: SphereConfig;
}) => {
  const depth = clamp01(cfg.depth);
  const maxDrift = cfg.maxDriftPx ?? 28;

  // Near objects should feel “snappier”, far objects “heavier”
  const stiffness = 60 + depth * 140; // 60..200
  const damping = 26 - depth * 10; // 26..16
  const mass = 1.1 - depth * 0.6; // 1.1..0.5

  // Smooth *per sphere* (lets you vary “weight” if you want)
  const sx = useSpring(mx, { stiffness, damping, mass });
  const sy = useSpring(my, { stiffness, damping, mass });

  // pointer normalized around center
  const x = useTransform(sx, (px) => {
    const nx = px / window?.innerWidth - 0.5; // -0.5..0.5
    return nx * 2 * maxDrift * depth; // -max..max scaled by depth
  });

  const y = useTransform(sy, (py) => {
    const ny = py / window?.innerHeight - 0.5;
    return ny * 2 * maxDrift * depth;
  });

  // Optional extra depth cues (subtle!)
  const rotate = useTransform(x, (v) => v * 0.15); // near rotates more
  const scale = 1 + depth * 0.02; // tiny scale bias

  return (
    <motion.span
      style={{
        top: cfg.top,
        left: cfg.left,
        width: cfg.size,
        height: cfg.size,
        x,
        y,
        rotate,
        scale,
      }}
      className={twMerge(
        "fixed overflow-hidden rounded-full will-change-transform",
        "border border-solid border-[rgba(255,255,255,0.3)] backdrop-blur-md",
        "shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_32px_15px_rgba(255,255,255,0.4)]",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] before:content-['']",
        "after:absolute after:top-0 after:left-0 after:h-full after:w-px after:bg-[linear-gradient(180deg,rgba(255,255,255,0.5),transparent,rgba(255,255,255,0.3))] after:content-['']",
        cfg.className,
      )}
    />
  );
};

export const Spheres = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window?.addEventListener("pointermove", onMove, { passive: true });
    return () => window?.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const spheres: SphereConfig[] = [
    {
      top: "0%",
      left: "0%",
      size: "16vw",
      depth: 1.0,
      className: "animate-[fade_1.5s_0.75s_ease-in-out_infinite_alternate]",
    },
    {
      top: "9.8%",
      left: "39.4%",
      size: "18.9vw",
      depth: 0.75,
      className: "animate-[fade_3s_0.5s_ease-in-out_infinite_alternate]",
    },
    {
      top: "0%",
      left: "82.2%",
      size: "35.2vw",
      depth: 0.35,
      className: "animate-[fade_2s_1s_ease-in-out_infinite_alternate]",
    },
    {
      top: "53.2%",
      left: "13.6%",
      size: "35.2vw",
      depth: 0.45,
      className: "animate-[fade_1s_0.75s_ease-in-out_infinite_alternate]",
    },
    {
      top: "30%",
      left: "55%",
      size: "28.8vw",
      depth: 0.2,
      className: "animate-[fade_3s_1.5s_ease-in-out_infinite_alternate]",
    },
  ];

  return (
    <>
      {spheres.map((cfg, i) => (
        <Sphere key={i} mx={mx} my={my} cfg={cfg} />
      ))}
    </>
  );
};
