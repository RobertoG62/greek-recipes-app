# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
**המטבח היווני** — Hebrew (RTL) Greek recipe web application. Vanilla HTML/JS/CSS SPA with hash-based routing. No build step — deploys to GitHub Pages.

## Run Locally
```bash
python -m http.server 8000
# Open http://localhost:8000
```
The app fetches `data/recipes.json` at runtime. If the file is missing, the grid shows an error state with a retry button.

## Architecture

Three JS files loaded as plain `<script>` tags in strict order:

1. **`js/data.js`** — IIFE module exporting `RecipeData` with `fetchRecipes()`, `filterRecipes(query, category)`, `getRecipeById(id)`, `getState()`. State holds `recipes`, `filteredRecipes`, `searchQuery`, `activeCategory`, `categories`.
2. **`js/ui.js`** — IIFE module exporting `UI` with `renderFilters()`, `renderCards()`, `renderRecipeDetail()`, `renderResultCount()`, `showHome()`, `showRecipeView()`, `showLoading()`. Contains `CATEGORY_ICONS` map and WhatsApp share URL builder.
3. **`js/app.js`** — Self-executing async IIFE. Hash-based router (`#/` home, `#/recipe/:id` detail), 200ms debounced search, scroll-triggered glass header.

Load order: `data.js → ui.js → app.js` (each depends on the previous).

### Key Patterns
- **Views**: Home and detail are `<div>` sections toggled via `hidden` class (no `<template>` cloning)
- **Category filters**: Dynamically built from recipe data, rendered as pill buttons. "הכל" (All) is a special category always placed first — it matches all recipes.
- **Recipe IDs**: String-based kebab-case (e.g., `moussaka`, `souvlaki`)
- **Ingredient schema**: `{ name, quantity, unit }` — structured, not plain strings
- **WhatsApp sharing**: Builds shopping list URL from ingredient data using `https://wa.me/?text=...`
- **Image loading**: Lazy-loaded with fade-in on load, placeholder icon on error
- **Search**: Case-insensitive multi-field OR match against title, description, ingredient names, and tags. Category filter applies as AND before search.

### Key DOM Elements
| ID | Role |
|----|------|
| `#home-view` / `#recipe-view` | Two main views, toggled via `.hidden` |
| `#search-input` | Debounced search (200ms), triggers `filterRecipes` |
| `#category-filters` | Container for dynamically rendered pill buttons |
| `#recipe-grid` | CSS Grid container for recipe cards |
| `#result-count` | "X מתכונים מתוך Y" counter |
| `#empty-state` / `#loading-state` | Conditional UI states |

## Data Files

- **`data/recipes.json`** — Main recipe data (10 recipes), loaded at runtime.
- **`data/batch1.json`**, **`batch2.json`**, **`batch3.json`** — 50+ additional recipes (untracked). These follow the same schema but are **not yet integrated** into the main file.

### Adding New Recipes
1. Add recipe object to `data/recipes.json` following the schema below
2. Use kebab-case `id` matching the recipe name (e.g., `galaktoboureko`)
3. Set `image` to `images/{PascalCaseName}.jpg` — images are **not in the repo** and will show a placeholder icon on error
4. Category must be one of the 5 existing Hebrew category strings (see table below)
5. If adding a new category, also add its icon mapping in `CATEGORY_ICONS` inside `js/ui.js`

## Design Tokens
| Token | CSS Variable | Tailwind Class | Value |
|-------|-------------|----------------|-------|
| Primary | `--gr-primary` | `gr-primary` | `#0D47A1` (Blue) |
| Primary Light | `--gr-primary-light` | `gr-primary-light` | `#90CAF9` |
| Primary Dark | `--gr-primary-dark` | `gr-primary-dark` | `#0A3170` |
| Cream | `--gr-cream` | `gr-cream` | `#FAFAFA` |
| Charcoal | `--gr-charcoal` | `gr-charcoal` | `#1A1A1A` |
| Navy | `--gr-navy` | `gr-navy` | `#0A1628` |
| Warm Gray | `--gr-warm-gray` | `gr-warm-gray` | `#F5F0EB` |
| Text Secondary | `--gr-text-secondary` | `gr-text-secondary` | `#6B7280` |
| Border | `--gr-border` | `gr-border` | `#E5E1DC` |

CSS variables in `css/style.css :root`. Tailwind colors in `index.html <script>`. Both must stay in sync.

## Tech Stack
- **Styling**: Tailwind CSS v4 CDN + custom CSS (glassmorphism, card-lift, category pills)
- **Fonts**: Heebo (Hebrew body), Playfair Display (headings)
- **Icons**: Font Awesome 6.5 CDN
- **Direction**: RTL Hebrew (`dir="rtl"`, `lang="he"`)

## Custom CSS Classes
| Class | Purpose |
|-------|---------|
| `.glass` / `.glass-search` | Frosted glass effect (`backdrop-filter: blur`) |
| `.header-glass` | Applied to header on scroll > 50px |
| `.card-lift` | Hover: `translateY(-6px)` with shadow transition |
| `.category-pill` | Filter buttons (active state = blue bg, white text) |
| `.badge-easy` / `.badge-medium` / `.badge-hard` | Difficulty color badges |
| `.view-fade-in` | 0.3s fade-in animation for view transitions |
| `.primary-border-right` | RTL blue accent border for ingredient section |

## Recipe Categories
| Hebrew | English | Icon |
|--------|---------|------|
| מרקים | Soups | `fa-bowl-food` |
| מנות עיקריות | Main courses | `fa-plate-wheat` |
| מאפים ולחמים | Baked goods | `fa-bread-slice` |
| קינוחים | Desserts | `fa-cake-candles` |
| רטבים ותוספות | Sauces & sides | `fa-jar` |

## Recipe Object Schema
```json
{
  "id": "kebab-case-string",
  "title": "Hebrew name",
  "originalName": "Ελληνικό Όνομα",
  "description": "Hebrew description",
  "category": "מנות עיקריות",
  "image": "images/Recipe_Name.jpg",
  "prepTime": 15,
  "cookTime": 30,
  "servings": 4,
  "difficulty": "קל|בינוני|מאתגר",
  "ingredients": [{ "name": "...", "quantity": "1", "unit": "כוס" }],
  "instructions": ["Step 1", "Step 2"],
  "tags": ["tag1", "tag2"]
}
```
