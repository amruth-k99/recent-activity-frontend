/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EE6983',
        'primary-bg': '#FFF5E4',
        secondary: '#EE6983',
        accent: '#850E35',
      },
    },
  },
  plugins: [],
};
