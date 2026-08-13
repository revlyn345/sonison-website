import jumbo from "@/assets/prod-jumbo.jpg";
import brown from "@/assets/prod-brown.jpg";
import colour from "@/assets/prod-colour.jpg";
import printed from "@/assets/prod-printed.jpg";
import tube from "@/assets/prod-tube.jpg";
import type { StaticImageData } from "next/image";

export const company = {
  name: "Sonison Packaging Pvt. Ltd.",
  short: "Sonison Packaging",
  tagline: "Your Product, Our Package",
  since: 1995,
  address: "Plot No. 20, Road No. 7, Mundka Industrial Area, New Delhi - 110041",
  mapUrl: "https://maps.app.goo.gl/t21QdFJmWSztGh269",
  email: "hello@sonisonpackaging.in",
  phones: ["+91 8802 750 750", "+91 8802 850 850"] as const,
  whatsapp: "https://wa.me/918802750750",
  brands: ["Pack Me", "Winpack"],
};

export type Product = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  image: StaticImageData;
  intro: string;
  highlights: string[];
  specGroups: { title: string; rows: { label: string; value: string }[] }[];
  sections: { title: string; body?: string; bullets?: string[] }[];
  faqs?: { q: string; a: string }[];
  seo: { title: string; description: string };
};

