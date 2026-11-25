#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
REPO_NAME="${1:-emmanuel-portfolio}"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: brew install gh && gh auth login"
  exit 1
fi
gh auth status >/dev/null

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git init -b main
  git add -A
  git commit -m "Initial portfolio site"
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
else
  git push -u origin main
fi

gh api "repos/{owner}/$REPO_NAME/pages" \
  -X POST \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/ 2>/dev/null || true

OWNER="$(gh api user -q .login)"
echo ""
echo "Repository: https://github.com/$OWNER/$REPO_NAME"
echo "GitHub Pages (after first publish, ~1–2 min):"
echo "  https://$OWNER.github.io/$REPO_NAME/"