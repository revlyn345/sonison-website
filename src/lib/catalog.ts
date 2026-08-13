/**
 * Technical catalogue + indicative quote engine.
 * All prices are indicative only and are confirmed by the plant on enquiry.
 */

export type Micron = 38 | 40 | 45 | 50 | 55 | 60 | 65;

export const micronGrades: {
  micron: Micron;
  label: string;
  use: string;
  adhesion: string;
  tensile: string;
}[] = [
  {
    micron: 38,
    label: "38 micron",
    use: "Light cartons, e-commerce polybag sealing",
    adhesion: "2.0 N/25mm",
    tensile: "22 N/25mm",
  },
  {
    micron: 40,
    label: "40 micron",
    use: "General retail despatch, single-wall cartons",
    adhesion: "2.2 N/25mm",
    tensile: "24 N/25mm",
  },
  {
    micron: 45,
    label: "45 micron",
    use: "Standard 3-ply carton sealing",
    adhesion: "2.5 N/25mm",
    tensile: "27 N/25mm",
  },
  {
    micron: 50,
    label: "50 micron",
    use: "Heavy 5-ply cartons, long transit",
    adhesion: "2.8 N/25mm",
    tensile: "31 N/25mm",
  },
  {
    micron: 55,
    label: "55 micron",
    use: "Export loads, humid and cold storage",
    adhesion: "3.0 N/25mm",
    tensile: "34 N/25mm",
  },
  {
    micron: 60,
    label: "60 micron",
    use: "White goods, furniture, heavy machinery",
    adhesion: "3.3 N/25mm",
    tensile: "38 N/25mm",
  },
  {
    micron: 65,
    label: "65 micron",
    use: "Maximum-hold industrial bundling",
    adhesion: "3.6 N/25mm",
    tensile: "41 N/25mm",
  },
];

export const tapeWidths = [12, 18, 24, 36, 48, 60, 72, 96] as const;
export const tapeLengths = [40, 50, 65, 100, 200, 500, 1000] as const;

export const tapeColours = [
  { id: "clear", name: "Clear", swatch: "oklch(0.93 0.01 250)", premium: 0 },
  { id: "tan", name: "Tan / Brown", swatch: "oklch(0.62 0.09 68)", premium: 0.04 },
  { id: "white", name: "White", swatch: "oklch(0.97 0.002 250)", premium: 0.08 },
  { id: "red", name: "Red", swatch: "oklch(0.577 0.226 27.6)", premium: 0.1 },
  { id: "blue", name: "Blue", swatch: "oklch(0.45 0.13 252)", premium: 0.1 },
  { id: "green", name: "Green", swatch: "oklch(0.55 0.14 152)", premium: 0.1 },
  { id: "yellow", name: "Yellow", swatch: "oklch(0.85 0.17 96)", premium: 0.1 },
  { id: "black", name: "Black", swatch: "oklch(0.25 0.01 250)", premium: 0.12 },
] as const;

export type ColourId = (typeof tapeColours)[number]["id"];

export const adhesiveGrades = [
  {
    id: "standard",
    name: "Standard acrylic",
    note: "Water-based acrylic, the everyday carton seal",
    factor: 1,
  },
  {
    id: "high-tack",
    name: "High tack",
    note: "Heavier coat weight for recycled / dusty corrugate",
    factor: 1.12,
  },
  {
    id: "low-temp",
    name: "Cold-chain",
    note: "Holds down to -5°C for frozen and pharma storage",
    factor: 1.2,
  },
] as const;

export type AdhesiveId = (typeof adhesiveGrades)[number]["id"];

/* ---------------- Quote engine ---------------- */

export type QuoteInput = {
  width: number; // mm
  length: number; // metres
  micron: number;
  colour: ColourId;
  adhesive: AdhesiveId;
  printColours: 0 | 1 | 2 | 3;
  rolls: number;
};

export type QuoteResult = {
  kgPerRoll: number;
  pricePerRoll: number;
  subtotal: number;
  cylinderCost: number;
  total: number;
  rollsPerBox: number;
  boxes: number;
  leadTimeDays: string;
  tier: string;
};

const BASE_RATE_PER_KG = 178; // INR, indicative
const PRINT_RATE_PER_KG = [0, 26, 44, 58];

export function quantityTier(rolls: number) {
  if (rolls >= 20000) return { name: "Slitter / trade volume", discount: 0.16 };
  if (rolls >= 5000) return { name: "Bulk contract", discount: 0.11 };
  if (rolls >= 1000) return { name: "Standard bulk", discount: 0.06 };
  if (rolls >= 200) return { name: "Trial order", discount: 0.02 };
  return { name: "Sample run", discount: 0 };
}

