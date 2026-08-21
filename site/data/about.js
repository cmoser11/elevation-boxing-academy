/* ---------------------------------------------------------------------------
   ABOUT PAGE CONTENT. This is the file to write in.

   Everything here is plain text. Fill in the empty strings and the page picks
   it up on refresh. Anything left empty does not render at all, so the page
   stays presentable while it is half-written.

   The section headings follow the gym's own framing about building people from
   the ground up. Rename or delete any of them freely.
--------------------------------------------------------------------------- */

window.ABOUT = {

  /* One or two sentences at the top of the page. Sets up everything else. */
  lead: "",

  sections: [
    {
      heading: "Who We Are",
      /* Each string is its own paragraph. Add or remove as many as you like. */
      body: [
        "",
      ],
      hint: "How the gym started and who runs it. Worth saying how it differs from a fitness-boxing class.",
    },
    {
      heading: "Who It's For",
      body: [
        "",
      ],
      hint: "Beginners, returning athletes, competitors, kids and teens. Say plainly that there is no wrong starting point.",
    },
    {
      heading: "How We Train",
      body: [
        "",
      ],
      hint: "Fundamentals first, then progression. What a typical class actually involves.",
    },
    {
      heading: "Your First Class",
      body: [
        "",
      ],
      hint: "What to bring, what to wear, whether gloves are provided, how early to turn up. Someone asked exactly this on Instagram and got no reply, so it belongs here.",
    },
  ],

  /* Coaches. Leave the array empty and the section disappears.
     photo: path to a file you drop in assets/img/, e.g. "assets/img/coach-joe.jpg"

     DRAFT BIOS - please check both before publishing. Everything here comes
     from public sources or from you; nothing about their records is invented.
     See _working/coach-bios-draft.md for what is verified and what is not. */
  coaches: [
    {
      name: "Joe Blake",
      role: "Head Coach",
      bio: "Joe runs the floor at Elevation and coaches every level in the room, "
         + "from a first-timer learning stance to fighters getting ready for a card. "
         + "He came up training at Fit NHB in Albuquerque. He has worked with "
         + "professional and amateur fighters across boxing, Muay Thai and MMA.",
      photo: "",
    },
    {
      name: "Amber Brown",
      role: "Coach",
      bio: "Amber fought professionally at atomweight for more than a decade, "
         + "competing for Invicta FC, Legacy Fighting Alliance, King of the Cage and "
         + "Pancrase. In March 2016 she challenged for the Invicta FC atomweight world "
         + "title. She trained at Fit NHB in Albuquerque and has since moved into "
         + "Muay Thai. She coaches all-levels classes and works with the competition team.",
      photo: "",
    },
  ],
};
