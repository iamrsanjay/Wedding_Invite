// ============================================================
//  INVITATION DATA — Central Source of Truth for Harshavardhini & Rajagopal
//  Bilingual: English & Tamil (தமிழ்)
// ============================================================

export type Language = 'en' | 'ta';

export interface FamilyMemberItem {
  name: string;
  relation: string;
}

export interface FamilyGroupData {
  title: string;
  father: FamilyMemberItem;
  mother: FamilyMemberItem;
  sisters?: FamilyMemberItem[];
  brother?: FamilyMemberItem[];
  grandparents?: FamilyMemberItem[];
  contacts?: { name: string; phone?: string }[];
}

export interface CeremonyTimelineItem {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export const invitation = {
  // ── Event Information ─────────────────────────────────────
  event: {
    type: {
      en: "Engagement Ceremony",
      ta: "நிச்சயதார்த்த சுபமுகூர்த்த வைபவம்",
    },
    nameTamilStyle: {
      en: "Nichayathartham",
      ta: "நிச்சயதார்த்தம்",
    },
    date: {
      en: "29 November 2026",
      ta: "29 நவம்பர் 2026",
    },
    dateNumeric: "2026-11-29",
    day: {
      en: "Sunday",
      ta: "ஞாயிற்றுக்கிழமை",
    },
    startTime: {
      en: "10:30 AM",
      ta: "காலை 10:30 மணி",
    },
    endTime: {
      en: "12:00 PM",
      ta: "பிற்பகல் 12:00 மணி",
    },
    timeRange: {
      en: "10:30 AM – 12:00 PM",
      ta: "காலை 10:30 – 12:00 மணி",
    },
    displayDate: "29 • 11 • 2026",
    subheading: {
      en: "A Sacred Union of Two Hearts & Families",
      ta: "இரு மனங்களின் புனித சங்கமம் • இரு குடும்பங்களின் நல் இணைப்பு",
    },
  },

  // ── Bride (Ponnu - First) ───────────────────────────────────
  bride: {
    prefix: {
      en: "Sow.",
      ta: "செல்வி.",
    },
    name: {
      en: "E. Harshavardhini",
      ta: "E. ஹர்ஷவர்தினி",
    },
    alias: {
      en: "Renukadevi",
      ta: "ரேணுகாதேவி",
    },
    qualification: "M.Com.",
    shortName: {
      en: "Harshavardhini",
      ta: "ஹர்ஷவர்தினி",
    },
    initial: "E.",
    fullDisplay: {
      en: "E. HARSHAVARDHINI",
      ta: "E. ஹர்ஷவர்தினி",
    },
    title: {
      en: "Bride",
      ta: "மணமகள்",
    },
  },

  // ── Groom (Paiyan - Second) ─────────────────────────────────
  groom: {
    prefix: {
      en: "Chi.",
      ta: "செல்வன்.",
    },
    name: {
      en: "C. Rajagopal",
      ta: "C. ராஜகோபால்",
    },
    qualification: "M.C.A.",
    company: {
      en: "Agilysys Technologies India Pvt Ltd",
      ta: "அஜிலிசிஸ் டெக்னாலஜிஸ் இந்தியா",
    },
    designation: {
      en: "Quality Analyst",
      ta: "தரப் பரிசோதகர்",
    },
    shortName: {
      en: "Rajagopal",
      ta: "ராஜகோபால்",
    },
    initial: "C.",
    fullDisplay: {
      en: "C. RAJAGOPAL",
      ta: "C. ராஜகோபால்",
    },
    title: {
      en: "Groom",
      ta: "மணமகன்",
    },
  },

  // ── Venue ─────────────────────────────────────────────────
  venue: {
    name: {
      en: "RKS Mahal",
      ta: "RKS மஹால்",
    },
    hall: {
      en: "A/C Thirumana Mandapam",
      ta: "A/C திருமண மண்டபம்",
    },
    address: {
      en: "No. 164, Avadi - Poonamallee High Road",
      ta: "எண். 164, ஆவடி - பூந்தமல்லி நெடுஞ்சாலை",
    },
    city: {
      en: "Avadi, Chennai",
      ta: "ஆவடி, சென்னை",
    },
    district: {
      en: "Tiruvallur Dist.",
      ta: "திருவள்ளூர் மாவட்டம்",
    },
    state: {
      en: "Tamil Nadu",
      ta: "தமிழ்நாடு",
    },
    pincode: "600 054",
    landmark: {
      en: "Avadi - Poonamallee Highway",
      ta: "ஆவடி - பூந்தமல்லி நெடுஞ்சாலை",
    },
    fullAddress: {
      en: "RKS Mahal, No. 164, Avadi - Poonamallee High Road, Avadi, Chennai - 600 054",
      ta: "RKS மஹால் A/C திருமண மண்டபம், எண் 164, ஆவடி - பூந்தமல்லி நெடுஞ்சாலை, ஆவடி, சென்னை - 600 054",
    },
    googleMapsUrl: "https://maps.app.goo.gl/hCNBcuHMvvLTWwZu6?g_st=ac",
  },

