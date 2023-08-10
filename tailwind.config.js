/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true, // Aktifkan ketika siap untuk produksi
    content: ['./src/**/*.js'],
  },
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

