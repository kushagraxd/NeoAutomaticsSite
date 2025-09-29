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
        // Enterprise Blue theme
        bg: {
          base: "#0A0F1A", // deep navy page background
          elevated: "#0F1522", // panel background
        },
        text: {
          primary: "#E6ECF8", // main text
          muted: "#A9B3C7", // secondary text
          subtle: "#8894AA", // subtle text
        },
        blue: {
          50: "#EAF3FF",
          100: "#D5E7FF",
          400: "#63A3FF",
          500: "#3B82F6", // primary accent (accessible)
          600: "#2662D9",
          700: "#1C4FB3",
        },
        border: "#22304A", // dividers/rings
        overlay: "rgba(4,10,20,0.55)", // hero/video overlay
        
        // Legacy utility classes for backward compatibility
        "bg-base": "#0A0F1A",
        "bg-elevated": "#0F1522",
        "text-primary": "#E6ECF8",
        "text-muted": "#A9B3C7",
        "accent-primary": "#3B82F6",
        "accent-soft": "#63A3FF",
        
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
        glow: "0 0 28px rgba(59,130,246,0.28)", // blue glow
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