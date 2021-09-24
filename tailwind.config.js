module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      height: ['hover', 'group-hover'],
      width: ['hover', 'group-hover'],
      scale: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
