# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

The git root is the parent directory. The actual Vue project lives inside the `cestia-vue/` subdirectory. **All commands must be run from `cestia-vue/`.**

```
cestia-vue/          ← git root
└── cestia-vue/      ← Vue project root (run commands here)
    ├── src/
    │   ├── components/
    │   ├── views/
    │   ├── stores/
    │   ├── router/
    │   └── assets/styles/
    ├── public/
    └── .github/workflows/  ← NOT here; workflows are at repo root
.github/workflows/deploy.yml  ← GitHub Actions (repo root level)
```

## Commands

Run from `cestia-vue/cestia-vue/`:

```bash
npm install --legacy-peer-deps   # install (required flag due to vite-plugin-pwa peer conflict)
npm run dev                      # dev server at localhost:5173
npm run build                    # production build → dist/
npm run lint                     # oxlint + eslint with auto-fix
```

## Architecture

**App shell** (`App.vue`): full-height flex column with beige background (`#dbccb2`). Renders `<router-view>` in the main area and `FooterComponent` pinned at the bottom.

**Routing** (`router/index.js`): two routes — `/` → `HomeView`, `/about` → `AboutView`. Uses `createWebHistory` with `import.meta.env.BASE_URL` (set to `/cestia-vue/` in `vite.config.js` for GitHub Pages).

**HomeView** composes `HeaderComponent` + `SeccionGastoMesComponent`. `HeaderComponent` internally renders `BotonEscanearComponent` below the `<header>` tag.

**State** (`stores/counter.js`): Pinia store — currently empty, ready to be implemented.

**Global styles** loaded in `main.js`: `base.css` (resets), `layout.css` (empty), `components.css` (empty). Component styles use `<style scoped>`.

## Project Purpose

Shopping expense tracker ("Cestia") intended to scan receipts via OCR. Key planned features:
- Ticket scanning using **Tesseract.js** (installed, not yet integrated)
- Monthly spend tracking (`SeccionGastoMesComponent` — UI done, no reactive data)
- Average spend and purchase quality sections (`SeccionGastoPromedio.vue`, `SeccionCalidadCompra.vue` — both empty)

## Current State

The `<script setup>` blocks in components have been intentionally cleared for reimplementation. Only structural component imports are kept. The store is also empty. When adding logic, use Vue 3 Composition API (`ref`, `computed`, etc.) with `<script setup>` syntax.

## Deployment

GitHub Actions workflow at `.github/workflows/deploy.yml` (repo root, not inside `cestia-vue/`) deploys to GitHub Pages on push to `main`. Build output is `cestia-vue/dist/`.
