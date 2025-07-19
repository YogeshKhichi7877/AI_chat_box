/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        animation: {
          'bounce': 'bounce 1s infinite',
          'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        backdropBlur: {
          xs: '2px',
        },
        typography: {
          DEFAULT: {
            css: {
              maxWidth: 'none',
            },
          },
        },
        animation: {
          'bounce': 'bounce 1s infinite',
        },
        backdropBlur: {
          xs: '2px',
        }
      },
    },
    plugins: [
      function({ addUtilities }) {
        const newUtilities = {
          '.scrollbar-thin': {
            scrollbarWidth: 'thin',
          },
          '.scrollbar-thumb-gray-300': {
            scrollbarColor: '#d1d5db transparent',
          },
          '.scrollbar-thumb-gray-600': {
            scrollbarColor: '#4b5563 transparent',
          },
          '.scrollbar-track-transparent': {
            scrollbarTrackColor: 'transparent',
          },
        }
        addUtilities(newUtilities)
      }
    ],
  };
  