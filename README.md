# Elevation Boxing Academy

Working folder for the Elevation Boxing Academy web presence.

| Folder | What's in it |
|---|---|
| [`site/`](site/) | The draft website. Static HTML, CSS and JS with no build step. See [`site/README.md`](site/README.md) for how to run and edit it. |
| `_working/` | Scratch: the raw Instagram scrape, a contact sheet of every image pulled, and the photos from other accounts that were filtered out. Not tracked in git. |

## Deploying

The Netlify project is connected to this repository, so pushing to `main` builds and
publishes on its own. There is no build step: Netlify serves `site/` as-is, per
`netlify.toml`. Pull requests get their own preview URLs.

Live at https://elevation-boxing-academy.netlify.app

## Status

Still a draft, though it is live at the Netlify address above. The gallery and schedule
pages are built from real data. The About page is scaffolded and waiting on copy. The
site is deliberately not search-indexed yet.

See [`site/README.md`](site/README.md) for the pre-launch checklist.

## Planned

A standalone site for Elevation Boxing Equipment, which makes custom gym equipment.
`site/gear.html` is a placeholder that will point at it. Set `gearUrl` in
`site/data/site-config.js` once that site exists.