export function estimateQuote(input: QuoteInput): QuoteResult {
  const widthM = input.width / 1000;
  const thicknessM = input.micron / 1_000_000;
  const kgPerRoll = widthM * input.length * thicknessM * 910;

  const colour = tapeColours.find((c) => c.id === input.colour)!;
  const adhesive = adhesiveGrades.find((a) => a.id === input.adhesive)!;
  const tier = quantityTier(input.rolls);

  const ratePerKg =
    (BASE_RATE_PER_KG * (1 + colour.premium) * adhesive.factor +
      (PRINT_RATE_PER_KG[input.printColours] ?? 0)) *
    (1 - tier.discount);

  // Narrow rolls carry a slitting + core penalty per roll.
  const conversion = 1.6 + 34 / Math.max(input.width, 12);
  const pricePerRoll = kgPerRoll * ratePerKg + conversion;

  const subtotal = pricePerRoll * input.rolls;
  const cylinderCost = input.printColours > 0 ? 4000 * input.printColours : 0;
  const rollsPerBox = input.width <= 24 ? 72 : input.width <= 48 ? 36 : 18;

  return {
    kgPerRoll,
    pricePerRoll,
    subtotal,
    cylinderCost,
    total: subtotal + cylinderCost,
    rollsPerBox,
    boxes: Math.ceil(input.rolls / rollsPerBox),
    leadTimeDays: input.printColours > 0 ? "5-7 working days" : "2-4 working days",
    tier: tier.name,
  };
}

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: n < 100 ? 2 : 0,
  }).format(n);

/* ---------------- Industries ---------------- */

export type Industry = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  challenges: { title: string; body: string }[];
  recommended: { product: string; spec: string; why: string }[];
  productSlugs: string[];
  stat: { value: string; label: string };
  seo: { title: string; description: string };
};

