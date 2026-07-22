# Rahul Rathnavel OS Portfolio

This repository is Rahul Rathnavel's portfolio built directly on the
[daedalOS](https://github.com/DustinBrett/daedalOS) desktop environment. The
desktop engine, File Explorer, Start menu, taskbar, window manager, and virtual
filesystem are upstream daedalOS code modified under its MIT License.

The visible desktop contains only Rahul's portfolio content and one game:

- Start Here
- About Rahul
- Selected Work
- Proof & Achievements
- Rahul's public resume
- Contact Rahul
- RR Game Tour

Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) before changing content or
deployment configuration.

## Local development

Requirements: Node.js 22+ and Corepack.

```powershell
cd R:\portfolio\site
corepack enable
$env:NODE_OPTIONS='--openssl-legacy-provider'
corepack yarn install --frozen-lockfile

cd game-tour
npm ci
npm run build

cd ..
corepack yarn dev
```

Open `http://localhost:3000`.

The Game Tour can also be tested directly at:

```text
http://localhost:3000/game-tour/index.html?mode=guided
```

## Content architecture

The visible portfolio is daedalOS's virtual filesystem, not a separate scrolling
site:

```text
public/Users/Public/Desktop/      desktop shortcuts
public/Users/Public/Start Menu/   Start menu shortcuts
public/Users/Public/Documents/    Rahul's portfolio Markdown and resume
public/game-tour/                built optional RR Game Tour
```

After changing virtual desktop files, run `corepack yarn build`. Its prebuild
scripts regenerate the virtual filesystem, shortcut, icon, search, RSS, and
robots indexes.

## Deployment

GitHub Actions builds the Game Tour first, then exports daedalOS into `out/`
for GitHub Pages. `public/CNAME` keeps the custom domain
`rahulrathnavel.dev` attached to the published site.

## License and attribution

The root [LICENSE](./LICENSE) retains the daedalOS MIT notice. Public credit
details are available at `/CREDITS.md`. The RR Game Tour separately retains its
Bruno Simon MIT derivative notices in `game-tour/`.
