/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/views/**/*.html.erb', './app/views/**/*.erb'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
