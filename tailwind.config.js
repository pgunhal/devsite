module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', 
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'background-dark': '#1c1e26', 
        'background-light': '#2d2f36', 
        'lime-green': '#02A80F',
        'white': '#ffffff',
        'gray-text': '#a3a3a3', 
      },
      fontFamily: {
        monospace: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};


