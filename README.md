# Fresh Harvest - E-Commerce Platform

A fully responsive, front-end E-Commerce Platform for fresh fruits and vegetables.
No backend. Static web, client-side JavaScript, localStorage only.

**Live Demo:** https://jeancaremanrique-ai.github.io/fresh_harvest-website/
**Figma Design:** https://www.figma.com/design/CMyqEZMYpLTcd14BIJJG9m/Fresh-Harvest-Market-%E2%80%94-E-Commerce-Platform?node-id=0-1&t=9lODnbNG8t3M8LbN-1
**Authors:** Jeancare Manrique & Eden Joy Doroy & Jenelyn Francisco & Andrew Galasao

## Overview

Fresh Harvest is an imaginary Filipino fresh produce brand.
Users can browse products, view product details, search, filter, sort,
add to cart, update quantity, remove items, and checkout with form validation.

Required views:
- Homepage / Landing
- PLP / Product Listing Page
- PDP / Product Detail Page
- Cart + Checkout

## Tech Stack

- HTML5 - Semantic structure
- CSS3 - Grid, Flexbox, CSS Variables, Mobile-first Media Queries
- JavaScript - Vanilla JS, DOM manipulation, State Management
- Web Storage API - localStorage / sessionStorage
- GitHub Pages - Deployment

## Architecture / File Structure
fresh_harvest-website/
- index.html - Semantic structure, header, nav, main, sections, footer
- styles.css - Design tokens, Grid/Flexbox layouts, responsive design
- script.js - State, cart logic, search, filter, sort, validation
- README.md - Documentation
- designs/ - Exported Figma designs

**Code Architecture:**
- Modular: HTML for structure, CSS for style, JS for logic - no mixed logic.
- DRY: One renderProducts() function reused for Homepage and PLP.
- Standardized naming: products, cart, addToCart(), openPDP(), renderCart().
- Logical structure: Data -> State -> Render -> Events.

## Design Decisions

**Visual Hierarchy & UX Laws:**
- Contrast: Dark green primary #2e7d32 on white for readability.
- Proximity: Product image, name, price grouped in one card.
- Alignment: Grid-aligned product cards for clean scanning.
- Fitts's Law: Primary targets Add to Cart and Checkout are >= 44x44px, full-width on mobile, rounded for easy tapping.
- Hick's Law: Navigation categorized into Home / Shop / Cart / Profile, with progressive disclosure - PDP opens only on product click.

**Design System - Figma Tokens mapped to CSS Variables:**
- Typography: Display, Headings, Body, Captions
- Colors: Primary (Green), Secondary, Neutrals 100-900, Danger (Red), Success (Green)
- CSS Variables in styles.css mirror Figma tokens for consistency.

**Accessibility:**
- Semantic tags: header, nav, main, section, article, aside, footer
- Explicit label for all checkout form inputs
- Descriptive alt tags for all product images
- Logical heading order h1 - h3

## Feature Guide

### Part 1 - UI/UX & Front-End Foundations
- Homepage, PLP, PDP - complete and content-rich
- CSS Grid for product galleries, Flexbox for navigation/cards
- Mobile-first responsive design, scalable units rem / em / vw

### Part 2 - Dynamic Application
1. State Management & Cart: Add, update quantity, remove. Real-time totals, no full page reloads.
2. Web Storage API: Cart persists via localStorage. Wishlist/session via sessionStorage. Cart survives reload.
3. Search, Filtering & Sorting: Real-time DOM filtering, keyword search, category filter, dynamic sorting by price/name.
4. Form Validation & Checkout: Regex validation for name, email, phone. Real-time feedback, red error states, simulated order confirmation.
5. Performance & UX: Lazy loading for images (loading="lazy"), micro-interactions on buttons, skeleton/loading state, empty cart state.

## How to Run / Setup Steps

**Option 1 - Live Demo:** Open the Live Demo link above.

**Option 2 - Local:**
1. Clone the repo: git clone https://github.com/jeancaremanrique-ai/fresh_harvest-website.git
2. Open the folder in VS Code or any editor.
3. Open index.html in browser, or use Live Server.
4. No install, no build, no backend needed.

## Git Workflow
Frequent atomic commits with clear messages, e.g.:
- feat: add cart state management
- fix: style PDP Add to Cart button
- docs: add README and setup guide
