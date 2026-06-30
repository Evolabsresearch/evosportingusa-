import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";

const targetCount = Number(process.env.TARGET_SKUS ?? 72);
const productDir = join(process.cwd(), "public", "products");
const catalogPath = join(process.cwd(), "src", "data", "catalog.ts");
const promptPath = join(process.cwd(), "data", "image-prompts.json");

const categories = [
  {
    slug: "lifting-supports",
    name: "Lifting Supports",
    deck: "Belts, sleeves, and stabilizers for controlled heavy work.",
    accent: "#d9480f",
  },
  {
    slug: "straps-grips",
    name: "Straps & Grips",
    deck: "Small tools that keep grip fatigue from cutting sets short.",
    accent: "#0f766e",
  },
  {
    slug: "dumbbells-weights",
    name: "Dumbbells & Weights",
    deck: "Home-gym staples for progressive strength training.",
    accent: "#2563eb",
  },
  {
    slug: "plates-bars",
    name: "Plates, Bars & Collars",
    deck: "Olympic bars, plates, and lockups for serious barbell days.",
    accent: "#111827",
  },
  {
    slug: "benches-racks",
    name: "Benches & Racks",
    deck: "Benches, stands, and platforms for safer compound lifts.",
    accent: "#7c2d12",
  },
  {
    slug: "pullup-mobility",
    name: "Pull-Up & Mobility",
    deck: "Bars, bands, and mobility tools for everyday bodyweight work.",
    accent: "#6d28d9",
  },
  {
    slug: "conditioning",
    name: "Conditioning",
    deck: "Ropes, bags, sleds, and speed tools for harder finishers.",
    accent: "#be123c",
  },
  {
    slug: "storage-recovery",
    name: "Storage & Recovery",
    deck: "Keep the gym organized, clean, and ready for tomorrow.",
    accent: "#4d7c0f",
  },
  {
    slug: "bundles",
    name: "Training Bundles",
    deck: "Prebuilt stacks for focused training goals and better value.",
    accent: "#b45309",
  },
];

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

