import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#080808",
        "surface-2": "#111111",
        line: "#1f1f1f",
        "line-bright": "#2f2f2f",
        text: "#f3f3f3",
        muted: "#8d8d8d",
        accent: "#a89eff",
        danger: "#ff5f78",
      },
      borderRadius: {
        xl: "14px",
      },
      boxShadow: {
        accent: "0 0 0 1px rgba(168, 158, 255, 0.4)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "studio-glow":
          "radial-gradient(circle at 16% -12%, rgba(168, 158, 255, 0.24), transparent 35%), radial-gradient(circle at 100% 0%, rgba(58, 148, 255, 0.12), transparent 36%), linear-gradient(180deg, rgba(17, 17, 17, 0.25), rgba(0, 0, 0, 0.85))",
      },
    },
  },
  plugins: [],
};

export default config;
