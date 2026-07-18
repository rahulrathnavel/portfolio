# rahulrathnavel.dev

The source code for Rahul Rathnavel's personal portfolio: an evidence-led, interactive portfolio for AI/ML, data, and software roles.

Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) before changing project facts, visual direction, assets, deployment, or contact-form configuration.

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Deployment

The repository deploys a static Next.js export to GitHub Pages via `.github/workflows/deploy.yml`. The `public/CNAME` file assigns `rahulrathnavel.dev`.

Before a production deployment, configure this GitHub Actions repository secret:

- `WEB3FORMS_ACCESS_KEY`

The form key is deliberately never committed. See the Contact form and privacy section in [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) for the static-site limitation and domain allow-list requirement.
