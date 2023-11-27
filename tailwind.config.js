/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      dropShadowUtil: {
        '3xl': '38px 35px 35px rgba(255, 0, 0, 1)',
        '7xl': '38px 35px 35px rgba(255, 0, 0, 1)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      fontFamily: {
        custom: ['SuperComic', 'sans'],
      },
    },
  },
  plugins: [],
}
