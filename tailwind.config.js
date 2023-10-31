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
        // primary: "#f4511e",
        primary: "#9c27b0",
        // primary: "#ff7043",
        // primary: "#ff501b",
        // primary: "#fb923c",
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
        "gradient-primary":
          "linear-gradient(185.44deg, #f4511e 13.21%,  #ff7043 95.65%)",
      },
    },
  },
  plugins: [],
});
