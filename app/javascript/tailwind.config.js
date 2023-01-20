/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/views/**/*.erb",
    "./app/helpers/**/*.rb",
    "./node_modules/flowbite/**/*.js",
    "./app/javascript/components/**/*.tsx",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("flowbite/plugin"),
    require("tw-elements/dist/plugin"),
    require("tailwindcss-animate"),
  ],
};