export const products: Product[] = [
  {
    slug: "bopp-jumbo-rolls",
    name: "BOPP Jumbo Rolls",
    kicker: "Mother rolls for slitters",
    summary:
      "Water-based adhesive coated BOPP mother rolls up to 1320mm wide, supplied to slitting houses across India.",
    image: jumbo,
    intro:
      "BOPP Jumbo Rolls are made from BOPP (Biaxially Oriented Polypropylene) film coated with water based adhesive. These are supplied to slitting machine owners and operators who convert them into finished tape.",
    highlights: [
      "Excellent adhesion and shear properties",
      "Excellent clarity and high gloss",
      "Stable coating across the full roll width",
      "Resistance to cold, heat and ageing",
      "UV stabilised, won't lift off cartons",
      "Minimal variation in thickness",
    ],
    specGroups: [
      {
        title: "BOPP Tape Jumbo Rolls",
        rows: [
          { label: "Width", value: "740mm, 980mm, 1040mm, 1320mm" },
          { label: "Length", value: "3000 metres, 4000 metres" },
          { label: "Supply", value: "1,000 rolls / month" },
          {
            label: "Colour",
            value: "Clear, tan, brown, white, red, blue, green, black, multicolour",
          },
          { label: "Printing", value: "Yes, up to 3 colours" },
        ],
      },
      {
        title: "BOPP Tape Mini Jumbo Rolls",
        rows: [
          { label: "Width", value: "192mm, 240mm, 288mm" },
          { label: "Length", value: "100 metres" },
          { label: "Supply", value: "10,000 rolls / month" },
          {
            label: "Colour",
            value: "Clear, tan, brown, white, red, blue, green, black, multicolour",
          },
          { label: "Printing", value: "Yes, up to 3 colours" },
        ],
      },
    ],
    sections: [
      {
        title: "Who buys jumbo rolls",
        bullets: [
          "Slitting houses converting mother rolls into 48mm / 72mm tape",
          "Traders supplying regional packaging markets",
          "Large FMCG and e-commerce packers with in-house slitting",
        ],
      },
    ],
    seo: {
      title: "BOPP Tape Jumbo Roll Manufacturer in Delhi | Sonison Packaging",
      description:
        "BOPP jumbo rolls and mini jumbo rolls up to 1320mm wide, water-based adhesive, up to 3-colour printing. Manufactured in Mundka, New Delhi since 1995.",
    },
  },
  {
    slug: "plain-brown-tape",
    name: "Plain / Brown Tape",
    kicker: "The everyday carton seal",
    summary:
      "High tensile, moisture resistant self adhesive BOPP tape in clear and brown for shipping, logistics and warehousing.",
    image: brown,
    intro:
      "BOPP (biaxially oriented polypropylene) tapes are a type of pressure-sensitive tape made from a thin film of polypropylene. They are known for their high tensile strength, good clarity and excellent ageing properties, providing a strong, secure hold that resists moisture, temperature changes and UV light.",
    highlights: [
      "High tensile strength film",
      "Strong, secure hold on corrugated cartons",
      "Resistant to moisture and temperature swings",
      "Excellent ageing properties for long storage",
      "Clear and brown / tan finishes",
      "Manual and machine dispenser friendly",
    ],
    specGroups: [
      {
        title: "Standard finished tape",
        rows: [
          { label: "Widths", value: "12mm to 96mm (48mm & 72mm most common)" },
          { label: "Lengths", value: "Made to order, 40m to 1000m" },
          { label: "Colours", value: "Clear, tan / brown" },
          { label: "Core", value: "3 inch paper core (in-house manufactured)" },
        ],
      },
    ],
    sections: [
      {
        title: "Where it is used",
        bullets: [
          "Packaging and sealing: sealing boxes and packages, particularly in shipping and logistics, with a hold that survives long transit and long storage.",
          "Labelling and tagging: securing labels and tags to cardboard, plastic and metal in retail and manufacturing.",
          "Repair and maintenance: holding together paper, cardboard and plastic, repairing damaged items or bracing materials during work.",
          "Arts and crafts: scrapbooking, card making and DIY projects.",
        ],
      },
    ],
    seo: {
      title: "Plain & Brown BOPP Tape Manufacturer in Delhi | Sonison Packaging",
      description:
        "Clear and brown BOPP self adhesive packaging tape with high tensile strength and moisture resistance. Bulk manufacturing from Mundka, New Delhi.",
    },
  },
  {
    slug: "coloured-tape",
    name: "Coloured Tape",
    kicker: "Colour coding and shelf appeal",
    summary:
      "BOPP tape in red, blue, green, yellow, black and more, for identification, colour coding and a finished, professional look.",
    image: colour,
    intro:
      "BOPP coloured tapes are a popular choice for packaging, sealing and labelling. The coloured film gives a package a more polished, professional look and can be used for product identification and branding. Tape is available in a wide range of colours including red, blue, green, yellow and many more.",
    highlights: [
      "Professional appearance on every carton",
      "Colour coding for warehouse and inventory teams",
      "Easy to apply, cut to any length",
      "Works with manual and automatic dispensers",
      "Cost-effective, durable and long-lasting",
      "Versatile across sealing, labelling and identification",
    ],
    specGroups: [
      {
        title: "Colour range",
        rows: [
          { label: "Stock colours", value: "Red, blue, green, yellow, black, white, tan" },
          { label: "Custom shades", value: "Matched to order on bulk volumes" },
          { label: "Widths", value: "12mm to 96mm" },
          { label: "Finish", value: "Gloss film, water-based adhesive" },
        ],
      },
    ],
    sections: [
      {
        title: "Key benefits",
        bullets: [
          "Professional appearance: the coloured film gives a polished look and doubles as branding.",
          "Colour coding: a wide range of colours makes identification and organisation simple, especially for warehouse, inventory and logistics operations.",
          "Easy to apply: cut to any desired length, used with manual or automatic dispensers.",
          "Cost-effective: durable and long-lasting for packaging, labelling and product identification.",
          "Versatility: packaging, sealing, labelling, identification and more.",
        ],
      },
    ],
    seo: {
      title: "Coloured BOPP Tape Manufacturer in Delhi | Sonison Packaging",
      description:
        "Coloured BOPP packaging tape in red, blue, green, yellow, black and custom shades for colour coding, branding and professional carton sealing.",
    },
  },
  {
    slug: "printed-tape",
    name: "Printed Tape",
    kicker: "Your logo on every carton",
    summary:
      "Custom printed BOPP tape up to 3 colours, turning carton sealing into brand impressions, delivered in 5-7 days.",
    image: printed,
    intro:
      "Trusted by hundreds of brands that prefer India's leading printed tape manufacturer. Printed tape is commonly used for carton sealing, but there are many ways to use it. When you include your logo on printed packaging tape it becomes a great tool for branding your products with your marketing message. Completely customisable. The possibilities are endless.",
    highlights: [
      "Logo and brand promotion",
      "Labelling cautionary messages",
      "Advertising other products and services",
      "Handling advice on the carton itself",
      "Content identification",
      "Temperature storage labelling",
    ],
    specGroups: [
      {
        title: "Print specification",
        rows: [
          { label: "Colours", value: "Up to 3 colours" },
          { label: "Artwork", value: "Supplied by customer" },
          { label: "Lead time", value: "5-7 days" },
          { label: "Cylinder cost", value: "INR 4,000 per cylinder" },
        ],
      },
    ],
    sections: [
      {
        title: "How a printed tape order runs",
        bullets: [
          "Share artwork and repeat length over WhatsApp or email.",
          "We confirm colour separation and cylinder requirement.",
          "Cylinders are engraved and the print run is scheduled.",
          "Printed jumbo is slit to your widths and packed.",
          "Dispatched from Mundka within 5-7 days of approval.",
        ],
      },
    ],
    faqs: [
      { q: "How many colours can be printed?", a: "Up to 3 colours." },
      { q: "Do I have to provide the artwork?", a: "Yes, artwork is supplied by you." },
      {
        q: "What is the lead time for the whole process?",
        a: "It takes around 5-7 days to deliver your product.",
      },
      {
        q: "Does the printing cylinder cost extra?",
        a: "Yes, each cylinder costs INR 4,000.",
      },
    ],
    seo: {
      title: "Custom Printed Packaging Tape Manufacturer in Delhi | Sonison",
      description:
        "Custom printed BOPP tape up to 3 colours with 5-7 day lead time. Put your logo, cautionary messages and handling advice on every carton.",
    },
  },
  {
    slug: "paper-tube",
    name: "Paper Tube",
    kicker: "Cores wound in-house",
    summary:
      "Spiral wound paper cores and tubes in every grade and thickness, for tape, stretch film, kraft, strapping and polyester film.",
    image: tube,
    intro:
      "Paper tubes are cylindrical containers made from paper, used to package and store a variety of products. They are made by winding paper onto a mandrel and securing the ends, and can be produced from a variety of paper grades and thicknesses to suit different applications and meet specific strength and performance requirements.",
    highlights: [
      "Made to your inner diameter and wall thickness",
      "Multiple paper grades for strength requirements",
      "Consistent roundness for high-speed winding",
      "Recyclable, kraft-based construction",
      "Cut to length in-house",
      "Available alongside your tape order",
    ],
    specGroups: [
      {
        title: "Types of paper tubes",
        rows: [
          { label: "Core for", value: "Winding BOPP tapes" },
          { label: "Core for", value: "Winding stretch film" },
          { label: "Core for", value: "Winding kraft paper / newsprint" },
          { label: "Core for", value: "Winding PP strapping" },
          { label: "Core for", value: "Winding PP film / polyester film" },
        ],
      },
    ],
    sections: [
      {
        title: "Why source cores with your tape",
        body: "Because we wind our own cores, core quality is controlled in the same building as the tape. That means consistent inner diameters, no telescoping on the slitter and one dispatch instead of two.",
      },
    ],
    seo: {
      title: "Paper Tube & Core Manufacturer in Delhi | Sonison Packaging",
      description:
        "Spiral wound paper tubes and cores for BOPP tape, stretch film, kraft paper, PP strapping and polyester film. Made to your ID and wall thickness.",
    },
  },
];

