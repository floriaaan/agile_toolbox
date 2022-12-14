module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["fkscreamer", "Impact,Arial,Helvetica,sans-serif"],
        body: ["faktum", "Arial, Helvetica, sans-serif"],
      },

      colors: {
        primary: "#fbe216",
        pink: "#f0869d",
        purple: "#afa5d1",
      },
    },
  },
  plugins: [],
}