const families = [
  {
    category: "lifting-supports",
    visual: "belt",
    base: "Core Back Support Belt",
    material: "layered neoprene, nylon webbing, and brushed steel roller buckle",
    variants: [
      ["Light", 29.95],
      ["Everyday", 39.95],
      ["Pro", 59.95],
      ["Elite", 79.95],
    ],
  },
  {
    category: "lifting-supports",
    visual: "belt",
    base: "Nylon Quick-Lock Lifting Belt",
    material: "ripstop nylon, reinforced stitching, and cam-lock buckle",
    variants: [
      ["4 in.", 49.95],
      ["5 in.", 59.95],
      ["Tapered", 64.95],
      ["Competition", 74.95],
    ],
  },
  {
    category: "lifting-supports",
    visual: "belt",
    base: "Leather Power Belt",
    material: "full-grain leather, suede lining, and heavy prong hardware",
    variants: [
      ["Single Prong", 84.95],
      ["Double Prong", 99.95],
      ["Lever", 129.95],
      ["Elite Lever", 159.95],
    ],
  },
  {
    category: "lifting-supports",
    visual: "sleeves",
    base: "Compression Knee Sleeve Pair",
    material: "7 mm neoprene with heat-bonded seams",
    variants: [
      ["Light", 34.95],
      ["Training", 49.95],
      ["Heavy", 69.95],
      ["Competition", 89.95],
      ["Thermal", 64.95],
    ],
  },
  {
    category: "lifting-supports",
    visual: "sleeves",
    base: "Elbow Sleeve Pair",
    material: "breathable neoprene with abrasion-resistant outer knit",
    variants: [
      ["Light", 29.95],
      ["Training", 39.95],
      ["Power", 54.95],
      ["Thermal", 59.95],
    ],
  },
  {
    category: "lifting-supports",
    visual: "wraps",
    base: "Stabilizing Wrist Wrap Pair",
    material: "high-tension elastic, cotton binding, and reinforced thumb loop",
    variants: [
      ["12 in.", 18.95],
      ["18 in.", 22.95],
      ["24 in.", 26.95],
      ["Pro 30 in.", 31.95],
    ],
  },
  {
    category: "straps-grips",
    visual: "straps",
    base: "Cotton Lifting Strap Pair",
    material: "dense cotton webbing with stitched loop ends",
    variants: [
      ["Classic", 18.95],
      ["Padded", 21.95],
      ["Long", 23.95],
      ["Heavy", 27.95],
    ],
  },
  {
    category: "straps-grips",
    visual: "straps",
    base: "Figure-8 Deadlift Strap Pair",
    material: "double-layer cotton webbing with bar-tack reinforcement",
    variants: [
      ["Small", 22.95],
      ["Medium", 26.95],
      ["Large", 29.95],
      ["Competition", 36.95],
    ],
  },
  {
    category: "straps-grips",
    visual: "hooks",
    base: "Padded Lifting Hook Pair",
    material: "steel hooks, neoprene wrist pads, and hook-and-loop closure",
    variants: [
      ["Standard", 34.95],
      ["Wide Wrist", 39.95],
      ["Pro Steel", 49.95],
    ],
  },
  {
    category: "straps-grips",
    visual: "grips",
    base: "Palm Grip Pad Pair",
    material: "textured rubber with finger channels and breathable lining",
    variants: [
      ["Classic", 19.95],
      ["Ventilated", 22.95],
      ["Gel", 27.95],
      ["Pro Grip", 32.95],
    ],
  },
  {
    category: "straps-grips",
    visual: "grips",
    base: "Pull-Up Hand Grip Pair",
    material: "microfiber palm panels and wrist-secure straps",
    variants: [
      ["Two-Finger", 26.95],
      ["Three-Finger", 29.95],
      ["Full Palm", 34.95],
      ["Carbon Texture", 42.95],
    ],
  },
  {
    category: "straps-grips",
    visual: "chalk",
    base: "Grip Chalk System",
    material: "magnesium carbonate blend and refillable storage formats",
    variants: [
      ["Chalk Ball", 14.95],
      ["Block Pack", 18.95],
      ["Liquid Chalk", 17.95],
      ["Gym Bowl Kit", 44.95],
    ],
  },
  {
    category: "dumbbells-weights",
    visual: "dumbbell",
    base: "Rubber Hex Dumbbell Pair",
    material: "rubber-encased heads and chrome-knurled handles",
    variants: [
      ["10 lb", 39.95],
      ["15 lb", 49.95],
      ["20 lb", 64.95],
      ["25 lb", 79.95],
      ["30 lb", 94.95],
      ["35 lb", 109.95],
      ["40 lb", 124.95],
      ["45 lb", 139.95],
      ["50 lb", 154.95],
    ],
  },
  {
    category: "dumbbells-weights",
    visual: "dumbbell",
    base: "Adjustable Dumbbell",
    material: "cast plates, selector dial, and steel handle cradle",
    variants: [
      ["25 lb Single", 119.95],
      ["50 lb Single", 199.95],
      ["80 lb Single", 299.95],
    ],
  },
  {
    category: "dumbbells-weights",
    visual: "kettlebell",
    base: "Powder-Coat Kettlebell",
    material: "single-cast iron with textured powder coat",
    variants: [
      ["10 lb", 29.95],
      ["15 lb", 39.95],
      ["20 lb", 49.95],
      ["25 lb", 59.95],
      ["35 lb", 79.95],
      ["45 lb", 99.95],
      ["53 lb", 119.95],
    ],
  },
  {
    category: "dumbbells-weights",
    visual: "medicine-ball",
    base: "Textured Medicine Ball",
    material: "grip-textured rubber shell with balanced fill",
    variants: [
      ["8 lb", 34.95],
      ["10 lb", 39.95],
      ["12 lb", 44.95],
      ["15 lb", 54.95],
      ["20 lb", 69.95],
      ["25 lb", 84.95],
      ["30 lb", 99.95],
    ],
  },
  {
    category: "dumbbells-weights",
    visual: "dumbbell",
    base: "Cast Dumbbell Starter Set",
    material: "spin-lock bars, cast plates, and molded storage tray",
    variants: [
      ["40 lb", 79.95],
      ["80 lb", 139.95],
      ["120 lb", 199.95],
    ],
  },
  {
    category: "dumbbells-weights",
    visual: "rack",
    base: "Dumbbell Storage Rack",
    material: "powder-coated steel with rubber contact guards",
    variants: [
      ["Compact", 79.95],
      ["Vertical", 119.95],
      ["3-Tier", 169.95],
    ],
  },
  {
    category: "plates-bars",
    visual: "plate",
    base: "Olympic Bumper Plate Pair",
    material: "low-bounce rubber with stainless steel hub inserts",
    variants: [
      ["10 lb", 44.95],
      ["15 lb", 59.95],
      ["25 lb", 89.95],
      ["35 lb", 119.95],
      ["45 lb", 154.95],
    ],
  },
  {
    category: "plates-bars",
    visual: "plate",
    base: "Cast Iron Olympic Plate Pair",
    material: "machined cast iron with baked enamel finish",
    variants: [
      ["2.5 lb", 24.95],
      ["5 lb", 34.95],
      ["10 lb", 49.95],
      ["25 lb", 94.95],
      ["45 lb", 149.95],
    ],
  },
  {
    category: "plates-bars",
    visual: "plate",
    base: "Color Change Plate Set",
    material: "rubber-coated steel plates with raised weight markings",
    variants: [
      ["5 lb Set", 39.95],
      ["10 lb Set", 59.95],
      ["20 lb Set", 99.95],
      ["35 lb Set", 149.95],
    ],
  },
  {
    category: "plates-bars",
    visual: "barbell",
    base: "Training Bar",
    material: "tensile steel shaft, bronze bushings, and medium knurling",
    variants: [
      ["15 lb Technique", 109.95],
      ["35 lb Multipurpose", 169.95],
      ["45 lb Olympic", 219.95],
      ["45 lb Power", 249.95],
      ["Deadlift", 289.95],
      ["Curl", 119.95],
      ["Trap", 239.95],
      ["Axle", 139.95],
    ],
  },
  {
    category: "plates-bars",
    visual: "collars",
    base: "Olympic Bar Collar Pair",
    material: "spring steel, aircraft aluminum, or reinforced polymer lockups",
    variants: [
      ["Spring", 19.95],
      ["Quick Lock", 29.95],
      ["Aluminum", 39.95],
      ["Magnetic Pro", 49.95],
    ],
  },
  {
    category: "plates-bars",
    visual: "barbell",
    base: "Landmine Attachment",
    material: "powder-coated steel pivot hardware",
    variants: [
      ["Base", 59.95],
      ["T-Bar Handle", 49.95],
    ],
  },
  {
    category: "benches-racks",
    visual: "bench",
    base: "Training Bench",
    material: "11-gauge steel frame and dense stitched vinyl pad",
    variants: [
      ["Flat", 119.95],
      ["Adjustable", 219.95],
      ["Incline", 199.95],
      ["Folding", 149.95],
      ["Decline", 179.95],
      ["Sit-Up", 129.95],
    ],
  },
  {
    category: "benches-racks",
    visual: "rack",
    base: "Rack Attachment",
    material: "powder-coated steel with UHMW contact guards",
    variants: [
      ["Squat Stand", 249.95],
      ["Half Rack", 399.95],
      ["Training Yoke", 449.95],
      ["Power Tower", 249.95],
      ["Dip Station", 99.95],
      ["Spotter Arms", 129.95],
      ["J-Hook Pair", 69.95],
      ["Preacher Curl", 119.95],
    ],
  },
  {
    category: "benches-racks",
    visual: "bench",
    base: "Bench Press Set",
    material: "steel uprights, padded bench, and starter bar hardware",
    variants: [
      ["Starter", 199.95],
      ["Intermediate", 299.95],
      ["Olympic", 449.95],
      ["Compact", 249.95],
    ],
  },
  {
    category: "benches-racks",
    visual: "platform",
    base: "Flooring & Platform Piece",
    material: "high-density rubber, textured vinyl, or sealed wood composite",
    variants: [
      ["Platform Tiles", 89.95],
      ["Rack Mat", 79.95],
      ["Deadlift Blocks", 119.95],
      ["Step Platform", 69.95],
      ["Calf Block", 59.95],
      ["Plyo Box", 129.95],
    ],
  },
  {
    category: "pullup-mobility",
    visual: "pullup",
    base: "Pull-Up Bar",
    material: "powder-coated steel with textured grip zones",
    variants: [
      ["Doorway", 49.95],
      ["Wall Mount", 99.95],
      ["Ceiling Mount", 119.95],
      ["Multi-Grip", 139.95],
      ["Rack Mounted", 89.95],
    ],
  },
  {
    category: "pullup-mobility",
    visual: "bands",
    base: "Resistance Band System",
    material: "layered latex bands with reinforced anchors",
    variants: [
      ["Mini Band Set", 19.95],
      ["Long Band Set", 39.95],
      ["Assisted Pull-Up", 49.95],
      ["Tube Set", 34.95],
      ["Hip Circle", 24.95],
    ],
  },
  {
    category: "pullup-mobility",
    visual: "roller",
    base: "Mobility Tool",
    material: "EVA foam, woven strap, or textured recovery rubber",
    variants: [
      ["Foam Roller", 29.95],
      ["Lacrosse Ball Set", 14.95],
      ["Stretch Strap", 17.95],
      ["Training Mat", 39.95],
      ["Balance Pad", 44.95],
    ],
  },
  {
    category: "pullup-mobility",
    visual: "rings",
    base: "Bodyweight Trainer",
    material: "birch rings, nylon straps, and steel cam buckles",
    variants: [
      ["Door Anchor Kit", 39.95],
      ["Wood Ring Set", 69.95],
      ["Suspension Straps", 79.95],
      ["Core Slider Set", 19.95],
      ["Ab Wheel", 24.95],
    ],
  },
  {
    category: "conditioning",
    visual: "rope",
    base: "Jump Rope",
    material: "coated cable, sealed bearings, and knurled handles",
    variants: [
      ["Speed", 24.95],
      ["Weighted", 34.95],
      ["Beaded", 19.95],
      ["Cordless", 29.95],
    ],
  },
  {
    category: "conditioning",
    visual: "battle-rope",
    base: "Battle Rope",
    material: "poly-dacron rope with heat-shrink handles",
    variants: [
      ["30 ft", 79.95],
      ["40 ft", 109.95],
      ["50 ft", 139.95],
    ],
  },
  {
    category: "conditioning",
    visual: "sandbag",
    base: "Training Sandbag",
    material: "ballistic nylon shell with leak-resistant fill bags",
    variants: [
      ["40 lb", 79.95],
      ["60 lb", 99.95],
      ["100 lb", 139.95],
      ["150 lb", 179.95],
    ],
  },
  {
    category: "conditioning",
    visual: "sled",
    base: "Sled Training Tool",
    material: "powder-coated steel and reinforced nylon harnessing",
    variants: [
      ["Drag Harness", 49.95],
      ["Compact Drag Sled", 129.95],
      ["Push Sled", 249.95],
    ],
  },
  {
    category: "conditioning",
    visual: "agility",
    base: "Agility Kit",
    material: "weather-resistant polymer and woven carry straps",
    variants: [
      ["Ladder", 24.95],
      ["Cone Set", 19.95],
      ["Hurdle Set", 39.95],
    ],
  },
  {
    category: "conditioning",
    visual: "grips",
    base: "Hand Strength Tool",
    material: "spring steel, textured handles, and smooth resistance pivots",
    variants: [
      ["Finger Trainer", 19.95],
      ["Adjustable Gripper", 24.95],
      ["Forearm Roller", 34.95],
    ],
  },
  {
    category: "storage-recovery",
    visual: "rack",
    base: "Storage Organizer",
    material: "powder-coated steel with protective feet",
    variants: [
      ["Plate Tree", 129.95],
      ["Bar Holder", 89.95],
      ["Dumbbell Shelf", 149.95],
      ["Wall Hooks", 29.95],
      ["Band Peg Rail", 39.95],
    ],
  },
  {
    category: "storage-recovery",
    visual: "roller",
    base: "Recovery Tool",
    material: "textured EVA, silicone contact points, and compact cases",
    variants: [
      ["Massage Roller", 39.95],
      ["Mini Percussion", 129.95],
      ["Compression Cuffs", 89.95],
      ["Hot-Cold Pack", 24.95],
      ["Posture Trainer", 34.95],
    ],
  },
  {
    category: "storage-recovery",
    visual: "platform",
    base: "Gym Flooring",
    material: "shock-absorbing rubber with non-slip surface texture",
    variants: [
      ["Interlocking Mats", 69.95],
      ["Rubber Roll", 149.95],
      ["Turf Strip", 119.95],
    ],
  },
  {
    category: "storage-recovery",
    visual: "maintenance",
    base: "Equipment Care Kit",
    material: "nylon bristles, microfiber, and gym-safe cleaning formulas",
    variants: [
      ["Barbell Brush", 19.95],
      ["Sleeve Care Spray", 17.95],
      ["Chalk Bowl", 39.95],
      ["Cleaning Kit", 29.95],
      ["Equipment Tag Set", 14.95],
    ],
  },
  {
    category: "bundles",
    visual: "bundle",
    base: "EVO Training Bundle",
    material: "bundle-specific training gear",
    variants: [
      ["Grip Starter", 69.95],
      ["Pull-Up Builder", 129.95],
      ["Deadlift Support", 149.95],
      ["Home Strength", 239.95],
      ["Bench Starter", 289.95],
      ["Olympic Barbell", 399.95],
      ["Conditioning Core", 159.95],
      ["Mobility Daily", 89.95],
      ["Plate Progression", 199.95],
      ["Garage Gym Launch", 499.95],
    ],
  },
];

