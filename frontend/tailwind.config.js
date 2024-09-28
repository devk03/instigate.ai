/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // main entry file
    "./screens/**/*.{js,jsx,ts,tsx}", // screens folder
    "./components/**/*.{js,jsx,ts,tsx}", // components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
