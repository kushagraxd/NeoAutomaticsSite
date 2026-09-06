import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Foundation — white and light cool neutrals
        surface: {
          DEFAULT: "var(--surface)",
          subtle: "var(--surface-subtle)",
          panel: "var(--surface-panel)",
        },
        // Deep graphite sections
        graphite: {
          DEFAULT: "var(--graphite)",
          light: "var(--graphite-light)",
          line: "var(--graphite-line)",
          ink: "var(--graphite-ink)",
          muted: "var(--graphite-muted)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          muted: "var(--ink-muted)",
        },
        // The single restrained accent
        accent: {
          DEFAULT: "var(--accent)",
          ink: "var(--accent-ink)",
          strong: "var(--accent-strong)",
          soft: "var(--accent-soft)",
        },
        rule: "var(--rule)",

        // shadcn/Radix token mapping
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
        popover: { DEFAULT: "var(--popover)", foreground: "var(--popover-foreground)" },
        primary: { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
        secondary: { DEFAULT: "var(--secondary)", foreground: "var(--secondary-foreground)" },
        muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
        destructive: { DEFAULT: "var(--destructive)", foreground: "var(--destructive-foreground)" },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["Barlow", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["'Barlow Condensed'", "Barlow", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 1px)",
        sm: "2px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,23,26,.06), 0 1px 3px rgba(20,23,26,.04)",
        lift: "0 4px 14px rgba(20,23,26,.10)",
      },
      maxWidth: { shell: "1240px" },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
