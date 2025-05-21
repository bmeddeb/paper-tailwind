/**
 * Tailwind CSS configuration
 * Integrates with our design token system
 */

module.exports = {
  content: [
    './src/templates/**/*.html',
    './src/assets/js/**/*.js',
    './node_modules/flowbite/**/*.js',
    './src/index.html',
  ],
  darkMode: 'class', // Enables .dark class for dark mode
  theme: {
    extend: {
      // Color mappings
      colors: {
        // Base semantic colors
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          muted: 'var(--color-primary-muted)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
          active: 'var(--color-secondary-active)',
          muted: 'var(--color-secondary-muted)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          active: 'var(--color-accent-active)',
          muted: 'var(--color-accent-muted)',
        },

        // Background colors
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          accent: 'var(--color-bg-accent)',
        },

        // Text colors
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          accent: 'var(--color-text-accent)',
          'on-primary': 'var(--color-text-on-primary)',
          'on-accent': 'var(--color-text-on-accent)',
        },

        // UI feedback colors
        success: {
          DEFAULT: 'var(--color-success)',
          hover: 'var(--color-success-hover)',
          muted: 'var(--color-success-muted)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          hover: 'var(--color-warning-hover)',
          muted: 'var(--color-warning-muted)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          hover: 'var(--color-danger-hover)',
          muted: 'var(--color-danger-muted)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          hover: 'var(--color-info-hover)',
          muted: 'var(--color-info-muted)',
        },

        // UI element colors
        border: {
          DEFAULT: 'var(--color-border)',
          hover: 'var(--color-border-hover)',
          focus: 'var(--color-border-focus)',
        },
        divider: 'var(--color-divider)',
        sidebar: {
          bg:    'var(--color-sidebar-bg)',
          text:  'var(--color-sidebar-text)',
          hover: 'var(--color-sidebar-hover)',
          border:'var(--color-sidebar-border)',
        },
        card: {
          bg: 'var(--color-card-bg)',
          border: 'var(--color-card-border)', 
          title: 'var(--color-card-title)',
          text: 'var(--color-card-text)',
        },
      },

      // Spacing system
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },

      // Typography
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
      },
      lineHeight: {
        none: 'var(--line-height-none)',
        tight: 'var(--line-height-tight)',
        snug: 'var(--line-height-snug)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
        loose: 'var(--line-height-loose)',
      },
      fontWeight: {
        light: 'var(--font-weight-light)',
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      letterSpacing: {
        tight: 'var(--letter-spacing-tight)',
        normal: 'var(--letter-spacing-normal)',
        wide: 'var(--letter-spacing-wide)',
      },

      // Border radius
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },

      // Border widths
      borderWidth: {
        none: 'var(--border-width-none)',
        thin: 'var(--border-width-thin)',
        thick: 'var(--border-width-thick)',
        thicker: 'var(--border-width-thicker)',
      },

      // Box shadows
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        inner: 'var(--shadow-inner)',
        focus: 'var(--shadow-focus)',
        none: 'none',
      },

      // Transitions
      transitionDuration: {
        fast: 'var(--transition-fast)',
        normal: 'var(--transition-normal)',
        slow: 'var(--transition-slow)',
      },
      transitionTimingFunction: {
        'ease': 'var(--transition-ease)',
        'ease-in': 'var(--transition-ease-in)',
        'ease-out': 'var(--transition-ease-out)',
        'ease-in-out': 'var(--transition-ease-in-out)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};