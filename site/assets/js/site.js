/* ===========================================================================
   Shared behaviour: header/footer injection, mobile nav, gallery lightbox.
   No build step, no dependencies. Works from file:// as well as a server.
   =========================================================================== */

(function () {
  "use strict";

  var S = window.SITE || {};

  /* ------------------------------------------------------------- icons -- */

  var ICON = {
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="2" y="2" width="20" height="20" rx="5"/>' +
      '<circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>',

    tiktok:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M16.5 2h-3v13.2a2.9 2.9 0 1 1-2.4-2.85V9.3a6 6 0 1 0 5.4 5.97V8.9a7 7 0 0 0 4.1 1.32V7.2A4.15 4.15 0 0 1 16.5 2z"/></svg>',

    /* Crossed gloves inside a ring — a simple stand-in for the real roundel. */
    mark:
      '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
      '<circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="2"/>' +
      '<circle cx="24" cy="24" r="17.5" stroke="currentColor" stroke-width="0.9" opacity="0.55"/>' +
      '<path d="M18.6 15.4c-2.9 0-5 2.2-5 5.1v4.2c0 1 .3 1.7 1 2.4l1.6 1.6v3.6c0 .8.7 1.5 1.5 1.5h5.2c.9 0 1.5-.7 1.5-1.5v-3.6l1.7-1.6c.6-.7 1-1.4 1-2.4v-4.2c0-2.9-2.2-5.1-5.1-5.1z" ' +
      'stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" transform="rotate(-20 24 24)"/>' +
      '<path d="M29.4 15.4c2.9 0 5 2.2 5 5.1v4.2c0 1-.3 1.7-1 2.4l-1.6 1.6v3.6c0 .8-.7 1.5-1.5 1.5h-5.2c-.9 0-1.5-.7-1.5-1.5v-3.6l-1.7-1.6c-.6-.7-1-1.4-1-2.4v-4.2c0-2.9 2.2-5.1 5.1-5.1z" ' +
      'stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" transform="rotate(20 24 24)"/></svg>',

    /* Zia sun — the New Mexico symbol already used in their graphics. */
    zia:
      '<svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">' +
      '<circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="7"/>' +
      '<g>' +
      '<rect x="46.5" y="2"  width="7" height="14"/><rect x="34"   y="2"  width="7" height="14"/><rect x="59"   y="2"  width="7" height="14"/>' +
      '<rect x="46.5" y="84" width="7" height="14"/><rect x="34"   y="84" width="7" height="14"/><rect x="59"   y="84" width="7" height="14"/>' +
      '<rect x="2"  y="46.5" width="14" height="7"/><rect x="2"  y="34"   width="14" height="7"/><rect x="2"  y="59"   width="14" height="7"/>' +
      '<rect x="84" y="46.5" width="14" height="7"/><rect x="84" y="34"   width="14" height="7"/><rect x="84" y="59"   width="14" height="7"/>' +
      '</g></svg>',
  };

  window.ICON = ICON;

  /* --------------------------------------------------------- utilities -- */

  function currentPage() {
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    return file === "" ? "index.html" : file;
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function socialLink(kind, className, withLabel) {
    var s = (S.social || {})[kind];
    if (!s || !s.url) return "";
    var label = kind === "tiktok" ? "TikTok" : "Instagram";
    return (
      '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" ' +
      'class="' + esc(className || "") + '" ' +
      'aria-label="' + esc(label + " — " + s.handle + " (opens in a new tab)") + '">' +
      ICON[kind] + (withLabel ? "<span>" + esc(label) + "</span>" : "") + "</a>"
    );
  }

  /* Gear nav points at the standalone gear site once SITE.gearUrl is set. */
  function navHref(item) {
    if (item.label === "Gear" && S.gearUrl) return S.gearUrl;
    return item.href;
  }

  /* ------------------------------------------------------------ header -- */

  function buildHeader() {
    var here = currentPage();

    var items = (S.nav || []).map(function (item) {
      var href = navHref(item);
      var external = /^https?:/i.test(href);
      var active = !external && item.href.toLowerCase() === here;
      return (
        "<li><a class=\"nav__link\" href=\"" + esc(href) + "\"" +
        (active ? ' aria-current="page"' : "") +
        (external ? ' target="_blank" rel="noopener noreferrer"' : "") +
        ">" + esc(item.label) + "</a></li>"
      );
    }).join("");

    return (
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="site-header">' +
        '<div class="wrap site-header__inner">' +
          '<a class="brand" href="index.html">' +
            '<img class="brand__mark" src="assets/img/logo-mark.png" alt="" width="34" height="34">' +
            '<span class="brand__text"><b>Elevation</b><span>Boxing Academy</span></span>' +
          "</a>" +
          '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">' +
            '<span></span><span class="visually-hidden">Menu</span>' +
          "</button>" +
          '<nav class="nav" id="primary-nav" aria-label="Primary">' +
            '<ul class="nav__list">' + items + "</ul>" +
            '<div class="nav__social">' +
              socialLink("instagram") + socialLink("tiktok") +
            "</div>" +
          "</nav>" +
        "</div>" +
      "</header>"
    );
  }

  /* ------------------------------------------------------------ footer -- */

  function buildFooter() {
    var a = S.address || {};
    var c = S.contact || {};

    var addr = "";
    if (a.street) {
      var oneLine = a.street + ", " + a.city + ", " + a.state + " " + a.zip;
      addr =
        "<address>" +
        (a.mapUrl
          ? '<a href="' + esc(a.mapUrl) + '" target="_blank" rel="noopener noreferrer">' +
            esc(a.street) + "<br>" + esc(a.city + ", " + a.state + " " + a.zip) + "</a>"
          : esc(oneLine)) +
        "</address>";
    }

    var contact = "";
    if (c.phone) contact += '<p><a href="tel:' + esc(c.phone.replace(/[^\d+]/g, "")) + '">' + esc(c.phone) + "</a></p>";
    if (c.email) contact += '<p><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></p>";
    if (!contact) contact = '<p>Message us on Instagram &mdash; phone and email coming soon.</p>';

    var links = (S.nav || []).map(function (item) {
      var href = navHref(item);
      var external = /^https?:/i.test(href);
      return "<li><a href=\"" + esc(href) + "\"" +
        (external ? ' target="_blank" rel="noopener noreferrer"' : "") +
        ">" + esc(item.label) + "</a></li>";
    }).join("");

    return (
      '<footer class="site-footer">' +
        '<div class="wrap">' +
          '<div class="footer-grid">' +
            '<div class="footer-col">' +
              "<h4>" + esc(S.name || "") + "</h4>" +
              "<p>" + esc(S.promise || "") + "</p>" +
              addr +
            "</div>" +
            '<div class="footer-col"><h4>Get in touch</h4>' + contact + "</div>" +
            '<div class="footer-col"><h4>Pages</h4><ul class="footer-links">' + links + "</ul></div>" +
            '<div class="footer-col"><h4>Follow</h4>' +
              '<div class="footer-social">' +
                socialLink("instagram", "", true) + socialLink("tiktok", "", true) +
              "</div>" +
            "</div>" +
          "</div>" +
          '<div class="footer-bottom">' +
            "<span>&copy; " + new Date().getFullYear() + " " + esc(S.name || "") + ". All rights reserved.</span>" +
            "<span>" + esc(S.tagline || "") + "</span>" +
          "</div>" +
        "</div>" +
      "</footer>"
    );
  }

  /* --------------------------------------------------------- mobile nav -- */

  function wireNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.setAttribute("data-open", String(open));
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset state if the viewport grows past the mobile breakpoint.
    var mq = window.matchMedia("(min-width: 861px)");
    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ----------------------------------------------------------- gallery -- */

  function renderGallery(mount, items) {
    if (!mount) return;

    if (!items || !items.length) {
      mount.outerHTML =
        '<div class="gallery-empty"><p><strong>No photos yet.</strong></p>' +
        "<p>Drop image files into <code>assets/img/gallery/</code> and list them in " +
        "<code>data/gallery.js</code> — they'll appear here automatically.</p></div>";
      return;
    }

    mount.innerHTML = items.map(function (item, i) {
      return (
        '<button class="tile" type="button" data-index="' + i + '" ' +
        'aria-label="' + esc("Enlarge photo " + (i + 1) + " of " + items.length) + '">' +
        '<img src="' + esc(item.src) + '" alt="' + esc(item.alt || "") + '" loading="lazy" decoding="async">' +
        "</button>"
      );
    }).join("");

    wireLightbox(mount, items);
  }

  function wireLightbox(mount, items) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Photo viewer");
    box.hidden = true;
    box.innerHTML =
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__btn lightbox__close" type="button" aria-label="Close viewer">&times;</button>' +
      '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous photo">&#8249;</button>' +
      '<button class="lightbox__btn lightbox__next" type="button" aria-label="Next photo">&#8250;</button>' +
      '<p class="lightbox__count" aria-live="polite"></p>';
    document.body.appendChild(box);

    var img = box.querySelector(".lightbox__img");
    var count = box.querySelector(".lightbox__count");
    var index = 0;
    var lastFocus = null;

    function show(i) {
      index = (i + items.length) % items.length;
      img.src = items[index].src;
      img.alt = items[index].alt || "";
      count.textContent = index + 1 + " / " + items.length;
    }

    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.hidden = false;
      document.body.style.overflow = "hidden";
      box.querySelector(".lightbox__close").focus();
    }

    function close() {
      box.hidden = true;
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    mount.addEventListener("click", function (e) {
      var tile = e.target.closest(".tile");
      if (tile) open(Number(tile.getAttribute("data-index")));
    });

    box.querySelector(".lightbox__close").addEventListener("click", close);
    box.querySelector(".lightbox__prev").addEventListener("click", function () { show(index - 1); });
    box.querySelector(".lightbox__next").addEventListener("click", function () { show(index + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });

    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(index - 1);
      else if (e.key === "ArrowRight") show(index + 1);
      else if (e.key === "Tab") {
        // Keep focus inside the dialog.
        var f = box.querySelectorAll("button");
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------------------------------------------------------- schedule -- */

  function renderSchedule(mount, data) {
    if (!mount || !data) return;

    mount.innerHTML = (data.blocks || []).map(function (block) {
      if (block.closed) {
        return (
          '<div class="sched-card sched-card--closed">' +
            '<p class="sched-card__closed">' +
              '<span class="zia" data-zia></span>' + esc(block.days) + " &mdash; Closed" +
              '<span class="zia" data-zia></span>' +
            "</p>" +
          "</div>"
        );
      }

      var rows = (block.classes || []).map(function (cls) {
        return (
          "<tr" + (cls.competitive ? ' data-competitive="true"' : "") + ">" +
            '<td class="t-time">' + esc(cls.time) + "</td>" +
            '<td class="t-level">' + esc(cls.level) +
              (cls.note ? '<span class="t-tag">' + esc(cls.note) + "</span>" : "") +
            "</td>" +
          "</tr>"
        );
      }).join("");

      return (
        '<div class="sched-card">' +
          '<h3 class="sched-card__head">' + esc(block.days) + "</h3>" +
          '<table class="sched-table">' +
            "<caption class=\"visually-hidden\">Class times for " + esc(block.days) + "</caption>" +
            "<tbody>" + rows + "</tbody>" +
          "</table>" +
        "</div>"
      );
    }).join("");
  }

  function renderPricing(mount, plans) {
    if (!mount || !plans) return;

    mount.innerHTML = plans.map(function (p) {
      return (
        '<div class="price-card' + (p.featured ? " price-card--featured" : "") + '">' +
          (p.featured ? '<span class="price-card__flag">Best value</span>' : "") +
          '<h3 class="price-card__name">' + esc(p.name) + "</h3>" +
          '<p class="price-card__amount">' + esc(p.price) +
            (p.unit ? "<span>" + esc(p.unit) + "</span>" : "") +
          "</p>" +
          '<p class="price-card__detail">' + esc(p.detail) + "</p>" +
        "</div>"
      );
    }).join("");
  }

  /* ------------------------------------------------------------- about -- */

  function renderAbout(mount, data) {
    if (!mount || !data) return;

    var html = "";

    if (data.lead) {
      html += '<p class="lead">' + esc(data.lead) + "</p>";
    } else {
      html += '<div class="placeholder"><p><span class="todo">Write this</span></p>' +
        "<p>Opening line for the page — one or two sentences. Edit " +
        "<code>data/about.js</code>.</p></div>";
    }

    (data.sections || []).forEach(function (sec) {
      var paras = (sec.body || []).filter(function (p) { return p && p.trim(); });
      html += "<h2>" + esc(sec.heading || "") + "</h2>";
      if (paras.length) {
        html += paras.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
      } else {
        html += '<div class="placeholder"><p><span class="todo">Write this</span></p>' +
          (sec.hint ? '<p class="placeholder__hint">' + esc(sec.hint) + "</p>" : "") +
          "</div>";
      }
    });

    mount.innerHTML = html;

    var coachMount = document.getElementById("coaches");
    var coaches = (data.coaches || []).filter(function (c) { return c && c.name; });
    if (coachMount) {
      if (!coaches.length) {
        coachMount.closest("section").hidden = true;
      } else {
        coachMount.innerHTML = coaches.map(function (c) {
          return (
            '<article class="coach">' +
              (c.photo ? '<img src="' + esc(c.photo) + '" alt="' + esc(c.name) + '">' : "") +
              '<div class="coach__body">' +
                "<h3>" + esc(c.name) + "</h3>" +
                (c.role ? '<p class="coach__role">' + esc(c.role) + "</p>" : "") +
                (c.bio ? "<p>" + esc(c.bio) + "</p>" : "") +
              "</div>" +
            "</article>"
          );
        }).join("");

        /* A photo path can be filled in before the file is actually added.
           Drop the image rather than showing a broken one. */
        coachMount.querySelectorAll("img").forEach(function (im) {
          im.addEventListener("error", function () { im.remove(); });
        });
      }
    }
  }

  /* -------------------------------------------------------------- init -- */

  function init() {
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");
    if (header) header.outerHTML = buildHeader();
    if (footer) footer.outerHTML = buildFooter();

    wireNav();

    renderSchedule(document.getElementById("schedule"), window.SCHEDULE);
    renderPricing(document.getElementById("pricing"), window.PRICING);
    renderAbout(document.getElementById("about"), window.ABOUT);
    renderGallery(document.getElementById("gallery"), window.GALLERY);

    var strip = document.getElementById("gallery-strip");
    if (strip) renderGallery(strip, (window.GALLERY || []).slice(0, 8));

    // Run last so Zia placeholders injected by the renderers above are filled.
    document.querySelectorAll("[data-zia]").forEach(function (el) { el.innerHTML = ICON.zia; });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