export const industriesDetail: Industry[] = [
  {
    slug: "ecommerce-fulfilment",
    name: "E-commerce fulfilment",
    kicker: "Millions of cartons, one seal",
    summary:
      "High-throughput despatch lines need tape that runs on automatic case sealers without breaking, and carries the brand on the outside of every box.",
    challenges: [
      {
        title: "Tape breaks on the case sealer",
        body: "Under-gauge film snaps at the blade. We hold 45-50 micron with verified tensile strength so heads keep running through the shift.",
      },
      {
        title: "Returns and tamper evidence",
        body: "Printed tape with a repeat brand message makes tampering visible at the doorstep and reduces false damage claims.",
      },
      {
        title: "Cost per carton",
        body: "Sealing cost is measured in paise. Direct-from-plant pricing plus the right micron avoids paying for film you don't need.",
      },
    ],
    recommended: [
      {
        product: "Printed Tape",
        spec: "48mm × 65m, 45 micron, 2 colour",
        why: "Brand impression on every despatch, tamper visibility included.",
      },
      {
        product: "Plain / Brown Tape",
        spec: "48mm × 100m, 45 micron",
        why: "Machine-grade workhorse for the bulk of the line.",
      },
    ],
    productSlugs: ["printed-tape", "plain-brown-tape"],
    stat: { value: "45-50µ", label: "Recommended gauge for auto sealers" },
    seo: {
      title: "BOPP Tape for E-commerce Fulfilment | Sonison Packaging",
      description:
        "Machine-grade BOPP and printed tape for high-volume e-commerce despatch lines. 45-50 micron, tested tensile strength, direct from our Delhi plant.",
    },
  },
  {
    slug: "pharma-healthcare",
    name: "Pharma & healthcare",
    kicker: "Cold chain and traceability",
    summary:
      "Pharma despatch runs through cold rooms and long transit. Adhesive has to hold at low temperature and printing has to carry handling instruction, not just branding.",
    challenges: [
      {
        title: "Adhesive lifts in cold storage",
        body: "Our cold-chain adhesive grade is formulated to hold down to -5°C so flaps don't pop in the chiller.",
      },
      {
        title: "Handling instructions must be visible",
        body: "Temperature-storage and fragile messaging printed as a repeat means the instruction is readable from any face of the carton.",
      },
      {
        title: "Batch consistency",
        body: "Coat weight is monitored across the roll width and logged lot by lot so tape behaves identically between deliveries.",
      },
    ],
    recommended: [
      {
        product: "Printed Tape",
        spec: "72mm × 65m, 50 micron, cold-chain adhesive",
        why: "Storage instruction plus a seal that survives the chiller.",
      },
      {
        product: "Coloured Tape",
        spec: "48mm × 65m, colour-coded by temperature band",
        why: "Pickers identify storage class without reading a label.",
      },
    ],
    productSlugs: ["printed-tape", "coloured-tape"],
    stat: { value: "-5°C", label: "Cold-chain adhesive hold" },
    seo: {
      title: "Cold Chain & Pharma Packaging Tape | Sonison Packaging",
      description:
        "Cold-chain BOPP tape holding to -5°C, with printed handling instructions and colour-coded despatch for pharma and healthcare logistics.",
    },
  },
  {
    slug: "exporters",
    name: "Exporters",
    kicker: "Sea freight, humidity, months in transit",
    summary:
      "Export cartons sit in containers for weeks under heat and humidity. Ageing resistance matters more than initial tack.",
    challenges: [
      {
        title: "Tape ages and lifts at sea",
        body: "UV-stabilised film with acrylic adhesive keeps its bond through long container transit instead of curling at the flap.",
      },
      {
        title: "Humidity attacks the bond line",
        body: "Moisture-resistant film and stable coat weight keep the seal intact through monsoon loading and tropical crossings.",
      },
      {
        title: "Consistency across a full container",
        body: "One coating lot means every carton in the consignment is sealed with tape from the same specification.",
      },
    ],
    recommended: [
      {
        product: "Plain / Brown Tape",
        spec: "72mm × 100m, 55 micron",
        why: "Wide, heavy seal for 5-ply export cartons.",
      },
      {
        product: "Printed Tape",
        spec: "72mm × 65m with consignee marking",
        why: "Identification at the port without a separate label.",
      },
    ],
    productSlugs: ["plain-brown-tape", "printed-tape"],
    stat: { value: "55-65µ", label: "Recommended export gauge" },
    seo: {
      title: "Export Packaging Tape Manufacturer India | Sonison Packaging",
      description:
        "UV-stabilised, moisture-resistant BOPP tape for export cartons and long sea freight. 55-65 micron, manufactured in New Delhi.",
    },
  },
  {
    slug: "fmcg-food",
    name: "FMCG & food",
    kicker: "Speed, shelf appeal, colour coding",
    summary:
      "FMCG lines run fast and shift SKUs constantly. Tape is a line-speed component and a warehouse-organisation tool at once.",
    challenges: [
      {
        title: "SKU confusion in the warehouse",
        body: "Coloured tape assigns a shade per SKU family or per despatch region so pickers sort by sight.",
      },
      {
        title: "Line stoppages",
        body: "Consistent roll diameter and no telescoping means fewer changeovers and no jammed sealing heads.",
      },
      {
        title: "Shelf-ready presentation",
        body: "Gloss film and clean printing keep secondary packaging presentable when the carton reaches modern trade.",
      },
    ],
    recommended: [
      {
        product: "Coloured Tape",
        spec: "48mm × 65m, colour per SKU family",
        why: "Instant visual sorting across the despatch floor.",
      },
      {
        product: "BOPP Jumbo Rolls",
        spec: "1320mm × 4000m mother rolls",
        why: "For packers who slit in-house at volume.",
      },
    ],
    productSlugs: ["coloured-tape", "bopp-jumbo-rolls"],
    stat: { value: "8 shades", label: "Stock colours held" },
    seo: {
      title: "FMCG & Food Packaging Tape Supplier | Sonison Packaging",
      description:
        "Coloured and plain BOPP tape for FMCG despatch: SKU colour coding, high line speed and gloss finish. Manufactured in Mundka, New Delhi.",
    },
  },
  {
    slug: "traders-distributors",
    name: "Traders & distributors",
    kicker: "Jumbo in, finished rolls out",
    summary:
      "Slitting houses and regional distributors buy on gauge consistency and delivery reliability. We supply both the mother roll and the core it winds on.",
    challenges: [
      {
        title: "Telescoping on the slitter",
        body: "Cores wound in the same building as the tape hold their inner diameter, so rolls run true on the rewinder.",
      },
      {
        title: "Gauge variation across width",
        body: "Coat weight is checked edge to edge, so slit rolls out of one jumbo behave identically.",
      },
      {
        title: "Two suppliers, two dispatches",
        body: "Tape and paper cores ship together on one invoice from one gate.",
      },
    ],
    recommended: [
      {
        product: "BOPP Jumbo Rolls",
        spec: "1320mm × 4000m, clear or tan",
        why: "Mother rolls for high-output slitting operations.",
      },
      {
        product: "Paper Tube",
        spec: "3 inch ID, grade to your winder",
        why: "Cores matched to the jumbo, from the same plant.",
      },
    ],
    productSlugs: ["bopp-jumbo-rolls", "paper-tube"],
    stat: { value: "1,000", label: "Jumbo rolls dispatched monthly" },
    seo: {
      title: "BOPP Jumbo Roll Supplier for Slitters & Traders | Sonison",
      description:
        "Jumbo mother rolls up to 1320mm with edge-to-edge coat weight control, plus matched paper cores. Supplied to slitting houses across India.",
    },
  },
  {
    slug: "furniture-white-goods",
    name: "Furniture & white goods",
    kicker: "Heavy, awkward, fragile",
    summary:
      "Large-format cartons and bundled components need wide, high-gauge tape that holds a heavy flap without a second pass.",
    challenges: [
      {
        title: "Flaps spring open under load",
        body: "60-65 micron with high-tack adhesive holds a loaded 5-ply flap closed instead of creeping.",
      },
      {
        title: "Bundling loose components",
        body: "Wide tape at 72-96mm bundles rails, legs and panels without cutting into the surface.",
      },
      {
        title: "Damage claims in last-mile",
        body: "Printed handling marks tell the delivery crew which way is up before the carton is lifted.",
      },
    ],
    recommended: [
      {
        product: "Plain / Brown Tape",
        spec: "72mm × 65m, 60 micron, high tack",
        why: "Wide, strong seal for heavy cartons.",
      },
      {
        product: "Printed Tape",
        spec: "96mm × 65m, fragile / this-way-up repeat",
        why: "Handling instruction visible across the carton face.",
      },
    ],
    productSlugs: ["plain-brown-tape", "printed-tape"],
    stat: { value: "96mm", label: "Maximum finished width" },
    seo: {
      title: "Heavy Duty Packaging Tape for Furniture & Appliances | Sonison",
      description:
        "60-65 micron high-tack BOPP tape up to 96mm wide for furniture, white goods and heavy carton sealing. Made in New Delhi since 1995.",
    },
  },
];

