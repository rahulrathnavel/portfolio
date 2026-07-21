# Rahul Rathnavel Portfolio - Project Context

## Purpose

Build an exceptional, original personal portfolio for **Rahul Rathnavel K**. It must help non-technical recruiters, AI/product engineering teams, and startups understand both the quality of Rahul's work and the way he thinks.

This is not a template portfolio and must never become generic "AI slop." The intended feeling is: a thoughtful engineering studio made a warm, playful, evidence-led portfolio for a real builder.

## Non-negotiable quality rules

- Start with real work, real evidence, and precise claims. Never invent results, clients, metrics, testimonials, awards, screenshots, or implementation details.
- Avoid stock AI language, generic purple gradients, decorative emojis, fake loading delays, copied layouts, and empty buzzwords.
- The main experience must remain fast, readable, responsive, keyboard-accessible, and useful without interaction, animation, sound, or a powerful device.
- Motion, sound, games, and surprises are optional layers of character. They must not block a recruiter from seeing projects, the resume, or contact details.
- All outbound links open in a new tab with `target="_blank"` and `rel="noreferrer"`. The resume, live demos, and Game Tour also open in a new tab. Main-site navigation stays in the current tab.
- Do not copy proprietary or unlicensed source code, assets, character designs, or claims. The `/game-tour/` experience is an intentional exception: it is a Rahul-specific derivative of the MIT-licensed `brunosimon/folio-2019` project. Its original MIT license and `DERIVATIVE_NOTICE.md` must stay in `game-tour/`.
- Do not publish private source material, raw certificates, unverified reports, credentials, API keys, or contact-service keys.

## Audience and communication strategy

### Recruiters and non-technical visitors

They need a clear answer in under a minute: who Rahul is, what he builds, why the work is credible, how to see the resume, and how to contact him.

### Engineers and AI/product teams

They need evidence: architecture choices, live demos, code, deployed systems, competition results, open-source pull requests, constraints, and trade-offs.

### Tone

Clear English first, warm and human, slightly playful, never childish. Tamil mode should use friendly conversational Tamil mixed naturally with familiar English technical words, not formal literary Tamil.

## Approved experience model

One authored site, not multiple duplicate templates:

1. **RR Workstation** - the primary experience at `/`: a focused desktop-style portfolio with a Start Here brief, work, proof, resume, contact, settings, and an optional Game Tour launcher.
2. **Compact Workstation** - the same evidence and contact path, purpose-designed for touch devices and narrower screens rather than shrinking desktop windows.
3. **Game Tour** - an optional 3D driving experience in a new tab at `/game-tour/`. It is a playful route into the work, never a prerequisite for understanding it.

### Core visual idea

Use an original "RR Workstation" visual language for the main site: a considered desktop surface, clear window hierarchy, Start menu, taskbar, evidence-led app windows, technical diagrams, and an interactive portrait. It borrows the *desktop interaction pattern* from the MIT-licensed daedalOS project without copying its operating-system source, virtual filesystem, emulator suite, or unnecessary app bloat. The separate Game Tour may retain its MIT-licensed driving-world interaction, but must always present Rahul's own details and retain attribution.

## RR Workstation architecture

- `src/components/workstation/DesktopShell.tsx` owns desktop-window state, app launch/focus/minimize/close behavior, Start menu, taskbar, keyboard shortcuts, and the compact-layout fallback.
- `src/components/workstation/PortfolioApps.tsx` renders the factual portfolio applications. It must not independently invent data.
- `src/config/portfolioData.ts` is the central public claims/links source. Update facts there first, then let every view consume the same record.
- `src/config/portraitModels.ts` is the only path map for the two user-supplied GLB portraits. To replace an avatar, copy a new `.glb` to `public/assets/models/` and change only the matching `src` value in that file.
- `game-tour/` is its own Vite/Three.js source project. `npm run build` writes its deployable static runtime to `public/game-tour/`, which the parent Next.js static export carries to GitHub Pages.
- `public/CREDITS.md` documents third-party inspiration and license obligations. Keep it visible from Control Center.

### Approved personality details

- Short RR hexagon loader, only while the app actually initializes. It must be skippable / not artificially prolonged.
- An interactive portrait reacts subtly to pointer movement. It is a stylized static GLB camera-parallax effect, not a claim of facial animation or a photogrammetric 3D scan.
- Rahul's three sidekick images may appear only when useful: a presenter for discoveries, a "think" reaction for deliberate playful interactions, and a thumbs-up for successful completion.
- A small, clearly optional easter egg can react when a visitor clicks an intentionally non-functional control. It must be non-blocking and respect reduced-motion preferences.
- Sound is muted by default. It may only play after an explicit visitor action. Include a visible mute control in interactive experiences.
- In Tamil mode, use friendly conversational Tamil mixed naturally with familiar English technical words. The welcome greeting can double-tap into the more playful `வணக்கம் da மாப்ள!` state; it must remain a small optional detail, not a recruiter obstacle.
- A long idle period may create a night-mode change only inside Take a Tour, never while someone is reading the main portfolio.

## Confirmed professional positioning

Working position: **Applied AI/ML engineer and data-driven product builder.**

