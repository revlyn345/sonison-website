/**
 * Buyer-facing detail layer for product pages.
 * Same shape for every product, so the page design stays identical
 * across the catalogue and only the content changes.
 */

export type ProductDetail = {
  /** Quick glance strip at the top of the detail block */
  quickFacts: { label: string; value: string }[];
  /** Applications shown as chips */
  applications: string[];
  /** Packing, dispatch and logistics table */
  packing: { label: string; value: string }[];
  /** Commercial terms an Indian buyer asks before enquiring */
  commercials: { label: string; value: string }[];
  /** Requirement calculator tuning */
  calculator: {
    /** metres of tape consumed per carton / unit sealed */
    metresPerUnit: number;
    unitLabel: string;
    defaultUnitsPerDay: number;
    rollLength: number;
    rollsPerBox: number;
  };
  /** Ordering steps */
  steps: { title: string; body: string }[];
  /** Buyer-intent FAQs (in addition to any technical FAQs) */
  buyerFaqs: { q: string; a: string }[];
  /** Prefilled WhatsApp / email enquiry line */
  enquiryLine: string;
};

export const productDetails: Record<string, ProductDetail> = {
  "bopp-jumbo-rolls": {
    quickFacts: [
      { label: "MOQ", value: "1 tonne / 20 jumbo rolls" },
      { label: "Lead time", value: "3-5 working days" },
      { label: "Micron range", value: "38 to 65 micron" },
      { label: "Monthly capacity", value: "1,000 jumbo rolls" },
    ],
    applications: [
      "Slitting into 48mm / 72mm tape",
      "Regional tape trading",
      "In-house slitting for large packers",
      "Printed jumbo for private label",
      "Stationery and retail tape conversion",
    ],
    packing: [
      { label: "Roll packing", value: "Shrink wrapped, stretch-film capped ends" },
      { label: "Core", value: "3 inch paper core, wound in-house" },
      { label: "Weight per jumbo", value: "Approx. 55-95 kg depending on width & micron" },
      { label: "Loading", value: "Vertical stacking, pallet or loose truck load" },
      { label: "Dispatch from", value: "Our Mundka plant, New Delhi — loading till 7pm" },
      { label: "Transport", value: "Part-load and full-truck across North India, transport to all states" },
    ],
    commercials: [
      { label: "Pricing basis", value: "Per jumbo roll, ex-works Delhi" },
      { label: "GST", value: "18%. Tax invoice and e-way bill travel with the truck" },
      { label: "Payment", value: "Advance / NEFT-RTGS, credit terms on repeat contracts" },
      { label: "Samples", value: "Slit sample of the same coating lot on request" },
      { label: "Freight", value: "Ex-works Mundka, or we load it on the transporter you name and bill what the LR says" },
    ],
    calculator: {
      metresPerUnit: 1.4,
      unitLabel: "cartons sealed per day",
      defaultUnitsPerDay: 4000,
      rollLength: 65,
      rollsPerBox: 36,
    },
    steps: [
      { title: "Share your spec", body: "Width, micron, colour and monthly tonnage over WhatsApp or email." },
      { title: "Get a rate", body: "Per-kg rate quoted against current BOPP film and adhesive prices." },
      { title: "Approve a sample", body: "We slit a sample from the same coating lot for your slitter trial." },
      { title: "Production & dispatch", body: "Coated, wound and dispatched in 3-5 working days." },
    ],
    buyerFaqs: [
      { q: "What is the minimum order for jumbo rolls?", a: "One tonne, roughly 20 jumbo rolls depending on width and micron." },
      { q: "Do you supply outside Delhi NCR?", a: "Yes. We dispatch across India through part-load and full-truck transport; freight is at actuals or ex-works, your choice." },
      { q: "Can you match a micron and adhesion we already buy?", a: "Share your current roll or its test values and we will match coat weight and micron on the next run." },
      { q: "Is the coating consistent edge to edge?", a: "Coat weight is monitored across the full roll width so peel and shear stay identical on every slit roll." },
    ],
    enquiryLine: "I want a rate for BOPP jumbo rolls",
  },

  "plain-brown-tape": {
    quickFacts: [
      { label: "MOQ", value: "1 box (36 rolls) for trials" },
      { label: "Lead time", value: "2-4 working days" },
      { label: "Popular size", value: "48mm x 65m, 40 micron" },
      { label: "Monthly capacity", value: "10,000+ boxes" },
    ],
    applications: [
      "Carton sealing in warehouses",
      "E-commerce despatch",
      "Courier and logistics hubs",
      "Retail and kirana packing",
      "Repair, bracing and bundling",
    ],
    packing: [
      { label: "Rolls per box", value: "72 up to 24mm, 36 for 48mm, 18 for 72mm and wider" },
      { label: "Box", value: "3-ply corrugated, shrink-wrapped in sixes" },
      { label: "Core", value: "3 inch, made in our own core plant — so we control the roundness" },
      { label: "Labelling", value: "Size, micron, lot number and date on each box" },
      { label: "Dispatch from", value: "Mundka, New Delhi. Local pickups welcome any working day" },
      { label: "Transport", value: "Own vehicle inside Delhi NCR, booked transport everywhere else" },
    ],
    commercials: [
      { label: "Pricing basis", value: "Per roll, ex-works Delhi" },
      { label: "GST", value: "18%. Proper GST invoice on every box, every time" },
      { label: "Payment", value: "Advance for first order, terms on repeat supply" },
      { label: "Samples", value: "Free sample roll on genuine bulk enquiry" },
      { label: "Freight", value: "Ex-works, or booked on your regular transporter at actuals — no handling markup" },
    ],
    calculator: {
      metresPerUnit: 1.4,
      unitLabel: "cartons sealed per day",
      defaultUnitsPerDay: 800,
      rollLength: 65,
      rollsPerBox: 36,
    },
    steps: [
      { title: "Tell us the size", body: "Width, length in metres, micron and monthly roll count." },
      { title: "Get a per-roll rate", body: "Quoted the same day on WhatsApp with GST and freight shown separately." },
      { title: "Trial box", body: "Start with a box, test peel on your own cartons." },
      { title: "Repeat supply", body: "Standing monthly schedule, dispatched in 2-4 working days." },
    ],
    buyerFaqs: [
      { q: "What micron should I choose?", a: "40-45 micron for single and 3-ply cartons, 50-55 micron for 5-ply, heavy or long-transit loads." },
      { q: "Do you sell in small quantities?", a: "Trials start at one box. Rates improve sharply from 200 rolls upward." },
      { q: "Will the tape lift off in summer heat?", a: "The film is UV stabilised and the acrylic adhesive is aged-tested, so it holds through Indian summer storage." },
      { q: "Can I get my own length instead of 65m?", a: "Yes, anything from 40m to 1000m is made to order." },
    ],
    enquiryLine: "I want a rate for plain / brown BOPP tape",
  },

  "coloured-tape": {
    quickFacts: [
      { label: "MOQ", value: "200 rolls per colour" },
      { label: "Lead time", value: "3-5 working days" },
      { label: "Stock colours", value: "7 shades ready, custom matched" },
      { label: "Widths", value: "12mm to 96mm" },
    ],
    applications: [
      "Colour coding by SKU or destination",
      "Zone marking in warehouses",
      "Fragile and priority flagging",
      "Retail-facing branded packing",
      "Shift or line identification",
    ],
    packing: [
      { label: "Rolls per box", value: "36 for the usual 48mm; 72 for narrow, 18 for wide" },
      { label: "Colour separation", value: "One shade per box, colour named on the label" },
      { label: "Core", value: "3 inch, wound by us, so no telescoping on your dispenser" },
      { label: "Shade control", value: "Reference swatch kept lot to lot for repeat orders" },
      { label: "Dispatch from", value: "Mundka, New Delhi, straight off the slitter floor" },
      { label: "Transport", value: "Delivered in NCR by our own vehicle; rest of India by road transport" },
    ],
    commercials: [
      { label: "Pricing basis", value: "Per roll, colour premium over clear" },
      { label: "GST", value: "18%. One invoice even if you mix four shades" },
      { label: "Payment", value: "NEFT or RTGS. Credit terms once we have run a few months together" },
      { label: "Custom shade", value: "Matched to a Pantone or physical swatch on bulk volumes" },
      { label: "Freight", value: "Ex-works, or we book it and pass on the freight bill as it is" },
    ],
    calculator: {
      metresPerUnit: 1.4,
      unitLabel: "cartons sealed per day",
      defaultUnitsPerDay: 600,
      rollLength: 65,
      rollsPerBox: 36,
    },
    steps: [
      { title: "Pick your shades", body: "Choose from stock colours or send a swatch for a custom match." },
      { title: "Confirm quantity per colour", body: "Minimum 200 rolls per shade keeps the run economical." },
      { title: "Shade approval", body: "For custom shades we send a match sample before the full run." },
      { title: "Production & dispatch", body: "Coated, slit, colour-labelled and dispatched in 3-5 days." },
    ],
    buyerFaqs: [
      { q: "Is there a minimum per colour?", a: "Yes, 200 rolls per shade. Mixed-colour orders are welcome as long as each shade meets that." },
      { q: "Will the shade match my last order?", a: "We keep a reference swatch per customer so repeat lots stay visually consistent." },
      { q: "Does colour affect strength?", a: "No. The film, adhesive and micron are identical to clear tape; only the pigment changes." },
      { q: "Can you match a brand colour?", a: "Send a Pantone code or a printed sample; we match it on bulk volumes." },
    ],
    enquiryLine: "I want a rate for coloured BOPP tape",
  },

  "printed-tape": {
    quickFacts: [
      { label: "MOQ", value: "500 rolls per design" },
      { label: "Lead time", value: "5-7 working days" },
      { label: "Print", value: "Up to 3 colours, rotogravure" },
      { label: "Cylinder", value: "INR 4,000 per colour, one-time" },
    ],
    applications: [
      "Logo and brand promotion",
      "Tamper-evident despatch",
      "Handling and fragile instructions",
      "Cold-chain and storage marking",
      "Content and batch identification",
    ],
    packing: [
      { label: "Rolls per box", value: "36 rolls a box at 48mm, adjusted for other widths" },
      { label: "Artwork format", value: "AI, CDR, PDF or EPS with outlined fonts" },
      { label: "Repeat length", value: "Fixed by cylinder circumference, confirmed before engraving" },
      { label: "Proofing", value: "Digital layout approval before cylinder engraving" },
      { label: "Dispatch from", value: "Mundka, New Delhi, after your print approval" },
      { label: "Transport", value: "NCR on our vehicle, outstation through the transporter you trust" },
    ],
    commercials: [
      { label: "Pricing basis", value: "Per roll + one-time cylinder cost" },
      { label: "Cylinder", value: "INR 4,000 per colour, stored free for repeat orders" },
      { label: "GST", value: "18% on the tape, and on the cylinder charge as well" },
      { label: "Payment", value: "Cylinder cost advance, balance before dispatch" },
      { label: "Freight", value: "Ex-works, or we hand it over to your transporter and bill at actuals" },
    ],
    calculator: {
      metresPerUnit: 1.4,
      unitLabel: "cartons sealed per day",
      defaultUnitsPerDay: 1200,
      rollLength: 65,
      rollsPerBox: 36,
    },
    steps: [
      { title: "Send artwork", body: "Vector artwork with outlined fonts, plus your tape width." },
      { title: "Colour separation", body: "We confirm how many cylinders your design needs and quote." },
      { title: "Engraving & proof", body: "Cylinders engraved after your layout approval." },
      { title: "Print, slit, dispatch", body: "Printed jumbo slit to your width and dispatched in 5-7 days." },
    ],
    buyerFaqs: [
      { q: "What is the minimum for printed tape?", a: "500 rolls per design keeps the print run and cylinder cost worthwhile." },
      { q: "Do I pay for cylinders again on repeat orders?", a: "No. Cylinders are stored with us and reused free for future orders of the same design." },
      { q: "What if I do not have print-ready artwork?", a: "Send whatever you have — logo file, business card, old carton — and we will lay it out for approval." },
      { q: "Can I print in a colour other than the tape colour?", a: "Yes. Choose any background film shade and up to three print colours on top." },
    ],
    enquiryLine: "I want a quote for custom printed tape",
  },

  "paper-tube": {
    quickFacts: [
      { label: "MOQ", value: "1,000 pieces per size" },
      { label: "Lead time", value: "4-6 working days" },
      { label: "Inner diameter", value: "Made to your ID" },
      { label: "Wall thickness", value: "2mm to 12mm" },
    ],
    applications: [
      "Cores for BOPP tape winding",
      "Stretch film and cling film cores",
      "Kraft paper and newsprint cores",
      "PP strapping cores",
      "Polyester and PP film cores",
    ],
    packing: [
      { label: "Cut tolerance", value: "±1mm on length" },
      { label: "Roundness", value: "Controlled for high-speed winding, no telescoping" },
      { label: "Packing", value: "Nested in bundles, stretch wrapped" },
      { label: "Paper grades", value: "Kraft and duplex boards to match strength needed" },
      { label: "Dispatch from", value: "Mundka, New Delhi, same gate as the tape" },
      { label: "Transport", value: "NCR by our vehicle, and to every state by road" },
    ],
    commercials: [
      { label: "Pricing basis", value: "Per piece, by ID, wall thickness and length" },
      { label: "GST", value: "18%. Cores can sit on the same invoice as your tape" },
      { label: "Payment", value: "NEFT/RTGS on the first order; regular buyers work on running credit" },
      { label: "Samples", value: "Sample cores sent before the bulk run" },
      { label: "Combined dispatch", value: "Ship along with your tape order in one vehicle" },
    ],
    calculator: {
      metresPerUnit: 1.4,
      unitLabel: "rolls wound per day",
      defaultUnitsPerDay: 500,
      rollLength: 1,
      rollsPerBox: 100,
    },
    steps: [
      { title: "Give us the dimensions", body: "Inner diameter, wall thickness, cut length and monthly quantity." },
      { title: "Grade selection", body: "We suggest the paper grade for the winding speed and load." },
      { title: "Sample cores", body: "A few pieces sent for a trial on your winder." },
      { title: "Bulk production", body: "Wound, cut and dispatched in 4-6 working days." },
    ],
    buyerFaqs: [
      { q: "Can you make a non-standard inner diameter?", a: "Yes, cores are wound on a mandrel to your ID; share the exact measurement." },
      { q: "What wall thickness do I need?", a: "It depends on winding tension and roll weight — tell us both and we will recommend a grade." },
      { q: "Can cores ship with my tape order?", a: "Yes, cores and tape dispatch together from the same plant in a single vehicle." },
      { q: "Are the tubes recyclable?", a: "Yes, they are kraft paper based and fully recyclable." },
    ],
    enquiryLine: "I want a rate for paper tubes / cores",
  },
};

export const dispatchCities = [
  "Delhi NCR",
  "Mumbai",
  "Ahmedabad",
  "Jaipur",
  "Ludhiana",
  "Kanpur",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Indore",
];
