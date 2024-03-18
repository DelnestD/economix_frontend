/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      dark: "#7DC2A5",
      primary: "#9FCDA8",
      secondary: "#C7DDC5",
      light: "#E3EBD0",
      info: "#F1F1D3",
      success: "#28A745",
      successhover: "#11842c",
      warning: "#FFC107",
      danger: "#DC3545",
      dangerhover: "#aa1e2c",
    },
    fontFamily: {
      titleFont: ["titleFont", "sans-serif"],
      textFont: ["textFont", "sans-serif"],
    },
    variants: {
      fill: ["hover", "focus"],
    },
    extend: {},
  },
  plugins: [],
};
