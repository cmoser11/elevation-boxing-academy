# Elevation Boxing Academy — draft website

A static draft site for Elevation Boxing Academy, Albuquerque NM. Plain HTML, CSS and
JavaScript: no build step, no dependencies, no framework.

## Running it

Double-click `index.html` — it works straight off the filesystem.

To serve it properly (recommended, matches how a host will behave):

```bash
cd ~/Desktop/elevation/site && python3 -m http.server 8000
```

Then open http://localhost:8000.

## Editing content

All the text and data live in `data/` as plain JavaScript files. Edit these, refresh the
browser, done — you never need to touch the HTML.

| File | What it controls |
|---|---|
| `data/site-config.js` | Gym name, address, phone, email, social links, nav, gear URL |
| `data/schedule.js` | Class times and membership pricing |
| `data/gallery.js` | Which photos appear in the gallery, and their alt text |
| `data/about.js` | **All the About page prose — this is the one to write in** |

Empty values disappear rather than rendering blank, so a half-finished page still looks
presentable.

### Writing the About page

Open `data/about.js` and fill in the empty strings. Each section has a `hint` explaining
what belongs there. Sections you leave empty show a "Write this" marker on the page, so
nothing unfinished can quietly slip through. Delete or rename sections freely.

Coaches are optional — add entries to the `coaches` array and the section appears; leave it
empty and it stays hidden.

### Adding photos

Drop image files into `assets/img/gallery/`, then add a line to `data/gallery.js`:

```js
{ src: "assets/img/gallery/your-photo.jpg", alt: "Short description of the photo" },
```

## Before this goes public — please check

- [ ] **Verify the schedule and pricing.** Both were transcribed from the gym's Instagram
      posts of 12 Aug 2026 (schedule effective 8/17). Confirm they are still current.
- [ ] **Add phone and email** in `data/site-config.js` — they are `null`, so the footer
      currently says "message us on Instagram" instead.
- [ ] **Write the About page** in `data/about.js`.
- [ ] **Replace the photos.** See the note below.
- [ ] Answer "what does a teen need to get started" somewhere — someone asked on Instagram
      and it went unanswered.

## About the photos

The 12 images in `assets/img/gallery/` were pulled from the gym's own Instagram grid on
16 Aug 2026. Only posts uploaded by `@elevationboxingacademy` were kept — tagged and
collaborator posts belonging to other accounts were excluded.

**These are Instagram's re-compressed copies, not originals.** They top out at 1440px and
most are 640–785px, which is thin for a hero image and merely adequate for gallery tiles.
Replacing them with the original camera files will visibly improve the site, and it is the
single highest-impact change available.

The logo (`assets/img/logo-mark.png`) and favicon were extracted from the gym's own logo
post and keyed out to sit on the dark background. A clean vector version would be better if
one exists.

## Structure

```
index.html      Home — hero, progression, schedule teaser, gallery strip, TikTok embed
schedule.html   Class times + membership pricing
gallery.html    Photo grid with lightbox
about.html      Reads data/about.js
gear.html       Elevation Boxing Equipment placeholder
assets/css/     One stylesheet
assets/js/      One script: header/footer injection, nav, lightbox, renderers
data/           All editable content
```

The header and footer are injected by `assets/js/site.js` from a single template, so they
cannot drift apart across pages. Content files assign to `window` rather than being fetched
as JSON, because `fetch()` is blocked on `file://` and the site needs to work by
double-clicking.

## Gear site

`gear.html` is a placeholder. Elevation Boxing Equipment is getting its own separate
website. When it exists, set `gearUrl` in `data/site-config.js` to that address — the nav
item and page CTA will point at it automatically. Nothing else needs changing.

## Not done yet

Hosting, domain, contact form, class booking, and search-engine setup beyond basic page
titles and descriptions.