const copyProfiles = {
  belt: {
    use: "bracing work on pulls, rows, hinges, and loaded carries",
    value: "A supportive wrap profile keeps the midsection warm and locked in without the long break-in period of a heavy leather belt.",
    finish: "The closure surface, lumbar panel, and stitched edges are built for regular weekly sessions and quick storage between sets.",
    features: [
      "Contoured support panel for bracing and loaded hinge work",
      "Quick-adjust closure that is easy to reset between sets",
      "Low-profile shape for home-gym storage",
      "Reinforced stitched edges at high-wear points",
    ],
  },
  sleeves: {
    use: "joint warmth and compression during squats, presses, and accessory work",
    value: "The sleeve profile adds support without turning warmups into a fight, so it works for both heavy days and higher-volume training.",
    finish: "Textured neoprene, bound edges, and stable seams help the pair keep its shape through repeated use.",
    features: [
      "Tapered compression fit for stable movement",
      "Bound edges help limit rolling during sets",
      "Textured neoprene surface with a supportive feel",
      "Sold as a matched pair for balanced training",
    ],
  },
  wraps: {
    use: "wrist support on pressing, front-rack work, and high-rep accessory lifts",
    value: "The wrap gives the wrist a firmer set position while still being quick to loosen between efforts.",
    finish: "Elastic tension, thumb loops, and hook-and-loop tabs make it simple to dial in support without overbuilding the product.",
    features: [
      "Elastic wrap body for adjustable wrist support",
      "Thumb loop helps set the wrap before tightening",
      "Hook-and-loop closure for quick changes between sets",
      "Paired wraps for pressing and accessory work",
    ],
  },
  straps: {
    use: "deadlifts, rows, shrugs, and pulling days where grip fatigue shows up early",
    value: "Dense webbing adds dependable bar contact without turning a small accessory into a bulky kit.",
    finish: "The loop ends and reinforcement stitching are meant to survive regular pulling sessions while staying easy to pack in a gym bag.",
    features: [
      "Dense webbing for secure bar contact",
      "Reinforced loop ends for repeated pulling sessions",
      "Low-bulk profile that packs easily in a gym bag",
      "Paired strap setup for deadlifts, rows, and shrugs",
    ],
  },
  hooks: {
    use: "pulling movements where the athlete wants extra grip assistance with padded wrist support",
    value: "The steel hook carries the load while the wrist pad spreads pressure more evenly than a bare strap.",
    finish: "Neoprene padding, stitched webbing, and a shaped hook keep the accessory practical for repeated gym use.",
    features: [
      "Steel hook assists grip on heavy pulls",
      "Padded wrist wrap helps spread pressure",
      "Hook-and-loop closure for fast adjustment",
      "Sold as a matched left and right pair",
    ],
  },
  grips: {
    use: "bar, dumbbell, pull-up, and accessory work where palm comfort matters",
    value: "The textured contact surface improves feel without forcing the athlete into a full glove.",
    finish: "A compact shape, finger channels, and breathable backing keep the pair simple enough for everyday add-on use.",
    features: [
      "Textured contact surface improves palm feel",
      "Finger channels help keep the pad aligned",
      "Compact shape avoids full-glove bulk",
      "Paired design for balanced grip support",
    ],
  },
  chalk: {
    use: "better hand feel on barbell, dumbbell, and pull-up work",
    value: "The format keeps chalk accessible without turning the training area into a mess.",
    finish: "Refill-friendly storage and simple packaging make it a practical add-on for grip-focused setups.",
    features: [
      "Chalk format selected for controlled application",
      "Compact storage for gym bags and garage shelves",
      "Supports barbell, dumbbell, and pull-up sessions",
      "Simple add-on size for grip-focused setups",
    ],
  },
  dumbbell: {
    use: "progressive strength work, supersets, and compact home-gym training",
    value: "Rubber heads reduce floor noise while the knurled handle gives the pair a familiar commercial-gym feel.",
    finish: "The shape stores cleanly, resists rolling, and fits naturally into dumbbell progressions.",
    features: [
      "Rubber-encased heads help limit floor noise",
      "Hex shape reduces rolling between sets",
      "Chrome-knurled handles for familiar grip",
      "Sold as a matched pair for balanced training",
    ],
  },
  plate: {
    use: "barbell loading, plate progressions, and compact garage-gym setups",
    value: "The plate profile keeps loading simple while the finish is chosen for repeated handling and storage.",
    finish: "Clean edges, centered hubs, and a durable surface make the pair easy to compare and easy to rack.",
    features: [
      "Olympic center hole for standard bar sleeves",
      "Durable surface for repeated loading",
      "Low-profile shape stores cleanly",
      "Sold as a matched loading pair or set",
    ],
  },
  barbell: {
    use: "compound barbell training in home, garage, and studio gyms",
    value: "The shaft, sleeve hardware, and knurl pattern are balanced for everyday strength work rather than one narrow lift.",
    finish: "A straightforward finish and bushing setup keep the bar useful for repeated weekly sessions.",
    features: [
      "Medium knurling for everyday strength work",
      "Sleeve hardware selected for regular loading",
      "Balanced profile for compound lifts",
      "Ships as a core barbell piece for home gyms",
    ],
  },
  collars: {
    use: "securing plates during barbell sets and quick weight changes",
    value: "The lockup keeps plates in place without adding much setup time between sets.",
    finish: "The pair is small, durable, and easy to keep near the bar for fast loading changes.",
    features: [
      "Fits standard Olympic bar sleeves",
      "Paired collar setup for balanced loading",
      "Quick handling for set-to-set changes",
      "Compact storage near rack or platform",
    ],
  },
  bench: {
    use: "pressing, rows, accessory work, and compact home-gym strength sessions",
    value: "The frame and pad are sized for stable training without eating the whole room.",
    finish: "Dense padding, stitched vinyl, and a steel frame give the bench the practical feel lifters expect from a steady home gym.",
    features: [
      "Steel frame sized for stable home-gym work",
      "Dense stitched pad for pressing and rows",
      "Compact footprint for garage or studio gyms",
      "Designed for regular weekly use",
    ],
  },
  rack: {
    use: "rack use, safer bar placement, and better organization around heavy lifts",
    value: "Powder-coated steel and contact guards make the attachment feel like equipment, not a disposable accessory.",
    finish: "The dimensions and contact surfaces are built around repeated barbell loading and quick use.",
    features: [
      "Powder-coated steel body for rack use",
      "Contact surfaces designed for repeated loading",
      "Compact attachment footprint",
      "Built for quick use around compound lifts",
    ],
  },
  platform: {
    use: "floor-based training, mobility work, and stable movement patterns",
    value: "The textured surface gives athletes a clear contact point without adding bulky permanent flooring.",
    finish: "A compact shape and grippy top make the piece easy to move, store, and repeat in daily sessions.",
    features: [
      "Textured top surface for steady contact",
      "Compact piece moves and stores easily",
      "Rubberized feel suits garage-gym floors",
      "Useful for mobility, steps, and accessory work",
    ],
  },
  bands: {
    use: "warmups, assistance work, mobility, and compact resistance training",
    value: "Band resistance gives the athlete a low-cost way to add more exercise options without large equipment.",
    finish: "Layered latex or woven construction keeps the set portable while still feeling like a real training tool.",
    features: [
      "Portable resistance for warmups and accessories",
      "Compact storage for home and travel training",
      "Works with bodyweight and rack-based movements",
      "Durable material selected for repeat stretching",
    ],
  },
  roller: {
    use: "mobility, soft-tissue work, and recovery between training days",
    value: "The texture gives enough feedback for daily use while staying compact for small training spaces.",
    finish: "A clean surface, firm body, and simple storage footprint make it an easy recovery add-on.",
    features: [
      "Textured surface for targeted pressure",
      "Compact recovery tool for daily use",
      "Easy to store near mats or bands",
      "Supports warmup and cooldown routines",
    ],
  },
  rings: {
    use: "bodyweight training, core work, and small-space accessory movements",
    value: "The tool adds training variety without needing a rack expansion or a large machine.",
    finish: "Compact hardware and simple contact points make it useful for repeat home sessions.",
    features: [
      "Compact bodyweight training tool",
      "Small footprint stores easily",
      "Useful for accessory and core movements",
      "Designed for quick home-gym use",
    ],
  },
  rope: {
    use: "conditioning, warmups, and quick finishers",
    value: "The handle and cable format keeps conditioning simple enough to use often.",
    finish: "A compact coil, responsive handles, and durable cable make the rope easy to keep in rotation.",
    features: [
      "Compact rope format stores easily",
      "Handles shaped for repeat conditioning work",
      "Cable or rope profile selected by training style",
      "Quick use for warmups and finishers",
    ],
  },
  agility: {
    use: "footwork, warmups, and conditioning drills",
    value: "The kit gives a simple way to add movement work without heavy equipment.",
    finish: "Flexible materials and a carry-friendly footprint make the pieces easy to set up, pack down, and repeat.",
    features: [
      "Lightweight pieces for quick drills",
      "Packable format for garage or field use",
      "Supports footwork and conditioning sessions",
      "Durable materials for repeated setup",
    ],
  },
  maintenance: {
    use: "equipment care, storage, and keeping training gear ready between sessions",
    value: "Small care items help keep sleeves, bars, chalk stations, and storage areas cleaner between weekly sessions.",
    finish: "The format is simple, useful, and sized to live near the rest of the training gear.",
    features: [
      "Sized as a practical gear add-on",
      "Helps keep training gear organized",
      "Compact storage for garage shelves",
      "Simple care format for regular weekly use",
    ],
  },
  bundle: {
    use: "a focused training setup around one goal",
    value: "The kit keeps the right pieces together for the lift, warmup, or station it is built around.",
    finish: "The bundle reads like a practical shelf pull: the customer can see what ships and where it fits.",
    features: [
      "Gear mix built around one training goal",
      "Contents listed on item page",
      "Accessories chosen for the same training day",
      "Built for home and garage-gym progression",
    ],
  },
};

const colorPairs = [
  ["#111827", "#f97316"],
  ["#164e63", "#22d3ee"],
  ["#3f3f46", "#84cc16"],
  ["#1f2937", "#ef4444"],
  ["#0f172a", "#f59e0b"],
  ["#27272a", "#38bdf8"],
  ["#14532d", "#facc15"],
  ["#4a044e", "#fb7185"],
];

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function money(value) {
  return Number(value.toFixed(2));
}

function uniqueName(variant, base, categorySlug) {
  if (categorySlug === "bundles") return `EVO ${variant} Training Bundle`;
  if (/^(classic|standard|compact)$/i.test(variant)) return `EVO ${base}`;
  return `EVO ${variant} ${base}`;
}

function profileFor(product) {
  return copyProfiles[product.visual] ?? copyProfiles.maintenance;
}

function productLabel(product) {
  return product.name.replace(/^EVO\s+/, "").replace(/\bin\./gi, "inch");
}

function narrativeLabel(product) {
  return productLabel(product).replace(/\bin\./gi, "inch");
}

function primaryMaterial(product) {
  return product.material.split(",")[0].replace(/^and\s+/, "").trim();
}

function copyMaterial(product) {
  const material = primaryMaterial(product);
  const normalized = product.name.toLowerCase();

  if (normalized.includes("barbell brush")) return "brass bristles and a textured polymer handle";
  if (normalized.includes("sleeve care spray")) return "a matte trigger bottle and gym-safe cleaning formula";
  if (normalized.includes("equipment tag")) return "matte polymer tags and black metal key rings";
  if (normalized.includes("training bundle")) {
    return productContents(product).toLowerCase();
  }

  return material.replace(/\bwith\b/g, "plus");
}

function sentenceCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function shortUsePhrase(product) {
  const name = product.name.toLowerCase();

  if (name.includes("grip starter")) return "pull-day grip work, rows, and deadlifts";
  if (name.includes("pull-up builder")) return "pull-up practice, band assistance, and hand protection";
  if (name.includes("deadlift support")) return "deadlift days that need belt, strap, wrap, and collar support";
  if (name.includes("home strength")) return "starter home strength work with weights, bands, and straps";
  if (name.includes("bench starter")) return "bench-focused home training with a ready accessory stack";
  if (name.includes("back support") || name.includes("lifting belt")) return "bracing on hinges, rows, and loaded carries";
  if (name.includes("knee sleeve")) return "knee warmth on squat, lunge, and leg days";
  if (name.includes("elbow sleeve")) return "elbow warmth on presses and accessory volume";
  if (name.includes("wrist wrap")) return "wrist position on pressing and front-rack work";
  if (name.includes("figure-8")) return "deadlift pulls where strap security matters";
  if (name.includes("lifting strap")) return "deadlifts, rows, shrugs, and pull-day volume";
  if (name.includes("palm grip")) return "palm traction on bars, dumbbells, and handles";
  if (name.includes("pull-up hand grip")) return "pull-up bar traction without a full glove";
  if (name.includes("chalk")) return "cleaner bar contact and low-mess grip prep";
  if (name.includes("dumbbell")) return "home dumbbell progressions and balanced loading";
  if (name.includes("plate")) return "straightforward Olympic loading and storage";
  if (name.includes("training bar")) return "compound barbell days in a compact gym";
  if (name.includes("collar")) return "fast Olympic plate changes and barbell lockup";
  if (name.includes("bench")) return "pressing, rows, and compact strength sessions";
  if (name.includes("j-hook")) return "rack setup and cleaner bar placement";
  if (name.includes("platform") || name.includes("calf block")) return "floor work, step patterns, and mobility drills";
  if (name.includes("band") || name.includes("hip circle")) return "warmups, assistance work, and accessory volume";
  if (name.includes("foam roller") || name.includes("lacrosse") || name.includes("stretch strap")) {
    return "mobility, warmups, and recovery work";
  }
  if (name.includes("slider") || name.includes("ab wheel")) return "core work and compact bodyweight training";
  if (name.includes("jump rope")) return "warmups, conditioning, and quick finishers";
  if (name.includes("agility") || name.includes("cone")) return "footwork, warmups, and field-style drills";
  if (name.includes("finger") || name.includes("gripper")) return "hand strength and grip accessory work";
  if (name.includes("hot-cold")) return "post-training recovery and packable soreness care";
  if (name.includes("brush") || name.includes("spray") || name.includes("tag")) {
    return "equipment upkeep, storage, and weekly reset";
  }

  return profileFor(product).use;
}

function packagePhrase(product) {
  const name = product.name.toLowerCase();

  if (name.includes("bundle")) return "packed as a multi-piece training kit";
  if (name.includes("pair")) return "shipped as a matched pair";
  if (name.includes("set")) return "grouped as a set for one training station";
  if (name.includes("kit") || name.includes("system")) return "packed as a compact kit with the pieces kept together";
  return "packed as one focused training item";
}

function benefitPhrase(product) {
  const name = product.name.toLowerCase();

  if (name.includes("brush") || name.includes("spray") || name.includes("tag")) return "easier gear cleanup";
  if (name.includes("belt") || name.includes("sleeve") || name.includes("wrap")) return "more secure bracing";
  if (name.includes("strap") || name.includes("grip") || name.includes("chalk")) return "a stronger hold on pulling sets";
  if (name.includes("dumbbell") || name.includes("plate") || name.includes("bar")) return "straightforward loading";
  if (name.includes("bench") || name.includes("rack") || name.includes("j-hook")) return "stable bar placement";
  if (name.includes("band") || name.includes("mobility") || name.includes("roller")) return "warmup and recovery work";
  if (name.includes("rope") || name.includes("agility") || name.includes("cone")) return "conditioning work";
  if (name.includes("bundle")) return "a training bundle";
  return "useful training work";
}

function materialRole(product) {
  const name = product.name.toLowerCase();

  if (name.includes("belt")) return "bracing support and quick adjustment";
  if (name.includes("sleeve")) return "compression, warmth, and repeated joint movement";
  if (name.includes("wrap")) return "wrist tension and fast set-to-set adjustment";
  if (name.includes("strap") || name.includes("hook")) return "bar contact, pulling support, and grip assistance";
  if (name.includes("grip") || name.includes("chalk")) return "hand contact, traction, and pull-day consistency";
  if (name.includes("dumbbell")) return "balanced loading, grip, and clean storage";
  if (name.includes("plate") || name.includes("bar")) return "barbell loading, handling, and storage";
  if (name.includes("collar")) return "bar sleeve lockup and fast plate changes";
  if (name.includes("bench") || name.includes("j-hook")) return "lifting-station stability and repeated bar placement";
  if (name.includes("platform") || name.includes("calf block")) return "floor contact, step work, and accessory movement";
  if (name.includes("band") || name.includes("hip circle")) return "portable resistance and warmup work";
  if (name.includes("roller") || name.includes("lacrosse") || name.includes("stretch strap")) return "mobility pressure, warmups, and recovery work";
  if (name.includes("slider") || name.includes("ab wheel")) return "core training and repeat bodyweight sessions";
  if (name.includes("jump rope") || name.includes("agility") || name.includes("cone")) return "conditioning, cadence, and quick drills";
  if (name.includes("finger") || name.includes("gripper")) return "hand-strength accessory work";
  if (name.includes("brush") || name.includes("spray") || name.includes("tag")) return "gear care, cleanup, and storage organization";
  if (name.includes("bundle")) return "one training bundle";

  return "regular weekly training";
}

function productNoun(product) {
  const name = product.name.toLowerCase();

  if (name.includes("bundle")) return "kit";
  if (name.includes("pair")) return "pair";
  if (name.includes("set")) return "set";
  if (name.includes("system")) return "system";
  if (name.includes("belt")) return "belt";
  if (name.includes("jump rope")) return "rope";
  if (name.includes("chalk")) return "chalk kit";
  if (name.includes("brush") || name.includes("spray") || name.includes("tag")) return "care item";
  if (name.includes("j-hook") || name.includes("rack")) return "rack accessory";
  if (name.includes("platform") || name.includes("flooring") || name.includes("calf block")) return "platform piece";
  if (name.includes("bar")) return "barbell piece";
  if (name.includes("bench")) return "bench piece";
  if (name.includes("tool")) return "tool";
  return "training item";
}

function productAngle(product) {
  const name = product.name.toLowerCase();
  const label = narrativeLabel(product);
  const use = shortUsePhrase(product);
  const weight = name.match(/(\d+)\s?lb/)?.[1];
  const length = name.match(/(\d+)\s?in\./)?.[1];

  if (name.includes("light core back support")) {
    return `${label} gives lighter bracing support for hinge days, rows, and loaded carries without feeling like a powerlifting-only belt.`;
  }
  if (name.includes("everyday core back support")) {
    return `${label} is the daily brace option for lifters who want more structure around pulls, rows, and garage-gym volume.`;
  }
  if (name.includes("quick-lock lifting belt")) {
    return `${label} adds a faster lever-style feel for athletes who reset belt tightness between heavy sets and accessory work.`;
  }
  if (name.includes("knee sleeve")) {
    const tier = name.includes("training") ? "moderate compression" : "lighter warmth";
    return `${label} brings ${tier} to squat, lunge, and leg-press work when cold knees make warmups feel longer than they should.`;
  }
  if (name.includes("elbow sleeve")) {
    const tier = name.includes("power") ? "firmer support" : name.includes("training") ? "midweight compression" : "light warmth";
    return `${label} gives ${tier} for pressing volume, rows, and accessory work that can leave elbows irritated.`;
  }
  if (name.includes("wrist wrap")) {
    const article = length === "18" ? "an" : "a";
    return `${label} gives lifters ${article} ${length ?? "training"}-inch wrap length for pressing, front-rack work, and set-to-set wrist position changes.`;
  }
  if (name.includes("figure-8")) {
    const size = name.includes("competition") ? "competition" : name.includes("large") ? "large" : name.includes("medium") ? "medium" : "small";
    return `${label} is the ${size} figure-8 option for deadlift days where strap security matters more than quick unwrap speed.`;
  }
  if (name.includes("lifting strap")) {
    const style = name.includes("padded") ? "adds wrist padding" : name.includes("heavy") ? "uses a heavier pull-day profile" : name.includes("long") ? "adds extra wrap length" : "keeps the strap simple";
    return `${label} ${style} for rows, shrugs, Romanian deadlifts, and pull sessions where grip fades before the back is finished.`;
  }
  if (name.includes("lifting hook")) {
    return `${label} shifts more of a pulling set onto the hook and padded wrist support when a plain strap is not enough help.`;
  }
  if (name.includes("palm grip")) {
    return `${label} keeps the palm covered for bars, dumbbells, and handles while staying smaller than a full glove.`;
  }
  if (name.includes("pull-up hand grip")) {
    const fingers = name.includes("three") ? "three-finger" : "two-finger";
    return `${label} gives a ${fingers} contact patch for pull-up bars and hanging work without hiding the whole hand.`;
  }
  if (name.includes("chalk")) {
    return `${label} keeps grip prep close to the platform, rack, or pull-up station while limiting loose chalk clutter.`;
  }
  if (name.includes("dumbbell")) {
    return `${label} adds a matched ${weight ?? ""} lb pair for presses, rows, carries, and single-leg work where balanced loading matters.`;
  }
  if (name.includes("plate")) {
    const load = weight ? `${weight} lb` : "Olympic";
    return `${label} gives a matched ${load} loading option for barbell progressions, warmup jumps, and cleaner plate storage.`;
  }
  if (name.includes("training bar")) {
    return `${label} is the core barbell piece for compound lifting when the gym needs one reliable 45 lb bar before specialty bars.`;
  }
  if (name.includes("collar")) {
    const lock = name.includes("aluminum") ? "machined-feel" : name.includes("quick") ? "quick-lock" : "spring";
    return `${label} gives a ${lock} hold for Olympic sleeves so plate changes do not slow the session down.`;
  }
  if (name.includes("bench")) {
    return `${label} gives a compact pressing and row station for lifters building a real setup in a garage or spare room.`;
  }
  if (name.includes("j-hook")) {
    return `${label} refreshes the rack contact point for squats, presses, and pulls where bar placement needs to feel deliberate.`;
  }
  if (name.includes("platform") || name.includes("calf block")) {
    return `${label} creates a defined surface for step work, calf work, mobility drills, and floor-based accessory training.`;
  }
  if (name.includes("band") || name.includes("hip circle")) {
    return `${label} adds portable resistance for warmups, pull-up assistance, glute work, and accessory sessions.`;
  }
  if (name.includes("roller") || name.includes("lacrosse") || name.includes("stretch strap")) {
    return `${label} keeps recovery work close to the training area instead of sending the athlete hunting for a separate mobility kit.`;
  }
  if (name.includes("slider") || name.includes("ab wheel")) {
    return `${label} turns a small footprint into core work, anti-extension training, and quick bodyweight accessories.`;
  }
  if (name.includes("jump rope")) {
    return `${label} covers warmups and finishers for athletes who want conditioning gear that stores in a drawer.`;
  }
  if (name.includes("agility") || name.includes("cone")) {
    return `${label} lays out footwork, warmup, and field-style drills without needing a permanent lane.`;
  }
  if (name.includes("finger") || name.includes("gripper")) {
    return `${label} adds grip-specific accessory work for climbers, lifters, and athletes who train hands separately.`;
  }
  if (name.includes("hot-cold")) {
    return `${label} keeps heat-and-cold recovery close to the gym bag for sore elbows, knees, shoulders, and lower backs.`;
  }
  if (name.includes("barbell brush")) {
    return `${label} helps clean chalk and skin buildup from bar knurl before it turns into a weekly maintenance chore.`;
  }
  if (name.includes("sleeve care spray")) {
    return `${label} gives sleeves, wraps, and fabric accessories a quick reset between sweaty training days.`;
  }
  if (name.includes("equipment tag")) {
    return `${label} labels bars, bands, handles, and storage spots so a shared gym area stays organized.`;
  }
  if (name.includes("grip starter")) {
    return `${label} puts straps, wraps, chalk, and palm coverage into one pull-day starter stack.`;
  }
  if (name.includes("pull-up builder")) {
    return `${label} combines a pull-up bar, assistance band, and hand protection for building more weekly pull-up volume.`;
  }
  if (name.includes("deadlift support")) {
    return `${label} groups belt, figure-8 straps, wraps, and collars around one clear heavy-pull use case.`;
  }
  if (name.includes("home strength")) {
    return `${label} gives a small-space starter kit with load, resistance, bench support, and pulling accessories.`;
  }
  if (name.includes("bench starter")) {
    return `${label} pairs the main bench station with starter barbell pieces and pressing accessories.`;
  }

  return `${label} supports ${use} with a concrete role in a home, garage, or studio gym.`;
}

