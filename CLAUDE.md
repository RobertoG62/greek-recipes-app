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
- **Category filters**: Dynamically built from recipe data, rendered as pill buttons
- **Recipe IDs**: String-based kebab-case (e.g., `moussaka`, `souvlaki`)
- **Ingredient schema**: `{ name, quantity, unit }` — structured, not plain strings
- **WhatsApp sharing**: Builds shopping list URL from ingredient data
- **Image loading**: Lazy-loaded with fade-in on load, placeholder icon on error

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
- **Styling**: Tailwind CSS CDN + custom CSS (glassmorphism, card-lift, category pills)
- **Fonts**: Heebo (Hebrew body), Playfair Display (headings)
- **Icons**: Font Awesome 6.5 CDN
- **Direction**: RTL Hebrew (`dir="rtl"`, `lang="he"`)

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
