import type { Config } from "tailwindcss";

/*
 * Every colour resolves to a CSS variable defined in client/src/index.css,
 * so the theme lives in one place.
 */
export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "var(--surface)",
          subtle: "var(--surface-subtle)",
          panel: "var(--surface-panel)",
          card: "var(--surface-card)",
          stage: "var(--surface-stage)",
        },
        night: {
          DEFAULT: "var(--night)",
          soft: "var(--night-soft)",
          line: "var(--night-line)",
          ink: "var(--night-ink)",
          muted: "var(--night-muted)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          muted: "var(--ink-muted)",
        },
        brand: {
          DEFAULT: "var(--brand)",
          hover: "var(--brand-hover)",
          bright: "var(--brand-bright)",
          soft: "var(--brand-soft)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          deep: "var(--gold-deep)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          ink: "var(--accent-ink)",
          soft: "var(--accent-soft)",
          line: "var(--accent-line)",
        },
        rule: {
          DEFAULT: "var(--rule)",
          soft: "var(--rule-soft)",
          strong: "var(--rule-strong)",
        },
        // Light industrial palette (see the "Light theme" block in index.css).
        ivory: { DEFAULT: "var(--ivory)", deep: "var(--ivory-deep)" },
        graphite: {
          DEFAULT: "var(--graphite)",
          soft: "var(--graphite-soft)",
          line: "var(--graphite-line)",
          ink: "var(--graphite-ink)",
          muted: "var(--graphite-muted)",
        },
        bronze: { DEFAULT: "var(--bronze)", deep: "var(--bronze-deep)", text: "var(--bronze-text)", bright: "var(--bronze-bright)" },
        navy: "var(--navy)",
        plum: { DEFAULT: "var(--plum)", deep: "var(--plum-deep)" },
        amethyst: "var(--amethyst)",
        lavender: "var(--lavender)",
        champagne: "var(--champagne)",
        success: "var(--success)",
        warning: "var(--warning)",

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
        sans: ["Manrope", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        // Warm, low and tight — never a glow.
        paper: "var(--shadow-paper)",
        raised: "var(--shadow-raised)",
      },
      maxWidth: { shell: "1200px" },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        rise: "rise .5s cubic-bezier(.16,1,.3,1) both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
