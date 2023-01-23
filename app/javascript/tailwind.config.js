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
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
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
