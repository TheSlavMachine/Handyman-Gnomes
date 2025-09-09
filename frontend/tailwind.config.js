/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lightgray: "#edededff",  // you can also add single custom colors
        ocean: "#006994",
      },
    },
  },
  plugins: [],
}