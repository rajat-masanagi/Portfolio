# Rajat Masanagi — Cinematic Portfolio

A static Next.js portfolio built around the supplied oil-pastel landscape. Newsreader and Inter are bundled locally; the site makes no font-service requests.

## Run locally

Use Node.js 22.13+ LTS (or Node.js 24 LTS).

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run lint
npm run typecheck
npm run build
```

The production site is exported to `out/`. Serve it with any static server; configure the host to serve `404.html` for unknown URLs. No server, database, or environment variables are required. Run `npm start` to preview the exported build at http://127.0.0.1:3000 using the included local static server.

## Edit content

- `lib/content.ts`: featured and additional projects, experience, profiles, education, coursework, skills, achievements, certificates, and publication.
- `app/page.tsx`: homepage layout and introductory copy.
- `app/globals.css`: palette, spacing, typography, and responsive layouts.

The résumé is stored once at `public/Rajat-Masanagi-Resume.pdf`; replace this file and update the site content when the final résumé is ready. Project artwork is explicitly labelled as conceptual diagrams. No invented repository or publication links are included.

## Artwork

`assets/source/landscape.png` is the untouched source landscape. `assets/source/charcoal-pastel.png` was generated with the built-in image-generation tool using the landscape as a reference. Its generation brief:

> Charcoal-black oil-pastel texture continuing the supplied landscape’s darkest lower foreground. Match dense fine painted strokes with extremely faint moss-green and slate-blue undertones. Almost black overall, low contrast, flat even illumination. No landscape horizon, objects, lettering, or focal point. Quiet enough behind ivory text, evenly distributed subtle texture, all four edges matching in color and density for a repeating background. Wide rectangular composition. Do not reproduce the sky or brighter green hills.

Run `node scripts/prepare-assets.mjs` to regenerate optimized WebP assets and JPG social previews from the preserved source artwork. Mirrored texture edges and a top gradient blend the continuation into the hero. The hero photograph alternative describes the supplied painted landscape; decorative project diagrams are hidden from assistive technology because their associated text explains the project.

## Browser checks

With the site running, run:

```sh
npx playwright install chromium
npm run test:ui
```

Optional: `TEST_URL` selects another server; `CHROMIUM_PATH` selects an existing Chromium executable. The checks cover desktop, tablet, mobile, narrow mobile, project-page navigation, missing pages, résumé download, expandable project rows, overflow, console errors, and WCAG A/AA checks via axe. Screenshots are written to ignored `test-results/`.

Before publishing, set `NEXT_PUBLIC_SITE_URL` to the final origin when building so social-image URLs resolve against the public domain. Update the résumé and current role as needed. A GitHub Pages workflow is included; no analytics are configured.

## Adding content and photos

Edit `projects` or `additionalProjects` in `lib/content.ts`. Existing slugs are permanent page URLs. Add `repositoryUrl` only when the exact repository is confirmed; it appears on both the homepage entry and project page. Optional `features` is a list of strings. Optional `setup` is plain text (newlines preserved), used only for verified instructions. Empty sections stay hidden. All projects use the shared project-page template with problem, features, contribution, approach and outcome sections. Project flow diagrams use three short `flow` labels; `repositoryNote` identifies private or restricted source access.

Place photos under `public/images/projects/` or `public/images/experience/`, then add an `images` array to the project or experience entry:

```ts
images: [
  { src: '/images/projects/example.webp', alt: 'Describe what the screenshot shows', caption: 'Explain this screen or moment' },
]
```

Project screenshots replace conceptual art when present. Experience photos appear below the existing text. Galleries support buttons, touch scrolling and an enlarged modal with keyboard focus containment, Escape dismissal and focus restoration. They do not autoplay.

The homepage keeps degree education in About and presents skills in its own section. Certificates use a compact horizontal strip with several previews visible on desktop and swipeable cards on mobile; selecting a preview opens the original-color enlarged viewer.

The `certificates` array contains 31 local previews imported from the supplied Drive folder (PDFs use their first-page preview). Résumés and the semester grade document were excluded. Filenames supply neutral captions; no placement was inferred. Update captions and optionally set `kind: 'Achievement'` or `kind: 'Participation'` after confirming the certificate's context. Files are in `public/images/certificates/`. Reorder the array to change the carousel order. Certificate previews and enlarged views share a 3:2 landscape frame without cropping or stretching. Use `rotation: -90` or `rotation: 90` for sideways scans; genuine portrait certificates remain upright, centered within the landscape frame. Keep `certificateFolderUrl` for access to the original documents; the live carousel does not request Drive. An empty certificate array shows only that link.

Profile URLs, education, coursework, achievement statistics and publication details each have a named export in `lib/content.ts`. No live coding-profile statistics are fetched.

To regenerate social previews without changing the landscape or texture, run `node scripts/prepare-assets.mjs --social-only`. In environments where Turbopack cannot start its workers, build with `npm run build -- --webpack`.

## Repository hygiene

Original artwork lives in `assets/source/` for reproducible asset generation; only optimized site assets live in `public/`. Commit the npm lockfile. Dependencies, build output, browser reports, local environment files, logs and editor caches are ignored. Copy `.env.example` to `.env.local` to set an optional public site URL; never commit credentials.

## Project research notes

Project copy is curated in `lib/content.ts`, not fetched at runtime. Sources reviewed for this update:

- Event Booking: `rajat-masanagi/Event-Booking` README; the current single-host benchmark replaces the older résumé throughput figure.
- Adaptive Quiz: `rajat-masanagi/Gamified_Learning`, selected by the owner; the Datahack result comes from the supplied résumé.
- Crop Recommendation: `rajat-masanagi/Crop-Reccomendation` README, React dependencies and Flask geodata implementation, plus the résumé. Broad README aspirations are not treated as measured outcomes.
- Waste Management: `rajat-masanagi/Waste_Management` README and résumé; the four-truck, thirteen-bin figures describe a demo.
- Healthcare CRM: the owner supplied `rajat-masanagi/Healthcare-CRM`; its README was not publicly accessible, so the copy uses the résumé and labels potential access restrictions.
- No-Code Workflow Generator: the owner supplied its private README. No private repository URL was supplied; show its access status without inventing a link.
- Lunar Navigation: retain the existing overview and detail level at the owner's request. Do not expand its procedure or link the unrelated `Path-Planning` repository.
- Social Media Platform and GitHub Repository Analyzer: project write-ups based on the public `Social-Media` and `GitHub-Repository-Analyzer` READMEs. Preserve the documented consistency, delivery and AI-inference limitations; no invented benchmark results.

Geospatial Tourism and Automatic Ad Optimization have been removed from the homepage, static routes and next-project sequence.

## GitHub Pages

In the repository’s **Settings → Pages**, set **Source** to **GitHub Actions**. The pinned workflow in `.github/workflows/pages.yml` builds on pushes to `main` or manual dispatch, then deploys only `out/`. It reads the site origin and base path from GitHub Pages configuration, so the project site works at `https://rajat-masanagi.github.io/Portfolio/` and a custom domain can use an empty base path. Node.js 22 is used for CI.

To reproduce the project-site build locally:

```sh
NEXT_PUBLIC_BASE_PATH=/Portfolio NEXT_PUBLIC_SITE_URL=https://rajat-masanagi.github.io npm run build -- --webpack
NEXT_PUBLIC_BASE_PATH=/Portfolio npm run check:export
NEXT_PUBLIC_BASE_PATH=/Portfolio PORT=3001 npm start
```

Open `http://127.0.0.1:3001/Portfolio/`. With the server running:

```sh
TEST_URL=http://127.0.0.1:3001/Portfolio npm run test:ui
```

Use `assetPath()` for all new public image/file URLs. Next.js `Link` applies the route prefix itself. The background texture and social images also use the configured prefix. The postbuild step creates `.nojekyll` and records the export's base path for the local preview server. `npm start` reads this build configuration automatically: opening `/` redirects to the correct prefix for a Pages build, while a normal local build stays at `/`. Do not store new content in `out/`; builds replace that directory. The résumé source is `public/Rajat-Masanagi-Resume.pdf`.
