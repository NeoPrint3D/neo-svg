module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        neored: "#ff2f19",
          neoblue: "#08e3e4",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}