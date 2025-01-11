/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors : {
      "darkblue" : "#293241",       "bgcolor" : "#E0FBFC",       "orange" : "#EE6C4D",       "midblue": "#3D5A80",
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'red' : '#FA7070',
      'yellow' : '#FEFDED',
      'lgreen' : '#C6EBC5',
      'dgreen' : '#A1C398'
    }
  },
  plugins: [],
}