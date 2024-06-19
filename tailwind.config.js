/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Motiva Sans"', '"Twemoji"', '"Noto Sans"', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', '16px'],
        sm: ['12px', '16px'],
      },
      colors: {
        header: '#1a202c', 
        white: '#dcdedf',
        lightWhite: '#ffffff',
        gray: '#3D4450',
      },
    },
  },
  plugins: [],
};
