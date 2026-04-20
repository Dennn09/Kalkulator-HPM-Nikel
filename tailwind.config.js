/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Syne', 'sans-serif'],
      },
      colors: {
        bg:       '#0f1117',
        surface:  '#181c27',
        surface2: '#1e2333',
        border:   '#2a3048',
        ni:       '#c8a84b',
        fe:       '#e07a3a',
        co:       '#7b9cf0',
        cr:       '#4ec994',
        mc:       '#a78bfa',
        muted:    '#6b7494',
        danger:   '#ef5350',
        success:  '#4ec994',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease',
        'slide-up': 'slideUp 0.3s ease',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
