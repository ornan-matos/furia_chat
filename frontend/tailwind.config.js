module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        furia: {
          yellow: '#FFDD1B',
          black: '#101010',
          white: '#F9F9F9',
        }
      },
      borderRadius: {
        'mac': '18px'
      }
    },
  },
  plugins: [],
}