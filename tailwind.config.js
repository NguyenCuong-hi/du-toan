module.exports = {
  presets: [
    require('frappe-ui/src/utils/tailwind.config')
  ],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: 'var(--surface-base)',
          gray1: 'var(--surface-gray-1)',
          gray2: 'var(--surface-gray-2)',
          gray3: 'var(--surface-gray-3)',
          sidebar: 'var(--surface-sidebar)',
        },
        ink: {
          base: 'var(--ink-base)',
          muted: 'var(--ink-gray-5)',
          body: 'var(--ink-gray-8)',
          heading: 'var(--ink-gray-9)',
        },
        outline: {
          light: 'var(--outline-gray-1)',
          border: 'var(--outline-gray-2)',
          dark: 'var(--outline-gray-8)',
        },
      },
      borderRadius: {
        'espresso-sm': 'var(--radius-sm)',
        'espresso': 'var(--radius)',
        'espresso-md': 'var(--radius-md)',
        'espresso-lg': 'var(--radius-lg)',
        'espresso-xl': 'var(--radius-xl)',
        'espresso-2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'espresso-sm': 'var(--elevation-sm)',
        'espresso': 'var(--elevation-base)',
        'espresso-md': 'var(--elevation-md)',
        'espresso-lg': 'var(--elevation-lg)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      fontWeight: {
        regular: '420',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontSize: {
        '2xs': '11px',
        'xs': '12px',
        'sm': '13px',
        'base': '14px',
        'lg': '16px',
        'xl': '18px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
}
