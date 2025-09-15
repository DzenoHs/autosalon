module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Coffee (Urban Mono)
        coal: "#0E0E10",
        paper: "#F6F3EE",
        brass: "#C6A464",
        ink: "#111827",
        // Brunch (Sunny Market)
        cream: "#FFF7E8",
        butter: "#FFE08A",
        cocoa: "#6B4226",
        strawberry: "#FF6B6B",
        mint: "#A7F3D0",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        ui: ["Inter", "system-ui", "sans-serif"],
        brunchDisplay: ["Bricolage Grotesque", "Poppins", "sans-serif"],
        brunchUI: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      borderRadius: { '2xl': '1.25rem' }
    },
  },
  plugins: [],
}
