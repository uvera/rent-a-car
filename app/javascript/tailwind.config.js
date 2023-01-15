/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/views/**/*.html.erb', './app/views/**/*.erb', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin')
  ],
}
