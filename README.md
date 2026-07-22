# Rahul Rathnavel Portfolio

The public portfolio for Rahul Rathnavel — an aspiring AI/ML software engineer who enjoys learning, building, and discussing LLMs, especially where they fail.

The root site uses the visual system of [Brittany Chiang's v4](https://github.com/bchiang7/v4), with attribution retained under the upstream MIT License. Rahul's content, assets, and project records replace the upstream portfolio data.

## Public routes

- `/` — the professional portfolio
- `/os/` — the existing RahulOS experience, preserved as a separate static application
- `/game-tour/` — the existing interactive game tour, preserved as a separate static application

## Local development

The root Gatsby project is intentionally kept on the upstream-compatible Node 14 runtime. Use Node `14.21.3` and Yarn Classic `1.22.22` for the root site.

```powershell
corepack prepare yarn@1.22.22 --activate
yarn install --frozen-lockfile
yarn develop
```

The OS and game are separate applications and are not changed by root-site development.

## Production composition

The GitHub Pages workflow builds three independent static outputs and merges them:

```text
Gatsby portfolio  → /
RahulOS            → /os/
Game tour          → /game-tour/
```

Run the same build locally with Node 22 for the legacy OS/game, then Node 14 for Gatsby:

```powershell
# Node 22
$env:HUSKY = '0'
yarn --cwd legacy-os install --frozen-lockfile
yarn --cwd legacy-os build
npm --prefix game-tour ci
npm --prefix game-tour run build -- --outDir "$PWD/.game-tour-dist"

# Switch to Node 14.21.3 before the next commands
corepack prepare yarn@1.22.22 --activate
yarn install --frozen-lockfile
yarn build
yarn assemble
```

Serve `dist/` to inspect the composed site.

## Content integrity

- Achievement copy uses supplied evidence: Amazon ML Challenge 2025 Rank 83 / 45.35 SMAPE / Top 2%, and TECHgium 2026 finalist status (34 finalists from 62,000+ registrations).
- Private client and research work is intentionally anonymized. No private data, names, or unsupported outcomes are published.
- Medical-related work is described as research/prototyping and is not medical advice or a diagnostic tool.
