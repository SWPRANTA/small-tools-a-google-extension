/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pp: "#FFFAB7",
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      andika: ["Andika", "sans-serif"],
    },
  },
  plugins: [],
};
