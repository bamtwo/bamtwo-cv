#!/usr/bin/env bash
set -euo pipefail

echo "=== Bam Two CV — Project Setup ==="
echo ""

check_command() {
  if ! command -v "$1" &>/dev/null; then
    echo "ERROR: $1 is required but not installed."
    echo "Install it: $2"
    exit 1
  fi
}

check_command pnpm "npm install -g pnpm"
check_command gh "brew install gh && gh auth login"
check_command node "nvm install 22"

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "ERROR: Node.js >= 20 required. Current: $(node -v)"
  exit 1
fi

echo "[1/6] Creating GitHub repository..."
gh repo create bamtwo-cv --private --clone --push 2>/dev/null || {
  echo "NOTE: Repo may already exist. Cloning..."
  gh repo clone bamtwo-cv /tmp/bamtwo-cv-clone 2>/dev/null || true
}

echo "[2/6] Installing dependencies..."
pnpm install

echo "[3/6] Running linter..."
pnpm lint || echo "NOTE: Lint issues found (expected during initial setup)"

echo "[4/6] Type checking..."
pnpm check || echo "NOTE: Type issues found (expected during setup)"

echo "[5/6] Building..."
pnpm build

echo "[6/6] Pushing to main..."
git add -A
git commit -m "Initial commit: Bam Two CV portfolio" || echo "NOTE: Nothing to commit"
git push origin main

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Set up Vercel:"
echo "   vercel link"
echo "   Add secrets to GitHub:"
echo "     - VERCEL_TOKEN  (from https://vercel.com/account/tokens)"
echo "     - VERCEL_ORG_ID  (from vercel link output)"
echo "     - VERCEL_PROJECT_ID (from vercel link output)"
echo ""
echo "2. Enable GitHub Pages in repo settings:"
echo "   Settings → Pages → Source: gh-pages branch"
echo ""
echo "3. Push to trigger deploys:"
echo "   git push origin main"
echo ""
echo "4. View Vercel deployment: https://vercel.com"
echo "   View Pages deployment: https://<username>.github.io/bamtwo-cv"
