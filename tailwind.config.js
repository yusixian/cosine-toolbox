module.exports = {
  darkMode: 'class', // https://tailwindcss.com/docs/dark-mode
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/hook/**/*.{js,ts,jsx,tsx}',
    './src/tools/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        xs: { max: '475px' },
        md: { max: '768px' },
        tablet: '640px',
        xl: '1366px',
        '2xl': '1366px',
      },
      colors: {
        primary: '#fb7185',
        'dark-primary': '#93c5fd',
        blue: {
          DEFAULT: '#43BBFF',
          450: '#4383FF',
        },
        yellow: {
          DEFAULT: '#FFE7AB',
        },
        orange: {
          DEFAULT: '#FFAA2C',
        },
        red: {
          DEFAULT: '#FF2358',
        },
        border: 'hsl(var(--border))',
        background: {
          400: 'hsl(var(--background-400))',
          DEFAULT: 'hsl(var(--background))',
        },
        'muted-foreground': 'hsl(var(--muted-foreground))',
        'page-background': 'hsl(var(--page-background))',
      },
      backgroundImage: {
        gradient: 'linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f)',
      },
      fontFamily: {
        poppins: 'var(--font-poppins)',
        noto: 'Noto Serif SC',
        candy: 'Candyshop',
      },
    },
  },
  plugins: [require('tailwindcss-textshadow')],
};
