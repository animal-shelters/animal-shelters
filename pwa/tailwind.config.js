/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          DEFAULT: "#1F2937",
          hover: "#4C545F",
          dark: {
            DEFAULT: "#1F2937",
            hover: "#4C545F",
          },
        },
        secondary: {
          DEFAULT: "#364f73",
          hover: "#405573",
          dark: {
            DEFAULT: "#364f73",
            hover: "#405573",
          },
        },
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
