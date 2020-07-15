const defaultTheme = require("tailwindcss/defaultTheme");
const tailwindUI = require("@tailwindcss/ui");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      backgroundOpacity: {
        90: "0.9",
      },
    },
  },
  plugins: [tailwindUI],
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
};
