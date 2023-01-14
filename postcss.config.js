module.exports = {
  plugins: [
    require('postcss-nested'),
    require('tailwindcss')('./app/javascript/tailwind.config.js'),
    require('autoprefixer')
  ]
}