# Rahul Rathnavel OS Portfolio — Project Context

Read this file before editing the site. It is the durable handoff record for
future sessions and contributors.

## Non-negotiable product direction

This site is an **actual daedalOS fork/adaptation**, not a custom desktop-like
portfolio. Keep daedalOS's real browser desktop, taskbar, Start menu, File
Explorer, window manager, wallpaper system, virtual filesystem, and interaction
model intact.

Do **not** reintroduce the previous RR Workstation, scrolling landing page,
custom card grid, arcade page, or alternate portfolio shell. The only custom
process added to daedalOS is `GameTour`, which embeds Rahul's existing game.

The visible desktop must contain only Rahul's content:

1. My PC
2. Start Here
3. About Rahul
4. Selected Work
5. Proof & Achievements
6. Rahul-Rathnavel-Resume
7. Contact Rahul
8. RR Game Tour

No Dustin-specific personal shortcuts, no Doom/Quake/Dino shortcut, no generic
editor/chat/AI shortcuts, and no old portfolio UI should be visible.

## Upstream source and legal requirements

- Upstream: `https://github.com/DustinBrett/daedalOS`
- Imported upstream commit: `0df82d75e6114727ad035f6fce93842a96682355`
- License: MIT, copyright Dustin Brett. Keep root `LICENSE` and public
  `LICENSE-daedalOS.txt` intact.
- Public attribution: `public/CREDITS.md`.
- RR Game Tour is a Rahul-specific derivative of
  `brunosimon/folio-2019`; preserve `game-tour/license.md` and
  `game-tour/DERIVATIVE_NOTICE.md`.

The recovery branch `pre-daedalos-replacement` preserves the old custom
workstation only as a rollback record. It must never be merged back into the
live portfolio unless Rahul explicitly asks for it.

## Canonical architecture

```text
pages/index.tsx
  -> daedalOS Desktop + Taskbar + AppsLoader

public/Users/Public/Desktop/*.url
  -> desktop icons
public/Users/Public/Start Menu/*.url
  -> Start menu entries
public/Users/Public/Documents/*
  -> portfolio documents opened by Marked, File Explorer, or PDF

contexts/process/directory.ts
  -> process registry
components/apps/GameTour/
  -> one Rahul-specific iframe process for /game-tour/index.html?mode=guided

game-tour/ source
  -> Vite build
  -> public/game-tour/
  -> daedalOS static export (out/)
  -> GitHub Pages / rahulrathnavel.dev
```

The daedalOS prebuild scripts generate virtual filesystem, shortcut, icon,
search, RSS, and robots indexes. Never hand-edit `public/.index/`; run the
standard build instead.

## Rahul profile facts

- Name: Rahul Rathnavel K
- Public name: Rahul Rathnavel
- Email: `rahulrathnavell5@gmail.com` — verified against the approved public
  resume PDF.
- GitHub: `https://github.com/rahulrathnavel`
- LinkedIn: `https://www.linkedin.com/in/rahulrathnavel/`
- LeetCode: `https://leetcode.com/rahulrathnavel`
- Resume: `public/Users/Public/Documents/Rahul-Rathnavel-Resume.pdf`
- Target roles: AI/ML engineering, data science, and software/product
  engineering.

## Locked public link-preview identity

Do not change this section, the matching metadata, or the preview image unless
Rahul explicitly asks:

- Thumbnail: `public/profile-veshti.jpg`
- Title: `Rahul Rathnavel Portfolio — Aspiring AI/ML Software Engineer`
- Description: `Aspiring AI/ML software engineer who loves learning, building,
  and discussing LLMs — especially where they fail.`

## Verified portfolio claims

Use only the wording supported by Rahul's supplied evidence:

- Amazon ML Challenge 2025, team Cyber Titans: Rank 83 and 45.35 SMAPE final
  submission; Rahul led model development, training, submissions, deployment,
  and AI/backend work with teammates.
- LTTS TECHgium 2026: SmartOps was one of 34 finalist teams selected from
  62,000+ registrations across 540+ institutes. Do not claim Top 7 or winner.
- Merged open-source contributions: Keras #22844, SciPy #25209, Matplotlib
  #31707, and Statsmodels #9812.
- LeetCode supplied evidence: Knight, 816 solved, 2,570 submissions, 351
  active days.
- Freelance/research work remains anonymous and problem-space-only unless Rahul
  explicitly supplies disclosure permission and evidence.

## Visible virtual desktop content

Portfolio documents live in `public/Users/Public/Documents/`:

- `Start Here.md`
- `About Rahul.md`
- `Selected Work/01–07 ... .md`
- `Proof & Achievements/*.md`
- `Private Work/Confidential Work.md`
- `Contact Rahul.md`
- approved resume PDF

Use Markdown for new portfolio content so daedalOS's existing Marked app opens
it inside the authentic OS. Use honest, plain English. External links must open
in a new tab; `mailto:` opens the visitor's email client.

## Game Tour

- Source: `game-tour/`
- Published runtime: `public/game-tour/`
- daedalOS process: `GameTour` in `contexts/process/directory.ts`
- Desktop/Start Menu shortcut: `RR Game Tour.url`
- Guided route: `/game-tour/index.html?mode=guided`

Keep only this game visible. The source has mouse/touch controls, keyboard
controls, reset, muted-by-default sound, and project links back to the portfolio.

## Local build and deployment

```powershell
cd R:\portfolio\site
corepack enable
$env:NODE_OPTIONS='--openssl-legacy-provider'
corepack yarn install --frozen-lockfile

cd game-tour
npm ci
npm run build

cd ..
corepack yarn build
```

The GitHub Pages workflow performs the same sequence and deploys `out/` to
`rahulrathnavel.dev`. It uses `NODE_OPTIONS=--openssl-legacy-provider` because
an upstream BrowserFS build dependency uses legacy OpenSSL hashing.

## Safety rules

1. Preserve the upstream MIT notice and the Game Tour MIT notices.
2. Do not commit Web3Forms keys or other secrets. The previous static form is
   intentionally not part of this exact OS replacement; direct email remains
   available from Contact Rahul.
3. Do not invent achievements, clients, project results, screenshots, or demo
   links.
4. Build after every virtual filesystem change so desktop and Start Menu indexes
   remain correct.
5. Test with cleared site storage/IndexedDB when desktop shortcuts or positions
   appear stale after an update.
