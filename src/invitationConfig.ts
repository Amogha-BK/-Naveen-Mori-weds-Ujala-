export type Celebration = {
  id: "pre-wedding" | "reception" | "wedding";
  shortName: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  schedule: { name: string; time: string }[];
  venue: string;
  address: string;
  supportingLine: string;
  start: string;
  calendarTitle: string;
  image: string;
  scene: "lanterns" | "fire";
  mapUrl: string;
};

export const invitationConfig = {
  secondCouple: {
    groom: "Pardeep Mori",
    bride: "Nisha Suneha",
    monogram: "/assets/joint-wedding-crest-480.jpg",
  },
  couple: {
    first: "Naveen Mori",
    second: "Ujala Suneha",
    firstParents: "Son of Mr. Veer Bhan Mori",
    secondParents: "Daughter of Mrs. Seema Devi & Mr. Rajinder Suneha",
    brideGrandparents: "Granddaughter of Mrs. Shanti Devi & Mr. Babu Ram Suneha",
    groomFamily: "Mori family",
    brideFamily: "Suneha family",
    groomAddress: "3C, Chetanya Wali Gali, Safido Road, Asand",
    brideAddress: "Vill. Lalluwal, Teh. Tohana, Distt. Fatehabad",
  },
  saveTheDate: "02 December 2026",
  celebrationDates: "2 - 4 December 2026",
  dateLabel: "04 December 2026",
  locationLabel: "Assandh, Haryana",
  weddingLabel: "Friday, 04 December 2026 · Assandh, Haryana",
  countdownTarget: "2026-12-04T00:00:00+05:30",
  invocation: "॥ श्री गणेशाय नमः ॥",
  ganeshMantra: ["ॐ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः ।", "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥"],
  openingBlessing:
    "May Lord Vishnu, the bearer of Garuda’s banner and the lotus-eyed Lord, bless this union with happiness and good fortune.",
  programmeBlessing:
    "O Lord Ganesha, of the curved trunk and mighty form, radiant as a million suns, please remove all obstacles from our endeavours, always.",
  memorialLine: "With the blessings of our families",
  invitationLine: "The Mori and Suneha families cordially invite you to celebrate the weddings of Naveen Mori with Ujala Suneha and Pardeep Mori with Nisha Suneha.",
  blessingLine: "Please join us for the celebrations and bless both couples with your gracious presence.",
  hosts: "The Mori & Suneha families",
  monogram: "/assets/joint-wedding-crest-480.jpg",
  artwork: "/assets/naveen-ujala-opening-v2.jpg",
  venue: {
  "name": "Wedding venue · Assandh",
  "address": "Malikpure Bypass Rd, Vishkarmanagar, Assandh, Assandh Ruralpart, Haryana 132039",
  "mapUrl": "https://maps.app.goo.gl/L4aprKSfMCRGbpLd7?g_st=ic"
},
  optional: { travel: "", stay: "", contact: "", musicUrl: "/assets/kudmayi.mp3", whatsappHostNumber: "" },
  celebrations: [
  {
    "id": "pre-wedding",
    "shortName": "Haldi & Mehndi",
    "title": "Haldi & Mehndi — A Joyful Beginning",
    "dateLabel": "02 & 03 December 2026",
    "timeLabel": "",
    "schedule": [
      {
        "name": "Haldi & Mehndi",
        "time": "02 December 2026"
      },
      {
        "name": "Ghudchadi",
        "time": "03 December 2026 · 7:00 p.m."
      }
    ],
    "venue": "Wedding venue · Assandh",
    "address": "Malikpure Bypass Rd, Vishkarmanagar, Assandh, Assandh Ruralpart, Haryana 132039",
    "supportingLine": "Turmeric, henna and a festive Ghudchadi evening with our families.",
    "start": "2026-12-02",
    "calendarTitle": "Naveen & Ujala and Pardeep & Nisha · Haldi & Mehndi",
    "image": "/assets/naveen-ujala-haldi-mehndi-v2.jpg",
    "scene": "lanterns",
    "mapUrl": "https://maps.app.goo.gl/L4aprKSfMCRGbpLd7?g_st=ic"
  },
  {
    "venue": "Wedding venue · Assandh",
    "address": "Malikpure Bypass Rd, Vishkarmanagar, Assandh, Assandh Ruralpart, Haryana 132039",
    "mapUrl": "https://maps.app.goo.gl/L4aprKSfMCRGbpLd7?g_st=ic",
    "id": "reception",
    "shortName": "Lunch & Reception",
    "title": "Reception — An Afternoon of Togetherness",
    "dateLabel": "Thursday, 03 December 2026",
    "timeLabel": "",
    "schedule": [],
    "supportingLine": "A joyful gathering over lunch, love and the blessings of our families.",
    "start": "2026-12-03",
    "calendarTitle": "Naveen & Ujala and Pardeep & Nisha · Lunch & Reception",
    "image": "/assets/kishan-pooja-reception-arch-v3.jpg",
    "scene": "lanterns"
  },
  {
    "id": "wedding",
    "shortName": "The Wedding",
    "title": "Wedding — A Promise of Forever",
    "dateLabel": "Friday, 04 December 2026",
    "timeLabel": "",
    "schedule": [],
    "venue": "Wedding venue · Assandh",
    "address": "Malikpure Bypass Rd, Vishkarmanagar, Assandh, Assandh Ruralpart, Haryana 132039",
    "supportingLine": "Sacred vows, two hearts and a lifetime of togetherness.",
    "start": "2026-12-04",
    "calendarTitle": "Naveen & Ujala and Pardeep & Nisha · Wedding",
    "image": "/assets/naveen-ujala-wedding-v2.jpg",
    "scene": "fire",
    "mapUrl": "https://maps.app.goo.gl/L4aprKSfMCRGbpLd7?g_st=ic"
  }
] satisfies Celebration[],
  calendar: { timezone: "Asia/Kolkata" },
} as const;
