module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',   ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%, 75%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        shake: 'shake 0.5s infinite',
        fadeIn: 'fadeIn 1s forwards',
      },
    },
  },
  plugins: [],
};
