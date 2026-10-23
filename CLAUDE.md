@AGENTS.md

## Project

UrbanCanopy LA: Next.js 16 + MapLibre map of LA (shade, tree density, temperature, transit, parks, amenities). Data in Supabase/PostGIS; sources in README.md.

## Commands

- `npm run dev` / `build` use `--webpack` (required for `@svgr/webpack`: `import X from './a.svg'` → component, `'./a.svg?url'` → URL).
- `npm run format` after editing — Prettier is strict (printWidth 60); don't hand-format.
- Done = `npm run lint && npm run test:run` pass. Tests: colocated `*.test.ts`, node env.
- Env: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` (gitignored `.env*`).

## Code style

React Compiler is on — no manual `useMemo`/`useCallback`. Alias `@/*` → `src/*`. Components: default-export arrow functions with a sibling SCSS file using `src/app/_palette.scss`.

## Adding a map layer

1. `src/server/fetch<X>.ts` — Supabase query, page in 1000-row chunks, return GeoJSON.
2. `src/app/api/<x>/route.ts` — thin `GET` wrapper.
3. Hook in `src/client/hooks/useLayerData.ts` (React Query).
4. `src/client/layers/<x>/` — `<X>Source.tsx` (fetch, icons via `useMapImage`, `<Source>`), `<X>Layer.tsx` (toggle `layout.visibility` from `isLayerVisible`; set `beforeId` per theme — light/dark basemaps have different layer names), optional `<X>Tooltip.tsx`.
5. Register in `src/constants/`: `MAP_SOURCE_IDS`/`MAP_LAYER_IDS` (never string literals), `SOURCES`, `POI_LAYERS` or `ENVIRONMENT_LAYERS`, `TOOLTIPS`.
6. Update `LAYERS.test.ts` / `SOURCES.test.ts` (they assert exact ID lists).

## Other

- `src/stores/useMapStore.ts` — Zustand: visible layers + loaded sources (drives `LayerControl` loading state).
- Temperature uses `om://` protocol (`@openmeteo/weather-map-layer`), registered in `Map.tsx`.
- `src/scripts/` — one-off ETL into Supabase; not app runtime, don't run unless asked.
- Commits: `UC-<n>: <summary>`, n = next after latest in `git log`.
