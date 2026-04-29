/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark:    '#06070f',
        surface: '#0d0e1a',
        card:    '#12132a',
        accent:  '#7c3aed',
        accentL: '#9f67ff',
        cyan:    '#38bdf8',
        emerald: '#10b981',
        amber:   '#f59e0b',
        rose:    '#ec4899',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body:    ['"Inter"',         'system-ui', 'sans-serif'],
      },
      animation: {
        float:      'float 5s ease-in-out infinite',
        'float-slow':'float 8s ease-in-out infinite',
        glow:       'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        glow: {
          from: { boxShadow: '0 0 12px rgba(124,58,237,0.4)' },
          to:   { boxShadow: '0 0 32px rgba(124,58,237,0.8)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
