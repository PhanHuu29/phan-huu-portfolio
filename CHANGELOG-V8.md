# V8 — Fullscreen Seamless Header + Hero

- Removed the duplicate V4/V5 layout sections from `header-3d.css`.
- Stopped importing the V6 and V7 spacing stylesheets, replacing them with one clear `viewport-shell-v8.css`.
- Removed the page transition sweep line which could look like a border between the header and page body.
- Replaced the large clipped CSS ellipse with a softer SVG horizon arc and ambient glow.
- Made all public routes start their background at y=0; contents have separate, consistent safe clearance below the floating header.
- Kept React + pnpm, auto VI/EN localization, projects, animations, Supabase, Vercel and admin functionality unchanged.
- Added `data-layout-version="v8-edge-to-edge"` to the site root for verifying the correct version on localhost.

## Notes
- Validated visual layout in a self-contained HTML preview at desktop/mobile sizes. Full pnpm production build is not verified because npm registry is unavailable in the execution environment.
