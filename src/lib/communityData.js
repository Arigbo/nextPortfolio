// Community galleries — real photos only. Captions describe what's in the photo;
// add names, talks or roles only when they're accurate (and people are happy to be named).

const devfestPhotos = [
  { file: "IMG-20251122-WA0039.jpg", caption: "Group photo with fellow attendees in front of the DevFest Port Harcourt backdrop." },
  { file: "IMG-20251122-WA0041.jpg", caption: "With a fellow attendee at DevFest Port Harcourt 2025." },
  { file: "IMG-20251122-WA0043.jpg", caption: "With a fellow attendee at DevFest Port Harcourt 2025." },
  { file: "IMG-20251122-WA0045.jpg", caption: "With a fellow attendee at the GDG Cloud Port Harcourt backdrop." },
  { file: "IMG-20251122-WA0047.jpg", caption: "With a fellow attendee at the GDG Cloud Port Harcourt backdrop." },
  { file: "IMG-20251122-WA0052.jpg", caption: "With a fellow attendee at DevFest Port Harcourt 2025." },
  { file: "IMG-20251122-WA0054.jpg", caption: "With a fellow attendee at DevFest Port Harcourt 2025." },
  { file: "IMG-20251122-WA0060.jpg", caption: "With fellow attendees at DevFest Port Harcourt 2025." },
  { file: "IMG-20251122-WA0057.jpg", caption: "At the DevFest Port Harcourt 2025 backdrop." },
  { file: "IMG-20251122-WA0061.jpg", caption: "At the DevFest Port Harcourt 2025 backdrop." },
  { file: "IMG-20251122-WA0063.jpg", caption: "At the DevFest Port Harcourt 2025 backdrop." },
];

export const communityCategories = [
  {
    id: "devfest-port-harcourt-2025",
    title: "DevFest Port Harcourt 2025",
    description: "Photos from DevFest Port Harcourt 2025, the developer festival organised by GDG Cloud Port Harcourt.",
    coverImage: "/IMG-20251122-WA0039.jpg",
    icon: "fa-solid fa-users",
    photos: devfestPhotos.map((p) => ({ url: `/${p.file}`, caption: p.caption, tag: "DevFest 2025" })),
  },
];