Target roles:

- AI/ML engineer
- Data scientist
- Software developer / product engineer

Target employers:

- Product-focused AI companies
- Startups
- Product-based MNC engineering teams

## Public resume rule

- The only public downloadable/viewable resume is `RAHUL_RATHNAVEL_RESUME.pdf`.
- `FULL_Resume.pdf` is internal research only and must not be exposed by the website.
- Public deployed filename: `public/resume/Rahul-Rathnavel-Resume.pdf`.

## Confirmed proof and facts

### Amazon ML Challenge 2025

- Team: **Cyber Titans**.
- Final rank: **83**.
- Final SMAPE: **45.35**.
- Public framing: team competition; Rahul led the AI/backend work, including model development, training, submissions, deployment, and cloud operations.
- Story arc: rank 900 -> 83 -> 190 -> 83. Show it as iteration and resilience, not only a leaderboard badge.
- Technical material supplied: DeBERTa-v3-base, hybrid mean-max-CLS pooling, Log-MAE loss, IQR outlier clipping, and price-prediction experimentation.

### TECHgium 2026 - SmartOps AI

- Team name: **Brothers of Creations**.
- Accurate primary headline: **National Finalist - one of 34 finalist teams selected from 62,000+ registrations across 540+ engineering institutes.**
- A secondary `Top 1%` label may be used, but the exact finalist wording is stronger and preferred.
- Project: AI-powered autonomous incident-resolution prototype for cloud infrastructure.
- Core flow: Observe -> Diagnose -> Resolve -> Human-in-the-loop review -> Rebase / iterate.
- Reported platform elements: spatio-temporal GNN root-cause analysis, Qwen LLM diagnostics/remediation, EKS/Terraform, Prometheus, CloudWatch, React, D3, Docker/Kubernetes.
- Rahul's stated role: led AI/backend work, models, training, AWS/Azure deployment, and operational implementation; credit teammates in the case study.

### Smart Glass Assistant

- Include as a flagship accessibility / Edge AI project.
- Evidence available: physical ESP32-CAM smart-glass prototype and Flutter Android UI images for object detection, OCR, and face registration/recognition.
- High-level public story: offline, privacy-conscious assistive system that combines wearable visual input with a mobile application.
- Do not publish the project report itself. It contains unresolved hardware placeholders and requires factual cleanup before making specific hardware or performance claims.
- The portfolio must credit named collaborators/paper coauthors where appropriate, while describing Rahul's actual ownership precisely.

### Open source

- Merged pull requests in Keras, SciPy, Matplotlib, and Statsmodels are a major technical differentiator.
- Use a concise evidence-led section, linking to the actual merged PRs when the final URLs are verified.
- Supplied screenshots include Keras #22844, SciPy #25209, Matplotlib #31707, and Statsmodels #9812.

### LeetCode

- Current supplied screenshot evidence: 816 solved, Knight level, contest rating 2053, 2,570 submissions in the past year, 351 active days, and a 199-day maximum streak.
- Use it as a discipline/proof detail, not the primary hero message.

### Product projects

- **Omni RAG**: multimodal RAG with hybrid dense/sparse retrieval and visual PDF evidence. Live demo: `https://huggingface.co/spaces/RathnavelRahul/omni`.
- **Voice Surrogate**: offline Android accessibility app for non-speaking individuals, with on-device bilingual smart replies and TTS. APK/repository available.
- **Raki**: native Kotlin / Jetpack Compose chat app with Firebase, MVVM, and real-time messaging. APK is secondary; a future short demo video is preferred.
- **Blockchain Biometric Voting**: present clearly as a research/prototype system, not as production-secure software. It combines a Next.js app, Solidity, biometric verification, Flask, and Arduino hardware.

### Anonymous client / freelance work

Potential work to include, subject to honest framing and available proof:

1. Blockchain biometric voting system.
2. Fake-job prediction and recommendation platform.
3. Breast-cancer prediction and nearby-care guidance tool.
4. Agricultural IoT mobile monitoring application for a national hackathon-winning team.
5. Privacy-preserving smart-grid ML work associated with a published paper / best-paper recognition.

Do not use puzzle-like clues that make a client or college searchable. Use anonymous sector/location descriptions unless explicit disclosure permission is later provided.

## Assets supplied outside this repository

The raw asset archive lives in `R:\portfolio`. The website repository is `R:\portfolio\site`.

Public website copies currently selected:

- `public/assets/portraits/rahul-presents.png`
- `public/assets/portraits/rahul-approved.jpeg`
- `public/assets/portraits/rahul-think.jpeg`
- `public/assets/portraits/rahul-formal.jpeg`
- `public/assets/proof/amazon-rank-83.jpg`
- `public/assets/proof/techgium-finals.jpg`
- `public/assets/proof/techgium-credentials.jpg`
- `public/assets/proof/leetcode-profile.png`
- `public/assets/proof/leetcode-heatmap.png`
- selected open-source PR screenshots
- Smart Glass hardware and UI screenshots
- public recruiter resume PDF

Do not commit raw certificates, the full resume, temporary PDF renderings, the Smart Glass report PDF, or unrelated private/archive files unless a deliberate public-use decision is made.