  // ── Bride's Family (Ponnu Veedu - First) ───────────────────
  bridesFamily: {
    en: {
      title: "Bride's Family",
      father: {
        name: "Thiru. R. Ethiraj (alias Raja)",
        relation: "Father",
      },
      mother: {
        name: "Thirumathi. E. Sankari (alias Sasikala)",
        relation: "Mother",
      },
      grandparents: [
        { name: "Thiru. R. Ramadoss", relation: "Grandfather" },
        { name: "Thirumathi. R. Kasthuri", relation: "Grandmother" },
      ],
      brother: [
        { name: "Saravana Kumar E", relation: "Brother" },
      ],
      contacts: [],
    } as FamilyGroupData,
    ta: {
      title: "மணமகள் இல்லத்தார்",
      father: {
        name: "திரு. R. எத்திராஜ் (எ) ராஜா",
        relation: "தந்தை",
      },
      mother: {
        name: "திருமதி. E. சங்கரி (எ) சசிகலா",
        relation: "தாய்",
      },
      grandparents: [
        { name: "திரு. R. ராமதாஸ்", relation: "தாத்தா" },
        { name: "திருமதி. R. கஸ்தூரி", relation: "பாட்டி" },
      ],
      brother: [
        { name: "சரவண குமார் E", relation: "சகோதரர்" },
      ],
      contacts: [],
    } as FamilyGroupData,
  },

  // ── Groom's Family (Paiyan Veedu - Second) ──────────────────
  groomsFamily: {
    en: {
      title: "Groom's Family",
      father: {
        name: "Thiru. G. Chengalvarayan",
        relation: "Father",
      },
      mother: {
        name: "Thirumathi. C. Tamil Selvi",
        relation: "Mother",
      },
      sisters: [
        { name: "Vishnupriya C", relation: "Sister" },
        { name: "Sandhiya C", relation: "Sister" },
      ],
      contacts: [],
    } as FamilyGroupData,
    ta: {
      title: "மணமகன் இல்லத்தார்",
      father: {
        name: "திரு. G. செங்கல்வராயன்",
        relation: "தந்தை",
      },
      mother: {
        name: "திருமதி. C. தமிழ்செல்வி",
        relation: "தாய்",
      },
      sisters: [
        { name: "விஷ்ணுபிரியா C", relation: "சகோதரி" },
        { name: "சந்தியா C", relation: "சகோதரி" },
      ],
      contacts: [],
    } as FamilyGroupData,
  },

  // ── Timeline / Ceremony Rituals ────────────────────────────
  timeline: {
    en: [
      {
        time: "10:30 AM",
        title: "Ceremony Begins & Sankalpam",
        description: "Commencement with sacred Vedic chants, Ganapathi Pooja, traditional ceremonial rituals and elder blessings.",
        icon: "🪔",
      },
      {
        time: "11:00 AM",
        title: "Exchange of Rings (Nichayam)",
        description: "The auspicious ring exchange ceremony with sacred prayers, flower shower and heartfelt family blessings.",
        icon: "💍",
      },
      {
        time: "12:00 PM",
        title: "Auspicious Feast (Virundhu)",
        description: "Conclusion of sacred rites followed by a joyous celebration, photography, and traditional festive lunch.",
        icon: "✨",
      },
    ] as CeremonyTimelineItem[],
    ta: [
      {
        time: "காலை 10:30",
        title: "மங்கள சடங்குகள் & சங்கல்பம்",
        description: "வேத மந்திரங்கள் முழங்க, கணபதி பூஜையுடன் சுபமுகூர்த்த நிச்சயதார்த்த சடங்குகள் மற்றும் பெரியோர்களின் ஆசீர்வாதத்துடன் தொடக்கம்.",
        icon: "🪔",
      },
      {
        time: "காலை 11:00",
        title: "மோதிரம் மாற்றுதல் & நிச்சயம்",
        description: "சுபவேளையில் மங்கள வாத்தியங்கள் இசைக்க மணமக்கள் மோதிரம் மாற்றி, மலர் தூவி பெரியோர்களின் ஆசீர்வாதம் பெறுதல்.",
        icon: "💍",
      },
      {
        time: "மதியம் 12:00",
        title: "அறுசுவை விருந்து & நல்வாழ்த்து",
        description: "சடங்குகள் இனிதே நிறைவடைந்து, சுற்றமும் நட்பும் சூழ அறுசுவை பாரம்பரிய மதிய உணவு உபசரிப்பு.",
        icon: "✨",
      },
    ] as CeremonyTimelineItem[],
  },

