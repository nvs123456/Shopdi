/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        pumpkin: '#FF731D',
        orangeRed: '#F16813',
        metallicOrange: '#FF731D',
        tuftsBlue: '#3F81E0',
        celticBlue: '#2A6CCB',
        denim: '#1A5BB9',
        egyptianBlue :'#11419E',

        // Secondary Colors
        yaleBlue: '#1746A2',
        cloudBlue: '#F7FBFF',
        cosmicLatte: '#FFF7E9',

        // Gray Color Scale
        black: '#000000',
        tintedBlack: '#222222',
        darkGray: '#555555',
        mediumGray: '#777777',
        tintedGray: '#888888',
        paleGray: '#AAAAAA',
        lightGray: '#DDDDDD',
        shadedWhite: '#F6F6F6',
        white: '#FFFFFF',

        // Other Colors
        green: '#00FF00',
        red: '#d0342c'
      }
    },
  },
  plugins: [],
}

