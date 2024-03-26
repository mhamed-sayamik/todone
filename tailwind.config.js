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
      "primary": "#190482",
      "accent":"#F9F871",
      'background': '#8E8FFA',
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