# Product Requirements — המטבח היווני

## Vision
A beautiful, mobile-first Hebrew recipe app showcasing authentic Greek cuisine. Zero build step, deployable to GitHub Pages.

## Features (V1)
- **Recipe Catalog**: 64 authentic Greek recipes across 5 categories
- **Search**: Real-time debounced search (200ms) across titles, descriptions, ingredients, and tags
- **Category Filters**: Pill-style filter buttons with icons, dynamically generated from data
- **Recipe Detail**: Full-page view with hero image, meta info, structured ingredients, numbered instructions
- **WhatsApp Sharing**: One-tap button to share ingredient shopping list via WhatsApp
- **Difficulty Badges**: Color-coded badges (קל/בינוני/מאתגר)
- **Responsive Grid**: `auto-fill, minmax(300px, 1fr)` — adapts from 1 to 3+ columns
- **Glassmorphism UI**: Glass header on scroll, glass search bar, glass meta card
- **Lazy Image Loading**: Fade-in on load, placeholder icon fallback on error

## Design
- **Palette**: Blue (`#0D47A1`) primary, navy hero, cream background
- **Typography**: Heebo (body), Playfair Display (headings)
- **Direction**: RTL Hebrew
- **Effects**: Card lift hover, view fade-in transition, sticky category bar

## Non-Goals (V1)
- No user accounts or authentication
- No recipe submission form
- No backend or database
- No offline/PWA support
