# PHAN HỮU V9 — Tailwind CSS integration

Base: **V8 Seamless Fullscreen**. This is an additive frontend-only update.

## Changes

- Installed Tailwind CSS **v4** with the official `@tailwindcss/vite` plugin; no PostCSS or old-style `tailwind.config.js` required.
- Added `src/styles/tailwind.css` with custom brand tokens (`midnight`, `navy`, `electric`, `ice`, `mist`, `outline`) and utilities (`ph-glass`, `ph-focus`).
- **Intentionally disabled Tailwind Preflight** to preserve the existing established CSS design, including hero, LED, 3D, motion and fixed overlay header.
- Rebuilt **Work page filters and search** with responsive Tailwind classes. Moved public project grids to Tailwind responsive utilities.
- Rebuilt **About capabilities**, **Contact social links**, **Admin overview cards** in Tailwind; added focus/spacing utilities to other UI components.
- Preserved the existing project model, VN/EN auto-language, Supabase CRUD and Vercel routes; **no database migration**.

## Setup

```powershell
corepack enable
corepack prepare pnpm@10.18.3 --activate
pnpm install
pnpm dev
```

To verify the production build on your machine:

```powershell
pnpm build
pnpm preview
```

Do not add `@import "tailwindcss"` on top of `tailwind.css` in this version: it would enable the broad base reset and could alter inherited V8 styles.

**Preview:** The V8 static HTML snapshot has been removed so it is not mistaken for the V9 Tailwind UI. Use `pnpm dev` to view the actual site.

**Important:** Tool logos shown in imported demo projects are example project metadata; verify the actual tools used in Admin before publishing claims about each product.
