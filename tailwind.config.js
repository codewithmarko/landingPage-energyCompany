/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./js/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Lexend",
    },
    extend: {
      backgroundImage: {
        hero: "url('/img/hero.jpg')",
        aboutSolar: "url(/img/about/solarpanel.jpg)",
        textBackground: "url(/img/wind turbines.jpg)",
      },
    },
  },
  plugins: [],
};
