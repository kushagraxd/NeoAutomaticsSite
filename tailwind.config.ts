import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./client/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Silicon Valley Graphite + Electric-Teal theme (hex values for opacity support)
        bg: {
          base: "#0B0C0F", // page background (charcoal)
          elevated: "#111317", // cards/nav
        },
        text: {
          primary: "#E8ECF2", // main text
          muted: "#A6AABC", // secondary text
          subtle: "#7E8496",
        },
        accent: {
          primary: "#13E3B3", // electric-teal (primary accent)
          soft: "#22BFA2", // softer teal for hovers/badges
        },
        border: "#262B33", // dividers/rings
        overlay: "rgba(0,0,0,0.5)", // hero/video overlay
        
        // Legacy utility classes for backward compatibility (CSS variables)
        "bg-base": "#0B0C0F",
        "bg-elevated": "#111317",
        "text-primary": "#E8ECF2",
        "text-muted": "#A6AABC",
        "accent-primary": "#13E3B3",
        "accent-soft": "#22BFA2",
        
        // Shadcn compatibility (separate from main accent)
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        shadcn: {
          accent: {
            DEFAULT: "var(--accent)",
            foreground: "var(--accent-foreground)",
          },
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        input: "var(--input)",
        ring: "var(--ring)",
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.35)",
        glow: "0 0 24px rgba(19,227,179,0.20)", // teal glow
      },
      borderRadius: {
        card: "1rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "system-ui", "sans-serif"],
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;