function constructionProof(product) {
  const name = product.name.toLowerCase();
  const material = copyMaterial(product);
  const label = narrativeLabel(product);

  if (name.includes("dumbbell")) return `${label} uses rubber heads, a chrome-knurled handle, and a matched-pair format that feels closer to commercial gym equipment than a loose single weight.`;
  if (name.includes("plate")) return `${label} uses ${material} construction to keep markings, handling, and storage clear during repeated bar loading.`;
  if (name.includes("training bar")) return `${label} balances shaft feel, sleeve hardware, and knurling for repeated weekly strength work rather than one specialty lift.`;
  if (name.includes("collar")) return `${label} stays small enough to live beside the rack while treating bar lockup like part of the lift.`;
  if (name.includes("bench")) return `${label} uses dense padding, stitched vinyl, and a steel frame for a stable feel for home strength work.`;
  if (name.includes("belt")) return `${label} uses ${material} for bracing support that still adjusts and stores cleanly.`;
  if (name.includes("sleeve")) return `${label} uses bound edges and a textured compression body to help the pair keep its shape through repeated warmups and work sets.`;
  if (name.includes("wrap")) return `${label} uses elastic tension, thumb loops, and hook-and-loop tabs so support can change quickly between lifts.`;
  if (name.includes("strap") || name.includes("hook")) return `${label} uses stitched webbing, reinforced contact points, and a paired design for the pulling station.`;
  if (name.includes("grip")) return `${label} uses a defined contact surface, finger coverage, and breathable backing for traction without full-glove bulk.`;
  if (name.includes("chalk")) return `${label} keeps chalk contained enough for home training while staying ready at the bar.`;
  if (name.includes("band") || name.includes("hip circle")) return `${label} uses resistance material selected for repeated stretching, compact storage, and quick use at the rack or mat.`;
  if (name.includes("roller") || name.includes("lacrosse") || name.includes("stretch strap")) return `${label} combines surface texture with a compact footprint that belongs near the mat for warmups and cooldowns.`;
  if (name.includes("slider") || name.includes("ab wheel")) return `${label} keeps contact edges, handles, or wheel hardware simple enough for repeat core sessions.`;
  if (name.includes("jump rope")) return `${label} keeps cadence work quick to start and easy to put away after the finisher.`;
  if (name.includes("agility") || name.includes("cone")) return `${label} uses flexible pieces and a carry-friendly footprint for garage, driveway, or field work.`;
  if (name.includes("brush") || name.includes("spray") || name.includes("tag")) return `${label} is sized to stay near the rack, shelf, or gear bin so cleanup and organization happen while the gym is still open.`;
  if (name.includes("bundle")) return `${label} combines pieces that belong in the same training area.`;

  return `The ${material} construction gives ${label} enough substance for regular weekly training.`;
}

function ownershipProof(product) {
  const contents = productContents(product);
  const label = productLabel(product);
  return `${label} ships with ${contents.toLowerCase()}.`;
}

function productShortDescription(product) {
  const use = shortUsePhrase(product);
  const material = copyMaterial(product);
  const benefit = benefitPhrase(product);
  const noun = productNoun(product);
  const variants = [
    `Compact ${noun} for ${use}, using ${material} for garage-gym training.`,
    `Adds ${benefit} to ${use} for regular weekly use.`,
    `Built for ${use} with ${material}.`,
    `Useful ${noun} for garage-gym training and repeat sessions.`,
    `Suits ${use} when durability and easy storage matter.`,
  ];

  return variants[product.index % variants.length];
}

function productFinishSentence(product) {
  const packageText = sentenceCase(packagePhrase(product).replace(/\bin\./gi, "inch").replace(/\.$/, ""));
  const use = shortUsePhrase(product);
  const contents = productContents(product).toLowerCase();
  const variants = [
    `Store it dry between sessions after unpacking the ${packageText.toLowerCase()}.`,
    `Wipe it down after training and keep it near the station it belongs to.`,
    ownershipProof(product),
    `Sized for ${use}, with materials chosen for home-gym use.`,
    `Ships with ${contents}. Keep it dry and stored off damp floors.`,
  ];

  return variants[(product.index + 2) % variants.length];
}

function productDescription(product) {
  return `${productAngle(product)} ${constructionProof(product)} ${productFinishSentence(product)}`;
}

function productFeatures(product) {
  const profile = profileFor(product);
  const use = shortUsePhrase(product);
  const material = copyMaterial(product);
  const materialVerb = /\bwith\b/i.test(material) ? "combines" : "uses";
  const featureDetail = profile.features[(product.index + 1) % profile.features.length];
  const warranty = product.price >= 100 ? "1-year limited equipment warranty" : "90-day accessory warranty";

  return [
    `Made for ${use}.`,
    `${sentenceCase(materialVerb)} ${material} for ${materialRole(product)}.`,
    `Ships as ${productContents(product).toLowerCase()}.`,
    `${featureDetail}; covered by a ${warranty}.`,
  ];
}

function productContents(product) {
  const name = product.name.toLowerCase();
  const label = productLabel(product).replace(/\bin\./gi, "inch");

  if (name.includes("grip starter")) return "Lifting straps, wrist wraps, chalk pouch, and palm grip pads";
  if (name.includes("pull-up builder")) return "Doorway pull-up bar, assisted pull-up band, and pull-up hand grips";
  if (name.includes("deadlift support")) return "Lifting belt, figure-8 straps, wrist wraps, and Olympic bar collars";
  if (name.includes("home strength")) return "Adjustable dumbbell, resistance bands, compact bench pad, and lifting straps";
  if (name.includes("bench starter")) return "Adjustable training bench, compact barbell stand, and two small Olympic plates";
  if (name.includes("olympic barbell")) return "Olympic barbell, bumper plates, spring collars, and vertical plate tree";
  if (name.includes("conditioning core")) return "Jump rope, medicine ball, compact sandbag, and agility ladder";
  if (name.includes("mobility daily")) return "Foam roller, stretch strap, lacrosse ball pair, and training mat";
  if (name.includes("plate progression")) return "Matched Olympic plates in multiple weights";
  if (name.includes("garage gym launch")) return "Barbell, bumper plates, adjustable bench, dumbbells, and storage hardware";

  if (name.includes("tube set")) return "Resistance tubes, foam handles, carabiners, and door anchor";
  if (name.includes("mini band")) return "Mini bands and compact carry pouch";
  if (name.includes("hip circle")) return "One reinforced hip-circle band";
  if (name.includes("chalk ball")) return "Chalk ball pouch and compact storage";
  if (name.includes("block pack")) return "Chalk blocks and storage packaging";
  if (name.includes("liquid chalk")) return "One liquid chalk bottle";
  if (name.includes("lacrosse ball")) return "Massage ball pair and mesh storage pouch";
  if (name.includes("core slider")) return "Two core sliders";
  if (name.includes("ladder agility")) return "Agility ladder and carry strap";
  if (name.includes("cone set")) return "Stackable disc cones and carry strap";
  if (name.includes("barbell brush")) return "One barbell brush";
  if (name.includes("sleeve care spray")) return "One sleeve care spray bottle";
  if (name.includes("equipment tag")) return "Equipment tags and black metal rings";

  if (name.includes("dumbbell") && name.includes("pair")) return "Matched rubber hex dumbbell pair";
  if (name.includes("plate") && name.includes("pair")) return "Matched Olympic plate pair";
  if (name.includes("collar") && name.includes("pair")) return "Matched Olympic bar collar pair";
  if (name.includes("sleeve") && name.includes("pair")) return "Matched compression sleeve pair";
  if (name.includes("wrap") && name.includes("pair")) return "Matched wrist wrap pair";
  if (name.includes("strap") && name.includes("pair")) return "Matched lifting strap pair";
  if (name.includes("grip") && name.includes("pair")) return "Matched hand grip pair";
  if (name.includes("hook") && name.includes("pair")) return "Matched lifting hook pair";
  if (name.includes("pair")) return `Matched ${label.toLowerCase()}`;
  if (name.includes("set")) return label;
  if (name.includes("kit") || name.includes("system")) return `${label} kit`;

  return `One ${label}`;
}