export const stats = [
  { value: "1995", label: "Manufacturing since" },
  { value: "9,000", label: "Sq. ft. facility, Mundka" },
  { value: "11,000+", label: "Rolls dispatched monthly" },
  { value: "3", label: "Colour print capability" },
];

export const capabilities = [
  {
    title: "Adhesive coating",
    body: "Water based acrylic adhesive coated onto BOPP film with stable coat weight edge-to-edge, so peel and shear stay identical across the roll.",
  },
  {
    title: "Rotogravure printing",
    body: "Up to three colours, engraved cylinders and register control tight enough for logos, cautionary marks and repeat patterns.",
  },
  {
    title: "Precision slitting",
    body: "Mother rolls converted to 12mm-96mm with clean edges and no telescoping, on cores we wind ourselves.",
  },
  {
    title: "Core winding",
    body: "Spiral wound paper cores in the grades and wall thicknesses your winders and dispensers need.",
  },
];

export const qualityChecks = [
  { label: "Adhesion (peel)", detail: "Tested against steel and corrugate" },
  { label: "Tensile strength", detail: "Film checked lot by lot" },
  { label: "Elongation at break", detail: "Within declared tolerance" },
  { label: "Coat weight", detail: "Monitored across roll width" },
  { label: "Thickness / micron", detail: "Minimal variation, gauge verified" },
  { label: "Ageing & UV", detail: "Stabilised so tape won't lift off cartons" },
];

export const industries = [
  "E-commerce fulfilment",
  "Exporters",
  "FMCG & food",
  "Pharma & healthcare",
  "Footwear & apparel",
  "Publishing & print",
  "Furniture & white goods",
  "Traders & distributors",
];

export const clients = [
  { name: "BATA", logo: "/clients/bata_logo.png" },
  { name: "Wiley", logo: "/clients/wiley_logo.png" },
  { name: "Pragati" },
  { name: "Visual Display", logo: "/clients/visual_displays_logo.jpg" },
  { name: "The Knotted Store", logo: "/clients/the_knotted_store_logo.jpg" },
  { name: "Pack Me" },
  { name: "Winpack", logo: "/clients/winpack_logo.png" },

];

export const whyUs = [
  {
    title: "Well-equipped facility",
    body: "A 9,000 sq. ft. plant in Mundka, New Delhi with state-of-the-art coating, printing and slitting lines under one roof.",
  },
  {
    title: "Timely delivery",
    body: "Order fulfilment is a stated focus, not a promise: printed orders ship in 5-7 days, plain stock moves faster.",
  },
  {
    title: "Competitive prices",
    body: "Direct-from-manufacturer pricing with no layers between the coating line and your loading dock.",
  },
  {
    title: "Certified quality",
    body: "Every lot is checked for adhesion, tensile strength, coat weight and thickness before it leaves the floor.",
  },
];

export const timeline = [
  {
    year: "1995",
    title: "The first coating line",
    body: "Sonison Packaging Pvt. Ltd. begins manufacturing BOPP self adhesive tape in New Delhi.",
  },
  {
    year: "2005",
    title: "Beyond the capital",
    body: "A growing network of exporters, traders and service providers across India dealing in industrial tapes.",
  },
  {
    year: "2015",
    title: "Mundka facility",
    body: "Over 9,000 sq. ft. of state-of-the-art manufacturing capacity consolidated at Mundka Industrial Area.",
  },
  {
    year: "Today",
    title: "Two house brands",
    body: "Pack Me and Winpack serve retail and industrial channels alongside private-label production for brands.",
  },
];
