/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      tan: "rgb(248, 245, 240)",
      silver: "#e4e4e4",
      red: "#da1a32",
      orange: "rgb(206, 92, 37)",
      green: "#00FF00",
    },
    height: {
      recipeHero: "600px",
      full: "100%",
      navHeight: "150px",
    },
    backgroundImage: {
      recipeHeroScrim: "linear-gradient(90deg,rgba(0,0,0,.5) 0,transparent)",
    },
    animation: {
      slideIn: "300ms 1 alternate slidein",
    },
    keyframes: {
      slidein: {
        "0%": { transform: "translateY(-20px)" },
        "100%": { transform: "translateY(0px)" },
      },
    },
  },
};
