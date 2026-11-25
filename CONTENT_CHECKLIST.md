# Content checklist (private — do not publish)

Use this list to resolve facts and assets before the next site update.

## Assets still needed

- [ ] Real project screenshots in `assets/images/projects/` (replace `placeholder.svg` references per project)
- [ ] Résumé PDF at `assets/documents/resume.pdf` (then enable download in `index.html` § Résumé)
- [ ] NYC transportation research poster or figures (if featuring graphics)
- [ ] Sanitized CTL TestDesk UI screenshots only (no student/exam content)

## URLs / configuration

- [ ] Success for Geneva's Children — set live project URL when available
- [ ] Verify Vercel/GitHub Pages base path if deploying to `username.github.io/repo/` (relative paths should work)

## Facts to verify in repositories

- [ ] CTL TestDesk: confirm .NET version, GitHub Actions, and which Beta 4.5 items are released vs planned
- [ ] CTL: confirm SAPI TTS implementation status
- [ ] NYC transport: confirm mean vs median income; Census vintage; ZIP vs ZCTA alignment; analysis tooling (R/Python)
- [ ] NYC transport: confirm presentation venue name if listing publicly
- [ ] SFGC: confirm Goal 9 mapping and current production URL
- [ ] Geneva pipeline: confirm ingestion interval and QA rules against live code
- [ ] BPG Development Incentives Parcel Map (broader scope) — keep separate from Town of Geneva published map unless confirmed same app
- [ ] It Stinks: confirm stack and which admin features are complete

## Link verification

Re-check external links before each deploy:

- Geneva demo: `https://geneva-dashboard-demo-589767316676.us-east1.run.app`
- Town of Geneva GIS page
- itstinks.org
- blueprintgeneva.org