/** @type {import('tailwindcss').Config} */
module.exports = {
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
        primary: "#ff501b",
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
          "linear-gradient(185.44deg, rgb(251 146 60 / 1) 13.21%,  rgb(234 88 12 / 1) 95.65%)",
      },
    },
  },
  plugins: [],
};
