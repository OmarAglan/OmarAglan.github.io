/** @type {import("tailwindcss").Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        accent: "#00C6FF",
        highlight: "#38BDF8",
        text: "#E2E8F0"
      },
      fontFamily: {
        "jetbrains-mono": ['"JetBrains Mono"', "monospace"],
        inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      keyframes: {
        caret: {
          "0%, 70%, 100%": { opacity: "0" },
          "20%": { opacity: "1" }
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        "caret-blink": "caret 1.25s step-end infinite",
        floaty: "floaty 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