function productSpecs(product) {
  return {
    Material: product.material,
    "Training role": shortUsePhrase(product),
    "What ships": productContents(product),
    Warranty: product.price >= 100 ? "1-year limited equipment warranty" : "90-day accessory warranty",
    "Ships from": "United States fulfillment network",
  };
}

function inventoryFor(index) {
  return 18 + ((index * 13) % 84);
}

function compareAt(price) {
  const uplift = price < 50 ? 1.25 : price < 150 ? 1.22 : 1.18;
  return money(Math.ceil((price * uplift) / 5) * 5 - 0.05);
}

function productMaterial(name, fallback) {
  const normalized = name.toLowerCase();

  if (normalized.includes("mini band")) return "layered latex mini bands and compact carry pouch";
  if (normalized.includes("tube set")) return "latex resistance tubes, foam handles, carabiners, and door anchor";
  if (normalized.includes("hip circle")) return "woven elastic loop with reinforced stitching";
  if (normalized.includes("foam roller")) return "high-density textured EVA foam";
  if (normalized.includes("lacrosse ball")) return "dense rubber massage balls and mesh storage pouch";
  if (normalized.includes("stretch strap")) return "woven nylon strap with reinforced loop segments";
  if (normalized.includes("core slider")) return "low-friction polymer discs with rubberized grip edges";
  if (normalized.includes("ab wheel")) return "textured rubber wheel, steel axle, and foam handles";
  if (normalized.includes("speed jump rope")) return "coated steel cable, sealed bearings, and knurled aluminum handles";
  if (normalized.includes("beaded jump rope")) return "segmented polymer beads, braided cord, and molded handles";
  if (normalized.includes("cordless jump rope")) return "weighted rubber end balls, short cords, and textured handles";
  if (normalized.includes("ladder agility")) return "woven nylon side straps and flexible polymer rungs";
  if (normalized.includes("cone set")) return "stackable polymer disc cones and woven carry strap";
  if (normalized.includes("finger trainer")) return "matte silicone finger loops and central tension hub";
  if (normalized.includes("adjustable gripper")) return "spring steel coil, textured handles, and resistance adjuster";
  if (normalized.includes("hot-cold")) return "soft gel pack with stitched nylon outer shell";
  if (normalized.includes("barbell brush")) return "brass bristles and textured polymer handle";
  if (normalized.includes("sleeve care spray")) return "matte trigger bottle and gym-safe cleaning formula";
  if (normalized.includes("equipment tag")) return "matte polymer tags and black metal key rings";
  if (normalized.includes("grip starter")) {
    return "woven cotton straps, elastic wrist wraps, chalk pouch, and synthetic palm pads";
  }
  if (normalized.includes("pull-up builder")) {
    return "powder-coated steel pull-up bar, latex band, and synthetic hand grips";
  }
  if (normalized.includes("deadlift support")) {
    return "padded leather belt, reinforced webbing straps, elastic wrist wraps, and steel collars";
  }
  if (normalized.includes("home strength")) {
    return "rubber-coated load, latex resistance bands, padded bench surface, and woven straps";
  }
  if (normalized.includes("bench starter")) {
    return "powder-coated steel, dense bench padding, and cast-iron training plates";
  }

  return fallback;
}

function retailPrice(price, categorySlug) {
  if (categorySlug === "bundles") return money(price);

  const multiplier =
    price < 25
      ? 1.05
      : price < 50
        ? 1.08
        : price < 100
          ? 1.15
          : price < 200
            ? 1.08
            : price < 300
              ? 1.04
              : 1;

  const rounded = Math.ceil((price * multiplier) / 5) * 5 - 0.05;
  return money(Math.min(499.95, Math.max(19.95, rounded)));
}

function productShotSubject(product) {
  const name = product.name.toLowerCase();
  if (name.includes("grip starter")) {
    return "one pair of black padded lifting straps, one pair of black wrist wraps with orange accent stitching, one chalk ball pouch, and one pair of black palm grip pads, arranged as a compact starter kit";
  }
  if (name.includes("pull-up builder")) {
    return "one doorway pull-up bar, one assisted pull-up resistance band, and one pair of pull-up hand grips, arranged as a clear pull-up training kit";
  }
  if (name.includes("deadlift support")) {
    return "one black leather lifting belt, one pair of figure-8 deadlift straps, one pair of wrist wraps, and one pair of bar collars, arranged as a clear deadlift support kit";
  }
  if (name.includes("home strength")) {
    return "one adjustable dumbbell, one pair of resistance bands, one compact bench pad, and one pair of lifting straps, arranged as a home strength kit";
  }
  if (name.includes("bench starter")) {
    return "one adjustable training bench with a compact barbell stand and two small Olympic plates, arranged as a bench starter set";
  }
  if (name.includes("olympic barbell")) {
    return "one Olympic barbell, black bumper plates, spring collars, and a vertical plate tree, arranged as a complete barbell starter set";
  }
  if (name.includes("conditioning core")) {
    return "one jump rope, one medicine ball, one compact sandbag, and one agility ladder, arranged as a conditioning kit";
  }
  if (name.includes("mobility daily")) {
    return "one foam roller, one stretch strap, one lacrosse ball pair, and one training mat, arranged as a mobility kit";
  }
  if (name.includes("plate progression")) {
    return "matched black Olympic plates in multiple weights, neatly nested with collars visible";
  }
  if (name.includes("garage gym launch")) {
    return "one barbell, two bumper plates, one adjustable bench, one pair of dumbbells, and storage hardware, arranged as a compact garage gym launch kit";
  }
  return `${product.name}, a single clear ${product.visual.replaceAll("-", " ")} product for strength training, made from ${product.material}`;
}

function imagePrompt(product) {
  const subject = productShotSubject(product);
  return [
    "Use case: product-mockup",
    `Asset type: high-volume Shopify ecommerce product image for product ${product.sku}`,
    `Primary request: photorealistic studio product photo of ${product.name}`,
    "Scene/backdrop: realistic premium gym product photo on dark rubber flooring with a softly blurred concrete wall or rack-room background; no white seamless background",
    `Subject: ${subject}`,
    "Style/medium: realistic commercial product photography shot with a DSLR, natural lens perspective, real shadows, real material wear, no warped geometry",
    "Composition/framing: square crop, product centered in the foreground, three-quarter angle, all included items fully visible and easy to identify",
    "Lighting/mood: directional softbox plus ambient gym light, controlled highlights, grounded contact shadows, high clarity",
    "Color palette: dark rubber floor, charcoal/black equipment, brushed steel, leather where relevant, restrained orange accent only when natural",
    "Constraints: no people, no readable text, no logos, no watermark, no extra products beyond this SKU, no clutter, no pile, no abstract shapes, no white background, product must be immediately understandable",
  ].join("\n");
}

