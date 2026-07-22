# Rahul Rathnavel Portfolio — Durable Project Context

Read this file before changing the site. It records the agreed public direction,
verified facts, and safe architecture for future sessions.

## Final product direction

The **root site** is a clean, professional portfolio adapted from the visual
system in [Brittany Chiang's V4](https://github.com/bchiang7/v4). Do not add a
new landing-page design, desktop shell, game UI, excessive animation, emojis,
or unverified claims to the root portfolio unless Rahul explicitly asks.

The root has two deliberate escape hatches only:

- **OS mode** → `/os/`
- **Game mode** → `/game-tour/`

The existing RahulOS and game tour are separate applications. Do not redesign
or alter their source while working on the root portfolio. The deployment
workflow composes all three static outputs.

```text
/              Gatsby V4-style professional portfolio
/os/           preserved RahulOS static export
/game-tour/    preserved interactive game tour
```

## Upstream and legal requirements

- Root portfolio visual source: `https://github.com/bchiang7/v4`
  - MIT License; keep root `LICENSE`.
  - Keep public footer credit and `static/CREDITS.md` attribution.
- RahulOS source lives in `legacy-os/` and retains its daedalOS notices.
- Game tour source remains in `game-tour/` and retains its own derivative and
  license notices.
- Recovery branch for the prior live state:
  `preserve-rahulos-before-v4` at commit `4da262f`.

## Canonical architecture

```text
src/ + content/ + static/
  -> Gatsby root portfolio build (public/)

legacy-os/
  -> unchanged RahulOS / Next static export (legacy-os/out/)

game-tour/
  -> unchanged Vite game build (.game-tour-dist/)

scripts/assemble-static.js
  -> dist/ with Gatsby at /, RahulOS at /os/, game at /game-tour/
```

`gatsby-browser.js` only redirects legacy `?url=` and `?app=` game deep links
from `/` to `/os/`. It exists to preserve the game-to-OS links without changing
the game source.

## Locked public link-preview identity

Do not change this section, matching metadata, or the preview image unless
Rahul explicitly asks:

- Thumbnail: `static/profile-veshti.jpg`
- Title: `Rahul Rathnavel Portfolio — Aspiring AI/ML Software Engineer`
- Description: `Aspiring AI/ML software engineer who loves learning, building,
  and discussing LLMs — especially where they fail.`

## Canonical public profile

- Public name: Rahul Rathnavel
- Email: `rahulrathnavell5@gmail.com`
- GitHub: `https://github.com/rahulrathnavel`
- LinkedIn: `https://www.linkedin.com/in/rahulrathnavel/`
- LeetCode: `https://leetcode.com/rahulrathnavel`
- Kaggle: `https://www.kaggle.com/rahulrathnavel`
- Resume source: `R:\portfolio\RAHUL_RATHNAVEL_RESUME.pdf`
- Target roles: AI/ML engineering, data science, and software/product
  engineering.

## Verified claims only

- **Amazon ML Challenge 2025 / Cyber Titans:** Rank 83, 45.35 SMAPE final
  submission, Top 2%. Rahul led model development, training, submissions,
  deployment, and AI/backend work with teammates.
- **LTTS TECHgium 2026 / SmartOps:** one of 34 finalist teams from 62,000+
  registrations across 540+ engineering institutes. Never claim Top 7 or winner.
- **LeetCode:** Knight, 816 solved, 2,570 submissions, 351 active days in
  supplied evidence. Use “800+ solved” when an exact static total would age.
- **Merged PRs:** Keras #22844, SciPy #25209, Matplotlib #31707, Statsmodels
  #9812.
- **Freelance / research:** keep client names, private data, unpublished
  outcomes, and unsupported publication/award claims private.
- **Health-related work:** describe as research/prototyping only; never imply a
  diagnosis tool, medical advice, or clinical validation.

## Root-content rules

- Use clear, simple English. Explain the problem, Rahul's role, technical
  choices, and a real constraint or outcome.
- Keep external links opening in new tabs.
- Use public project links and certificate verification links only when they
  exist. Do not invent a demo, repository, client, screenshot, or result.
- Keep the V4 information architecture: Hero → About → Experience & Proof →
  Selected Work → More Projects → Contact → Archive.
- The credentials tab and `/archive/` make evidence and verification links easy
  to find without overwhelming the homepage.

## Build and deployment

The root V4 source requires Node `14.21.3` and Yarn Classic `1.22.22` because
that is the compatible upstream runtime. RahulOS/game retain their modern Node
22 build. The GitHub Actions workflow switches runtimes and uploads `dist/`.

See `README.md` for the exact local command sequence. Do not commit `public/`,
`dist/`, `legacy-os/out/`, or `.game-tour-dist/`.

## Safety rules

1. Preserve both upstream license/attribution paths.
2. Do not commit Web3Forms keys or any other secrets.
3. Do not modify `legacy-os/` or `game-tour/` for root-site requests.
4. Build and inspect all three public routes before publishing.
5. If a future feature needs a public claim that is not evidenced here, ask
   Rahul for the link, screenshot, or permission before adding it.
