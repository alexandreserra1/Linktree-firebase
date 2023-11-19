/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,css}"],
  theme: {
    extend: {
      maxWidth: {
        'full': '100%', // Largura máxima para o conteúdo
      },
    },
  },
  plugins: [],
  variants: {
    extend: {},
  },
};