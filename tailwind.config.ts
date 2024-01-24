import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#0D020D",
        purple: "#49213B",
        lavender: "#F2E2EC",
        yellow: "#EBB220",
      },
    },
  },
  plugins: [],
};
export default config;
