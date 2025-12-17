import { type Variants } from "motion/react";

export const rootVariants: Variants = {
  idle: {
    y: [0, -2, 0],
    scaleX: [1, 1.01, 1],
    scaleY: [1, 0.99, 1],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
  thinking: {
    y: [0, -2.5, 0],
    scaleX: [1, 1.015, 1],
    scaleY: [1, 0.985, 1],
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
  success: {
    y: [0, -4, 0],
    transition: { duration: 0.55, repeat: 2, ease: "easeOut" },
  },
  warning: {
    rotate: [0, -1.4, 1.4, 0],
    transition: { duration: 0.45, repeat: 2, ease: "easeInOut" },
  },
  sad: {
    y: [0, 2, 0],
    transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
  },
  sleepy: {
    y: [0, 1.2, 0],
    scaleY: [1, 0.992, 1],
    transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
  },
  greet: {
    y: [0, -3, 0],
    transition: { duration: 0.7, repeat: 1, ease: "easeOut" },
  },
  celebrate: {
    y: [0, -6, 0],
    transition: { duration: 0.45, repeat: 3, ease: "easeOut" },
  },
} as const;

export const antennaVariants: Variants = {
  idle: { rotate: 0 },
  thinking: {
    rotate: [0, 8, -8, 0],
    transition: { duration: 1.3, repeat: Infinity, ease: "easeInOut" },
  },
  success: {
    rotate: [0, 10, 0],
    transition: { duration: 0.5, ease: "easeOut" },
  },
  warning: {
    rotate: [0, -10, 10, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  sad: { rotate: -6 },
  sleepy: { rotate: -10 },
  greet: {
    rotate: [0, 8, 0],
    transition: { duration: 0.6, ease: "easeOut" },
  },
  celebrate: {
    rotate: [0, 14, -14, 0],
    transition: { duration: 0.7, repeat: 2, ease: "easeInOut" },
  },
} as const;

export const eyesVariants: Variants = {
  idle: {
    filter: ["saturate(1.05)", "saturate(0.85)", "saturate(1.05)"],
    transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
  },
  thinking: {
    filter: ["saturate(1.2)", "saturate(0.55)", "saturate(1.2)"],
    transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" },
  },
  success: {
    filter: ["saturate(1.4)", "saturate(1.1)", "saturate(1.4)"],
    transition: { duration: 0.9, repeat: 2, ease: "easeOut" },
  },
  warning: {
    filter: ["saturate(0.9)", "saturate(1.3)", "saturate(0.9)"],
    transition: { duration: 0.7, repeat: 2, ease: "easeInOut" },
  },
  sad: {
    filter: ["saturate(0.7)", "saturate(0.85)", "saturate(0.7)"],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
  sleepy: {
    filter: ["saturate(0.7)", "saturate(0.6)", "saturate(0.7)"],
    transition: { duration: 4.0, repeat: Infinity, ease: "easeInOut" },
  },
  greet: {
    filter: ["saturate(1.2)", "saturate(1.05)", "saturate(1.2)"],
    transition: { duration: 1.2, repeat: 1, ease: "easeOut" },
  },
  celebrate: {
    filter: ["saturate(1.6)", "saturate(1.1)", "saturate(1.6)"],
    transition: { duration: 0.55, repeat: 3, ease: "easeOut" },
  },
} as const;
