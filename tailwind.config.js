/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {  
        'dark-theme': "#202020",
        'grey-theme': "#31363F",
        'green-theme': "#22A39F"
      },
      textColor:{
        'green-theme': "#22A39F"
      }
    },
  },
  plugins: [],
}

