/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg2: "#303030",
        text: "#505050"
      }
    },
  },
  plugins: [require("daisyui")],
}