function svgFor(product) {
  const [dark, accent] = colorPairs[product.index % colorPairs.length];
  const pale = "#f8fafc";
  const shadow = "#cbd5e1";
  const title = product.name.replace(/[<>&]/g, "");
  const common = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="${pale}" offset="0"/>
      <stop stop-color="#e5e7eb" offset="1"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#0f172a" flood-opacity=".18"/>
    </filter>
  </defs>
  <rect width="1200" height="1200" rx="54" fill="url(#bg)"/>
  <circle cx="960" cy="220" r="128" fill="${accent}" opacity=".14"/>
  <circle cx="220" cy="950" r="190" fill="${dark}" opacity=".08"/>
  <ellipse cx="600" cy="858" rx="360" ry="58" fill="${shadow}" opacity=".55"/>`;

  const drawings = {
    belt: `
      <g filter="url(#shadow)" transform="translate(195 360)">
        <path d="M70 220 C180 90 540 58 800 180 C870 214 910 270 878 320 C836 386 648 388 480 346 C318 306 164 356 70 300 Z" fill="${dark}"/>
        <path d="M148 218 C280 138 532 126 720 198" fill="none" stroke="${accent}" stroke-width="42" stroke-linecap="round"/>
        <rect x="690" y="192" width="145" height="118" rx="20" fill="#e5e7eb" stroke="${dark}" stroke-width="22"/>
        <rect x="733" y="228" width="60" height="45" rx="10" fill="${accent}"/>
      </g>`,
    sleeves: `
      <g filter="url(#shadow)">
        <path d="M330 320 h190 l80 500 h-260 z" fill="${dark}"/>
        <path d="M680 320 h190 l-10 500 h-260 z" fill="${dark}"/>
        <path d="M355 438 h190 M648 438 h190" stroke="${accent}" stroke-width="34" stroke-linecap="round"/>
        <path d="M390 710 h155 M615 710 h155" stroke="#fff" stroke-opacity=".28" stroke-width="22" stroke-linecap="round"/>
      </g>`,
    wraps: `
      <g filter="url(#shadow)">
        <path d="M295 520 C430 375 685 360 820 510 C700 670 460 690 295 520Z" fill="${dark}"/>
        <path d="M385 516 C485 438 635 432 735 516" fill="none" stroke="${accent}" stroke-width="52" stroke-linecap="round"/>
        <circle cx="815" cy="512" r="54" fill="#e5e7eb" stroke="${dark}" stroke-width="18"/>
      </g>`,
    straps: `
      <g filter="url(#shadow)" fill="none" stroke-linecap="round">
        <path d="M390 300 C250 500 315 760 505 830" stroke="${dark}" stroke-width="70"/>
        <path d="M715 300 C855 500 790 760 600 830" stroke="${dark}" stroke-width="70"/>
        <path d="M420 410 C520 510 600 560 720 690" stroke="${accent}" stroke-width="42"/>
      </g>`,
    hooks: `
      <g filter="url(#shadow)">
        <rect x="322" y="330" width="220" height="190" rx="44" fill="${dark}"/>
        <rect x="658" y="330" width="220" height="190" rx="44" fill="${dark}"/>
        <path d="M430 514 C378 670 482 792 610 720" fill="none" stroke="${accent}" stroke-width="58" stroke-linecap="round"/>
        <path d="M770 514 C822 670 718 792 590 720" fill="none" stroke="${accent}" stroke-width="58" stroke-linecap="round"/>
      </g>`,
    grips: `
      <g filter="url(#shadow)">
        <path d="M365 315 h210 c40 0 74 34 74 74 v325 c0 58-48 106-106 106H395c-66 0-116-58-104-123l54-292c9-52 47-90 20-90Z" fill="${dark}"/>
        <path d="M625 315 h210 c-27 0 11 38 20 90l54 292c12 65-38 123-104 123H657c-58 0-106-48-106-106V389c0-40 34-74 74-74Z" fill="${dark}"/>
        <circle cx="470" cy="474" r="42" fill="${accent}"/>
        <circle cx="730" cy="474" r="42" fill="${accent}"/>
      </g>`,
    chalk: `
      <g filter="url(#shadow)">
        <rect x="370" y="350" width="460" height="430" rx="54" fill="${dark}"/>
        <rect x="430" y="410" width="340" height="120" rx="24" fill="${accent}"/>
        <circle cx="500" cy="655" r="50" fill="#f8fafc"/>
        <circle cx="620" cy="655" r="42" fill="#e5e7eb"/>
        <circle cx="720" cy="655" r="34" fill="#f8fafc"/>
      </g>`,
    dumbbell: `
      <g filter="url(#shadow)">
        <rect x="250" y="470" width="155" height="260" rx="28" fill="${dark}"/>
        <rect x="795" y="470" width="155" height="260" rx="28" fill="${dark}"/>
        <rect x="382" y="545" width="436" height="110" rx="55" fill="#d1d5db"/>
        <rect x="430" y="520" width="340" height="160" rx="70" fill="${accent}"/>
        <rect x="210" y="505" width="90" height="190" rx="24" fill="${dark}"/>
        <rect x="900" y="505" width="90" height="190" rx="24" fill="${dark}"/>
      </g>`,
    kettlebell: `
      <g filter="url(#shadow)">
        <path d="M455 460 C455 290 745 290 745 460 h-90 c0-66-110-66-110 0Z" fill="${dark}"/>
        <path d="M350 570 C350 410 850 410 850 570 C850 760 750 840 600 840 C450 840 350 760 350 570Z" fill="${dark}"/>
        <circle cx="600" cy="615" r="98" fill="${accent}"/>
      </g>`,
    "medicine-ball": `
      <g filter="url(#shadow)">
        <circle cx="600" cy="590" r="255" fill="${dark}"/>
        <path d="M392 515 C498 575 702 575 808 515" fill="none" stroke="${accent}" stroke-width="38"/>
        <path d="M448 736 C555 682 645 682 752 736" fill="none" stroke="#fff" stroke-opacity=".24" stroke-width="32"/>
        <path d="M600 338 C520 470 520 710 600 842 C680 710 680 470 600 338Z" fill="none" stroke="${accent}" stroke-width="28"/>
      </g>`,
    rack: `
      <g filter="url(#shadow)" stroke-linecap="round" stroke-linejoin="round">
        <path d="M320 820 V330 M880 820 V330 M290 820 H910" stroke="${dark}" stroke-width="72"/>
        <path d="M360 420 H840 M360 600 H840" stroke="${accent}" stroke-width="48"/>
        <path d="M430 300 h340" stroke="${dark}" stroke-width="50"/>
      </g>`,
    plate: `
      <g filter="url(#shadow)">
        <circle cx="600" cy="590" r="280" fill="${dark}"/>
        <circle cx="600" cy="590" r="104" fill="#f8fafc"/>
        <circle cx="600" cy="590" r="58" fill="${accent}"/>
        <path d="M600 310 A280 280 0 0 1 855 705" fill="none" stroke="${accent}" stroke-width="42" stroke-linecap="round"/>
      </g>`,
    barbell: `
      <g filter="url(#shadow)" stroke-linecap="round">
        <path d="M205 590 H995" stroke="#d1d5db" stroke-width="62"/>
        <path d="M255 470 V710 M335 450 V730 M865 450 V730 M945 470 V710" stroke="${dark}" stroke-width="72"/>
        <path d="M430 590 H770" stroke="${accent}" stroke-width="40"/>
      </g>`,
    collars: `
      <g filter="url(#shadow)">
        <circle cx="475" cy="590" r="170" fill="${dark}"/>
        <circle cx="475" cy="590" r="78" fill="#f8fafc"/>
        <circle cx="725" cy="590" r="170" fill="${dark}"/>
        <circle cx="725" cy="590" r="78" fill="#f8fafc"/>
        <rect x="405" y="390" width="390" height="55" rx="22" fill="${accent}"/>
      </g>`,
    bench: `
      <g filter="url(#shadow)" stroke-linecap="round" stroke-linejoin="round">
        <path d="M310 530 H860" stroke="${dark}" stroke-width="100"/>
        <path d="M390 610 L300 810 M780 610 L890 810 M560 610 V810" stroke="${dark}" stroke-width="42"/>
        <path d="M355 490 H820" stroke="${accent}" stroke-width="38"/>
      </g>`,
    platform: `
      <g filter="url(#shadow)">
        <path d="M250 680 L530 410 H950 L670 760 H250Z" fill="${dark}"/>
        <path d="M360 660 L560 470 H830" fill="none" stroke="${accent}" stroke-width="40" stroke-linecap="round"/>
        <path d="M500 760 L780 410" stroke="#fff" stroke-opacity=".2" stroke-width="26"/>
      </g>`,
    pullup: `
      <g filter="url(#shadow)" stroke-linecap="round" stroke-linejoin="round">
        <path d="M285 795 V330 H915 V795" stroke="${dark}" stroke-width="64"/>
        <path d="M330 345 H870" stroke="${accent}" stroke-width="48"/>
        <path d="M420 345 V455 M780 345 V455" stroke="${dark}" stroke-width="46"/>
      </g>`,
    bands: `
      <g filter="url(#shadow)" fill="none" stroke-linecap="round">
        <ellipse cx="530" cy="590" rx="210" ry="290" stroke="${dark}" stroke-width="58"/>
        <ellipse cx="675" cy="590" rx="210" ry="290" stroke="${accent}" stroke-width="42"/>
      </g>`,
    roller: `
      <g filter="url(#shadow)">
        <rect x="295" y="470" width="610" height="220" rx="110" fill="${dark}"/>
        <circle cx="405" cy="580" r="110" fill="${accent}"/>
        <path d="M470 500 H820 M470 580 H820 M470 660 H820" stroke="#fff" stroke-opacity=".22" stroke-width="20" stroke-linecap="round"/>
      </g>`,
    rings: `
      <g filter="url(#shadow)" fill="none" stroke-linecap="round">
        <path d="M420 280 V520 M780 280 V520" stroke="${dark}" stroke-width="38"/>
        <circle cx="420" cy="640" r="126" stroke="${accent}" stroke-width="52"/>
        <circle cx="780" cy="640" r="126" stroke="${accent}" stroke-width="52"/>
      </g>`,
    rope: `
      <g filter="url(#shadow)" fill="none" stroke-linecap="round">
        <path d="M385 340 C215 620 390 850 600 850 C810 850 985 620 815 340" stroke="${dark}" stroke-width="42"/>
        <path d="M350 300 L430 430 M850 300 L770 430" stroke="${accent}" stroke-width="60"/>
      </g>`,
    "battle-rope": `
      <g filter="url(#shadow)" fill="none" stroke-linecap="round">
        <path d="M260 620 C360 430 470 810 600 620 C730 430 840 810 940 620" stroke="${dark}" stroke-width="72"/>
        <path d="M285 720 C385 530 485 910 610 720 C735 530 835 910 935 720" stroke="${accent}" stroke-width="56"/>
      </g>`,
    sandbag: `
      <g filter="url(#shadow)">
        <rect x="300" y="445" width="600" height="300" rx="92" fill="${dark}"/>
        <path d="M420 450 C445 390 755 390 780 450" fill="none" stroke="${accent}" stroke-width="52" stroke-linecap="round"/>
        <rect x="405" y="545" width="390" height="70" rx="35" fill="#fff" opacity=".18"/>
      </g>`,
    sled: `
      <g filter="url(#shadow)" stroke-linecap="round" stroke-linejoin="round">
        <path d="M335 790 H885 M405 710 H810 M455 435 V710 M730 435 V710" stroke="${dark}" stroke-width="58"/>
        <path d="M455 435 H730 M592 335 V710" stroke="${accent}" stroke-width="48"/>
      </g>`,
    agility: `
      <g filter="url(#shadow)" stroke-linecap="round" stroke-linejoin="round">
        <path d="M360 315 L280 835 M840 315 L920 835" stroke="${dark}" stroke-width="44"/>
        <path d="M355 430 H845 M330 565 H870 M305 700 H895" stroke="${accent}" stroke-width="38"/>
      </g>`,
    maintenance: `
      <g filter="url(#shadow)">
        <rect x="375" y="430" width="450" height="300" rx="58" fill="${dark}"/>
        <path d="M460 430 V350 H740 V430" fill="none" stroke="${dark}" stroke-width="48"/>
        <path d="M460 560 H740 M460 635 H690" stroke="${accent}" stroke-width="34" stroke-linecap="round"/>
      </g>`,
    bundle: `
      <g filter="url(#shadow)">
        <rect x="325" y="430" width="250" height="280" rx="44" fill="${dark}"/>
        <rect x="620" y="360" width="250" height="350" rx="44" fill="${dark}"/>
        <circle cx="450" cy="760" r="92" fill="${accent}"/>
        <path d="M690 462 H800 M690 550 H800 M690 638 H760" stroke="${accent}" stroke-width="32" stroke-linecap="round"/>
      </g>`,
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-labelledby="title">
  <title>${title}</title>
  ${common}
  ${drawings[product.visual] ?? drawings.bundle}
</svg>
`;
}

