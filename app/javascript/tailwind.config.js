/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/views/**/*.erb",
    "./app/helpers/**/*.rb",
    "./node_modules/flowbite/**/*.js",
    "./app/javascript/components/**/*.tsx",
    "./src/**/*.{html,js}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      textColor: {
        accent: { ...colors.amber, DEFAULT: colors.amber[500] },
      },
      backgroundColor: {
        cultured: "#F5F4F5",
        accent: { ...colors.amber, DEFAULT: colors.amber[500] },
      },
      colors: {
        accent: { ...colors.amber, DEFAULT: colors.amber[500] },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("flowbite/plugin"),
    require("tailwindcss-animate"),
  ],
};
