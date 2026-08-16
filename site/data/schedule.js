/* ---------------------------------------------------------------------------
   SCHEDULE + PRICING
   Transcribed from the gym's own Instagram posts dated 12 Aug 2026:
     schedule: instagram.com/p/Db9EaQpyvBZ/  ("New schedule starting 8/17")
     pricing:  instagram.com/p/Db88SFNynDM/  ("Gym pricing")
   Re-verify against the gym before this site goes public.
--------------------------------------------------------------------------- */

window.SCHEDULE = {
  effective: "Effective August 17, 2026",

  // Times are shown exactly as the gym publishes them.
  blocks: [
    {
      days: "Monday – Friday",
      classes: [
        { time: "12:00 PM", level: "All Levels" },
        { time: "4:30 PM",  level: "All Levels" },
        { time: "5:30 PM",  level: "All Levels" },
        { time: "6:30 PM",  level: "Competitive Class", note: "Invite only", competitive: true },
      ],
    },
    {
      days: "Saturday",
      classes: [
        { time: "10:30 AM", level: "All Levels" },
        { time: "11:30 AM", level: "All Levels" },
      ],
    },
    {
      days: "Sunday",
      closed: true,
      classes: [],
    },
  ],
};

window.PRICING = [
  { name: "2× Per Week", price: "$125", unit: "/month", detail: "8 classes per month"  },
  { name: "3× Per Week", price: "$140", unit: "/month", detail: "12 classes per month" },
  { name: "Unlimited",   price: "$155", unit: "/month", detail: "Unlimited classes", featured: true },
  { name: "Day Pass",    price: "$25",  unit: "",       detail: "1 class" },
];
