/* ---------------------------------------------------------------------------
   ABOUT PAGE CONTENT — this is the file to write in.

   Everything here is plain text. Fill in the empty strings and the page picks
   it up on refresh. Anything left empty simply does not render, so the page
   stays presentable while it is half-written.

   Sections are pre-headed around the gym's own framing — build you from the
   ground up — but rename or delete any of them freely.
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
      hint: "How the gym started, who runs it, what makes it different from a fitness-boxing class.",
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
      hint: "What to bring, what to wear, whether gloves are provided, how early to turn up. Someone asked exactly this on Instagram and nobody answered — worth covering here.",
    },
  ],

  /* Optional. Leave the array empty and the coaches section disappears.
     photo: path to a file you drop in assets/img/, e.g. "assets/img/coach-joe.jpg" */
  coaches: [
    // { name: "", role: "Head Coach", bio: "", photo: "" },
  ],
};
