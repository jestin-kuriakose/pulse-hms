/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}"],
  theme: {
    extend: {
      colors: {
        pry: {
          DEFAULT: "#080D58",
          light: "#1A1F7A",
          dark: "#05083D",
        },
        sec: {
          50: "#202BD3",
          100: "#EFF4FF",
          200: "#C5D3FF",
          300: "#9BB2FF",
          400: "#7191FF",
          500: "#4770FF",
          600: "#1D4FFF",
          700: "#0033F5",
          800: "#0029C4",
          900: "#001F93",
        },
        accent: {
          light: "#FFD700",
          DEFAULT: "#FFC107",
          dark: "#FFA000",
        },
      },
      fontFamily: {
        main: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
};
