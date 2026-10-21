# V10 — Responsive Tech UI (22/10/2026)

## Root cause

`led-effects.css` set `position: relative` on every direct child of `.site-shell`. Its specificity overrode `.cursor-glow { position: fixed }`, inserting a 300px-high invisible element into document flow. The same selector affected the intro and particle layers.

## Changes

- Removed the public footer Admin link; direct `/admin/login` routing remains available.

- Removed that catch-all rule; overlay elements retain fixed positioning.
- Replaced `viewport-shell-v8.css` with `responsive-layout.css`: stable in-flow sticky header, seamless backdrop, consistent gutters, fluid type, wrapping content, responsive grids, smaller-screen navigation.
- Replaced font literals with a shared font system: local Chakra Petch + Space Grotesk, with OFL license files.
- Removed repeated project numbering over the image; media lightbox now uses a body portal above the header.
- Kept React, Tailwind v4, routing, translations, project data, Supabase and Admin integration.

## Validation

Production build and responsive browser checks are documented in README.md. The temporary QA harness is excluded from the delivered archive. `pnpm-lock.yaml` retains the dependency versions used for the successful build.
