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
          ink: "var(--accent-ink)",
          soft: "var(--accent-soft)",
        },
        rule: {
          DEFAULT: "var(--rule)",
          strong: "var(--rule-strong)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        // One tone per machining operation — colour encodes the category.
        tone: {
          turning: "#E3B55F",
          milling: "#4FC7B6",
          drilling: "#6E9BFF",
          grooving: "#A98BF5",
          threading: "#F07E9A",
          neutral: "#A1A1AA",
        },

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
        sans: ["Geist", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 6vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        h1: ["clamp(2.25rem, 4.5vw, 3.25rem)", { lineHeight: "1.06", letterSpacing: "-0.035em" }],
        h2: ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.03em" }],
        h3: ["1.3125rem", { lineHeight: "1.3", letterSpacing: "-0.018em" }],
        lead: ["1.1875rem", { lineHeight: "1.6", letterSpacing: "-0.011em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,.45)",
        card: "inset 0 1px 0 rgba(255,255,255,.03), 0 18px 40px -28px rgba(0,0,0,.9)",
        lift: "inset 0 1px 0 rgba(255,255,255,.05), 0 24px 50px -24px rgba(0,0,0,.85), 0 0 0 1px rgba(142,166,248,.10)",
        glow: "0 0 0 1px rgba(142,166,248,.07), 0 30px 70px -30px rgba(0,0,0,.95)",
      },
      maxWidth: { shell: "1200px", prose: "68ch" },
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
