/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,js,vue}', './index.html'],
  theme: {
    fontFamily: {
      sans: ['Red\\ Hat\\ Display', 'sans-serif'],
      mono: ['Red\\ Hat\\ Mono', 'monospace'],
      serif: ['Playfair\\ Display', 'serif'],
    },
    extend: {},
  },
  plugins: [],
  prefix: 'tw-',
};