/* ---------------- Case studies ---------------- */

export const caseStudies = [
  {
    client: "Footwear brand, NCR",
    industry: "Footwear & apparel",
    challenge:
      "Auto case sealers were snapping tape twice an hour on a two-shift despatch line.",
    solution:
      "Moved from bazaar 38 micron to 45 micron machine-grade with verified tensile, on cores wound to the sealer's mandrel.",
    outcome: "Breakages down to near zero, line uptime recovered across both shifts.",
    metric: { value: "2 shifts", label: "Running without a tape stop" },
  },
  {
    client: "Publishing house",
    industry: "Publishing & print",
    challenge:
      "Book cartons were arriving with lifted flaps after monsoon road transit.",
    solution:
      "Switched to 50 micron with high-tack adhesive and widened the seal from 48mm to 72mm.",
    outcome: "Transit damage complaints dropped through the following season.",
    metric: { value: "72mm", label: "Seal width after change" },
  },
  {
    client: "Regional slitting house",
    industry: "Traders & distributors",
    challenge:
      "Jumbo from a previous supplier telescoped on the rewinder, wasting film at every changeover.",
    solution:
      "Supplied 1320mm × 4000m jumbo with edge-to-edge coat weight control plus matched in-house paper cores.",
    outcome: "Clean rewinds and a single monthly dispatch covering film and cores.",
    metric: { value: "1,320mm", label: "Mother roll width supplied" },
  },
];

/* ---------------- Trust ---------------- */

export const certifications = [
  {
    title: "In-house test lab",
    body: "Peel adhesion, tensile, elongation, coat weight and thickness checked lot by lot before dispatch.",
  },
  {
    title: "Lot traceability",
    body: "Every dispatch carries a coating lot reference, so a query can be traced back to the run.",
  },
  {
    title: "Water-based adhesive",
    body: "Acrylic, solvent-free coating, safer on the floor and stable through long storage.",
  },
  {
    title: "30 years of supply",
    body: "Manufacturing continuously since 1995 for exporters, traders and brand owners across India.",
  },
];

/* ---------------- Resources ---------------- */

