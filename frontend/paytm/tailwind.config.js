/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}"],
  theme: {
    colors:{
      cyello:"#EBBD34",
      black: "#000000",
      white: "#FFFFFF"

    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

