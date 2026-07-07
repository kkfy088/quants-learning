import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#1a1a2e", light: "#16213e", dark: "#0f0f23" },
        accent: { DEFAULT: "#4361ee", light: "#5e7ce2", dark: "#3a56d4" },
        success: "#2ecc71",
        warn: "#f39c12",
        danger: "#e74c3c",
        surface: { DEFAULT: "#ffffff", alt: "#f8f9fc", hover: "#eef1f8" },
        text: { primary: "#1a1a2e", secondary: "#6b7280", muted: "#9ca3af" },
        border: { DEFAULT: "#e5e7eb", focus: "#4361ee" },
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans SC"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      borderRadius: {
        lg: "0.625rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        panel: "0 4px 12px rgba(0,0,0,0.08)",
        modal: "0 8px 32px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