export const glossary = [
  {
    term: "BOPP",
    def: "Biaxially Oriented Polypropylene: film stretched in both directions, giving high tensile strength, clarity and dimensional stability.",
  },
  {
    term: "Micron (µ)",
    def: "Total tape thickness, film plus adhesive. Higher micron means more film and a stronger, costlier seal.",
  },
  {
    term: "Coat weight",
    def: "Grams of adhesive laid down per square metre. Consistent coat weight across the roll width is what keeps peel identical edge to edge.",
  },
  {
    term: "Peel adhesion",
    def: "Force needed to pull tape back off a surface at 180°, quoted in N/25mm. Higher is stickier, not always better.",
  },
  {
    term: "Shear / holding power",
    def: "Resistance to sliding under a constant load. It's what stops a heavy carton flap creeping open in storage.",
  },
  {
    term: "Tensile strength",
    def: "Force the film takes before it breaks. Machine lines need this above the blade tension of the case sealer.",
  },
  {
    term: "Elongation at break",
    def: "How far the film stretches before snapping. Too much means tape that pulls thin on the applicator.",
  },
  {
    term: "Jumbo / mother roll",
    def: "The full-width coated roll, up to 1320mm, that slitting houses convert into finished tape widths.",
  },
  {
    term: "Telescoping",
    def: "A roll whose layers slide sideways into a cone. Caused by poor winding tension or an unstable core.",
  },
  {
    term: "Repeat length",
    def: "The distance after which a printed design starts again. It is fixed by the cylinder circumference.",
  },
  {
    term: "Rotogravure",
    def: "Printing from an engraved cylinder. One cylinder per colour, which is why print cost is per colour.",
  },
  {
    term: "Core ID",
    def: "Inner diameter of the paper core, usually 3 inch, which must match the dispenser or applicator mandrel.",
  },
];

export const faqs = [
  {
    q: "What is the minimum order quantity?",
    a: "Plain and coloured tape can be trialled from a few boxes. Printed tape is economical from around 500 rolls because cylinder cost is spread across the run.",
  },
  {
    q: "How is tape priced?",
    a: "By weight, not by roll. Width × length × micron determines the film used, so a 48mm 65m 40 micron roll costs less than the same roll at 50 micron. Use the configurator for an indicative figure.",
  },
  {
    q: "Which micron should I use?",
    a: "38-40 micron for light retail cartons, 45-50 micron for standard and machine sealing, 55-65 micron for export, heavy or cold-storage loads.",
  },
  {
    q: "How many colours can be printed?",
    a: "Up to three colours by rotogravure. Artwork is supplied by you and each cylinder costs INR 4,000 as a one-time charge.",
  },
  {
    q: "What is the lead time?",
    a: "Plain and coloured stock moves in 2-4 working days. Printed orders take 5-7 working days from artwork approval.",
  },
  {
    q: "Do you supply jumbo rolls to slitters?",
    a: "Yes, 740mm, 980mm, 1040mm and 1320mm at 3000m and 4000m, around 1,000 rolls a month, plus mini jumbo at 192-288mm.",
  },
  {
    q: "Do you make the paper cores as well?",
    a: "Yes. Cores are spiral wound in the same building, so inner diameter and wall thickness are matched to your winder or dispenser.",
  },
  {
    q: "Can you match a custom colour?",
    a: "Stock shades ship immediately. Custom shades are matched on bulk volumes. Send a reference and we will confirm feasibility.",
  },
  {
    q: "Where do you deliver?",
    a: "Across India from our Mundka, New Delhi plant. Local NCR deliveries are fastest; outstation moves by transport on your preferred carrier.",
  },
  {
    q: "Is the adhesive solvent based?",
    a: "No. We coat water-based acrylic adhesive, which is stable through long storage and resistant to heat, cold and UV.",
  },
];

export const specSheetRows = [
  { property: "Film", value: "Biaxially oriented polypropylene (BOPP)" },
  { property: "Adhesive", value: "Water-based acrylic" },
  { property: "Total thickness", value: "38 - 65 micron" },
  { property: "Peel adhesion (steel)", value: "2.0 - 3.6 N / 25mm" },
  { property: "Tensile strength", value: "22 - 41 N / 25mm" },
  { property: "Elongation at break", value: "130 - 170 %" },
  { property: "Service temperature", value: "-5°C to 60°C" },
  { property: "Finished widths", value: "12mm - 96mm" },
  { property: "Finished lengths", value: "40m - 1000m" },
  { property: "Core", value: "3 inch paper core, wound in-house" },
  { property: "Printing", value: "Rotogravure, up to 3 colours" },
  { property: "Shelf life", value: "12 months in original packing, 10-30°C" },
];
