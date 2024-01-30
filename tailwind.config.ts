import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%, 100%": { transform: "rotate(0.0deg)" },
          "50%": { transform: "rotate(14.0deg)" },
        },
      },
      animation: {
        wave: "wave 1s infinite",
      },
      colors: {
        "plum-50": "#F2E2EC",
        "plum-100": "#E6C5D9",
        "plum-200": "#DAA8C6",
        "plum-300": "#CE8BB3",
        "plum-400": "#C26E9F",
        "plum-500": "#49213B",
        "plum-600": "#3F1C31",
        "plum-700": "#351726",
        "plum-800": "#2B121C",
        "plum-900": "#0D020D",

        "gold-500": "#EBB220",
      },
    },
  },
  plugins: [],
};
export default config;