## Portrait direction

- The main site uses Rahul-supplied, stylized Meshy GLB avatars as interactive 3D viewers: the blue-wall selfie in the hero and the two-thumbs-up pose in Contact. Treat them as personal illustrations/avatars, never as a claim of photogrammetric accuracy.
- A 60-second head-rotation video is available at `R:\portfolio\selfie video of rotating my head closeup left right up down 60 seconds.mp4`. It may inform future motion/reference work, but it does not justify claiming that a portrait is a genuine 3D scan.
- The model viewers must remain an optional enhancement: keyboard-readable copy, the contact form, and no-WebGL fallback messaging must stay usable.
- To replace either avatar later, copy the new `.glb` into `public/assets/models/` and change only the matching `src` in `src/config/portraitModels.ts`.
- `ModelPortrait.tsx` gives the avatars a subtle cursor-follow camera parallax. It is not a claim that the static GLBs contain eye or head animation; keep the effect restrained and honor `prefers-reduced-motion`.

## Technical decisions

- Framework: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4.
- Interaction support: React RND for carefully bounded desktop windows, Lucide icons, and `@google/model-viewer` for the two user-requested GLB portraits (lazy on the recruiter path). Do not add new 3D scenes to the main recruiter path without an explicit request.
- Deployment target: GitHub Pages static export, custom domain `rahulrathnavel.dev`.
- Add `public/CNAME` containing `rahulrathnavel.dev` for GitHub Pages.
- Use a GitHub Actions workflow to build and deploy the static export.
- Keep the code repository at `https://github.com/rahulrathnavel/portfolio`.
- Keep optional interactive content in separate routes such as `/game-tour/`; open them from the main site in new tabs. The verified static runtime output in `public/game-tour/` is versioned with the site because GitHub Pages publishes a static export. After changing `game-tour/`, run `npm ci` and `npm run build` there locally, then commit the refreshed `public/game-tour/` output before deploying.

## Contact form and privacy

- Provide a visible `mailto:` contact action as a dependable fallback.
- Provide a normal name/email/message feedback form using Web3Forms.
- The Web3Forms access key supplied by Rahul must **not** be written in this document, committed to Git, repeated in messages, or placed in a public source file.
- Configure it through `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` locally and as a GitHub repository Actions secret for builds. Important: because GitHub Pages is static, any browser-based form service key is ultimately visible in the built client; this is expected for Web3Forms access keys, but it is not a private server secret.
- The GitHub Actions secret `WEB3FORMS_ACCESS_KEY` was configured on 2026-07-18 without committing the value.
- Do not send a fake automated enquiry as a test. After deployment, submit one genuine message from the live site to confirm the Web3Forms account's current domain policy and delivery behavior.

## Current build status

- [x] Reviewed resumes, certificates, achievements, project readmes, screenshots, event material, and reference sites.
- [x] Created and cloned the empty public GitHub repository into `R:\portfolio\site`.
- [x] Scaffolded a Next.js 16, React 19, TypeScript, Tailwind application.
- [x] Selected safe public assets and copied them into the application.
- [x] Installed Motion and Lucide icon dependencies.
- [x] Replaced the prior scrolling portfolio, Take a Tour route, and RR Arcade route with the RR Workstation primary experience.
- [x] Built recruiter-first Start Here, Work, Proof, Resume, Contact, Control Center, and optional Game Tour applications from one factual content source.
- [x] Built the responsive compact Workstation for touch/narrow displays instead of forcing desktop windows onto small screens.
- [x] Built project stories, proof gallery, private-work framing, and the new-tab external-link policy.
- [x] Added GitHub Pages static-export configuration, CNAME, and deployment workflow.
- [x] Added the Web3Forms GitHub Actions secret without committing it.
- [x] Tested desktop and mobile layouts, key interactions, guided Game Tour controls, lint, and production build locally.
- [x] Pushed the first release, created the GitHub Pages site in workflow mode, and verified `https://rahulrathnavel.dev` with HTTPS enforced.
- [x] Integrated the Rahul-specific `/game-tour/` MIT derivative and connected it as the optional RR Game Tour application.
- [x] Added a visible mouse/touch drive pad, reset control, guided mode, muted-by-default sound, calmer physics, and desktop deep links to the Game Tour source.
- [ ] Verify and deploy the RR Workstation replacement after final desktop/mobile/Game Tour QA.
- [ ] Submit one genuine live enquiry after launch to verify Web3Forms delivery; do not use an automated fake contact submission.

## Handoff instructions for future contributors / sessions

1. Read this file before changing scope, copy, project facts, interaction rules, or deployment configuration.
2. Inspect the existing code and Git status before editing. Preserve user changes.
3. Keep the main site professional and evidence-led. The Workstation stays the complete recruiter path; experimental interactions belong in optional routes/apps.
4. Ask Rahul at the moment real evidence, an exact fact, a demo video, a client-disclosure decision, or a secret is needed. Do not fill gaps with AI-generated content.
5. Verify every factual claim against Rahul's supplied evidence before publishing.
6. Never commit secrets, raw private resources, or third-party source code.
