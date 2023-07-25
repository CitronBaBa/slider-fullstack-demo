/** @type {import('tailwindcss').Config} */

const enabledDasiyUIThemes = [
  '',
  // 'light',
  // 'dark',
  // 'retro',
  // 'cupcake',

  // 'wireframe',

  // 'bumblebee',
  // 'emerald',
  // 'corporate',

  // 'autumn',
  // 'cyberpunk',
  // 'valentine',
  // 'halloween',
  // 'garden',
  // 'forest',
  // 'aqua',
  // 'lofi',
  'pastel',
  // 'fantasy',
  // 'black',
  // 'luxury',
  // 'synthwave',
  // 'dracula',
  // 'cmyk',
  // 'business',
  // 'acid',
  // 'lemonade',
  // 'night',
  // 'coffee',
  // 'winter',
];

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('daisyui'),
  ],
  theme: {
    extend: {
      boxShadow: {
        'xl-pan': '0 0 80px -10px rgb(0 0 0 / 0.2);',
      },
    },
  },
  daisyui: {
    // sync to themePrest.ts
    themes: enabledDasiyUIThemes,
    // darkTheme: 'dark',
  },
};
