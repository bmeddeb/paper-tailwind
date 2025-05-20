module.exports = {
  content: [
    './src/templates/**/*.html',
    './src/assets/js/**/*.js',
    './node_modules/flowbite/**/*.js',
    './src/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
      },
      spacing: {
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
      fontSize: {
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
  future: {
    hoverOnlyWhenSupported: true,
  },
};