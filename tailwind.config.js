/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      sans: ["'Poppins'", 'sans-serif']
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["business", "cupcake"],
    // themes: [
    //   {
    //     business: {
    //       ...require("daisyui/src/theming/themes")["light"],
    //       ".btn-color": {
    //         "background-color": "rgb(234, 179, 8)",
    //         "border-color": "#1EA1F1",
    //       },
    //     },
    //     cupcake: {
    //       ...require("daisyui/src/theming/themes")["cupcake"],
    //       ".btn-color": {
    //         "background-color": "rgb(234, 179, 8)",
    //         "border-color": "#1EA1F1",
    //       },
    //     },
    //   },
    // ],
  },
}

