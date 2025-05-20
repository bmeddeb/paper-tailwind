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
      main.css       ← Tailwind entrypoint
    js/
      main.js        ← JS entrypoint (Alpine.js + Flowbite init)
    images/          ← static assets
  templates/
    base.html        ← base HTML template
    home.html        ← example page

dist/
  style.css          ← compiled Tailwind CSS
  main.js            ← bundled JS

node_modules/        ← npm packages
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