/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: ["Poppins"],
      colors: {
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // primary: "#f4511e",
        // primary: "#ff7043",
        // primary: "#ff501b",
        // primary: "#fb923c",
        // primary: "#ab47bc",
        primary: "#6300ff",
        // primary: {
        //   50: "#f3f0ff",
        //   100: "#eae4ff",
        //   200: "#d7cdff",
        //   300: "#bba6ff",
        //   400: "#9b73ff",
        //   500: "#7e3bff",
        //   600: "#7214ff",
        //   700: "#6300ff",
        //   800: "#5401d6",
        //   900: "#4603af",
        //   950: "#290077",
        // },
        "brand-yellow": "#fed33c",
        "brand-darkblue": "#6300ff",
        "brand-lightblue": "#3ea5ff",
        body: "white",
        // accent: "rgb(74 222 128 / 1)",
        // grey: "rgb(242 242 242 / 1)",
      },
      fontFamily: {
        aeonik: ["aeonik", "sans-serif"],
        blogh: ["blogh", "sans-serif"],
        "druk-wide-bold": ["druk-wide-bold", "sans-serif"],
      },
      backgroundImage: {
        // "gradient-primary":
        //   "linear-gradient(185.44deg, #f4511e 13.21%,  #ff7043 95.65%)",
        "gradient-primary":
          "linear-gradient(185.44deg, #6300ff 13.21%,  #6300ff 95.65%)",
      },
    },
  },
  plugins: [],
});