function buildProducts() {
  const products = [];
  for (const family of families) {
    const category = categoryBySlug.get(family.category);
    for (const [variant, price] of family.variants) {
      const displayPrice = retailPrice(price, family.category);
      const name = uniqueName(variant, family.base, family.category);
      const index = products.length;
      const slug = slugify(name);
      const product = {
        index,
        id: `evo-${String(index + 1).padStart(4, "0")}`,
        sku: `AXS-${String(index + 1).padStart(4, "0")}`,
        slug,
        name,
        category: category.name,
        categorySlug: category.slug,
        visual: family.visual,
        price: displayPrice,
        compareAt: compareAt(displayPrice),
        material: productMaterial(name, family.material),
        image: `/product-images/${slug}`,
        inventory: inventoryFor(index),
        badges: productBadges(category.slug, price),
      };
      product.shortDescription = productShortDescription(product);
      product.description = productDescription(product);
      product.features = productFeatures(product);
      product.specs = productSpecs(product);
      product.imagePrompt = imagePrompt(product);
      products.push(product);
    }
  }

  return selectCatalogProducts(products, targetCount).map((product, index) => {
    const reindexedProduct = {
      ...product,
      index,
      id: `evo-${String(index + 1).padStart(4, "0")}`,
      sku: `AXS-${String(index + 1).padStart(4, "0")}`,
    };
    reindexedProduct.imagePrompt = imagePrompt(reindexedProduct);
    return reindexedProduct;
  });
}

function productBadges(categorySlug, price) {
  if (price >= 200) return ["Heavy-duty", "Room anchor"];
  if (price >= 125 && price <= 150) return ["Station piece", "Rack-ready"];

  const badgesByCategory = {
    "lifting-supports": ["Brace gear", "Daily training"],
    "straps-grips": ["Pull-day piece", "Grip shelf"],
    "dumbbells-weights": ["Matched load", "Room lane"],
    "plates-bars": ["Bar station", "Rack hardware"],
    "benches-racks": ["Press station", "Floor-space piece"],
    "pullup-mobility": ["Warmup shelf", "Mobility work"],
    conditioning: ["Open-lane work", "Compact storage"],
    "storage-recovery": ["Care shelf", "Reset work"],
    bundles: ["Station bundle", "Grouped gear"],
  };

  return badgesByCategory[categorySlug] ?? ["Training piece", "Room fit"];
}

function selectCatalogProducts(products, count) {
  if (count >= products.length) return products;

  const preferredQuotas = {
    "lifting-supports": 12,
    "straps-grips": 16,
    "dumbbells-weights": 8,
    "plates-bars": 8,
    "benches-racks": 4,
    "pullup-mobility": 8,
    conditioning: 7,
    "storage-recovery": 4,
    bundles: 5,
  };
  const mustCarrySlugs = new Set([
    "evo-light-core-back-support-belt",
    "evo-long-cotton-lifting-strap-pair",
    "evo-medium-figure-8-deadlift-strap-pair",
    "evo-large-figure-8-deadlift-strap-pair",
    "evo-10-lb-rubber-hex-dumbbell-pair",
    "evo-15-lb-rubber-hex-dumbbell-pair",
    "evo-20-lb-rubber-hex-dumbbell-pair",
    "evo-25-lb-rubber-hex-dumbbell-pair",
    "evo-30-lb-rubber-hex-dumbbell-pair",
    "evo-35-lb-rubber-hex-dumbbell-pair",
    "evo-40-lb-rubber-hex-dumbbell-pair",
    "evo-45-lb-rubber-hex-dumbbell-pair",
    "evo-45-lb-olympic-bumper-plate-pair",
    "evo-45-lb-olympic-training-bar",
    "evo-adjustable-training-bench",
    "evo-grip-starter-training-bundle",
    "evo-pull-up-builder-training-bundle",
    "evo-deadlift-support-training-bundle",
    "evo-home-strength-training-bundle",
    "evo-bench-starter-training-bundle",
  ]);

  const categoryOrder = categories.map((category) => category.slug);
  const groups = new Map(
    categoryOrder.map((slug) => [
      slug,
      products.filter((product) => product.categorySlug === slug),
    ]),
  );

  let selected = categoryOrder.flatMap((slug) => {
    const group = groups.get(slug) ?? [];
    const quota = Math.min(group.length, preferredQuotas[slug] ?? 3);
    const anchored = group.filter((product) => mustCarrySlugs.has(product.slug));
    const lowPriceRest = group
      .filter((product) => !mustCarrySlugs.has(product.slug))
      .sort((a, b) => a.price - b.price);

    return [...anchored.slice(0, quota), ...lowPriceRest.slice(0, Math.max(0, quota - anchored.length))];
  });

  const keepSelected = new Set(
    [...mustCarrySlugs].filter((slug) => selected.some((product) => product.slug === slug)),
  );

  while (selected.length > count) {
    const removable =
      selected
        .filter((product) => !keepSelected.has(product.slug))
        .sort((a, b) => b.price - a.price)[0] ?? selected.sort((a, b) => b.price - a.price)[0];
    selected = selected.filter((product) => product.slug !== removable.slug);
  }

  while (selected.length < count) {
    const selectedSlugs = new Set(selected.map((product) => product.slug));
    const nextProduct =
      products
        .filter((product) => !selectedSlugs.has(product.slug) && !mustCarrySlugs.has(product.slug))
        .sort((a, b) => a.price - b.price)[0] ??
      products.filter((product) => !selectedSlugs.has(product.slug)).sort((a, b) => a.price - b.price)[0];
    if (!nextProduct) break;
    selected.push(nextProduct);
  }

  const originalOrder = new Map(products.map((product, index) => [product.slug, index]));
  return selected.sort((a, b) => (originalOrder.get(a.slug) ?? 0) - (originalOrder.get(b.slug) ?? 0));
}

function typeScriptCatalog(products) {
  const publicCategories = categories.map((category) => ({
    ...category,
    productCount: products.filter((product) => product.categorySlug === category.slug).length,
  }));
  const publicProducts = products.map((product) => {
    const publicProduct = { ...product };
    delete publicProduct.imagePrompt;
    return publicProduct;
  });

  return `export type Product = {
  index: number;
  id: string;
  sku: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  visual: string;
  price: number;
  compareAt: number;
  material: string;
  image: string;
  inventory: number;
  badges: string[];
  shortDescription: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
};

export type Category = {
  slug: string;
  name: string;
  deck: string;
  accent: string;
  productCount: number;
};

export const categories = ${JSON.stringify(publicCategories, null, 2)} satisfies Category[];

export const products = ${JSON.stringify(publicProducts, null, 2)} satisfies Product[];

const featuredProductSlugs = [
  "evo-deadlift-support-training-bundle",
  "evo-bench-starter-training-bundle",
  "evo-home-strength-training-bundle",
  "evo-grip-starter-training-bundle",
  "evo-pull-up-builder-training-bundle",
  "evo-10-lb-rubber-hex-dumbbell-pair",
  "evo-25-lb-rubber-hex-dumbbell-pair",
  "evo-45-lb-rubber-hex-dumbbell-pair",
];

export const featuredProducts: Product[] = featuredProductSlugs
  .map((slug) => products.find((product) => product.slug === slug) as Product | undefined)
  .filter((product): product is Product => product !== undefined);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.categorySlug === slug);
}

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter((candidate) => candidate.slug !== product.slug && candidate.categorySlug === product.categorySlug)
    .slice(0, limit);
}
`;
}

async function main() {
  const products = buildProducts();
  await mkdir(productDir, { recursive: true });
  await mkdir(join(process.cwd(), "src", "data"), { recursive: true });
  await mkdir(join(process.cwd(), "data"), { recursive: true });

  await Promise.all(
    products.map((product) =>
      writeFile(join(productDir, `${product.slug}.svg`), svgFor(product)),
    ),
  );

  await writeFile(catalogPath, typeScriptCatalog(products));
  await writeFile(
    promptPath,
    `${JSON.stringify(
      products.map(({ sku, slug, name, imagePrompt }) => ({
        sku,
        slug,
        name,
        output: `public/products/${slug}.png`,
        prompt: imagePrompt,
      })),
      null,
      2,
    )}\n`,
  );

  const average = products.reduce((sum, product) => sum + product.price, 0) / products.length;
  const sweetSpot = products.filter((product) => product.price >= 100 && product.price <= 175).length;
  console.log(`Generated ${products.length} SKUs`);
  console.log(`Single-SKU catalog average: $${average.toFixed(2)}`);
  console.log(`${sweetSpot} SKUs are priced between $100 and $175`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
