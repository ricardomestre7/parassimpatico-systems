/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parassimpatico: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          500: '#14B8A6',
          700: '#0F766E',
          900: '#134E4A',
          950: '#042F2E',
        }
      }
    },
  },
  plugins: [],
}
