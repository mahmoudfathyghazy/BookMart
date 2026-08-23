# BookMart

> A modern school-supplies e-commerce front-end built with **React 19 + Vite**,
> styled with **Bootstrap 5**, featuring full bilingual support (**English / العربية**)
> and a role-based experience for **Guests, Customers and Admins**.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-latest-646cff?logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952b3?logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

The project currently runs in a **frontend-only phase**: all data is served from
bundled dummy JSON seeded into `localStorage`, so **no backend is required** to
run it. The data layer is designed so a real API can replace it later by changing
a single file.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Test Accounts](#test-accounts)
- [Routes](#routes)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)

## Features

- **Role-based routing** — public pages for guests, protected pages for logged-in
  users (`ProtectedRoute`), and a restricted admin area (`AdminRoute`)
- **Product catalog** — 7 categories, search, sorting, category filtering
- **Shopping cart & favorites** — quantity controls, discounted pricing on sale
  items, persisted across refreshes
- **Full admin CRUD** — live dashboard stats, add / edit / delete products via a
  management table and modal form
- **Bilingual EN/AR** — one-click language toggle with full RTL layout support
- **Dark / light theme** — user choice persists across sessions
- **Persistent session** — login state survives page refreshes

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/mahmoudfathyghazy/BookMart.git
cd BookMart

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev          # http://localhost:5173
```

| Script             | Description                       |
| ------------------ | --------------------------------- |
| `npm run dev`      | Start dev server with HMR         |
| `npm run build`    | Production build into `dist/`     |
| `npm run preview`  | Preview the production build      |
| `npm run lint`     | Run ESLint                        |

> **Tip:** all app data lives in your browser's localStorage. If anything ever
> looks stale after an update, open the browser console and run
> `localStorage.clear()`, then reload.

## Test Accounts

Accounts are seeded locally into your browser — they are mock credentials only.

| Email                       | Password       | Role     |
| --------------------------- | -------------- | -------- |
| `admin@bookmart.com`        | `admin123`     | admin    |
| `test@bookmart.com`         | `123456`       | customer |
| `elshenawyomar93@gmail.com` | `01030987413`  | customer |

## Routes

| Path                | Access   | Page                                  |
| ------------------- | -------- | ------------------------------------- |
| `/`                 | Guest    | Home                                  |
| `/market`           | Guest    | Catalog grouped by category           |
| `/product/:id`      | Guest    | Product details                       |
| `/about`, `/contact`| Guest    | Static pages                          |
| `/login`, `/register` | Guest  | Authentication                        |
| `/profile`          | User     | Account info                          |
| `/favorites`        | User     | Saved products                        |
| `/cart`             | User     | Shopping cart                         |
| `/admin`            | Admin    | Dashboard + product CRUD              |
| `/admin/products`   | Admin    | Inventory grouped by category         |
| `/admin/products/new` | Admin  | Add product                           |

## Architecture

```
┌──────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  Components  │ ───▶ │ services/api.js  │ ───▶ │ services/localDb│
│  Pages/Hooks │      │  (REST-like API) │      │  (localStorage) │
└──────────────┘      └──────────────────┘      └───────▲─────────┘
                                                        │ seeds
                                                ┌───────┴────────┐
                                                │ src/data/*.json│
                                                │  (dummy data)  │
                                                └────────────────┘
```

Every read/write goes through `src/services/api.js`, which simulates REST
endpoints over `src/services/localDb.js` (a small localStorage engine seeded
from the dummy JSON files in `src/data/`). When a real backend becomes
available, **only `api.js` needs to change** — no component or hook does.

State is managed with the React Context API:

| Context              | Responsibility                              | Persisted |
| -------------------- | ------------------------------------------- | --------- |
| `AuthProvider`       | Login / register / logout, current user     | Yes       |
| `CartProvider`       | Cart items, totals (discount-aware)         | Yes       |
| `FavoritesProvider`  | Favorite products                           | Yes       |
| `LanguageProvider`   | EN/AR toggle, translations, RTL direction   | Yes       |
| `ThemeProvider`      | Dark / light theme                          | Yes       |

## Project Structure

```
src/
├── components/
│   ├── admin/        # Product form modal
│   ├── auth/         # ProtectedRoute, AdminRoute guards
│   ├── cart/         # CartItem, CartSummary
│   ├── market/       # Search/sort/grid/category rail
│   ├── product/      # ProductInfo, ProductActions
│   └── *.jsx         # Navbar, Footer, cards, inputs...
├── context/          # *Context.js (state object) + *Provider.jsx
├── data/             # Dummy seed JSON (products, categories, users, orders)
├── hooks/            # useAuth, useCart, useFavorites, useLanguage, useTheme...
├── i18n/             # EN/AR translations dictionary
├── layouts/          # MainLayout (public/user), AdminLayout
├── pages/            # Route pages (+ admin/ sub-folder)
├── services/         # api.js (data layer), localDb.js (storage engine)
└── utils/            # localization, pricing, image fallback
```

## Roadmap

- [x] Frontend-only phase with dummy data (current)
- [ ] Fake-backend specification page documenting required endpoints
- [ ] Real REST API (Node/Express or similar)
- [ ] Database persistence replacing localStorage
- [ ] Checkout flow & order history

---

Built as a university React project — practicing component-based UI design,
routing, context state management and responsive design.
