/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: {
          100: "#fff5f5", // Light peach background
        },
        orange: {
          500: "#ff4500", // Custom orange for buttons (matches screenshot)
          600: "#e03e00", // Darker orange for hover states
        },
      },
      spacing: {
        "1/4": "25%", // Custom spacing for 4-per-row layout
      },
      borderRadius: {
        "2xl": "16px", // Larger rounded corners for cards and sections
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none", // Hide scrollbar in IE & Edge
          "scrollbar-width": "none", // Hide scrollbar in Firefox
        },
      };

      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
