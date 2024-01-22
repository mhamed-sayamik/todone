import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      "primary": "#8E8FFA",
      "secondary": "#190482",
      'white': '#ffffff',
    },
  },
    
    fonts: {
      "primary": "Inter",
      "secondary": "Rubik",
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
  ],
}