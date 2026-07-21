# rahulrathnavel.dev

The source code for Rahul Rathnavel's **RR Workstation**: an evidence-led desktop-style portfolio for AI/ML, data, and software roles, with an optional 3D Game Tour.

Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) before changing project facts, visual direction, assets, deployment, or contact-form configuration.

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Game Tour source

The optional tour is built separately and published into `public/game-tour/` for GitHub Pages:

```bash
cd game-tour
npm ci
npm run build
```

Then return to the repository root and run `pnpm build` before deployment.

During Next.js local development, open the static tour at
`http://localhost:3000/game-tour/index.html` (GitHub Pages also serves the cleaner
`/game-tour/` directory URL after deployment).

## Deployment

The repository deploys a static Next.js export to GitHub Pages via `.github/workflows/deploy.yml`. The `public/CNAME` file assigns `rahulrathnavel.dev`.

Before a production deployment, configure this GitHub Actions repository secret:

- `WEB3FORMS_ACCESS_KEY`

The form key is deliberately never committed. See the Contact form and privacy section in [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) for the static-site limitation and domain allow-list requirement.
