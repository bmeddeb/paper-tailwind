# Color Scheme Documentation

This document describes the color system used throughout the application.

## Design Tokens Architecture

Our color system follows a tiered approach to maximize flexibility and maintainability:

### 1. Base Colors (Raw Values)

These are foundational color values not meant to be used directly in components. They serve as the source of truth for all other color definitions.

```css
:root {
  --blue-500: #3b82f6;
  --gray-100: #f3f4f6;
  /* ... */
}
```

### 2. Semantic Tokens

These are meaningful abstractions that map base colors to their functional purposes. They change based on the current theme (light/dark).

```css
:root {
  /* Light theme defaults */
  --color-primary: var(--blue-600);
  --color-bg-primary: var(--gray-50);
  /* ... */
}

.dark {
  /* Dark theme overrides */
  --color-primary: var(--blue-500);
  --color-bg-primary: var(--gray-900);
  /* ... */
}
```

### 3. Component Tokens

These are specific to UI elements and are derived from semantic tokens.

```css
:root {
  --color-sidebar-bg: var(--color-bg-secondary);
  --color-sidebar-text: var(--color-text-primary);
  /* ... */
}
```

### 4. White-Label Tokens

These are brand-specific overrides that can be customized per client/tenant.

```css
:root {
  --brand-primary: var(--blue-600);
  --brand-secondary: var(--indigo-600);
  /* ... */
}
```

## Using Colors in the Application

### 1. CSS Class Usage

You can use the Tailwind classes that are mapped to our design tokens:

```html
<!-- Using semantic colors -->
<div class="bg-bg-primary text-text-primary"></div>

<!-- Using component-specific colors directly with CSS variables -->
<div class="bg-[color:var(--color-sidebar-bg)]"></div>
```

### 2. Direct CSS Variable Usage

For custom components or styles:

```css
.my-custom-element {
  background-color: var(--color-card-bg);
  color: var(--color-text-primary);
}
```

## Theme System

### Default Modes

The system supports three theme modes:

1. **Light Mode**: Explicit light theme
2. **Dark Mode**: Explicit dark theme
3. **System Mode**: Follows the user's system preference

### Theme Switching Logic

The theme is applied using CSS classes:
- Light mode: `html.light`
- Dark mode: `html.dark`
- System mode: `html.theme-system` + automatically applies `.light` or `.dark` based on system preference

### Theme Toggle API

The `themeController` Alpine.js component provides the following methods:

- `toggleLightDark()`: Toggles between light and dark modes
- `setTheme(theme)`: Sets a specific theme ('light', 'dark', or 'system')
- `isTheme(theme)`: Checks if a specific theme is active

## White-Labeling Implementation

To white-label the application for a specific client:

1. Create a client-specific CSS file that overrides the brand tokens:

```css
/* client-acme.css */
:root {
  --brand-primary: #007bff;
  --brand-secondary: #6610f2;
  --brand-accent: #20c997;
  /* ... */
}

.dark {
  --brand-primary: #0d6efd;
  --brand-secondary: #6f42c1;
  --brand-accent: #2dceaa;
  /* ... */
}
```

2. Load this CSS file dynamically based on the client/tenant identification.

## Color Reference

### Primary Palette

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--color-primary` | Blue 600 (#2563eb) | Blue 500 (#3b82f6) | Primary actions, links |
| `--color-secondary` | Indigo 600 (#4f46e5) | Indigo 500 (#6366f1) | Secondary actions |
| `--color-accent` | Teal 500 (#14b8a6) | Teal 400 (#2dd4bf) | Accents, highlights |

### Feedback Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--color-success` | Green 600 (#16a34a) | Green 500 (#22c55e) | Success states |
| `--color-warning` | Yellow 500 (#eab308) | Yellow 400 (#facc15) | Warnings |
| `--color-danger` | Red 600 (#dc2626) | Red 500 (#ef4444) | Errors, destructive actions |
| `--color-info` | Blue 500 (#3b82f6) | Blue 400 (#60a5fa) | Informational elements |

### Background Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--color-bg-primary` | Gray 50 (#f9fafb) | Gray 900 (#111827) | Page backgrounds |
| `--color-bg-secondary` | White (#ffffff) | Gray 800 (#1f2937) | Card backgrounds |
| `--color-bg-tertiary` | Gray 100 (#f3f4f6) | Gray 700 (#374151) | Alternative backgrounds |

### Text Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--color-text-primary` | Gray 900 (#111827) | Gray 50 (#f9fafb) | Primary text |
| `--color-text-secondary` | Gray 700 (#374151) | Gray 300 (#d1d5db) | Secondary text |
| `--color-text-tertiary` | Gray 500 (#6b7280) | Gray 400 (#9ca3af) | Tertiary/muted text |

## Maintenance and Updates

When adding new colors or components:

1. Start by defining semantic tokens in `variables.css`
2. Add component-specific tokens if needed
3. Update the Tailwind config if you want to use the colors with utility classes
4. Test in both light and dark modes

For major color scheme changes, update the base color palette first, then adjust the semantic mappings to maintain consistency.