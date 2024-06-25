module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        motiva: ['Motiva Sans', '"Twemoji"'],
        sans: [ '"Noto Sans"', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', '16px'],
        sm: ['12px', '16px'],
        xl: ['24px', '40px']
      },
      colors: {
        darkblue: '#171d25', 
        white: '#dcdedf',
        lightwhite: '#ffffff',
        darkgray: '#23262E',
        hex: '#c4c4c4',
        lightgray: '#b8b6b4',
        gray: '#3D4450',
        blue: '#1a9fff',
        oceanblue: '#39838d',
        offline: '#969696',
        online: '#57cbde',
        ingame: '#90ba3c'
      },
    },
  },
  plugins: [],
};
