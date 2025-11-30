export default {
  content: [
   "./index.html",
   "./*.{js,ts,jsx,tsx}",
   "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
      },
      colors: {
        'wedding-royal': '#1545BD',
        'wedding-navy': '#002366',
        'wedding-sky': '#E0F2FE',
        'wedding-dark': '#0f172a',
        'glass-white': 'rgba(255, 255, 255, 0.85)',
      },
      animation: {
        'pulse-blue': 'pulseBlue 2s ease-in-out infinite',
        'pulse-blue-soft': 'pulseBlueSoft 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'pulse-glow-white': 'pulseGlowWhite 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(21, 69, 189, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(21, 69, 189, 0)' },
        },
        pulseGlowWhite: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(255, 255, 255, 0)' },
        },
        pulseBlue: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(21, 69, 189, 0.6)' },
          '50%': { boxShadow: '0 0 12px 6px rgba(21, 69, 189, 0.3)' },
        },
        pulseBlueSoft: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,255,255,0.6)' },
          '50%': { boxShadow: '0 0 10px 4px rgba(255,255,255,0.3)' },
        },
      }
    }
  },
  plugins: [],
}