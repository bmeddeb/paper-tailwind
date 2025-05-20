# Tailwind CSS 4 + Alpine.js Scaffold

This project is a scaffold for building HTML templates using:

- Tailwind CSS 4
- Alpine.js
- Flowbite components

## Library Stack

- Tailwind CSS 4 (utility-first CSS framework)
- Alpine.js (lightweight JavaScript framework)
- Flowbite (UI components built on Tailwind CSS)
- PostCSS & Autoprefixer (CSS processing tools)
- @tailwindcss/cli (CLI for Tailwind CSS operations)
- esbuild (fast JavaScript bundler)
- Plotly.js (interactive JavaScript charting library)

## Setup

Install dependencies:

```bash
npm install
```

## Directory Structure

```
src/
  assets/
    css/
      main.css          ← Tailwind entrypoint
      variables.css     ← CSS variables and tokens
      themes/           ← White-label themes
        acme-theme.css  ← Example ACME theme
        theme-template.css  ← Template for creating new themes
    js/
      main.js           ← JS entrypoint (Alpine.js + Flowbite init)
    images/             ← static assets
  templates/
    base.html           ← base HTML template
    home.html           ← dashboard with collapsible sidebar
    colors.html         ← color system documentation
    profile.html        ← user profile page
    login.html          ← login page
    register.html       ← registration page
    timeline.html       ← timeline page
    table.html          ← data table page

dist/
  style.css             ← compiled Tailwind CSS
  main.js               ← bundled JS

node_modules/           ← npm packages
package.json
tailwind.config.js
postcss.config.js
```

## Development

Run the Tailwind CSS watcher:

```bash
npm run dev
```

Run the JS bundler:

```bash
npm run js:dev
```

Open any HTML file in `src/templates/` in your browser to view the pages.

## Build

Generate production-ready assets:

```bash
npm run build
npm run js:build
```

## Theming System

This project implements a comprehensive theming system:

### Light and Dark Mode

The UI supports light and dark mode with automatic detection of system preferences. Users can:

- Toggle between light/dark modes
- Set the theme to follow system preferences
- Theme preference is saved to localStorage

### White-Label Theming

White-label themes can be applied in two ways:

1. **URL Parameter**: Add `?theme=acme` to the URL to apply the ACME theme
2. **Theme Selector**: Use the theme dropdown in the UI to switch between themes

### Creating Custom Themes

To create a new white-label theme:

1. Copy `src/assets/css/themes/theme-template.css` to `src/assets/css/themes/your-theme-name-theme.css`
2. Customize the color variables in the new file
3. Add your theme to the theme selector dropdown in `home.html`

The theme will be automatically applied when selected from the UI or accessed via URL parameter: `?theme=your-theme-name`

### Theme Architecture

The theming system uses a three-layer architecture:

1. **Base Colors**: Raw color values (e.g., `--blue-500`)
2. **Semantic Tokens**: Purpose-based naming (e.g., `--color-primary`) 
3. **Component Tokens**: Component-specific variables (e.g., `--color-button-primary`)

This architecture makes it easy to create new themes that maintain visual consistency.