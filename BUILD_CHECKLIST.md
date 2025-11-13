# Build & Release Checklist

A concise, repeatable checklist to build, verify, and deploy the portfolio to GitHub Pages with a custom domain.

## 1) Prerequisites
- Node.js 18+ installed: `node -v`
- NPM installed: `npm -v`
- Git configured and repository cloned
- DNS for omardev.engineer configured (see DNS_SETUP.md)

## 2) One-time Repo Settings
- GitHub Pages: set source to `gh-pages` branch (handled by workflow or npm deploy)
- Custom domain set to `omardev.engineer` and "Enforce HTTPS" checked (after SSL provisioning)

## 3) Configuration Sanity Checks
- package.json -> "homepage": "https://omardev.engineer"
- vite.config.ts -> base: "/"
- public/CNAME contains exactly: `omardev.engineer`
- public/.nojekyll exists
- public/assets/resume.pdf present (optional until resume is ready)

## 4) Install & Local Dev
```bash
npm install
npm run dev
```
- Confirm app loads at http://localhost:5173

## 5) Quality Gates
- Type check is included in build, but you can also run:
```bash
npm run build
```
- Lint (optional):
```bash
npm run lint
```

## 6) Production Build
```bash
npm run build
```
- Verify output generated in `dist/`
- Optional local preview:
```bash
npm run preview
```

## 7) Deployment Options
- Manual (gh-pages):
```bash
npm run deploy
```
- CI (GitHub Actions): push to `main` triggers `.github/workflows/deploy.yml`

## 8) Post-Deployment Verification
- https://omardev.engineer resolves and loads
- HTTPS active (padlock)
- Navigation, sections, and animations work
- Contact form submits (after EmailJS config)
- Resume downloads from `/assets/resume.pdf`
- No console errors

## 9) Rollback / Recovery
- Revert the last commit and redeploy
- Or re-run a previous successful GitHub Actions deploy

## 10) Notes
- DNS propagation may take up to 48 hours
- SSL provisioning may take up to 24 hours after DNS is set
