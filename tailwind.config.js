/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        primary: "#45484A",
        secondary: "#AEB5BB",
        gray: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
