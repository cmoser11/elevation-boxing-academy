# Elevation Boxing Academy — draft website

A static draft site for Elevation Boxing Academy, Albuquerque NM. Plain HTML, CSS and
JavaScript, with no build step and no dependencies.

## Running it

Double-click `index.html`. It works straight off the filesystem.

To serve it properly, which matches how a host will behave:

```bash
cd ~/Desktop/elevation/site && python3 -m http.server 8000
```

Then open http://localhost:8000.

## Editing content

All the text and data live in `data/` as plain JavaScript files. Edit these, refresh the
browser, and you are done. You never need to touch the HTML.

| File | What it controls |
|---|---|
| `data/site-config.js` | Gym name, address, phone, email, social links, nav, gear URL |
| `data/schedule.js` | Class times and membership pricing |
| `data/gallery.js` | Which photos appear in the gallery, and their alt text |
| `data/about.js` | All the About page prose. This is the one to write in. |

Empty values disappear instead of rendering blank, so a half-finished page still looks
presentable.

### Writing the About page

Open `data/about.js` and fill in the empty strings. Each section carries a `hint`
explaining what belongs there. Sections you leave empty show a "Write this" marker on the
page, so nothing unfinished can quietly slip through. Delete or rename sections freely.

Coaches are optional. Add entries to the `coaches` array and the section appears; leave the
array empty and it stays hidden.

### Adding photos

Drop image files into `assets/img/gallery/`, then add a line to `data/gallery.js`:

```js
{ src: "assets/img/gallery/your-photo.jpg", alt: "Short description of the photo" },
```

## Before this goes public

- [ ] Verify the schedule and pricing. Both were transcribed from the gym's Instagram posts
      of 12 Aug 2026, with the schedule effective 8/17. Confirm they are still current.
- [ ] Add phone and email in `data/site-config.js`. They are currently `null`, so the footer
      falls back to "message us on Instagram".
- [ ] Write the About page in `data/about.js`.
- [ ] Replace the photos. See the note below.
- [ ] Answer what a teen needs to get started. Someone asked on Instagram and got no reply.

## About the photos

The 12 images in `assets/img/gallery/` came from the gym's own Instagram grid on 16 Aug
2026. Only posts uploaded by `@elevationboxingacademy` were kept. Tagged and collaborator
posts belonging to other accounts were excluded.

Instagram re-compresses everything it serves, so these are lossy copies. They top out at
1440px and most sit between 640 and 785px, which is thin for a hero image and only adequate
for gallery tiles. Swapping in the original camera files will visibly improve the site.

The logo at `assets/img/logo-mark.png` and the favicon were extracted from the gym's own
logo post and keyed out to sit on the dark background. A clean vector version would be
better if one exists.

## Structure

```
index.html      Home: hero, progression, schedule teaser, gallery strip, TikTok embed
schedule.html   Class times and membership pricing
gallery.html    Photo grid with lightbox
about.html      Reads data/about.js
gear.html       Elevation Boxing Equipment placeholder
assets/css/     One stylesheet
assets/js/      One script: header/footer injection, nav, lightbox, renderers
data/           All editable content
```

`assets/js/site.js` injects the header and footer from a single template, so they cannot
drift apart across pages. Content files assign to `window` instead of being fetched as JSON,
because `fetch()` is blocked on `file://` and the site needs to work when you double-click
it.

## Gear site

`gear.html` is a placeholder. Elevation Boxing Equipment is getting its own separate
website. Once it exists, set `gearUrl` in `data/site-config.js` to that address, and the nav
item and page button will both point at it. Nothing else needs changing.

## Not done yet

Hosting, domain, contact form, class booking, and search-engine setup beyond basic page
titles and descriptions.