  // ── Invitation Texts ─────────────────────────────────────────
  texts: {
    en: {
      divineHeader: "Om Sri Ganeshayanamaha",
      openingBlessing: "With the divine grace of the Almighty & the heartfelt blessings of our elders",
      invitationLead: "We cordially invite you and your family to grace the auspicious occasion of the",
      invitationBody: `We cordially invite you and your family to grace the auspicious occasion of the Engagement Ceremony (Nichayathartham) uniting our beloved children.

Your esteemed presence, heartfelt prayers and affectionate blessings will make this day truly memorable and auspicious as we embark on this sacred journey of eternal love and togetherness.`,
      closingBlessing: "Your gracious presence and affectionate blessings are our greatest treasure.",
      familyTitle: "With Heartfelt Regards & Best Compliments From Both Families",
      countdownTitle: "Counting Down to the Sacred Muhurtham",
      openSealText: "OPEN INVITATION",
      openSealSub: "Touch to enter",
      tapHere: "Tap Here to Open",
      quote: "Two souls, one sacred journey. A divine bond blessed by the Almighty and our beloved families.",
      showerFlowers: "Shower Flowers on Couple 🌸",
      showerFlowersSub: "Click to shower sacred petals and blessings",
      venueTitle: "Ceremony Venue & Directions",
      viewOnMap: "Get Directions on Google Maps",
      galleryTitle: "Sacred Moments & Festive Highlights",
    },
    ta: {
      divineHeader: "ஓம் ஸ்ரீ விநாயகர் துணை",
      openingBlessing: "இறைவனின் திருவருளாலும், குலதெய்வம் மற்றும் பெரியோர்களின் நல்லாசியோடும்...",
      invitationLead: "எங்கள் இல்லத்து மணமக்களின் நிச்சயதார்த்த சுபமுகூர்த்த வைபவத்திற்கு தாங்கள் தங்கள் குடும்ப சகிதமாக வருகை தந்து சிறப்பிக்க அன்புடன் அழைக்கின்றோம்",
      invitationBody: `எங்கள் இல்லத்து செல்வி E. ஹர்ஷவர்தினி மற்றும் செல்வன் C. ராஜகோபால் ஆகியோரின் நிச்சயதார்த்த சுபமுகூர்த்த வைபவத்திற்கு தாங்களும் தங்கள் குடும்பத்தாரும் வருகை தந்து, மணமக்களை வாழ்த்தி அருளுமாறு அன்புடன் அழைக்கின்றோம்.

தங்களின் பொன்னான வருகையும், உளமார்ந்த நல்வாழ்த்துகளும் இந்நிகழ்வை மேலும் மங்களகரமானதாக மாற்றும்.`,
      closingBlessing: "தங்களின் வருகையே எங்கள் குடும்பத்திற்கு பெருமை!",
      familyTitle: "இரு குடும்பத்தாரின் உளமார்ந்த நல்வரவு & அன்பு வாழ்த்துகள்",
      countdownTitle: "சுபமுகூர்த்த வைபவத்திற்கு இன்னும்...",
      openSealText: "பத்திரிகையை திறக்க",
      openSealSub: "திறக்க தொடவும்",
      tapHere: "திறக்க இங்கே தொடவும்",
      quote: "இரு மனங்கள் இணையும் புனிதப் பயணம் • இறைவனும் பெரியோர்களும் ஆசீர்வதிக்கும் தெய்வீக பந்தம்.",
      showerFlowers: "மணமக்களை மலர் தூவி வாழ்த்துக 🌸",
      showerFlowersSub: "அட்சதை மற்றும் மலர் தூவி ஆசீர்வதிக்கவும்",
      venueTitle: "திருமண மண்டபம் & வழித்தடம்",
      viewOnMap: "கூகுள் மேப்பில் வழித்தடம் பார்க்க",
      galleryTitle: "மங்கள தருணங்கள் & நினைவுகள்",
    },
  },
};

// Target date for countdown
export const weddingDate = new Date("2026-11-29T10:30:00+05:30");
