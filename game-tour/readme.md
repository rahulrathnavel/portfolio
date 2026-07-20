# Rahul Rathnavel — Game Tour

An interactive Three.js portfolio world for Rahul Rathnavel: applied AI/ML systems, data projects, software engineering, proof points, and direct contact links.

This is a lawful MIT-licensed derivative of `brunosimon/folio-2019`. The original MIT license remains intact in [license.md](./license.md); see [DERIVATIVE_NOTICE.md](./DERIVATIVE_NOTICE.md) for the adaptation record.

The production build is published beneath `/game-tour/` by the parent portfolio. The verified output in `../public/game-tour/` is committed with the static site so GitHub Pages can publish it directly. Large Blender authoring files remain local; the optimized runtime models and assets needed to play the tour are included in `static/`.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints, normally `http://localhost:5173`.

Controls: arrow keys or `WASD` to drive, `Space` to jump, `R` to reset, and `Enter` when a floating interaction marker appears. Project boards and contact points always open in a new tab.

## Verify Rahul-specific content

Drive to the right-hand project road to open nine Rahul-specific project stations. Drive down from the crossroads for GitHub, LinkedIn, email, and résumé links. The in-world signs cover SmartOps, Amazon ML Challenge, Omni RAG, Smart Glass, Voice Surrogate, Raki Chat, biometric voting, job-signal verification, and encrypted smart-grid ML.

## Production build

```bash
npm run build
npm run preview
```

Before pushing a game-tour change, rebuild it from this folder and commit the refreshed `../public/game-tour/` output with the source change.
