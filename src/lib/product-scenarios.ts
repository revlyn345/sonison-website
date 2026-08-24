/**
 * Scenario-based FAQs: real buyer situations, an expert answer,
 * and the exact specification we would put on the invoice.
 */

export type Scenario = {
  /** Who is asking / what the situation is */
  situation: string;
  /** The question, in the buyer's own words */
  q: string;
  /** Advisory answer — what we would actually tell them on the phone */
  a: string;
  /** The specification we would recommend for that scenario */
  spec: { label: string; value: string }[];
};

export const productScenarios: Record<string, Scenario[]> = {
  "bopp-jumbo-rolls": [
    {
      situation: "Regional trader slitting for the local market",
      q: "I sell 48mm tape in my district and want to slit myself. What jumbo should I start with?",
      a: "Start on one width and one gauge, not four. A 1280mm jumbo at 40 micron slits cleanly into twenty-six 48mm rolls with almost no edge waste, and 40 micron is what the kirana and courier trade actually buys. Once your slitter is running steady, add a 50 micron lot for the heavy-carton customers. Ask for the same coating lot on repeat orders so your peel does not change roll to roll — that is what loses a trader his regulars.",
      spec: [
        { label: "Jumbo width", value: "1280mm" },
        { label: "Micron", value: "40µ (add 50µ later)" },
        { label: "Length", value: "6500m" },
        { label: "Adhesive", value: "Water-based acrylic, standard tack" },
        { label: "Order size", value: "1 tonne, approx. 20 jumbos" },
      ],
    },
    {
      situation: "Packer with an in-house slitter and 5-ply cartons",
      q: "Our export cartons are 5-ply and the tape splits at the flap. Which jumbo fixes it?",
      a: "Splitting at the flap is almost never adhesive — it is film. On 5-ply the flap edge is thick and sharp, and a 40 micron film tears along it once the carton flexes in transit. Move to 50-55 micron and hold the same coat weight. Keep 48mm width; going wider hides the problem without solving it. If your line seals two strips, 50 micron on both is still cheaper than one 65 micron strip.",
      spec: [
        { label: "Micron", value: "50-55µ" },
        { label: "Jumbo width", value: "1280mm (slits to 48mm x 26)" },
        { label: "Adhesive", value: "High-tack acrylic, higher coat weight" },
        { label: "Length", value: "4000-5000m" },
        { label: "Note", value: "Test on a filled carton, not an empty one" },
      ],
    },
    {
      situation: "Private-label brand buying printed jumbo",
      q: "We want our own brand tape but we slit and pack at our own godown. Is printed jumbo possible?",
      a: "Yes, and it is the cheaper route if your monthly pull is above a tonne. We print the jumbo on rotogravure and you slit it, so you pay one cylinder cost and no per-roll conversion. Keep the design to two colours and place the logo so that the repeat lands correctly at your slit width — send us the width first, we set the repeat to match. Cylinders stay with us free for repeats.",
      spec: [
        { label: "Print", value: "Up to 3 colours, rotogravure" },
        { label: "Cylinder", value: "INR 4,000 per colour, one-time" },
        { label: "Micron", value: "42-45µ (print needs body)" },
        { label: "Jumbo width", value: "Matched to your slit plan" },
        { label: "MOQ", value: "1 tonne per design" },
      ],
    },
    {
      situation: "Stationery converter making small retail rolls",
      q: "We make 12mm and 24mm rolls for stationery packs. What should we buy?",
      a: "Narrow retail tape lives or dies on clarity and quiet unwind, not on strength. Take a 38-40 micron jumbo with clear film and standard tack — heavy adhesive on a 12mm roll only makes it noisy and hard to tear by hand. Ask for tight, square edges on the jumbo; any dish in the jumbo shows up as ragged edges on a 12mm slit and the pack looks cheap on a shelf.",
      spec: [
        { label: "Micron", value: "38-40µ" },
        { label: "Film", value: "Clear, high-clarity" },
        { label: "Adhesive", value: "Standard tack, hand-tearable feel" },
        { label: "Jumbo length", value: "6500m" },
        { label: "Edge", value: "Square-wound, no dishing" },
      ],
    },
  ],

  "plain-brown-tape": [
    {
      situation: "E-commerce seller shipping 300-800 parcels a day",
      q: "Courier parcels keep opening in transit and my returns team blames the tape.",
      a: "Nine out of ten times the parcel is being sealed with one short strip on a dusty carton. Go to 45 micron in 48mm and seal in an H-pattern — centre seam plus both edge seams. Dust is the real enemy: a carton stored open in a Delhi godown for a week will not bond on any tape. Wipe the flap or store cartons closed. 45 micron also survives the drop and the conveyor bounce at the courier hub better than 40.",
      spec: [
        { label: "Size", value: "48mm x 65m" },
        { label: "Micron", value: "45µ" },
        { label: "Adhesive", value: "High-tack acrylic" },
        { label: "Sealing", value: "H-pattern, 50mm overlap on each flap" },
        { label: "Pack", value: "36 rolls per box" },
      ],
    },
    {
      situation: "Cold storage and refrigerated dispatch",
      q: "Our cartons go into a 4°C chamber and the tape peels back at the corners.",
      a: "Standard acrylic loses tack when it is applied warm and then chilled — the bond never fully builds. Two changes: apply the tape before the carton goes cold, and switch to a hot-melt adhesive at 48-50 micron, which keeps its grab at low temperature. If cartons must be taped inside the chamber, tell us — we ship a low-temperature grade for that and it is a different coating entirely.",
      spec: [
        { label: "Adhesive", value: "Hot-melt, low-temperature grade" },
        { label: "Micron", value: "48-50µ" },
        { label: "Size", value: "48mm x 65m" },
        { label: "Application", value: "Seal before chilling, press firmly" },
        { label: "Storage", value: "Keep rolls above 10°C before use" },
      ],
    },
    {
      situation: "Warehouse running automatic carton sealers",
      q: "Our case sealer keeps jamming and the blade drags the tape.",
      a: "Machine lines need machine rolls — 990m or 1000m on a 3 inch core, not the 65m hand roll. Long rolls cut changeovers from every few minutes to twice a shift. Keep micron at 40-42; heavier film increases blade wear and is where most sealer jams start. Also check the roll is wound tight and square: a soft roll telescopes on the mandrel and that alone causes half the jams we get called about.",
      spec: [
        { label: "Size", value: "48mm x 990m machine roll" },
        { label: "Micron", value: "40-42µ" },
        { label: "Core", value: "3 inch, hard-wound, square edge" },
        { label: "Adhesive", value: "Standard acrylic, low unwind noise" },
        { label: "Pack", value: "6 rolls per carton" },
      ],
    },
    {
      situation: "Furniture and appliance despatch, long road transit",
      q: "Heavy 5-ply cartons on a 2,000km road run — what do we use?",
      a: "For weight plus vibration you want film strength, not stickier glue. 55 micron in 72mm, one strip on the seam and one across each end flap. Wide tape spreads the load over more board so it does not cut into the flute. Do not go past 60 micron unless the carton is over 30kg — you are then paying for film that the box itself cannot support.",
      spec: [
        { label: "Size", value: "72mm x 65m" },
        { label: "Micron", value: "55µ" },
        { label: "Adhesive", value: "High-tack acrylic" },
        { label: "Sealing", value: "Seam plus both end flaps" },
        { label: "Pack", value: "18 rolls per box" },
      ],
    },
  ],

  "coloured-tape": [
    {
      situation: "3PL warehouse sorting by destination city",
      q: "Our pickers keep sending cartons to the wrong bay. Can tape fix that?",
      a: "It does, and it is the cheapest fix in the building. Assign one shade per outbound zone — blue for North, red for West, green for South — and print nothing. Colour is read from ten feet away, text is not. Keep it to four shades maximum; beyond that people start second-guessing. Same 48mm, 45 micron as your normal tape so nothing changes at the packing bench except the roll.",
      spec: [
        { label: "Size", value: "48mm x 65m" },
        { label: "Micron", value: "45µ" },
        { label: "Shades", value: "3-4 max, one per zone" },
        { label: "MOQ", value: "200 rolls per shade" },
        { label: "Pack", value: "One shade per box, named on label" },
      ],
    },
    {
      situation: "Pharma dispatch flagging cold-chain cartons",
      q: "We need cold-chain parcels visibly different from ambient ones.",
      a: "Use a strong red or blue on the cold-chain cartons only, and keep everything else on plain brown — the contrast is what does the work. Pair it with 50 micron since these cartons often carry gel packs and extra weight. If the carton then sits in a chiller, tell us and we will move you to a hot-melt coating; pigment does not change adhesion, but temperature does.",
      spec: [
        { label: "Shade", value: "Red or blue, single flag colour" },
        { label: "Size", value: "48mm x 65m" },
        { label: "Micron", value: "50µ" },
        { label: "Adhesive", value: "Acrylic; hot-melt if chilled" },
        { label: "MOQ", value: "200 rolls per shade" },
      ],
    },
    {
      situation: "D2C brand wanting a branded look without printing",
      q: "We want our unboxing to feel premium but 500 printed rolls is too much for us.",
      a: "Colour-matched plain tape is the right first step. Pick your brand shade, run 200 rolls, and you get the visual hit of branded packaging at a fraction of printed-tape cost and MOQ. Send a Pantone code or a physical swatch — we keep the reference so your second lot looks like your first. When your volume crosses 500 rolls a month, move the same shade into printed tape and the look stays continuous.",
      spec: [
        { label: "Shade", value: "Pantone or swatch matched" },
        { label: "Size", value: "48mm x 65m" },
        { label: "Micron", value: "45µ" },
        { label: "MOQ", value: "200 rolls" },
        { label: "Next step", value: "Same shade, printed, at 500+ rolls" },
      ],
    },
    {
      situation: "Manufacturing plant marking QC status on the line",
      q: "We want to show passed, hold and rejected cartons on the shop floor.",
      a: "Three shades, narrow width, short length. 24mm is enough for a status flag and costs half of a 48mm roll — you are marking, not sealing. Green for passed, yellow for hold, red for rejected is the convention most Indian plants already understand, so training is nil. Keep the QC rolls in a different box colour so nobody grabs them for sealing.",
      spec: [
        { label: "Size", value: "24mm x 65m" },
        { label: "Shades", value: "Green / yellow / red" },
        { label: "Micron", value: "40µ" },
        { label: "MOQ", value: "200 rolls per shade" },
        { label: "Pack", value: "72 rolls per box" },
      ],
    },
  ],

  "printed-tape": [
    {
      situation: "Brand that keeps losing parcels to pilferage",
      q: "Parcels are being opened in transit and resealed. What do we print?",
      a: "Print your logo edge to edge with no blank gaps, in two colours, and keep the repeat short. A resealed carton then shows a break in the pattern that anyone at the receiving dock can spot in a second — plain brown tape gives a thief a free reseal. Add the word 'SEALED' or your helpline in the second colour. Go 50 micron: a heavier film tears visibly instead of lifting cleanly.",
      spec: [
        { label: "Print", value: "2 colours, continuous repeat, no gaps" },
        { label: "Size", value: "48mm x 65m" },
        { label: "Micron", value: "50µ" },
        { label: "Cylinder", value: "INR 4,000 per colour, one-time" },
        { label: "MOQ", value: "500 rolls per design" },
      ],
    },
    {
      situation: "First-time buyer with only a logo file",
      q: "We have never ordered printed tape. What do you actually need from us?",
      a: "A logo in AI, CDR, PDF or EPS with fonts outlined, and the width you want. If all you have is a business card or an old carton, send a photo — our team redraws it and sends a digital layout for approval before anything is engraved. Decide the colours at that stage, because every extra colour is a cylinder. Once you sign off the layout, expect the tape in 5-7 working days.",
      spec: [
        { label: "Artwork", value: "AI / CDR / PDF / EPS, fonts outlined" },
        { label: "Colours", value: "Start with 1-2, add later" },
        { label: "Size", value: "48mm x 65m, 45µ" },
        { label: "Proof", value: "Digital layout approval before engraving" },
        { label: "Lead time", value: "5-7 working days after approval" },
      ],
    },
    {
      situation: "Fragile goods — glassware, ceramics, electronics",
      q: "Handlers throw our cartons regardless of what we write on them.",
      a: "Handling instructions work only when they are unavoidable. Print 'HANDLE WITH CARE / FRAGILE' in red on a white or yellow background film, in both English and Hindi, and run the tape over the top seam and both ends so it is visible whichever way the carton is stacked. Keep the type large — one word per repeat beats a paragraph nobody reads at loading speed.",
      spec: [
        { label: "Film", value: "White or yellow background" },
        { label: "Print", value: "Red, English + Hindi, large type" },
        { label: "Size", value: "48mm x 65m" },
        { label: "Micron", value: "45-50µ" },
        { label: "Sealing", value: "Top seam plus both end flaps" },
      ],
    },
    {
      situation: "Marketplace seller with multiple brands",
      q: "We run three brands from one warehouse. Do we need three cylinders?",
      a: "If the brands ship from the same bench, one neutral design with your company mark and a colour change per brand is cheaper and less confusing at the packing table. If each brand has its own customer-facing identity, then yes, separate cylinders — but stagger the runs. Print one design first, sell through it, then engrave the next; cylinders are stored with us free and never re-charged on repeats.",
      spec: [
        { label: "Option A", value: "1 design, 3 background shades" },
        { label: "Option B", value: "3 designs, cylinders staggered" },
        { label: "Size", value: "48mm x 65m, 45µ" },
        { label: "Cylinder", value: "INR 4,000 per colour, stored free" },
        { label: "MOQ", value: "500 rolls per design" },
      ],
    },
  ],

  "paper-tube": [
    {
      situation: "Tape converter buying cores for a high-speed slitter",
      q: "Cores collapse or telescope on our mandrel at high winding speed.",
      a: "That is roundness and wall, in that order. A core that is even half a millimetre out of round will chatter on a fast mandrel and the roll walks. Ask for 76.2mm ID held to tolerance and a 3mm kraft wall for standard 65m tape rolls; go to 4mm if you wind above 1000m or run high tension. Send us two of your current cores — we measure them and tell you exactly where they are failing.",
      spec: [
        { label: "Inner diameter", value: "76.2mm (3 inch), held to ±0.3mm" },
        { label: "Wall", value: "3mm standard, 4mm for long rolls" },
        { label: "Paper", value: "Kraft, high-stiffness grade" },
        { label: "Cut length", value: "To your slit width, ±1mm" },
        { label: "MOQ", value: "1,000 pieces per size" },
      ],
    },
    {
      situation: "Stretch film maker with heavy rolls",
      q: "Our 15kg stretch film rolls crush the core when stacked.",
      a: "Crushing under stack load is a wall-thickness and grade problem, not an ID problem. For 15kg rolls stacked three high, use a 6mm wall on a duplex-reinforced kraft build — the extra rupee per core is cheaper than one crushed pallet. Also check how long the rolls sit: cores absorb moisture in a monsoon godown and lose stiffness, so keep them stretch-wrapped until use.",
      spec: [
        { label: "Inner diameter", value: "76.2mm" },
        { label: "Wall", value: "6mm" },
        { label: "Paper", value: "Kraft + duplex reinforcement" },
        { label: "Length", value: "To your film width" },
        { label: "Storage", value: "Keep stretch-wrapped, off the floor" },
      ],
    },
    {
      situation: "Textile and paper mill needing large-ID cores",
      q: "We need 152mm ID cores for fabric rolls. Is that a special order?",
      a: "It is a normal order for us — cores are wound on a mandrel, so any ID you can name we can build. At 152mm the wall matters more than at 3 inch because the span is wider and the core sags under its own roll: 8-12mm depending on roll weight and how long it hangs on the shaft. Give us the roll weight and the shaft length and we will pick the grade instead of guessing.",
      spec: [
        { label: "Inner diameter", value: "152mm (6 inch) or made to your ID" },
        { label: "Wall", value: "8-12mm by roll weight" },
        { label: "Paper", value: "Heavy kraft, multi-ply wound" },
        { label: "Cut length", value: "To roll width, ±1mm" },
        { label: "MOQ", value: "1,000 pieces per size" },
      ],
    },
    {
      situation: "Buyer already ordering tape from us",
      q: "Can we just add cores to our regular tape order?",
      a: "Yes, and you should — cores and tape are made in the same plant and go on the same invoice and the same truck, so you pay one freight instead of two. Tell us the ID, wall, cut length and monthly quantity once; after that we keep the spec on file and it repeats with your tape order. Sample cores go out before the first bulk run so your winder approves them first.",
      spec: [
        { label: "Dispatch", value: "Same vehicle as your tape order" },
        { label: "Invoice", value: "Single GST invoice, cores + tape" },
        { label: "Spec", value: "ID, wall, cut length kept on file" },
        { label: "Samples", value: "Sent before the bulk run" },
        { label: "Lead time", value: "4-6 working days" },
      ],
    },
  ],
};
