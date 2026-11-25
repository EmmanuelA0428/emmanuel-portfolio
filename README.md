# Emmanuel Appiah — Portfolio (static site)

Plain HTML, CSS, and vanilla JavaScript. Designed for [GitHub Pages](https://pages.github.com/) (no build step).

## Local development

From this directory:

```bash
# Python 3
python3 -m http.server 8080

# Or Node (if installed)
npx --yes serve -p 8080
```

Open [http://localhost:8080](http://localhost:8080).

## Deploy to GitHub Pages

1. Create a GitHub repository and push this folder.
2. **User site** (`username.github.io`): push contents to the repo root; Pages serves `/`.
3. **Project site** (`username.github.io/repo-name/`): same push; enable Pages from the `main` branch root. Internal links use relative paths (`css/`, `js/`, `assets/`) so they work under a subpath.
4. Ensure `.nojekyll` is present (included) so GitHub does not run Jekyll.

Optional: Settings → Pages → custom domain.

## Project structure

```
index.html              # All sections and project copy (no JS fetch for content)
css/styles.css
js/main.js              # Mobile nav + footer year only
assets/images/projects/ # Screenshots and diagrams
assets/documents/       # Add resume.pdf when ready
CONTENT_CHECKLIST.md    # Private editorial/verification list (do not link from site)
```

## Adding a project

1. Add a screenshot to `assets/images/projects/`.
2. Copy a `project-card` block in `index.html` (featured or compact grid).
3. Use `<details class="case-study">` for long-form write-ups.
4. Omit live/source links until URLs exist (never use `href="#"`).

## Résumé download

When `assets/documents/resume.pdf` exists, uncomment the download link in the Résumé section of `index.html`.