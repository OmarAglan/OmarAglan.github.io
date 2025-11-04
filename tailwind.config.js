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
      }
    }
  },
  plugins: []
};
