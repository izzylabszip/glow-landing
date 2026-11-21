# Seed notes — glow-landing

Seeded 2026-11-21 from the `landing/` folder of the Glow monorepo
(`izzylabszip/Glow`) at commit `bec029c189a6b87269ad9b676ceb8ff161f56c56`.
All 56 source files were downloaded via the GitHub API and their git blob
SHAs verified against the repo.

The GitHub connector used for the seed can only push UTF-8 text files, so the
following **3 binary files are NOT in this repo yet** and must be added by a
human with git access (the owner or Bishal):

| Path | Size (bytes) |
|---|---|
| `app/apple-icon.png` | 15,601 |
| `app/favicon.ico` | 9,537 |
| `app/icon.png` | 85,396 |

## Exact commands to finish the seed

```bash
git clone https://github.com/izzylabszip/Glow.git glow-mono
git clone https://github.com/izzylabszip/glow-landing.git glow-landing
cd glow-landing
for f in app/apple-icon.png app/favicon.ico app/icon.png; do
  mkdir -p "$(dirname "$f")"
  cp "../glow-mono/landing/$f" "$f"
done
git add -A
git commit -m "Add binary assets (icons) from monorepo landing seed"
git push origin main
```

Until these are added, the dev site builds and runs but the favicon/app icons
will 404.
