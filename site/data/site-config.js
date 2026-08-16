/* ---------------------------------------------------------------------------
   SITE CONFIG. Edit this file to change details across every page at once.
   Anything set to null stays hidden until you fill it in.
--------------------------------------------------------------------------- */

window.SITE = {
  name: "Elevation Boxing Academy",
  shortName: "Elevation",

  // Their own lines, straight off the gym's graphics.
  tagline: "Train. Improve. Elevate.",
  promise: "We will build you from the ground up.",

  address: {
    street: "1601 San Pedro Dr NE",
    city: "Albuquerque",
    state: "NM",
    zip: "87110",
    mapUrl: "https://maps.app.goo.gl/rHKVJ9u1L1oEJhLm7",
  },

  // TODO: fill these in. They stay hidden on the site while null.
  contact: {
    phone: null,   // e.g. "(505) 555-0123"
    email: null,   // e.g. "info@elevationboxingacademy.com"
  },

  social: {
    instagram: {
      handle: "@elevationboxingacademy",
      url: "https://www.instagram.com/elevationboxingacademy/",
    },
    tiktok: {
      handle: "@elevationboxingacademy",
      url: "https://www.tiktok.com/@elevationboxingacademy",
    },
  },

  /* Elevation Boxing Equipment gets its own separate website later.
     Set this to that URL and the Gear nav item and page button will both point
     at it. Leave it null and the page stays a "coming soon". */
  gearUrl: null,

  nav: [
    { label: "Home",     href: "index.html"    },
    { label: "Schedule", href: "schedule.html" },
    { label: "Gallery",  href: "gallery.html"  },
    { label: "About",    href: "about.html"    },
    { label: "Gear",     href: "gear.html"     },
  ],
};
