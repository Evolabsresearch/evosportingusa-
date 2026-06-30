export type Product = {
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

export const categories = [
  {
    "slug": "lifting-supports",
    "name": "Lifting Supports",
    "deck": "Belts, sleeves, wraps, and supports for squats, pulls, rows, and carries.",
    "accent": "#d9480f",
    "productCount": 12
  },
  {
    "slug": "straps-grips",
    "name": "Straps & Grips",
    "deck": "Lifting straps, figure-8 straps, grip pads, chalk, and collars.",
    "accent": "#0f766e",
    "productCount": 16
  },
  {
    "slug": "chalk-grip-basics",
    "name": "Chalk & Grip Basics",
    "deck": "Dry chalk, tape, pouches, and brushes for pull-day hand contact.",
    "accent": "#0891b2",
    "productCount": 10
  },
  {
    "slug": "gym-bag-essentials",
    "name": "Gym Bag Essentials",
    "deck": "Towels, pouches, wash bags, and small organizers that move with the session.",
    "accent": "#7c3aed",
    "productCount": 10
  },
  {
    "slug": "setup-mobility-minis",
    "name": "Setup & Mobility Minis",
    "deck": "Bands, markers, anchors, sliders, and small mobility tools for warmup corners.",
    "accent": "#ca8a04",
    "productCount": 10
  },
  {
    "slug": "dumbbells-weights",
    "name": "Dumbbells & Weights",
    "deck": "Rubber hex dumbbell pairs from 10 lb to 45 lb.",
    "accent": "#2563eb",
    "productCount": 8
  },
  {
    "slug": "plates-bars",
    "name": "Plates, Bars & Collars",
    "deck": "Olympic bars, bumper plates, cast-iron plates, and collars.",
    "accent": "#111827",
    "productCount": 8
  },
  {
    "slug": "benches-racks",
    "name": "Benches & Racks",
    "deck": "Adjustable bench, compact stand, rack attachments, and floor protection.",
    "accent": "#7c2d12",
    "productCount": 4
  },
  {
    "slug": "pullup-mobility",
    "name": "Pull-Up & Mobility",
    "deck": "Doorway pull-up bar, bands, grips, rollers, and mobility straps.",
    "accent": "#6d28d9",
    "productCount": 8
  },
  {
    "slug": "conditioning",
    "name": "Conditioning",
    "deck": "Jump ropes, agility pieces, hand strength, and loaded carry tools.",
    "accent": "#be123c",
    "productCount": 7
  },
  {
    "slug": "storage-recovery",
    "name": "Storage & Recovery",
    "deck": "Cleaning kits, hot/cold support, storage hooks, and gym care basics.",
    "accent": "#4d7c0f",
    "productCount": 4
  },
  {
    "slug": "bundles",
    "name": "Training Bundles",
    "deck": "Heavy pull, bench, grip, pull-up, and home strength bundles.",
    "accent": "#b45309",
    "productCount": 5
  }
] satisfies Category[];

export const products = [
  {
    "index": 0,
    "id": "evo-0001",
    "sku": "AXS-0001",
    "slug": "evo-light-core-back-support-belt",
    "name": "EVO Light Core Back Support Belt",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "belt",
    "price": 36.80,
    "compareAt": 47.35,
    "material": "layered neoprene, nylon webbing, and brushed steel roller buckle",
    "image": "/product-images/evo-light-core-back-support-belt",
    "inventory": 18,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "This is a compact belt for bracing on hinges, rows, and loaded carries, using layered neoprene for garage-gym training.",
    "description": "Gives lighter bracing support for hinge days, rows, and loaded carries without feeling like a powerlifting-only belt. Uses layered neoprene for bracing support that still adjusts and stores cleanly. Ships with one light core back support belt.",
    "features": [
      "Adds support for bracing on hinges, rows, and loaded carries.",
      "Uses layered neoprene, nylon webbing, and brushed steel roller buckle for regular training.",
      "Ships as one Light Core Back Support Belt.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "layered neoprene, nylon webbing, and brushed steel roller buckle",
      "Training role": "bracing on hinges, rows, and loaded carries",
      "What ships": "One Light Core Back Support Belt",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 1,
    "id": "evo-0002",
    "sku": "AXS-0002",
    "slug": "evo-everyday-core-back-support-belt",
    "name": "EVO Everyday Core Back Support Belt",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "belt",
    "price": 50.40,
    "compareAt": 67.20,
    "material": "layered neoprene, nylon webbing, and brushed steel roller buckle",
    "image": "/product-images/evo-everyday-core-back-support-belt",
    "inventory": 31,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "Brings support to bracing on hinges, rows, and loaded carries for regular weekly use.",
    "description": "This is the daily brace option for lifters who want more structure around pulls, rows, and garage-gym volume. Uses layered neoprene for bracing support that still adjusts and stores cleanly. Sized for bracing on hinges, rows, and loaded carries, with materials chosen for home-gym use.",
    "features": [
      "Adds support for bracing on hinges, rows, and loaded carries.",
      "Uses layered neoprene, nylon webbing, and brushed steel roller buckle for regular training.",
      "Ships as one Everyday Core Back Support Belt.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "layered neoprene, nylon webbing, and brushed steel roller buckle",
      "Training role": "bracing on hinges, rows, and loaded carries",
      "What ships": "One Everyday Core Back Support Belt",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 2,
    "id": "evo-0003",
    "sku": "AXS-0003",
    "slug": "evo-4-in-nylon-quick-lock-lifting-belt",
    "name": "EVO 4 in. Nylon Quick-Lock Lifting Belt",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "belt",
    "price": 59.35,
    "compareAt": 75.55,
    "material": "ripstop nylon, reinforced stitching, and cam-lock buckle",
    "image": "/product-images/evo-4-in-nylon-quick-lock-lifting-belt",
    "inventory": 70,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "4 inch Nylon Quick-Lock Lifting Belt suits bracing on hinges, rows, and loaded carries when durability and easy storage matter.",
    "description": "4 inch Nylon Quick-Lock Lifting Belt adds a faster lever-style feel for athletes who reset belt tightness between heavy sets and accessory work. 4 inch Nylon Quick-Lock Lifting Belt uses ripstop nylon for bracing support that still adjusts and stores cleanly. 4 inch Nylon Quick-Lock Lifting Belt should be aired out after sweaty sessions and stored flat or rolled without crushing the closure.",
    "features": [
      "Adds support for bracing on hinges, rows, and loaded carries.",
      "Uses ripstop nylon, reinforced stitching, and cam-lock buckle for regular training.",
      "Ships as one 4 inch Nylon Quick-Lock Lifting Belt.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "ripstop nylon, reinforced stitching, and cam-lock buckle",
      "Training role": "bracing on hinges, rows, and loaded carries",
      "What ships": "One 4 inch Nylon Quick-Lock Lifting Belt",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 3,
    "id": "evo-0004",
    "sku": "AXS-0004",
    "slug": "evo-light-compression-knee-sleeve-pair",
    "name": "EVO Light Compression Knee Sleeve Pair",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "sleeves",
    "price": 44.40,
    "compareAt": 55.55,
    "material": "7 mm neoprene with heat-bonded seams",
    "image": "/product-images/evo-light-compression-knee-sleeve-pair",
    "inventory": 90,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "Adds knee warmth on squat, lunge, and leg days with 7 mm neoprene plus heat-bonded seams for regular training.",
    "description": "Brings lighter warmth to squat, lunge, and leg-press work when cold knees make warmups feel longer than they should. Uses bound edges and a textured compression body to help the pair keep its shape through repeated warmups and work sets. Ships with matched compression sleeve pair. The sleeve details include warranty coverage and care expectations.",
    "features": [
      "Adds support for knee warmth on squat, lunge, and leg days.",
      "Combines 7 mm neoprene with heat-bonded seams for regular training.",
      "Ships as matched compression sleeve pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "7 mm neoprene with heat-bonded seams",
      "Training role": "knee warmth on squat, lunge, and leg days",
      "What ships": "Matched compression sleeve pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 4,
    "id": "evo-0005",
    "sku": "AXS-0005",
    "slug": "evo-training-compression-knee-sleeve-pair",
    "name": "EVO Training Compression Knee Sleeve Pair",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "sleeves",
    "price": 61.60,
    "compareAt": 78.40,
    "material": "7 mm neoprene with heat-bonded seams",
    "image": "/product-images/evo-training-compression-knee-sleeve-pair",
    "inventory": 19,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "7 mm knee sleeves for warmer squat, lunge, and leg-day work.",
    "description": "Brings moderate compression to squat, lunge, and leg-press work when cold knees make warmups feel longer than they should. Uses bound edges and a textured compression body to help the pair keep its shape through repeated warmups and work sets. Ships as matched compression sleeve pair. Care notes and warranty coverage are listed with the sleeve details.",
    "features": [
      "Adds support for knee warmth on squat, lunge, and leg days.",
      "Combines 7 mm neoprene with heat-bonded seams for regular training.",
      "Ships as matched compression sleeve pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "7 mm neoprene with heat-bonded seams",
      "Training role": "knee warmth on squat, lunge, and leg days",
      "What ships": "Matched compression sleeve pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 5,
    "id": "evo-0006",
    "sku": "AXS-0006",
    "slug": "evo-light-elbow-sleeve-pair",
    "name": "EVO Light Elbow Sleeve Pair",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "sleeves",
    "price": 37.65,
    "compareAt": 48.45,
    "material": "breathable neoprene with abrasion-resistant outer knit",
    "image": "/product-images/evo-light-elbow-sleeve-pair",
    "inventory": 71,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "Adds elbow warmth on presses and accessory volume with breathable neoprene plus abrasion-resistant outer knit for regular training.",
    "description": "Gives light warmth for pressing volume, rows, and accessory work that can leave elbows irritated. Uses bound edges and a textured compression body to help the pair keep its shape through repeated warmups and work sets. Should be aired out after sweaty sessions and stored flat or rolled without crushing the closure.",
    "features": [
      "Adds support for elbow warmth on presses and accessory volume.",
      "Combines breathable neoprene with abrasion-resistant outer knit for regular training.",
      "Ships as matched compression sleeve pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "breathable neoprene with abrasion-resistant outer knit",
      "Training role": "elbow warmth on presses and accessory volume",
      "What ships": "Matched compression sleeve pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 6,
    "id": "evo-0007",
    "sku": "AXS-0007",
    "slug": "evo-training-elbow-sleeve-pair",
    "name": "EVO Training Elbow Sleeve Pair",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "sleeves",
    "price": 49.60,
    "compareAt": 66.15,
    "material": "breathable neoprene with abrasion-resistant outer knit",
    "image": "/product-images/evo-training-elbow-sleeve-pair",
    "inventory": 84,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "Midweight elbow sleeves for pressing volume, rows, and accessory work.",
    "description": "Gives midweight compression for pressing volume, rows, and accessory work that can leave elbows irritated. Uses bound edges and a textured compression body to help the pair keep its shape through repeated warmups and work sets. Should be aired out after sweaty sessions and stored flat or rolled without crushing the closure.",
    "features": [
      "Adds support for elbow warmth on presses and accessory volume.",
      "Combines breathable neoprene with abrasion-resistant outer knit for regular training.",
      "Ships as matched compression sleeve pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "breathable neoprene with abrasion-resistant outer knit",
      "Training role": "elbow warmth on presses and accessory volume",
      "What ships": "Matched compression sleeve pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 7,
    "id": "evo-0008",
    "sku": "AXS-0008",
    "slug": "evo-power-elbow-sleeve-pair",
    "name": "EVO Power Elbow Sleeve Pair",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "sleeves",
    "price": 69.30,
    "compareAt": 85.30,
    "material": "breathable neoprene with abrasion-resistant outer knit",
    "image": "/product-images/evo-power-elbow-sleeve-pair",
    "inventory": 97,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "Suits elbow warmth on presses and accessory volume when durability and easy storage matter.",
    "description": "Gives firmer support for pressing volume, rows, and accessory work that can leave elbows irritated. Uses bound edges and a textured compression body to help the pair keep its shape through repeated warmups and work sets. Should be aired out after sweaty sessions and stored flat or rolled without crushing the closure.",
    "features": [
      "Adds support for elbow warmth on presses and accessory volume.",
      "Combines breathable neoprene with abrasion-resistant outer knit for regular training.",
      "Ships as matched compression sleeve pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "breathable neoprene with abrasion-resistant outer knit",
      "Training role": "elbow warmth on presses and accessory volume",
      "What ships": "Matched compression sleeve pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 8,
    "id": "evo-0009",
    "sku": "AXS-0009",
    "slug": "evo-12-in-stabilizing-wrist-wrap-pair",
    "name": "EVO 12 in. Stabilizing Wrist Wrap Pair",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "wraps",
    "price": 21.30,
    "compareAt": 26.65,
    "material": "high-tension elastic, cotton binding, and reinforced thumb loop",
    "image": "/product-images/evo-12-in-stabilizing-wrist-wrap-pair",
    "inventory": 39,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "12 inch Stabilizing Wrist Wrap Pair brings support to wrist position on pressing and front-rack work for regular weekly use.",
    "description": "12 inch Stabilizing Wrist Wrap Pair gives lifters a 12-inch wrap length for pressing, front-rack work, and set-to-set wrist position changes. 12 inch Stabilizing Wrist Wrap Pair uses elastic tension, thumb loops, and hook-and-loop tabs so support can change quickly between lifts. 12 inch Stabilizing Wrist Wrap Pair is sized for wrist position on pressing and front-rack work, with materials chosen for home-gym use.",
    "features": [
      "12 in in. wrap length for pressing and front-rack wrist position.",
      "Elastic tension, cotton binding, and thumb loop give the 12 in in. pair its hold.",
      "Ships as a matched 12 in in. wrist wrap pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "high-tension elastic, cotton binding, and reinforced thumb loop",
      "Training role": "wrist position on pressing and front-rack work",
      "What ships": "Matched wrist wrap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 9,
    "id": "evo-0010",
    "sku": "AXS-0010",
    "slug": "evo-18-in-stabilizing-wrist-wrap-pair",
    "name": "EVO 18 in. Stabilizing Wrist Wrap Pair",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "wraps",
    "price": 27.00,
    "compareAt": 37.80,
    "material": "high-tension elastic, cotton binding, and reinforced thumb loop",
    "image": "/product-images/evo-18-in-stabilizing-wrist-wrap-pair",
    "inventory": 52,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "18 inch Stabilizing Wrist Wrap Pair upgrades wrist position on pressing and front-rack work with high-tension elastic for regular training.",
    "description": "18 inch Stabilizing Wrist Wrap Pair gives lifters an 18-inch wrap length for pressing, front-rack work, and set-to-set wrist position changes. 18 inch Stabilizing Wrist Wrap Pair uses elastic tension, thumb loops, and hook-and-loop tabs so support can change quickly between lifts. 18 inch Stabilizing Wrist Wrap Pair should be aired out after sweaty sessions and stored flat or rolled without crushing the closure.",
    "features": [
      "18 in in. wrap length for pressing and front-rack wrist position.",
      "Elastic tension, cotton binding, and thumb loop give the 18 in in. pair its hold.",
      "Ships as a matched 18 in in. wrist wrap pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "high-tension elastic, cotton binding, and reinforced thumb loop",
      "Training role": "wrist position on pressing and front-rack work",
      "What ships": "Matched wrist wrap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 10,
    "id": "evo-0011",
    "sku": "AXS-0011",
    "slug": "evo-24-in-stabilizing-wrist-wrap-pair",
    "name": "EVO 24 in. Stabilizing Wrist Wrap Pair",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "wraps",
    "price": 31.65,
    "compareAt": 42.25,
    "material": "high-tension elastic, cotton binding, and reinforced thumb loop",
    "image": "/product-images/evo-24-in-stabilizing-wrist-wrap-pair",
    "inventory": 65,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "24 inch Stabilizing Wrist Wrap Pair adds support for garage-gym training.",
    "description": "24 inch Stabilizing Wrist Wrap Pair gives lifters a 24-inch wrap length for pressing, front-rack work, and set-to-set wrist position changes. 24 inch Stabilizing Wrist Wrap Pair uses elastic tension, thumb loops, and hook-and-loop tabs so support can change quickly between lifts. 24 inch Stabilizing Wrist Wrap Pair should be aired out after sweaty sessions and stored flat or rolled without crushing the closure.",
    "features": [
      "24 in in. wrap length for pressing and front-rack wrist position.",
      "Elastic tension, cotton binding, and thumb loop give the 24 in in. pair its hold.",
      "Ships as a matched 24 in in. wrist wrap pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "high-tension elastic, cotton binding, and reinforced thumb loop",
      "Training role": "wrist position on pressing and front-rack work",
      "What ships": "Matched wrist wrap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 11,
    "id": "evo-0012",
    "sku": "AXS-0012",
    "slug": "evo-pro-30-in-stabilizing-wrist-wrap-pair",
    "name": "EVO Pro 30 in. Stabilizing Wrist Wrap Pair",
    "category": "Lifting Supports",
    "categorySlug": "lifting-supports",
    "visual": "wraps",
    "price": 37.40,
    "compareAt": 48.10,
    "material": "high-tension elastic, cotton binding, and reinforced thumb loop",
    "image": "/product-images/evo-pro-30-in-stabilizing-wrist-wrap-pair",
    "inventory": 78,
    "badges": [
      "Brace gear",
      "Daily training"
    ],
    "shortDescription": "Pro 30 inch Stabilizing Wrist Wrap Pair suits wrist position on pressing and front-rack work when durability and easy storage matter.",
    "description": "Pro 30 inch Stabilizing Wrist Wrap Pair gives lifters a 30-inch wrap length for pressing, front-rack work, and set-to-set wrist position changes. Pro 30 inch Stabilizing Wrist Wrap Pair uses elastic tension, thumb loops, and hook-and-loop tabs so support can change quickly between lifts. Pro 30 inch Stabilizing Wrist Wrap Pair should be aired out after sweaty sessions and stored flat or rolled without crushing the closure.",
    "features": [
      "Pro 30 in in. wrap length for pressing and front-rack wrist position.",
      "Elastic tension, cotton binding, and thumb loop give the pro 30 in in. pair its hold.",
      "Ships as a matched pro 30 in in. wrist wrap pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "high-tension elastic, cotton binding, and reinforced thumb loop",
      "Training role": "wrist position on pressing and front-rack work",
      "What ships": "Matched wrist wrap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 12,
    "id": "evo-0013",
    "sku": "AXS-0013",
    "slug": "evo-cotton-lifting-strap-pair",
    "name": "EVO Cotton Lifting Strap Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "straps",
    "price": 21.95,
    "compareAt": 27.45,
    "material": "dense cotton webbing with stitched loop ends",
    "image": "/product-images/evo-cotton-lifting-strap-pair",
    "inventory": 91,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "This is a compact pair for deadlifts, rows, shrugs, and pull-day volume, using dense cotton webbing plus stitched loop ends for garage-gym training.",
    "description": "Keeps the strap simple for rows, shrugs, Romanian deadlifts, and pull sessions where grip fades before the back is finished. Uses stitched webbing, reinforced contact points, and a paired design for the pulling station. Ships with matched lifting strap pair.",
    "features": [
      "Supports hand contact for deadlifts, rows, shrugs, and pull-day volume.",
      "Combines dense cotton webbing with stitched loop ends for regular training.",
      "Ships as matched lifting strap pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "dense cotton webbing with stitched loop ends",
      "Training role": "deadlifts, rows, shrugs, and pull-day volume",
      "What ships": "Matched lifting strap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 13,
    "id": "evo-0014",
    "sku": "AXS-0014",
    "slug": "evo-padded-cotton-lifting-strap-pair",
    "name": "EVO Padded Cotton Lifting Strap Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "straps",
    "price": 26.35,
    "compareAt": 36.90,
    "material": "dense cotton webbing with stitched loop ends",
    "image": "/product-images/evo-padded-cotton-lifting-strap-pair",
    "inventory": 20,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Padded Gives lifters a firmer hold for deadlifts, rows, shrugs, and pull-day volume.",
    "description": "Padded Adds wrist padding for rows, shrugs, Romanian deadlifts, and pull sessions where grip fades before the back is finished. Padded Uses stitched webbing, reinforced contact points, and a paired design for the pulling station. Padded Sized for deadlifts, rows, shrugs, and pull-day volume, with materials chosen for home-gym use.",
    "features": [
      "Padded Supports hand contact for deadlifts, rows, shrugs, and pull-day volume.",
      "Padded Combines dense cotton webbing with stitched loop ends for regular training.",
      "Padded Ships as matched lifting strap pair.",
      "Padded Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "dense cotton webbing with stitched loop ends",
      "Training role": "deadlifts, rows, shrugs, and pull-day volume",
      "What ships": "Matched lifting strap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 14,
    "id": "evo-0015",
    "sku": "AXS-0015",
    "slug": "evo-long-cotton-lifting-strap-pair",
    "name": "EVO Long Cotton Lifting Strap Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "straps",
    "price": 32.20,
    "compareAt": 42.95,
    "material": "dense cotton webbing with stitched loop ends",
    "image": "/product-images/evo-long-cotton-lifting-strap-pair",
    "inventory": 33,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Long Adds deadlifts, rows, shrugs, and pull-day volume with dense cotton webbing plus stitched loop ends for regular training.",
    "description": "Long Adds extra wrap length for rows, shrugs, Romanian deadlifts, and pull sessions where grip fades before the back is finished. Long Uses stitched webbing, reinforced contact points, and a paired design for the pulling station. Long Ships with matched lifting strap pair. Care notes sit beside the strap details.",
    "features": [
      "Long Supports hand contact for deadlifts, rows, shrugs, and pull-day volume.",
      "Long Combines dense cotton webbing with stitched loop ends for regular training.",
      "Long Ships as matched lifting strap pair.",
      "Long Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "dense cotton webbing with stitched loop ends",
      "Training role": "deadlifts, rows, shrugs, and pull-day volume",
      "What ships": "Matched lifting strap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 15,
    "id": "evo-0016",
    "sku": "AXS-0016",
    "slug": "evo-heavy-cotton-lifting-strap-pair",
    "name": "EVO Heavy Cotton Lifting Strap Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "straps",
    "price": 37.55,
    "compareAt": 48.30,
    "material": "dense cotton webbing with stitched loop ends",
    "image": "/product-images/evo-heavy-cotton-lifting-strap-pair",
    "inventory": 46,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Heavy Keeps grip work more secure during garage-gym training.",
    "description": "Heavy Uses a heavier pull-day profile for rows, shrugs, Romanian deadlifts, and pull sessions where grip fades before the back is finished. Heavy Uses stitched webbing, reinforced contact points, and a paired design for the pulling station. Heavy Ships as matched lifting strap pair. Care notes and warranty coverage are shown with the pulling accessories.",
    "features": [
      "Heavy Supports hand contact for deadlifts, rows, shrugs, and pull-day volume.",
      "Heavy Combines dense cotton webbing with stitched loop ends for regular training.",
      "Heavy Ships as matched lifting strap pair.",
      "Heavy Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "dense cotton webbing with stitched loop ends",
      "Training role": "deadlifts, rows, shrugs, and pull-day volume",
      "What ships": "Matched lifting strap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 16,
    "id": "evo-0017",
    "sku": "AXS-0017",
    "slug": "evo-small-figure-8-deadlift-strap-pair",
    "name": "EVO Small Figure-8 Deadlift Strap Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "straps",
    "price": 28.05,
    "compareAt": 39.30,
    "material": "double-layer cotton webbing with bar-tack reinforcement",
    "image": "/product-images/evo-small-figure-8-deadlift-strap-pair",
    "inventory": 59,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Suits deadlift pulls where strap security matters when durability and easy storage matter.",
    "description": "This is the small figure-8 option for deadlift days where strap security matters more than quick unwrap speed. Uses stitched webbing, reinforced contact points, and a paired design for the pulling station. Should be dried after chalk-heavy sessions and kept near the bar for pull days.",
    "features": [
      "Small figure-8 loops for deadlift pulls where strap security matters.",
      "Double-layer cotton webbing and bar-tack reinforcement suit the small pair.",
      "Ships as a matched small figure-8 strap pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "double-layer cotton webbing with bar-tack reinforcement",
      "Training role": "deadlift pulls where strap security matters",
      "What ships": "Matched lifting strap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 17,
    "id": "evo-0018",
    "sku": "AXS-0018",
    "slug": "evo-medium-figure-8-deadlift-strap-pair",
    "name": "EVO Medium Figure-8 Deadlift Strap Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "straps",
    "price": 32.55,
    "compareAt": 43.40,
    "material": "double-layer cotton webbing with bar-tack reinforcement",
    "image": "/product-images/evo-medium-figure-8-deadlift-strap-pair",
    "inventory": 72,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "This is a compact pair for deadlift pulls where strap security matters, using double-layer cotton webbing plus bar-tack reinforcement for garage-gym training.",
    "description": "This is the medium figure-8 option for deadlift days where strap security matters more than quick unwrap speed. Uses stitched webbing, reinforced contact points, and a paired design for the pulling station. Ships with matched lifting strap pair.",
    "features": [
      "Medium figure-8 loops for deadlift pulls where strap security matters.",
      "Double-layer cotton webbing and bar-tack reinforcement suit the medium pair.",
      "Ships as a matched medium figure-8 strap pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "double-layer cotton webbing with bar-tack reinforcement",
      "Training role": "deadlift pulls where strap security matters",
      "What ships": "Matched lifting strap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 18,
    "id": "evo-0019",
    "sku": "AXS-0019",
    "slug": "evo-large-figure-8-deadlift-strap-pair",
    "name": "EVO Large Figure-8 Deadlift Strap Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "straps",
    "price": 36.75,
    "compareAt": 47.30,
    "material": "double-layer cotton webbing with bar-tack reinforcement",
    "image": "/product-images/evo-large-figure-8-deadlift-strap-pair",
    "inventory": 85,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Gives lifters a firmer hold for deadlift pulls where strap security matters.",
    "description": "This is the large figure-8 option for deadlift days where strap security matters more than quick unwrap speed. Uses stitched webbing, reinforced contact points, and a paired design for the pulling station. Sized for deadlift pulls where strap security matters, with materials chosen for home-gym use.",
    "features": [
      "Large figure-8 loops for deadlift pulls where strap security matters.",
      "Double-layer cotton webbing and bar-tack reinforcement suit the large pair.",
      "Ships as a matched large figure-8 strap pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "double-layer cotton webbing with bar-tack reinforcement",
      "Training role": "deadlift pulls where strap security matters",
      "What ships": "Matched lifting strap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 19,
    "id": "evo-0020",
    "sku": "AXS-0020",
    "slug": "evo-competition-figure-8-deadlift-strap-pair",
    "name": "EVO Competition Figure-8 Deadlift Strap Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "straps",
    "price": 43.55,
    "compareAt": 54.45,
    "material": "double-layer cotton webbing with bar-tack reinforcement",
    "image": "/product-images/evo-competition-figure-8-deadlift-strap-pair",
    "inventory": 98,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Adds deadlift pulls where strap security matters with double-layer cotton webbing plus bar-tack reinforcement for regular training.",
    "description": "This is the competition figure-8 option for deadlift days where strap security matters more than quick unwrap speed. Uses stitched webbing, reinforced contact points, and a paired design for the pulling station. Should be dried after chalk-heavy sessions and kept near the bar for pull days.",
    "features": [
      "Competition figure-8 loops for deadlift pulls where strap security matters.",
      "Double-layer cotton webbing and bar-tack reinforcement suit the competition pair.",
      "Ships as a matched competition figure-8 strap pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "double-layer cotton webbing with bar-tack reinforcement",
      "Training role": "deadlift pulls where strap security matters",
      "What ships": "Matched lifting strap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 20,
    "id": "evo-0021",
    "sku": "AXS-0021",
    "slug": "evo-palm-grip-pad-pair",
    "name": "EVO Palm Grip Pad Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "grips",
    "price": 26.25,
    "compareAt": 36.75,
    "material": "textured rubber with finger channels and breathable lining",
    "image": "/product-images/evo-palm-grip-pad-pair",
    "inventory": 66,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Gives lifters a firmer hold for palm traction on bars, dumbbells, and handles.",
    "description": "Keeps the palm covered for bars, dumbbells, and handles while staying smaller than a full glove. Uses a defined contact surface, finger coverage, and breathable backing for traction without full-glove bulk. Sized for palm traction on bars, dumbbells, and handles, with materials chosen for home-gym use.",
    "features": [
      "Supports hand contact for palm traction on bars, dumbbells, and handles.",
      "Combines textured rubber with finger channels and breathable lining for regular training.",
      "Ships as matched hand grip pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "textured rubber with finger channels and breathable lining",
      "Training role": "palm traction on bars, dumbbells, and handles",
      "What ships": "Matched hand grip pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 21,
    "id": "evo-0022",
    "sku": "AXS-0022",
    "slug": "evo-ventilated-palm-grip-pad-pair",
    "name": "EVO Ventilated Palm Grip Pad Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "grips",
    "price": 27.25,
    "compareAt": 38.20,
    "material": "textured rubber with finger channels and breathable lining",
    "image": "/product-images/evo-ventilated-palm-grip-pad-pair",
    "inventory": 79,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Ventilated Adds palm traction on bars, dumbbells, and handles with textured rubber plus finger channels and breathable lining for regular training.",
    "description": "Ventilated Keeps the palm covered for bars, dumbbells, and handles while staying smaller than a full glove. Ventilated Uses a defined contact surface, finger coverage, and breathable backing for traction without full-glove bulk. Ventilated Ships with matched hand grip pair. Care and warranty details are listed with the grip details.",
    "features": [
      "Ventilated Supports hand contact for palm traction on bars, dumbbells, and handles.",
      "Ventilated Combines textured rubber with finger channels and breathable lining for regular training.",
      "Ventilated Ships as matched hand grip pair.",
      "Ventilated Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "textured rubber with finger channels and breathable lining",
      "Training role": "palm traction on bars, dumbbells, and handles",
      "What ships": "Matched hand grip pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 22,
    "id": "evo-0023",
    "sku": "AXS-0023",
    "slug": "evo-gel-palm-grip-pad-pair",
    "name": "EVO Gel Palm Grip Pad Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "grips",
    "price": 37.25,
    "compareAt": 47.95,
    "material": "textured rubber with finger channels and breathable lining",
    "image": "/product-images/evo-gel-palm-grip-pad-pair",
    "inventory": 92,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Gel Keeps grip work more secure during garage-gym training.",
    "description": "Gel Keeps the palm covered for bars, dumbbells, and handles while staying smaller than a full glove. Gel Uses a defined contact surface, finger coverage, and breathable backing for traction without full-glove bulk. Gel Should be dried after chalk-heavy sessions and kept near the bar for pull days.",
    "features": [
      "Gel Supports hand contact for palm traction on bars, dumbbells, and handles.",
      "Gel Combines textured rubber with finger channels and breathable lining for regular training.",
      "Gel Ships as matched hand grip pair.",
      "Gel Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "textured rubber with finger channels and breathable lining",
      "Training role": "palm traction on bars, dumbbells, and handles",
      "What ships": "Matched hand grip pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 23,
    "id": "evo-0024",
    "sku": "AXS-0024",
    "slug": "evo-two-finger-pull-up-hand-grip-pair",
    "name": "EVO Two-Finger Pull-Up Hand Grip Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "grips",
    "price": 33.60,
    "compareAt": 44.80,
    "material": "microfiber palm panels and wrist-secure straps",
    "image": "/product-images/evo-two-finger-pull-up-hand-grip-pair",
    "inventory": 34,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "This is a compact pair for pull-up bar traction without a full glove, using microfiber palm panels and wrist-secure straps for garage-gym training.",
    "description": "Gives a two-finger contact patch for pull-up bars and hanging work without hiding the whole hand. Uses a defined contact surface, finger coverage, and breathable backing for traction without full-glove bulk. Ships with matched hand grip pair.",
    "features": [
      "Supports hand contact for pull-up bar traction without a full glove.",
      "Uses microfiber palm panels and wrist-secure straps for regular training.",
      "Ships as matched hand grip pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "microfiber palm panels and wrist-secure straps",
      "Training role": "pull-up bar traction without a full glove",
      "What ships": "Matched hand grip pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 24,
    "id": "evo-0025",
    "sku": "AXS-0025",
    "slug": "evo-three-finger-pull-up-hand-grip-pair",
    "name": "EVO Three-Finger Pull-Up Hand Grip Pair",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "grips",
    "price": 37.70,
    "compareAt": 48.50,
    "material": "microfiber palm panels and wrist-secure straps",
    "image": "/product-images/evo-three-finger-pull-up-hand-grip-pair",
    "inventory": 47,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Gives lifters a firmer hold for pull-up bar traction without a full glove.",
    "description": "Gives a three-finger contact patch for pull-up bars and hanging work without hiding the whole hand. Uses a defined contact surface, finger coverage, and breathable backing for traction without full-glove bulk. Sized for pull-up bar traction without a full glove, with materials chosen for home-gym use.",
    "features": [
      "Supports hand contact for pull-up bar traction without a full glove.",
      "Uses microfiber palm panels and wrist-secure straps for regular training.",
      "Ships as matched hand grip pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "microfiber palm panels and wrist-secure straps",
      "Training role": "pull-up bar traction without a full glove",
      "What ships": "Matched hand grip pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 25,
    "id": "evo-0026",
    "sku": "AXS-0026",
    "slug": "evo-chalk-ball-grip-chalk-system",
    "name": "EVO Chalk Ball Grip Chalk System",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "chalk",
    "price": 21.65,
    "compareAt": 27.05,
    "material": "magnesium carbonate blend and refillable storage formats",
    "image": "/product-images/evo-chalk-ball-grip-chalk-system",
    "inventory": 86,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Suits cleaner bar contact and low-mess grip prep when durability and easy storage matter.",
    "description": "Keeps grip prep close to the platform, rack, or pull-up station while limiting loose chalk clutter. Uses a defined contact surface, finger coverage, and breathable backing for traction without full-glove bulk. Should be dried after chalk-heavy sessions and kept near the bar for pull days.",
    "features": [
      "Keeps grip prep close for cleaner bar contact and low-mess grip prep.",
      "Uses magnesium carbonate blend and refillable storage formats for regular training.",
      "Ships as chalk ball pouch and compact storage.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "magnesium carbonate blend and refillable storage formats",
      "Training role": "cleaner bar contact and low-mess grip prep",
      "What ships": "Chalk ball pouch and compact storage",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 26,
    "id": "evo-0027",
    "sku": "AXS-0027",
    "slug": "evo-block-pack-grip-chalk-system",
    "name": "EVO Block Pack Grip Chalk System",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "chalk",
    "price": 22.10,
    "compareAt": 27.60,
    "material": "magnesium carbonate blend and refillable storage formats",
    "image": "/product-images/evo-block-pack-grip-chalk-system",
    "inventory": 99,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "This is a compact system for cleaner bar contact and low-mess grip prep, using magnesium carbonate blend and refillable storage formats for garage-gym training.",
    "description": "Keeps grip prep close to the platform, rack, or pull-up station while limiting loose chalk clutter. Uses a defined contact surface, finger coverage, and breathable backing for traction without full-glove bulk. Ships with chalk blocks and storage packaging.",
    "features": [
      "Keeps grip prep close for cleaner bar contact and low-mess grip prep.",
      "Uses magnesium carbonate blend and refillable storage formats for regular training.",
      "Ships as chalk blocks and storage packaging.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "magnesium carbonate blend and refillable storage formats",
      "Training role": "cleaner bar contact and low-mess grip prep",
      "What ships": "Chalk blocks and storage packaging",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 27,
    "id": "evo-0028",
    "sku": "AXS-0028",
    "slug": "evo-liquid-chalk-grip-chalk-system",
    "name": "EVO Liquid Chalk Grip Chalk System",
    "category": "Straps & Grips",
    "categorySlug": "straps-grips",
    "visual": "chalk",
    "price": 21.95,
    "compareAt": 27.45,
    "material": "magnesium carbonate blend and refillable storage formats",
    "image": "/product-images/evo-liquid-chalk-grip-chalk-system",
    "inventory": 28,
    "badges": [
      "Pull-day piece",
      "Grip shelf"
    ],
    "shortDescription": "Gives lifters a firmer hold for cleaner bar contact and low-mess grip prep.",
    "description": "Keeps grip prep close to the platform, rack, or pull-up station while limiting loose chalk clutter. Uses a defined contact surface, finger coverage, and breathable backing for traction without full-glove bulk. Sized for cleaner bar contact and low-mess grip prep, with materials chosen for home-gym use.",
    "features": [
      "Keeps grip prep close for cleaner bar contact and low-mess grip prep.",
      "Uses magnesium carbonate blend and refillable storage formats for regular training.",
      "Ships as one liquid chalk bottle.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "magnesium carbonate blend and refillable storage formats",
      "Training role": "cleaner bar contact and low-mess grip prep",
      "What ships": "One liquid chalk bottle",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 28,
    "id": "evo-0029",
    "sku": "AXS-0029",
    "slug": "evo-10-lb-rubber-hex-dumbbell-pair",
    "name": "EVO 10 lb Rubber Hex Dumbbell Pair",
    "category": "Dumbbells & Weights",
    "categorySlug": "dumbbells-weights",
    "visual": "dumbbell",
    "price": 47.30,
    "compareAt": 63.10,
    "material": "rubber-encased heads and chrome-knurled handles",
    "image": "/product-images/evo-10-lb-rubber-hex-dumbbell-pair",
    "inventory": 54,
    "badges": [
      "Matched load",
      "Room lane"
    ],
    "shortDescription": "10 lb hex dumbbells for warmups, raises, carries, and lighter accessory work.",
    "description": "Adds a matched 10 lb pair for presses, rows, carries, and single-leg work where balanced loading matters. Uses rubber heads, a chrome-knurled handle, and a matched-pair format that feels closer to commercial gym equipment than a loose single weight. Ships as matched rubber hex dumbbell pair. Care notes and warranty coverage sit with the matched-pair details.",
    "features": [
      "10 lb matched pair for presses, rows, carries, and single-leg work.",
      "Rubber hex heads and chrome-knurled handles keep the 10 lb pair steady.",
      "Ships as two 10 lb rubber hex dumbbells.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "rubber-encased heads and chrome-knurled handles",
      "Training role": "home dumbbell progressions and balanced loading",
      "What ships": "Matched rubber hex dumbbell pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 29,
    "id": "evo-0030",
    "sku": "AXS-0030",
    "slug": "evo-15-lb-rubber-hex-dumbbell-pair",
    "name": "EVO 15 lb Rubber Hex Dumbbell Pair",
    "category": "Dumbbells & Weights",
    "categorySlug": "dumbbells-weights",
    "visual": "dumbbell",
    "price": 61.35,
    "compareAt": 78.05,
    "material": "rubber-encased heads and chrome-knurled handles",
    "image": "/product-images/evo-15-lb-rubber-hex-dumbbell-pair",
    "inventory": 67,
    "badges": [
      "Matched load",
      "Room lane"
    ],
    "shortDescription": "15 lb hex dumbbells for the first jump past light accessory work.",
    "description": "Adds a matched 15 lb pair for presses, rows, carries, and single-leg work where balanced loading matters. Uses rubber heads, a chrome-knurled handle, and a matched-pair format that feels closer to commercial gym equipment than a loose single weight. Keeps the weight easy to identify when the pair returns to a rack or mat between sessions.",
    "features": [
      "15 lb matched pair for presses, rows, carries, and single-leg work.",
      "Rubber hex heads and chrome-knurled handles keep the 15 lb pair steady.",
      "Ships as two 15 lb rubber hex dumbbells.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "rubber-encased heads and chrome-knurled handles",
      "Training role": "home dumbbell progressions and balanced loading",
      "What ships": "Matched rubber hex dumbbell pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 30,
    "id": "evo-0031",
    "sku": "AXS-0031",
    "slug": "evo-20-lb-rubber-hex-dumbbell-pair",
    "name": "EVO 20 lb Rubber Hex Dumbbell Pair",
    "category": "Dumbbells & Weights",
    "categorySlug": "dumbbells-weights",
    "visual": "dumbbell",
    "price": 79.70,
    "compareAt": 100.95,
    "material": "rubber-encased heads and chrome-knurled handles",
    "image": "/product-images/evo-20-lb-rubber-hex-dumbbell-pair",
    "inventory": 80,
    "badges": [
      "Matched load",
      "Room lane"
    ],
    "shortDescription": "20 lb hex dumbbells for rows, presses, curls, and single-leg accessories.",
    "description": "Adds a matched 20 lb pair for presses, rows, carries, and single-leg work where balanced loading matters. Uses rubber heads, a chrome-knurled handle, and a matched-pair format that feels closer to commercial gym equipment than a loose single weight. Ships with matched rubber hex dumbbell pair.",
    "features": [
      "20 lb matched pair for presses, rows, carries, and single-leg work.",
      "Rubber hex heads and chrome-knurled handles keep the 20 lb pair steady.",
      "Ships as two 20 lb rubber hex dumbbells.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "rubber-encased heads and chrome-knurled handles",
      "Training role": "home dumbbell progressions and balanced loading",
      "What ships": "Matched rubber hex dumbbell pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 31,
    "id": "evo-0032",
    "sku": "AXS-0032",
    "slug": "evo-25-lb-rubber-hex-dumbbell-pair",
    "name": "EVO 25 lb Rubber Hex Dumbbell Pair",
    "category": "Dumbbells & Weights",
    "categorySlug": "dumbbells-weights",
    "visual": "dumbbell",
    "price": 100.05,
    "compareAt": 126.40,
    "material": "rubber-encased heads and chrome-knurled handles",
    "image": "/product-images/evo-25-lb-rubber-hex-dumbbell-pair",
    "inventory": 93,
    "badges": [
      "Matched load",
      "Room lane"
    ],
    "shortDescription": "Adds honest loading for home dumbbell progressions and balanced loading.",
    "description": "Adds a matched 25 lb pair for presses, rows, carries, and single-leg work where balanced loading matters. Uses rubber heads, a chrome-knurled handle, and a matched-pair format that feels closer to commercial gym equipment than a loose single weight. Sized for home dumbbell progressions and balanced loading, with materials chosen for home-gym use.",
    "features": [
      "25 lb matched pair for presses, rows, carries, and single-leg work.",
      "Rubber hex heads and chrome-knurled handles keep the 25 lb pair steady.",
      "Ships as two 25 lb rubber hex dumbbells.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "rubber-encased heads and chrome-knurled handles",
      "Training role": "home dumbbell progressions and balanced loading",
      "What ships": "Matched rubber hex dumbbell pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 32,
    "id": "evo-0033",
    "sku": "AXS-0033",
    "slug": "evo-30-lb-rubber-hex-dumbbell-pair",
    "name": "EVO 30 lb Rubber Hex Dumbbell Pair",
    "category": "Dumbbells & Weights",
    "categorySlug": "dumbbells-weights",
    "visual": "dumbbell",
    "price": 119.00,
    "compareAt": 146.10,
    "material": "rubber-encased heads and chrome-knurled handles",
    "image": "/product-images/evo-30-lb-rubber-hex-dumbbell-pair",
    "inventory": 22,
    "badges": [
      "Matched load",
      "Room lane"
    ],
    "shortDescription": "Adds home dumbbell progressions and balanced loading with rubber-encased heads and chrome-knurled handles for regular training.",
    "description": "Adds a matched 30 lb pair for presses, rows, carries, and single-leg work where balanced loading matters. Uses rubber heads, a chrome-knurled handle, and a matched-pair format that feels closer to commercial gym equipment than a loose single weight. Ships with matched rubber hex dumbbell pair. Shipping, returns, and warranty coverage are shown beside the matched-pair details.",
    "features": [
      "30 lb matched pair for presses, rows, carries, and single-leg work.",
      "Rubber hex heads and chrome-knurled handles keep the 30 lb pair steady.",
      "Ships as two 30 lb rubber hex dumbbells.",
      "Covered by a 1-year limited equipment warranty."
    ],
    "specs": {
      "Material": "rubber-encased heads and chrome-knurled handles",
      "Training role": "home dumbbell progressions and balanced loading",
      "What ships": "Matched rubber hex dumbbell pair",
      "Warranty": "1-year limited equipment warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 33,
    "id": "evo-0034",
    "sku": "AXS-0034",
    "slug": "evo-35-lb-rubber-hex-dumbbell-pair",
    "name": "EVO 35 lb Rubber Hex Dumbbell Pair",
    "category": "Dumbbells & Weights",
    "categorySlug": "dumbbells-weights",
    "visual": "dumbbell",
    "price": 130.25,
    "compareAt": 162.85,
    "material": "rubber-encased heads and chrome-knurled handles",
    "image": "/product-images/evo-35-lb-rubber-hex-dumbbell-pair",
    "inventory": 35,
    "badges": [
      "Matched load",
      "Room lane"
    ],
    "shortDescription": "35 lb hex dumbbells for heavier rows, presses, carries, and split-squat work.",
    "description": "Adds a matched 35 lb pair for presses, rows, carries, and single-leg work where balanced loading matters. Uses rubber heads, a chrome-knurled handle, and a matched-pair format that feels closer to commercial gym equipment than a loose single weight. Ships as matched rubber hex dumbbell pair. Warranty coverage and floor-care notes are listed with the pair.",
    "features": [
      "35 lb matched pair for presses, rows, carries, and single-leg work.",
      "Rubber hex heads and chrome-knurled handles keep the 35 lb pair steady.",
      "Ships as two 35 lb rubber hex dumbbells.",
      "Covered by a 1-year limited equipment warranty."
    ],
    "specs": {
      "Material": "rubber-encased heads and chrome-knurled handles",
      "Training role": "home dumbbell progressions and balanced loading",
      "What ships": "Matched rubber hex dumbbell pair",
      "Warranty": "1-year limited equipment warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 34,
    "id": "evo-0035",
    "sku": "AXS-0035",
    "slug": "evo-40-lb-rubber-hex-dumbbell-pair",
    "name": "EVO 40 lb Rubber Hex Dumbbell Pair",
    "category": "Dumbbells & Weights",
    "categorySlug": "dumbbells-weights",
    "visual": "dumbbell",
    "price": 148.75,
    "compareAt": 181.85,
    "material": "rubber-encased heads and chrome-knurled handles",
    "image": "/product-images/evo-40-lb-rubber-hex-dumbbell-pair",
    "inventory": 48,
    "badges": [
      "Station piece",
      "Rack-ready"
    ],
    "shortDescription": "40 lb hex dumbbells for the heavy end of a compact matched-pair lane.",
    "description": "Adds a matched 40 lb pair for presses, rows, carries, and single-leg work where balanced loading matters. Uses rubber heads, a chrome-knurled handle, and a matched-pair format that feels closer to commercial gym equipment than a loose single weight. Keeps the weight easy to identify when the pair returns to a rack or mat between sessions.",
    "features": [
      "40 lb matched pair for presses, rows, carries, and single-leg work.",
      "Rubber hex heads and chrome-knurled handles keep the 40 lb pair steady.",
      "Ships as two 40 lb rubber hex dumbbells.",
      "Covered by a 1-year limited equipment warranty."
    ],
    "specs": {
      "Material": "rubber-encased heads and chrome-knurled handles",
      "Training role": "home dumbbell progressions and balanced loading",
      "What ships": "Matched rubber hex dumbbell pair",
      "Warranty": "1-year limited equipment warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 35,
    "id": "evo-0036",
    "sku": "AXS-0036",
    "slug": "evo-45-lb-rubber-hex-dumbbell-pair",
    "name": "EVO 45 lb Rubber Hex Dumbbell Pair",
    "category": "Dumbbells & Weights",
    "categorySlug": "dumbbells-weights",
    "visual": "dumbbell",
    "price": 168.40,
    "compareAt": 201.00,
    "material": "rubber-encased heads and chrome-knurled handles",
    "image": "/product-images/evo-45-lb-rubber-hex-dumbbell-pair",
    "inventory": 61,
    "badges": [
      "Matched load",
      "Room lane"
    ],
    "shortDescription": "45 lb hex dumbbells for top-end home presses, rows, carries, and hinges.",
    "description": "Adds a matched 45 lb pair for presses, rows, carries, and single-leg work where balanced loading matters. Uses rubber heads, a chrome-knurled handle, and a matched-pair format that feels closer to commercial gym equipment than a loose single weight. Ships with matched rubber hex dumbbell pair.",
    "features": [
      "45 lb matched pair for presses, rows, carries, and single-leg work.",
      "Rubber hex heads and chrome-knurled handles keep the 45 lb pair steady.",
      "Ships as two 45 lb rubber hex dumbbells.",
      "Covered by a 1-year limited equipment warranty."
    ],
    "specs": {
      "Material": "rubber-encased heads and chrome-knurled handles",
      "Training role": "home dumbbell progressions and balanced loading",
      "What ships": "Matched rubber hex dumbbell pair",
      "Warranty": "1-year limited equipment warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 36,
    "id": "evo-0037",
    "sku": "AXS-0037",
    "slug": "evo-45-lb-olympic-bumper-plate-pair",
    "name": "EVO 45 lb Olympic Bumper Plate Pair",
    "category": "Plates, Bars & Collars",
    "categorySlug": "plates-bars",
    "visual": "plate",
    "price": 187.20,
    "compareAt": 225.70,
    "material": "low-bounce rubber with stainless steel hub inserts",
    "image": "/product-images/evo-45-lb-olympic-bumper-plate-pair",
    "inventory": 18,
    "badges": [
      "Bar station",
      "Rack hardware"
    ],
    "shortDescription": "Suits straightforward Olympic loading and storage when durability and easy storage matter.",
    "description": "Gives a matched 45 lb loading option for barbell progressions, warmup jumps, and cleaner plate storage. Uses low-bounce rubber plus stainless steel hub inserts construction to keep markings, handling, and storage clear during repeated bar loading. Should be stored off wet concrete and wiped down before it goes back on the rack.",
    "features": [
      "45 lb Olympic Bumper Plate Pair keeps Olympic loading clear and easy to identify.",
      "low-bounce rubber with stainless steel hub inserts suits the way this plate lives on a rack or floor tree.",
      "Ships as matched olympic plate pair.",
      "Covered by a 1-year limited equipment warranty."
    ],
    "specs": {
      "Material": "low-bounce rubber with stainless steel hub inserts",
      "Training role": "straightforward Olympic loading and storage",
      "What ships": "Matched Olympic plate pair",
      "Warranty": "1-year limited equipment warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 37,
    "id": "evo-0038",
    "sku": "AXS-0038",
    "slug": "evo-2-5-lb-cast-iron-olympic-plate-pair",
    "name": "EVO 2.5 lb Cast Iron Olympic Plate Pair",
    "category": "Plates, Bars & Collars",
    "categorySlug": "plates-bars",
    "visual": "plate",
    "price": 32.85,
    "compareAt": 43.80,
    "material": "machined cast iron with baked enamel finish",
    "image": "/product-images/evo-2-5-lb-cast-iron-olympic-plate-pair",
    "inventory": 31,
    "badges": [
      "Bar station",
      "Rack hardware"
    ],
    "shortDescription": "This is a compact pair for straightforward Olympic loading and storage, using machined cast iron plus baked enamel finish for garage-gym training.",
    "description": "Gives a matched 5 lb loading option for barbell progressions, warmup jumps, and cleaner plate storage. Uses machined cast iron plus baked enamel finish construction to keep markings, handling, and storage clear during repeated bar loading. Ships with matched Olympic plate pair.",
    "features": [
      "2.5 lb Cast Iron Olympic Plate Pair keeps Olympic loading clear and easy to identify.",
      "machined cast iron with baked enamel finish suits the way this plate lives on a rack or floor tree.",
      "Ships as matched olympic plate pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "machined cast iron with baked enamel finish",
      "Training role": "straightforward Olympic loading and storage",
      "What ships": "Matched Olympic plate pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 38,
    "id": "evo-0039",
    "sku": "AXS-0039",
    "slug": "evo-5-lb-cast-iron-olympic-plate-pair",
    "name": "EVO 5 lb Cast Iron Olympic Plate Pair",
    "category": "Plates, Bars & Collars",
    "categorySlug": "plates-bars",
    "visual": "plate",
    "price": 44.40,
    "compareAt": 55.50,
    "material": "machined cast iron with baked enamel finish",
    "image": "/product-images/evo-5-lb-cast-iron-olympic-plate-pair",
    "inventory": 44,
    "badges": [
      "Bar station",
      "Rack hardware"
    ],
    "shortDescription": "Adds honest loading for straightforward Olympic loading and storage.",
    "description": "Gives a matched 5 lb loading option for barbell progressions, warmup jumps, and cleaner plate storage. Uses machined cast iron plus baked enamel finish construction to keep markings, handling, and storage clear during repeated bar loading. Sized for straightforward Olympic loading and storage, with materials chosen for home-gym use.",
    "features": [
      "5 lb Cast Iron Olympic Plate Pair keeps Olympic loading clear and easy to identify.",
      "machined cast iron with baked enamel finish suits the way this plate lives on a rack or floor tree.",
      "Ships as matched olympic plate pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "machined cast iron with baked enamel finish",
      "Training role": "straightforward Olympic loading and storage",
      "What ships": "Matched Olympic plate pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 39,
    "id": "evo-0040",
    "sku": "AXS-0040",
    "slug": "evo-5-lb-set-color-change-plate-set",
    "name": "EVO 5 lb Set Color Change Plate Set",
    "category": "Plates, Bars & Collars",
    "categorySlug": "plates-bars",
    "visual": "plate",
    "price": 50.40,
    "compareAt": 67.20,
    "material": "rubber-coated steel plates with raised weight markings",
    "image": "/product-images/evo-5-lb-set-color-change-plate-set",
    "inventory": 96,
    "badges": [
      "Bar station",
      "Rack hardware"
    ],
    "shortDescription": "This is a compact set for straightforward Olympic loading and storage, using rubber-coated steel plates plus raised weight markings for garage-gym training.",
    "description": "Gives a matched 5 lb loading option for barbell progressions, warmup jumps, and cleaner plate storage. Uses rubber-coated steel plates plus raised weight markings construction to keep markings, handling, and storage clear during repeated bar loading. Ships with 5 lb Set Color Change Plate Set.",
    "features": [
      "5 lb Set Color Change Plate Set keeps Olympic loading clear and easy to identify.",
      "rubber-coated steel plates with raised weight markings suits the way this plate lives on a rack or floor tree.",
      "Ships as 5 lb set color change plate set.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "rubber-coated steel plates with raised weight markings",
      "Training role": "straightforward Olympic loading and storage",
      "What ships": "5 lb Set Color Change Plate Set",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 40,
    "id": "evo-0041",
    "sku": "AXS-0041",
    "slug": "evo-45-lb-olympic-training-bar",
    "name": "EVO 45 lb Olympic Training Bar",
    "category": "Plates, Bars & Collars",
    "categorySlug": "plates-bars",
    "visual": "barbell",
    "price": 255.45,
    "compareAt": 305.45,
    "material": "tensile steel shaft, bronze bushings, and medium knurling",
    "image": "/product-images/evo-45-lb-olympic-training-bar",
    "inventory": 90,
    "badges": [
      "Heavy-duty",
      "Room anchor"
    ],
    "shortDescription": "Adds honest loading for compound barbell days in a compact gym.",
    "description": "This is the core barbell piece for compound lifting when the gym needs one reliable 45 lb bar before specialty bars. Balances shaft feel, sleeve hardware, and knurling for repeated weekly strength work rather than one specialty lift. Sized for compound barbell days in a compact gym, with materials chosen for home-gym use.",
    "features": [
      "Adds load for compound barbell days in a compact gym.",
      "Uses tensile steel shaft, bronze bushings, and medium knurling for regular training.",
      "Ships as one 45 lb Olympic Training Bar.",
      "Covered by a 1-year limited equipment warranty."
    ],
    "specs": {
      "Material": "tensile steel shaft, bronze bushings, and medium knurling",
      "Training role": "compound barbell days in a compact gym",
      "What ships": "One 45 lb Olympic Training Bar",
      "Warranty": "1-year limited equipment warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 41,
    "id": "evo-0042",
    "sku": "AXS-0042",
    "slug": "evo-spring-olympic-bar-collar-pair",
    "name": "EVO Spring Olympic Bar Collar Pair",
    "category": "Plates, Bars & Collars",
    "categorySlug": "plates-bars",
    "visual": "collars",
    "price": 26.60,
    "compareAt": 37.30,
    "material": "spring steel, aircraft aluminum, or reinforced polymer lockups",
    "image": "/product-images/evo-spring-olympic-bar-collar-pair",
    "inventory": 84,
    "badges": [
      "Bar station",
      "Rack hardware"
    ],
    "shortDescription": "Adds fast Olympic plate changes and barbell lockup with spring steel for regular training.",
    "description": "Gives a simple spring hold for Olympic sleeves during quick plate changes. The low-profile pair belongs beside the rack so collars are ready when the bar is loaded. Ships with a matched Olympic bar collar pair; warranty coverage is listed with the collar specs.",
    "features": [
      "Adds load for fast Olympic plate changes and barbell lockup.",
      "Uses spring steel, aircraft aluminum, or reinforced polymer lockups to keep Olympic sleeves locked between sets.",
      "Ships as matched Olympic bar collar pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "spring steel, aircraft aluminum, or reinforced polymer lockups",
      "Training role": "fast Olympic plate changes and barbell lockup",
      "What ships": "Matched Olympic bar collar pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 42,
    "id": "evo-0043",
    "sku": "AXS-0043",
    "slug": "evo-quick-lock-olympic-bar-collar-pair",
    "name": "EVO Quick Lock Olympic Bar Collar Pair",
    "category": "Plates, Bars & Collars",
    "categorySlug": "plates-bars",
    "visual": "collars",
    "price": 38.30,
    "compareAt": 49.25,
    "material": "spring steel, aircraft aluminum, or reinforced polymer lockups",
    "image": "/product-images/evo-quick-lock-olympic-bar-collar-pair",
    "inventory": 97,
    "badges": [
      "Bar station",
      "Rack hardware"
    ],
    "shortDescription": "Quick-lock collars for faster Olympic plate changes between work sets.",
    "description": "Gives Olympic sleeves a faster clamp for sessions with frequent plate changes. The compact latch design keeps lockup simple without taking over the rack shelf. Ships as a matched Olympic bar collar pair with care and coverage listed in the collar specs.",
    "features": [
      "Adds load for fast Olympic plate changes and barbell lockup.",
      "Uses spring steel, aircraft aluminum, or reinforced polymer lockups to keep Olympic sleeves locked between sets.",
      "Ships as matched Olympic bar collar pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "spring steel, aircraft aluminum, or reinforced polymer lockups",
      "Training role": "fast Olympic plate changes and barbell lockup",
      "What ships": "Matched Olympic bar collar pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 43,
    "id": "evo-0044",
    "sku": "AXS-0044",
    "slug": "evo-aluminum-olympic-bar-collar-pair",
    "name": "EVO Aluminum Olympic Bar Collar Pair",
    "category": "Plates, Bars & Collars",
    "categorySlug": "plates-bars",
    "visual": "collars",
    "price": 47.85,
    "compareAt": 63.80,
    "material": "spring steel, aircraft aluminum, or reinforced polymer lockups",
    "image": "/product-images/evo-aluminum-olympic-bar-collar-pair",
    "inventory": 26,
    "badges": [
      "Bar station",
      "Rack hardware"
    ],
    "shortDescription": "Suits fast Olympic plate changes and barbell lockup when durability and easy storage matter.",
    "description": "Gives Olympic sleeves a more rigid, machined-feel lock for repeated barbell loading. The pair is compact enough for the rack shelf and easy to grab between sets. Store it off wet concrete and wipe it down before it goes back on the rack.",
    "features": [
      "Adds load for fast Olympic plate changes and barbell lockup.",
      "Uses spring steel, aircraft aluminum, or reinforced polymer lockups to keep Olympic sleeves locked between sets.",
      "Ships as matched Olympic bar collar pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "spring steel, aircraft aluminum, or reinforced polymer lockups",
      "Training role": "fast Olympic plate changes and barbell lockup",
      "What ships": "Matched Olympic bar collar pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 44,
    "id": "evo-0045",
    "sku": "AXS-0045",
    "slug": "evo-adjustable-training-bench",
    "name": "EVO Adjustable Training Bench",
    "category": "Benches & Racks",
    "categorySlug": "benches-racks",
    "visual": "bench",
    "price": 254.35,
    "compareAt": 304.15,
    "material": "11-gauge steel frame and dense stitched vinyl pad",
    "image": "/product-images/evo-adjustable-training-bench",
    "inventory": 91,
    "badges": [
      "Heavy-duty",
      "Room anchor"
    ],
    "shortDescription": "Suits pressing, rows, and compact strength sessions when durability and easy storage matter.",
    "description": "Gives a compact pressing and row station for lifters training in a garage or spare room. Uses dense padding, stitched vinyl, and a steel frame for a stable feel for home strength work. Works best on level flooring with hardware checked after heavy training weeks.",
    "features": [
      "Supports pressing, rows, and compact strength sessions in compact training spaces.",
      "Uses 11-gauge steel frame and dense stitched vinyl pad for pressing, rows, and accessory work.",
      "Ships as one Adjustable Training Bench.",
      "Covered by a 1-year limited equipment warranty."
    ],
    "specs": {
      "Material": "11-gauge steel frame and dense stitched vinyl pad",
      "Training role": "pressing, rows, and compact strength sessions",
      "What ships": "One Adjustable Training Bench",
      "Warranty": "1-year limited equipment warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 45,
    "id": "evo-0046",
    "sku": "AXS-0046",
    "slug": "evo-j-hook-pair-rack-attachment",
    "name": "EVO J-Hook Pair Rack Attachment",
    "category": "Benches & Racks",
    "categorySlug": "benches-racks",
    "visual": "rack",
    "price": 89.75,
    "compareAt": 110.85,
    "material": "powder-coated steel with UHMW contact guards",
    "image": "/product-images/evo-j-hook-pair-rack-attachment",
    "inventory": 66,
    "badges": [
      "Press station",
      "Floor-space piece"
    ],
    "shortDescription": "This is a compact pair for rack use and cleaner bar placement, using powder-coated steel plus UHMW contact guards for garage-gym training.",
    "description": "J-Hook Pair Rack Attachment refreshes the rack contact point for squats, presses, and pulls where bar placement needs to feel deliberate. Uses stitched webbing, reinforced contact points, and a paired design for the pulling station. Ships with matched lifting hook pair.",
    "features": [
      "Supports hand contact for rack use and cleaner bar placement.",
      "Combines powder-coated steel with UHMW contact guards for regular training.",
      "Ships as matched lifting hook pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "powder-coated steel with UHMW contact guards",
      "Training role": "rack use and cleaner bar placement",
      "What ships": "Matched lifting hook pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 46,
    "id": "evo-0047",
    "sku": "AXS-0047",
    "slug": "evo-step-platform-flooring-and-platform-piece",
    "name": "EVO Step Platform Flooring & Platform Piece",
    "category": "Benches & Racks",
    "categorySlug": "benches-racks",
    "visual": "platform",
    "price": 89.80,
    "compareAt": 110.95,
    "material": "high-density rubber, textured vinyl, or sealed wood composite",
    "image": "/product-images/evo-step-platform-flooring-and-platform-piece",
    "inventory": 99,
    "badges": [
      "Press station",
      "Floor-space piece"
    ],
    "shortDescription": "Suits floor work, step patterns, and mobility drills when durability and easy storage matter.",
    "description": "Step Platform Flooring & Platform Piece creates a defined surface for step work, calf work, mobility drills, and floor-based accessory training. The high-density rubber construction gives Step Platform Flooring & Platform Piece enough substance for regular weekly training. Works best on level flooring with hardware checked after heavy training weeks.",
    "features": [
      "Supports floor work, step patterns, and mobility drills in compact training spaces.",
      "Uses high-density rubber, textured vinyl, or sealed wood composite for regular training.",
      "Ships as one Step Platform Flooring & Platform Piece.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "high-density rubber, textured vinyl, or sealed wood composite",
      "Training role": "floor work, step patterns, and mobility drills",
      "What ships": "One Step Platform Flooring & Platform Piece",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 47,
    "id": "evo-0048",
    "sku": "AXS-0048",
    "slug": "evo-calf-block-flooring-and-platform-piece",
    "name": "EVO Calf Block Flooring & Platform Piece",
    "category": "Benches & Racks",
    "categorySlug": "benches-racks",
    "visual": "platform",
    "price": 76.20,
    "compareAt": 98.00,
    "material": "high-density rubber, textured vinyl, or sealed wood composite",
    "image": "/product-images/evo-calf-block-flooring-and-platform-piece",
    "inventory": 28,
    "badges": [
      "Press station",
      "Floor-space piece"
    ],
    "shortDescription": "This is a compact platform piece for floor work, step patterns, and mobility drills, using high-density rubber for garage-gym training.",
    "description": "Calf Block Flooring & Platform Piece creates a defined surface for step work, calf work, mobility drills, and floor-based accessory training. The high-density rubber construction gives Calf Block Flooring & Platform Piece enough substance for regular weekly training. Ships with one Calf Block Flooring & Platform Piece.",
    "features": [
      "Supports floor work, step patterns, and mobility drills in compact training spaces.",
      "Uses high-density rubber, textured vinyl, or sealed wood composite for regular training.",
      "Ships as one Calf Block Flooring & Platform Piece.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "high-density rubber, textured vinyl, or sealed wood composite",
      "Training role": "floor work, step patterns, and mobility drills",
      "What ships": "One Calf Block Flooring & Platform Piece",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 48,
    "id": "evo-0049",
    "sku": "AXS-0049",
    "slug": "evo-mini-band-set-resistance-band-system",
    "name": "EVO Mini Band Set Resistance Band System",
    "category": "Pull-Up & Mobility",
    "categorySlug": "pullup-mobility",
    "visual": "bands",
    "price": 26.55,
    "compareAt": 37.20,
    "material": "layered latex mini bands and compact carry pouch",
    "image": "/product-images/evo-mini-band-set-resistance-band-system",
    "inventory": 35,
    "badges": [
      "Warmup shelf",
      "Mobility work"
    ],
    "shortDescription": "Adds warmups, assistance work, and accessory volume with layered latex mini bands and compact carry pouch for regular training.",
    "description": "Adds portable resistance for warmups, pull-up assistance, glute work, and accessory sessions. The layered latex bands pack small, stretch smoothly, and belong near the rack, mat, or doorway station. Dry the bands after use and keep them away from sharp edges.",
    "features": [
      "Supports warmups, assistance work, and accessory volume.",
      "Uses layered latex mini bands and compact carry pouch for regular training.",
      "Ships as mini bands and compact carry pouch.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "layered latex mini bands and compact carry pouch",
      "Training role": "warmups, assistance work, and accessory volume",
      "What ships": "Mini bands and compact carry pouch",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 49,
    "id": "evo-0050",
    "sku": "AXS-0050",
    "slug": "evo-tube-set-resistance-band-system",
    "name": "EVO Tube Set Resistance Band System",
    "category": "Pull-Up & Mobility",
    "categorySlug": "pullup-mobility",
    "visual": "bands",
    "price": 42.55,
    "compareAt": 53.20,
    "material": "latex resistance tubes, foam handles, carabiners, and door anchor",
    "image": "/product-images/evo-tube-set-resistance-band-system",
    "inventory": 74,
    "badges": [
      "Warmup shelf",
      "Mobility work"
    ],
    "shortDescription": "This is a compact set for warmups, assistance work, and accessory volume, using latex resistance tubes for garage-gym training.",
    "description": "Adds portable resistance for warmups, pull-up assistance, glute work, and accessory sessions. Uses resistance material selected for repeated stretching, compact storage, and quick use at the rack or mat. Ships with resistance tubes, foam handles, carabiners, and door anchor.",
    "features": [
      "Supports warmups, assistance work, and accessory volume.",
      "Uses latex resistance tubes, foam handles, carabiners, and door anchor for regular training.",
      "Ships as resistance tubes, foam handles, carabiners, and door anchor.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "latex resistance tubes, foam handles, carabiners, and door anchor",
      "Training role": "warmups, assistance work, and accessory volume",
      "What ships": "Resistance tubes, foam handles, carabiners, and door anchor",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 50,
    "id": "evo-0051",
    "sku": "AXS-0051",
    "slug": "evo-hip-circle-resistance-band-system",
    "name": "EVO Hip Circle Resistance Band System",
    "category": "Pull-Up & Mobility",
    "categorySlug": "pullup-mobility",
    "visual": "bands",
    "price": 32.35,
    "compareAt": 43.15,
    "material": "woven elastic loop with reinforced stitching",
    "image": "/product-images/evo-hip-circle-resistance-band-system",
    "inventory": 87,
    "badges": [
      "Warmup shelf",
      "Mobility work"
    ],
    "shortDescription": "Gives athletes another way to warm up and reset around warmups, assistance work, and accessory volume.",
    "description": "Adds portable resistance for warmups, pull-up assistance, glute work, and accessory sessions. Uses resistance material selected for repeated stretching, compact storage, and quick use at the rack or mat. Sized for warmups, assistance work, and accessory volume, with materials chosen for home-gym use.",
    "features": [
      "Supports warmups, assistance work, and accessory volume.",
      "Combines woven elastic loop with reinforced stitching for regular training.",
      "Ships as one reinforced hip-circle band.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "woven elastic loop with reinforced stitching",
      "Training role": "warmups, assistance work, and accessory volume",
      "What ships": "One reinforced hip-circle band",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 51,
    "id": "evo-0052",
    "sku": "AXS-0052",
    "slug": "evo-foam-roller-mobility-tool",
    "name": "EVO Foam Roller Mobility Tool",
    "category": "Pull-Up & Mobility",
    "categorySlug": "pullup-mobility",
    "visual": "roller",
    "price": 39.20,
    "compareAt": 50.45,
    "material": "high-density textured EVA foam",
    "image": "/product-images/evo-foam-roller-mobility-tool",
    "inventory": 100,
    "badges": [
      "Warmup shelf",
      "Mobility work"
    ],
    "shortDescription": "Adds mobility, warmups, and recovery work with high-density textured EVA foam for regular training.",
    "description": "Gives warmups and cooldowns a dedicated roller that can live near the mat. The textured EVA surface adds pressure without needing a large recovery setup. Wipe it down after use and keep it where mobility work actually happens.",
    "features": [
      "Supports mobility, warmups, and recovery work.",
      "Uses high-density textured EVA foam for regular training.",
      "Ships as one Foam Roller Mobility Tool.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "high-density textured EVA foam",
      "Training role": "mobility, warmups, and recovery work",
      "What ships": "One Foam Roller Mobility Tool",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 52,
    "id": "evo-0053",
    "sku": "AXS-0053",
    "slug": "evo-lacrosse-ball-set-mobility-tool",
    "name": "EVO Lacrosse Ball Set Mobility Tool",
    "category": "Pull-Up & Mobility",
    "categorySlug": "pullup-mobility",
    "visual": "roller",
    "price": 22.50,
    "compareAt": 28.15,
    "material": "dense rubber massage balls and mesh storage pouch",
    "image": "/product-images/evo-lacrosse-ball-set-mobility-tool",
    "inventory": 29,
    "badges": [
      "Warmup shelf",
      "Mobility work"
    ],
    "shortDescription": "Keeps warmup and recovery work close to the garage gym.",
    "description": "Gives small-area pressure work a simple place in the warmup kit. Dense rubber balls and a mesh pouch make the set easy to keep near the mat, rack, or training bag. Wipe the balls after use before they go back in the pouch.",
    "features": [
      "Supports mobility, warmups, and recovery work.",
      "Uses dense rubber massage balls and mesh storage pouch for regular training.",
      "Ships as massage ball pair and mesh storage pouch.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "dense rubber massage balls and mesh storage pouch",
      "Training role": "mobility, warmups, and recovery work",
      "What ships": "Massage ball pair and mesh storage pouch",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 53,
    "id": "evo-0054",
    "sku": "AXS-0054",
    "slug": "evo-stretch-strap-mobility-tool",
    "name": "EVO Stretch Strap Mobility Tool",
    "category": "Pull-Up & Mobility",
    "categorySlug": "pullup-mobility",
    "visual": "roller",
    "price": 21.30,
    "compareAt": 26.65,
    "material": "woven nylon strap with reinforced loop segments",
    "image": "/product-images/evo-stretch-strap-mobility-tool",
    "inventory": 42,
    "badges": [
      "Warmup shelf",
      "Mobility work"
    ],
    "shortDescription": "Suits mobility, warmups, and recovery work when durability and easy storage matter.",
    "description": "Gives shoulder, hamstring, and hip mobility work a dedicated strap for the mat or doorway station. Stitched webbing and reinforced loops make hand positions easy to repeat. Let it dry after sweaty sessions before it goes back in the bag.",
    "features": [
      "Supports hand contact for mobility, warmups, and recovery work.",
      "Combines woven nylon strap with reinforced loop segments for regular training.",
      "Ships as one Stretch Strap Mobility Tool.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "woven nylon strap with reinforced loop segments",
      "Training role": "mobility, warmups, and recovery work",
      "What ships": "One Stretch Strap Mobility Tool",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 54,
    "id": "evo-0055",
    "sku": "AXS-0055",
    "slug": "evo-core-slider-set-bodyweight-trainer",
    "name": "EVO Core Slider Set Bodyweight Trainer",
    "category": "Pull-Up & Mobility",
    "categorySlug": "pullup-mobility",
    "visual": "rings",
    "price": 26.80,
    "compareAt": 37.55,
    "material": "low-friction polymer discs with rubberized grip edges",
    "image": "/product-images/evo-core-slider-set-bodyweight-trainer",
    "inventory": 36,
    "badges": [
      "Warmup shelf",
      "Mobility work"
    ],
    "shortDescription": "This is a compact set for core work and compact bodyweight training, using low-friction polymer discs plus rubberized grip edges for garage-gym training.",
    "description": "Core Slider Set Bodyweight Trainer turns a small footprint into core work, anti-extension training, and quick bodyweight accessories. Keeps contact edges, handles, or wheel hardware simple enough for repeat core sessions. Ships with two core sliders.",
    "features": [
      "Supports core work and compact bodyweight training.",
      "Combines low-friction polymer discs with rubberized grip edges for regular training.",
      "Ships as two core sliders.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "low-friction polymer discs with rubberized grip edges",
      "Training role": "core work and compact bodyweight training",
      "What ships": "Two core sliders",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 55,
    "id": "evo-0056",
    "sku": "AXS-0056",
    "slug": "evo-ab-wheel-bodyweight-trainer",
    "name": "EVO Ab Wheel Bodyweight Trainer",
    "category": "Pull-Up & Mobility",
    "categorySlug": "pullup-mobility",
    "visual": "rings",
    "price": 32.20,
    "compareAt": 42.95,
    "material": "textured rubber wheel, steel axle, and foam handles",
    "image": "/product-images/evo-ab-wheel-bodyweight-trainer",
    "inventory": 49,
    "badges": [
      "Warmup shelf",
      "Mobility work"
    ],
    "shortDescription": "Keeps core work and compact bodyweight training simple enough for weekly use.",
    "description": "Ab Wheel Bodyweight Trainer turns a small footprint into core work, anti-extension training, and quick bodyweight accessories. Keeps contact edges, handles, or wheel hardware simple enough for repeat core sessions. Sized for core work and compact bodyweight training, with materials chosen for home-gym use.",
    "features": [
      "Supports core work and compact bodyweight training.",
      "Uses textured rubber wheel, steel axle, and foam handles for regular training.",
      "Ships as one Ab Wheel Bodyweight Trainer.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "textured rubber wheel, steel axle, and foam handles",
      "Training role": "core work and compact bodyweight training",
      "What ships": "One Ab Wheel Bodyweight Trainer",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 56,
    "id": "evo-0057",
    "sku": "AXS-0057",
    "slug": "evo-speed-jump-rope",
    "name": "EVO Speed Jump Rope",
    "category": "Conditioning",
    "categorySlug": "conditioning",
    "visual": "rope",
    "price": 33.10,
    "compareAt": 44.15,
    "material": "coated steel cable, sealed bearings, and knurled aluminum handles",
    "image": "/product-images/evo-speed-jump-rope",
    "inventory": 62,
    "badges": [
      "Open-lane work",
      "Compact storage"
    ],
    "shortDescription": "Adds warmups, conditioning, and quick finishers with coated steel cable for regular training.",
    "description": "Covers warmups and finishers for athletes who want conditioning gear that stores in a drawer. Keeps cadence work quick to start and easy to put away after the finisher. It ships as a single rope with care notes listed on the item page.",
    "features": [
      "Keeps warmups, conditioning, and quick finishers quick to set up.",
      "Uses coated steel cable, sealed bearings, and knurled aluminum handles for regular training.",
      "Ships as one Speed Jump Rope.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "coated steel cable, sealed bearings, and knurled aluminum handles",
      "Training role": "warmups, conditioning, and quick finishers",
      "What ships": "One Speed Jump Rope",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 57,
    "id": "evo-0058",
    "sku": "AXS-0058",
    "slug": "evo-beaded-jump-rope",
    "name": "EVO Beaded Jump Rope",
    "category": "Conditioning",
    "categorySlug": "conditioning",
    "visual": "rope",
    "price": 26.85,
    "compareAt": 37.60,
    "material": "segmented polymer beads, braided cord, and molded handles",
    "image": "/product-images/evo-beaded-jump-rope",
    "inventory": 88,
    "badges": [
      "Open-lane work",
      "Compact storage"
    ],
    "shortDescription": "Suits warmups, conditioning, and quick finishers when durability and easy storage matter.",
    "description": "Covers warmups and finishers for athletes who want conditioning gear that stores in a drawer. Keeps cadence work quick to start and easy to put away after the finisher. Beaded Jump Rope stores cleanly when it is coiled before going back in the training bag.",
    "features": [
      "Keeps warmups, conditioning, and quick finishers quick to set up.",
      "Uses segmented polymer beads, braided cord, and molded handles for regular training.",
      "Ships as one Beaded Jump Rope.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "segmented polymer beads, braided cord, and molded handles",
      "Training role": "warmups, conditioning, and quick finishers",
      "What ships": "One Beaded Jump Rope",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 58,
    "id": "evo-0059",
    "sku": "AXS-0059",
    "slug": "evo-cordless-jump-rope",
    "name": "EVO Cordless Jump Rope",
    "category": "Conditioning",
    "categorySlug": "conditioning",
    "visual": "rope",
    "price": 36.85,
    "compareAt": 47.40,
    "material": "weighted rubber end balls, short cords, and textured handles",
    "image": "/product-images/evo-cordless-jump-rope",
    "inventory": 101,
    "badges": [
      "Open-lane work",
      "Compact storage"
    ],
    "shortDescription": "This is a compact rope for warmups, conditioning, and quick finishers, using weighted rubber end balls for garage-gym training.",
    "description": "Covers warmups and finishers for athletes who want conditioning gear that stores in a drawer. Keeps cadence work quick to start and easy to put away after the finisher. Ships with one Cordless Jump Rope.",
    "features": [
      "Keeps warmups, conditioning, and quick finishers quick to set up.",
      "Uses weighted rubber end balls, short cords, and textured handles for regular training.",
      "Ships as one Cordless Jump Rope.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "weighted rubber end balls, short cords, and textured handles",
      "Training role": "warmups, conditioning, and quick finishers",
      "What ships": "One Cordless Jump Rope",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 59,
    "id": "evo-0060",
    "sku": "AXS-0060",
    "slug": "evo-ladder-agility-kit",
    "name": "EVO Ladder Agility Kit",
    "category": "Conditioning",
    "categorySlug": "conditioning",
    "visual": "agility",
    "price": 33.80,
    "compareAt": 45.10,
    "material": "woven nylon side straps and flexible polymer rungs",
    "image": "/product-images/evo-ladder-agility-kit",
    "inventory": 76,
    "badges": [
      "Open-lane work",
      "Compact storage"
    ],
    "shortDescription": "Brings conditioning work to footwork, warmups, and field-style drills for regular weekly use.",
    "description": "Sets up footwork, warmup, and field-style drills without needing a permanent lane. Uses flexible pieces and a carry-friendly footprint for garage, driveway, or field work. Sized for footwork, warmups, and field-style drills, with materials chosen for home-gym use.",
    "features": [
      "Keeps footwork, warmups, and field-style drills quick to set up.",
      "Uses woven nylon side straps and flexible polymer rungs for regular training.",
      "Ships as agility ladder and carry strap.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "woven nylon side straps and flexible polymer rungs",
      "Training role": "footwork, warmups, and field-style drills",
      "What ships": "Agility ladder and carry strap",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 60,
    "id": "evo-0061",
    "sku": "AXS-0061",
    "slug": "evo-cone-set-agility-kit",
    "name": "EVO Cone Set Agility Kit",
    "category": "Conditioning",
    "categorySlug": "conditioning",
    "visual": "agility",
    "price": 26.90,
    "compareAt": 37.70,
    "material": "stackable polymer disc cones and woven carry strap",
    "image": "/product-images/evo-cone-set-agility-kit",
    "inventory": 89,
    "badges": [
      "Open-lane work",
      "Compact storage"
    ],
    "shortDescription": "Adds footwork, warmups, and field-style drills with stackable polymer disc cones and woven carry strap for regular training.",
    "description": "Set up footwork, warmup, and field-style drills without marking a permanent lane. The flexible disc cones stack neatly after driveway, garage, or field work, and the woven strap keeps the set together between sessions.",
    "features": [
      "Quick to spread out for footwork, warmups, and field-style drills.",
      "Stackable polymer discs stay flexible under regular driveway, garage, or turf use.",
      "Woven carry strap keeps the cones bundled between sessions.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "stackable polymer disc cones and woven carry strap",
      "Training role": "footwork, warmups, and field-style drills",
      "What ships": "Stackable disc cones and carry strap",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 61,
    "id": "evo-0062",
    "sku": "AXS-0062",
    "slug": "evo-finger-trainer-hand-strength-tool",
    "name": "EVO Finger Trainer Hand Strength Tool",
    "category": "Conditioning",
    "categorySlug": "conditioning",
    "visual": "grips",
    "price": 27.80,
    "compareAt": 38.90,
    "material": "matte silicone finger loops and central tension hub",
    "image": "/product-images/evo-finger-trainer-hand-strength-tool",
    "inventory": 31,
    "badges": [
      "Open-lane work",
      "Compact storage"
    ],
    "shortDescription": "Suits hand strength and grip accessory work when durability and easy storage matter.",
    "description": "Adds grip-specific accessory work for climbers, lifters, and athletes who train hands separately. Matte silicone finger loops and a central tension hub give the tool enough substance for regular weekly training. Wipe it down or pack it back into the training bag after use.",
    "features": [
      "Supports hand strength and grip accessory work.",
      "Uses matte silicone finger loops and central tension hub for regular training.",
      "Ships as one Finger Trainer Hand Strength Tool.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "matte silicone finger loops and central tension hub",
      "Training role": "hand strength and grip accessory work",
      "What ships": "One Finger Trainer Hand Strength Tool",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 62,
    "id": "evo-0063",
    "sku": "AXS-0063",
    "slug": "evo-adjustable-gripper-hand-strength-tool",
    "name": "EVO Adjustable Gripper Hand Strength Tool",
    "category": "Conditioning",
    "categorySlug": "conditioning",
    "visual": "grips",
    "price": 31.80,
    "compareAt": 42.45,
    "material": "spring steel coil, textured handles, and resistance adjuster",
    "image": "/product-images/evo-adjustable-gripper-hand-strength-tool",
    "inventory": 44,
    "badges": [
      "Open-lane work",
      "Compact storage"
    ],
    "shortDescription": "This is a compact tool for hand strength and grip accessory work, using spring steel coil for garage-gym training.",
    "description": "Adds grip-specific accessory work for climbers, lifters, and athletes who train hands separately. Uses a defined contact surface, finger coverage, and breathable backing for traction without full-glove bulk. Ships with one Adjustable Gripper Hand Strength Tool.",
    "features": [
      "Supports hand contact for hand strength and grip accessory work.",
      "Uses spring steel coil, textured handles, and resistance adjuster for regular training.",
      "Ships as one Adjustable Gripper Hand Strength Tool.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "spring steel coil, textured handles, and resistance adjuster",
      "Training role": "hand strength and grip accessory work",
      "What ships": "One Adjustable Gripper Hand Strength Tool",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 63,
    "id": "evo-0064",
    "sku": "AXS-0064",
    "slug": "evo-hot-cold-pack-recovery-tool",
    "name": "EVO Hot-Cold Pack Recovery Tool",
    "category": "Storage & Recovery",
    "categorySlug": "storage-recovery",
    "visual": "roller",
    "price": 31.75,
    "compareAt": 42.30,
    "material": "soft gel pack with stitched nylon outer shell",
    "image": "/product-images/evo-hot-cold-pack-recovery-tool",
    "inventory": 90,
    "badges": [
      "Care shelf",
      "Reset work"
    ],
    "shortDescription": "This is a compact tool for post-training recovery and packable soreness care, using soft gel pack plus stitched nylon outer shell for garage-gym training.",
    "description": "Keeps heat-and-cold recovery close to the gym bag for sore elbows, knees, shoulders, and lower backs. The soft gel pack plus stitched nylon outer shell construction gives Hot-Cold Pack Recovery Tool enough substance for regular weekly training. Ships with one Hot-Cold Pack Recovery Tool.",
    "features": [
      "Supports post-training recovery and packable soreness care.",
      "Combines soft gel pack with stitched nylon outer shell for regular training.",
      "Ships as one Hot-Cold Pack Recovery Tool.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "soft gel pack with stitched nylon outer shell",
      "Training role": "post-training recovery and packable soreness care",
      "What ships": "One Hot-Cold Pack Recovery Tool",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 64,
    "id": "evo-0065",
    "sku": "AXS-0065",
    "slug": "evo-barbell-brush-equipment-care-kit",
    "name": "EVO Barbell Brush Equipment Care Kit",
    "category": "Storage & Recovery",
    "categorySlug": "storage-recovery",
    "visual": "maintenance",
    "price": 27.10,
    "compareAt": 37.95,
    "material": "brass bristles and textured polymer handle",
    "image": "/product-images/evo-barbell-brush-equipment-care-kit",
    "inventory": 71,
    "badges": [
      "Care shelf",
      "Reset work"
    ],
    "shortDescription": "This is a compact care item for equipment upkeep, storage, and weekly reset, using brass bristles and a textured polymer handle for garage-gym training.",
    "description": "Helps clean chalk and skin buildup from bar knurl before it turns into a weekly maintenance chore. This is sized to stay near the rack, shelf, or gear bin so cleanup and organization happen while the gym is still open. Ships with one barbell brush.",
    "features": [
      "Adds load for equipment upkeep, storage, and weekly reset.",
      "Uses brass bristles and textured polymer handle for regular training.",
      "Ships as one barbell brush.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "brass bristles and textured polymer handle",
      "Training role": "equipment upkeep, storage, and weekly reset",
      "What ships": "One barbell brush",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 65,
    "id": "evo-0066",
    "sku": "AXS-0066",
    "slug": "evo-sleeve-care-spray-equipment-care-kit",
    "name": "EVO Sleeve Care Spray Equipment Care Kit",
    "category": "Storage & Recovery",
    "categorySlug": "storage-recovery",
    "visual": "maintenance",
    "price": 21.85,
    "compareAt": 27.30,
    "material": "matte trigger bottle and gym-safe cleaning formula",
    "image": "/product-images/evo-sleeve-care-spray-equipment-care-kit",
    "inventory": 84,
    "badges": [
      "Care shelf",
      "Reset work"
    ],
    "shortDescription": "Brings easier gear cleanup to equipment upkeep, storage, and weekly reset for regular weekly use.",
    "description": "Gives sleeves, wraps, and fabric accessories a quick reset between sweaty training days. Uses bound edges and a textured compression body to help the pair keep its shape through repeated warmups and work sets. Sized for equipment upkeep, storage, and weekly reset, with materials chosen for home-gym use.",
    "features": [
      "Adds support for equipment upkeep, storage, and weekly reset.",
      "Uses matte trigger bottle and gym-safe cleaning formula for regular training.",
      "Ships as one sleeve care spray bottle.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "matte trigger bottle and gym-safe cleaning formula",
      "Training role": "equipment upkeep, storage, and weekly reset",
      "What ships": "One sleeve care spray bottle",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 66,
    "id": "evo-0067",
    "sku": "AXS-0067",
    "slug": "evo-equipment-tag-set-equipment-care-kit",
    "name": "EVO Equipment Tag Set Equipment Care Kit",
    "category": "Storage & Recovery",
    "categorySlug": "storage-recovery",
    "visual": "maintenance",
    "price": 21.10,
    "compareAt": 26.40,
    "material": "matte polymer tags and black metal key rings",
    "image": "/product-images/evo-equipment-tag-set-equipment-care-kit",
    "inventory": 39,
    "badges": [
      "Care shelf",
      "Reset work"
    ],
    "shortDescription": "Suits equipment upkeep, storage, and weekly reset when durability and easy storage matter.",
    "description": "Equipment Tag Set Equipment Care Kit labels bars, bands, handles, and storage spots so a shared gym area stays organized. Matte polymer tags and black metal rings work for racks, shelves, and gear bins. Keep the set near the shelf so cleanup is easy before the room closes down.",
    "features": [
      "Keeps equipment upkeep, storage, and weekly reset easier to manage.",
      "Uses matte polymer tags and black metal key rings for regular training.",
      "Ships as equipment tags and black metal rings.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "matte polymer tags and black metal key rings",
      "Training role": "equipment upkeep, storage, and weekly reset",
      "What ships": "Equipment tags and black metal rings",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 67,
    "id": "evo-0068",
    "sku": "AXS-0068",
    "slug": "evo-grip-starter-training-bundle",
    "name": "EVO Grip Starter Training Bundle",
    "category": "Training Bundles",
    "categorySlug": "bundles",
    "visual": "bundle",
    "price": 74.00,
    "compareAt": 95.15,
    "material": "woven cotton straps, elastic wrist wraps, chalk pouch, and synthetic palm pads",
    "image": "/product-images/evo-grip-starter-training-bundle",
    "inventory": 52,
    "badges": [
      "Station bundle",
      "Grouped gear"
    ],
    "shortDescription": "Grip Starter Training Bundle puts straps, wraps, chalk, and palm pads into one pull-day starter stack.",
    "description": "A pull-day starter stack for lifters who want straps, wraps, chalk, and palm coverage in one drawer. The set covers bar traction, wrist position, chalk storage, and hand contact without building a full glove setup.",
    "features": [
      "Lifting straps, wrist wraps, chalk pouch, and palm pads for a pull-day drawer.",
      "Good first stack for rows, deadlifts, pull-ups, and loaded carries.",
      "Small pieces pack together instead of scattering across the room.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "Woven cotton straps, elastic wrist wraps, chalk pouch, and synthetic palm pads",
      "Training role": "pull-day grip work, rows, and deadlifts",
      "What ships": "Lifting straps, wrist wraps, chalk pouch, and palm grip pads",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 68,
    "id": "evo-0069",
    "sku": "AXS-0069",
    "slug": "evo-pull-up-builder-training-bundle",
    "name": "EVO Pull-Up Builder Training Bundle",
    "category": "Training Bundles",
    "categorySlug": "bundles",
    "visual": "bundle",
    "price": 142.70,
    "compareAt": 175.65,
    "material": "powder-coated steel pull-up bar, latex band, and synthetic hand grips",
    "image": "/product-images/evo-pull-up-builder-training-bundle",
    "inventory": 65,
    "badges": [
      "Station piece",
      "Rack-ready"
    ],
    "shortDescription": "Pairs a pull-up bar, assistance band, and hand grips for weekly pull-up volume.",
    "description": "A doorway pull-up setup with the bar, assistance band, and hand grips in one purchase. It gives the station a bar to hang from, a band for assistance work, and grip coverage for weekly volume.",
    "features": [
      "Doorway bar, assisted pull-up band, and hand grips for a pull-up lane.",
      "Useful for building volume before every set is bodyweight-only.",
      "Band and grips stay with the bar so warmups are easy to start.",
      "Covered by a 1-year limited equipment warranty."
    ],
    "specs": {
      "Material": "Powder-coated steel pull-up bar, latex band, and synthetic hand grips",
      "Training role": "pull-up practice, band assistance, and hand protection",
      "What ships": "Doorway pull-up bar, assisted pull-up band, and pull-up hand grips",
      "Warranty": "1-year limited equipment warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 69,
    "id": "evo-0070",
    "sku": "AXS-0070",
    "slug": "evo-deadlift-support-training-bundle",
    "name": "EVO Deadlift Support Training Bundle",
    "category": "Training Bundles",
    "categorySlug": "bundles",
    "visual": "bundle",
    "price": 166.75,
    "compareAt": 205.70,
    "material": "padded leather belt, reinforced webbing straps, elastic wrist wraps, and steel collars",
    "image": "/product-images/evo-deadlift-support-training-bundle",
    "inventory": 78,
    "badges": [
      "Station piece",
      "Rack-ready"
    ],
    "shortDescription": "Packs a belt, figure-8 straps, wrist wraps, and collars for heavy pull days.",
    "description": "A heavy-pull shelf with the belt, figure-8 straps, wrist wraps, and collars that usually get reached for on the same day. It covers bracing, grip security, wrist support, and plate lockup without hunting for small pieces before the bar is loaded.",
    "features": [
      "Belt, figure-8 straps, wrist wraps, and collars for heavy pull days.",
      "Pairs bracing gear with the small pieces that keep plates and grip secure.",
      "Best stored near the bar so setup does not slow the first working set.",
      "Covered by a 1-year limited equipment warranty."
    ],
    "specs": {
      "Material": "Padded leather belt, reinforced webbing straps, elastic wrist wraps, and steel collars",
      "Training role": "deadlift days that need belt, strap, wrap, and collar support",
      "What ships": "Lifting belt, figure-8 straps, wrist wraps, and Olympic bar collars",
      "Warranty": "1-year limited equipment warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 70,
    "id": "evo-0071",
    "sku": "AXS-0071",
    "slug": "evo-home-strength-training-bundle",
    "name": "EVO Home Strength Training Bundle",
    "category": "Training Bundles",
    "categorySlug": "bundles",
    "visual": "bundle",
    "price": 254.10,
    "compareAt": 301.75,
    "material": "rubber-coated load, latex resistance bands, padded bench surface, and woven straps",
    "image": "/product-images/evo-home-strength-training-bundle",
    "inventory": 91,
    "badges": [
      "Heavy-duty",
      "Room anchor"
    ],
    "shortDescription": "Brings training gear into a compact home-gym bundle.",
    "description": "A compact starter kit for a room that needs load, bands, a bench surface, and pulling accessories without a full rack. The pieces cover basic strength work, band assistance, bench-supported movements, and grip work in a small footprint.",
    "features": [
      "Adjustable dumbbell, resistance bands, compact bench pad, and lifting straps.",
      "Built for presses, rows, band work, carries, and short home sessions.",
      "Keeps the starter pieces together when floor space is limited.",
      "Covered by a 1-year limited equipment warranty."
    ],
    "specs": {
      "Material": "Rubber-coated load, latex resistance bands, padded bench surface, and woven straps",
      "Training role": "starter home strength work with weights, bands, and straps",
      "What ships": "Adjustable dumbbell, resistance bands, compact bench pad, and lifting straps",
      "Warranty": "1-year limited equipment warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 71,
    "id": "evo-0072",
    "sku": "AXS-0072",
    "slug": "evo-bench-starter-training-bundle",
    "name": "EVO Bench Starter Training Bundle",
    "category": "Training Bundles",
    "categorySlug": "bundles",
    "visual": "bundle",
    "price": 312.70,
    "compareAt": 372.00,
    "material": "powder-coated steel, dense bench padding, and cast-iron training plates",
    "image": "/product-images/evo-bench-starter-training-bundle",
    "inventory": 20,
    "badges": [
      "Heavy-duty",
      "Room anchor"
    ],
    "shortDescription": "Suits bench-focused home training with a ready accessory stack when durability and easy storage matter.",
    "description": "A compact pressing and row station for lifters training in a garage or spare room. Dense padding, stitched vinyl, a steel frame, stand, and starter plates give the bench area a stable first setup.",
    "features": [
      "Adjustable training bench, compact barbell stand, and two small Olympic plates.",
      "Made for pressing, rows, split squats, and bench-supported accessory work.",
      "Plan the floor space before the bench and stand arrive.",
      "Covered by a 1-year limited equipment warranty."
    ],
    "specs": {
      "Material": "Powder-coated steel, dense bench padding, and cast-iron training plates",
      "Training role": "bench-focused home training with a ready accessory stack",
      "What ships": "Adjustable training bench, compact barbell stand, and two small Olympic plates",
      "Warranty": "1-year limited equipment warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 72,
    "id": "evo-0073",
    "sku": "AXS-0073",
    "slug": "evo-single-chalk-block",
    "name": "EVO Single Chalk Block",
    "category": "Chalk & Grip Basics",
    "categorySlug": "chalk-grip-basics",
    "visual": "chalk-block",
    "price": 3.25,
    "compareAt": 5.45,
    "material": "dry magnesium carbonate block in sealed kraft wrap",
    "image": "/product-images/evo-single-chalk-block",
    "inventory": 180,
    "badges": [
      "Grip drawer",
      "Small chalk"
    ],
    "shortDescription": "Dry magnesium carbonate block for a pull-day drawer, rack shelf, or travel kit.",
    "description": "A single dry chalk block gives the pull platform a compact reset piece for deadlifts, rows, pull-ups, and kettlebell handles. The sealed kraft wrap keeps loose chalk contained until it reaches the drawer or chalk pouch. Break off only what the session needs and store the rest closed and dry.",
    "features": [
      "Breaks into small pieces for dry barbell grip work.",
      "Kraft wrap helps keep chalk dust contained in a drawer or pouch.",
      "Ships with one dry chalk block.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "dry magnesium carbonate block in sealed kraft wrap",
      "Training role": "dry grip reset between barbell sets",
      "What ships": "One dry chalk block",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 73,
    "id": "evo-0074",
    "sku": "AXS-0074",
    "slug": "evo-chalk-ball-refill",
    "name": "EVO Chalk Ball Refill",
    "category": "Chalk & Grip Basics",
    "categorySlug": "chalk-grip-basics",
    "visual": "chalk-ball",
    "price": 7.40,
    "compareAt": 10.60,
    "material": "magnesium carbonate fill with cotton mesh pouch",
    "image": "/product-images/evo-chalk-ball-refill",
    "inventory": 145,
    "badges": [
      "Grip drawer",
      "Low dust"
    ],
    "shortDescription": "Mesh chalk refill for lifters who want less loose chalk around the platform.",
    "description": "The chalk ball refill keeps hand prep tidy when the room has a shared rack, bench, or pull-up bar. Its cotton mesh shell meters dry chalk without turning the shelf into a spill zone. Drop it into a pouch or tin and keep it closed between sets.",
    "features": [
      "Meters dry chalk through a cotton mesh shell.",
      "Fits a pouch, tin, or small pull-day drawer.",
      "Ships with one chalk ball refill.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "magnesium carbonate fill with cotton mesh pouch",
      "Training role": "low-dust grip work on bars and handles",
      "What ships": "One chalk ball refill",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 74,
    "id": "evo-0075",
    "sku": "AXS-0075",
    "slug": "evo-drawcord-chalk-pouch",
    "name": "EVO Drawcord Chalk Pouch",
    "category": "Chalk & Grip Basics",
    "categorySlug": "chalk-grip-basics",
    "visual": "pouch",
    "price": 14.15,
    "compareAt": 18.50,
    "material": "waxed canvas pouch, nylon drawcord, and stitched belt loop",
    "image": "/product-images/evo-drawcord-chalk-pouch",
    "inventory": 96,
    "badges": [
      "Grip drawer",
      "Canvas"
    ],
    "shortDescription": "Waxed canvas pouch for chalk blocks, chalk balls, tape, or small grip pieces.",
    "description": "This drawcord pouch gives chalk and tape a fixed place near the pull platform. The waxed canvas body stands up to shelf use, while the loop can hang from a hook or bag clip. It is sized for chalk blocks, a chalk ball, thumb tape, or small grip extras.",
    "features": [
      "Holds chalk blocks, tape, or a chalk ball refill.",
      "Drawcord top helps control dust between sets.",
      "Ships with one drawcord chalk pouch.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "waxed canvas pouch, nylon drawcord, and stitched belt loop",
      "Training role": "dry chalk placement near the pull platform",
      "What ships": "One drawcord chalk pouch",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 75,
    "id": "evo-0076",
    "sku": "AXS-0076",
    "slug": "evo-bar-grip-tape-roll",
    "name": "EVO Bar Grip Tape Roll",
    "category": "Chalk & Grip Basics",
    "categorySlug": "chalk-grip-basics",
    "visual": "tape-roll",
    "price": 10.05,
    "compareAt": 13.45,
    "material": "cotton athletic tape with matte adhesive backing",
    "image": "/product-images/evo-bar-grip-tape-roll",
    "inventory": 132,
    "badges": [
      "Tape roll",
      "Grip drawer"
    ],
    "shortDescription": "Matte cotton tape for thumb wraps, hook-grip practice, and rough-handle days.",
    "description": "The bar grip tape roll belongs with chalk and straps when thumbs or handle contact need a quick wrap. Cotton weave keeps the surface familiar without feeling slick. Tear a short strip, wrap the contact point, and replace it after the session.",
    "features": [
      "Cotton weave gives thumb wraps a dry hand feel.",
      "Matte adhesive backing helps strips stay put during repeated pulls.",
      "Ships with one roll of bar grip tape.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "cotton athletic tape with matte adhesive backing",
      "Training role": "temporary thumb and bar-contact wraps",
      "What ships": "One roll of bar grip tape",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 76,
    "id": "evo-0077",
    "sku": "AXS-0077",
    "slug": "evo-thumb-tape-3-roll-pack",
    "name": "EVO Thumb Tape 3-Roll Pack",
    "category": "Chalk & Grip Basics",
    "categorySlug": "chalk-grip-basics",
    "visual": "tape-stack",
    "price": 11.75,
    "compareAt": 16.05,
    "material": "three narrow cotton tape rolls with low-residue adhesive",
    "image": "/product-images/evo-thumb-tape-3-roll-pack",
    "inventory": 118,
    "badges": [
      "Tape pack",
      "Pull days"
    ],
    "shortDescription": "Three narrow tape rolls for hook-grip practice, dumbbell handles, and pull days.",
    "description": "Three narrow rolls keep thumb tape from disappearing after one deadlift week. The low-residue adhesive is meant for skin contact during hook-grip practice and rough handle days. Keep one roll by the rack, one in the bag, and one in reserve.",
    "features": [
      "Narrow rolls suit thumb wraps without wasting tape.",
      "Low-residue adhesive peels away after training.",
      "Ships with three narrow thumb tape rolls.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "three narrow cotton tape rolls with low-residue adhesive",
      "Training role": "hook-grip thumb wraps and handle hot spots",
      "What ships": "Three narrow thumb tape rolls",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 77,
    "id": "evo-0078",
    "sku": "AXS-0078",
    "slug": "evo-mini-knurl-brush",
    "name": "EVO Mini Knurl Brush",
    "category": "Chalk & Grip Basics",
    "categorySlug": "chalk-grip-basics",
    "visual": "brush",
    "price": 14.95,
    "compareAt": 20.30,
    "material": "short nylon handle with brass bristles",
    "image": "/product-images/evo-mini-knurl-brush",
    "inventory": 84,
    "badges": [
      "Rack care",
      "Small tool"
    ],
    "shortDescription": "Compact brass-bristle brush for chalky bar knurling and pull-up handles.",
    "description": "The mini knurl brush keeps chalk from packing into bar texture after heavy pulls or high-volume rows. A short nylon handle fits in a drawer, pouch, or rack tray. Use light passes on the knurling, then store it away from damp towels.",
    "features": [
      "Brass bristles lift chalk from bar texture.",
      "Short handle fits a rack tray or gear pouch.",
      "Ships with one mini knurl brush.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "short nylon handle with brass bristles",
      "Training role": "chalk removal from bar knurling",
      "What ships": "One mini knurl brush",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 78,
    "id": "evo-0079",
    "sku": "AXS-0079",
    "slug": "evo-wrist-sweatband-pair",
    "name": "EVO Wrist Sweatband Pair",
    "category": "Chalk & Grip Basics",
    "categorySlug": "chalk-grip-basics",
    "visual": "sweatbands",
    "price": 10.90,
    "compareAt": 15.30,
    "material": "stretch cotton terry knit with elastic cuffs",
    "image": "/product-images/evo-wrist-sweatband-pair",
    "inventory": 120,
    "badges": [
      "Grip drawer",
      "Matched pair"
    ],
    "shortDescription": "Terry wristbands that keep sweat from running into straps, tape, or hands.",
    "description": "This wrist sweatband pair is for humid rooms, long warmups, and lifters who tape before they pull. The cotton terry knit absorbs sweat before it reaches hands or straps. Toss the pair in a mesh bag after training so it can dry and wash cleanly.",
    "features": [
      "Terry knit catches sweat before it reaches the hands.",
      "Elastic cuffs keep the pair snug during rows and pull-ups.",
      "Ships with one matched wrist sweatband pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "stretch cotton terry knit with elastic cuffs",
      "Training role": "sweat control during warm-room sessions",
      "What ships": "One matched wrist sweatband pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 79,
    "id": "evo-0080",
    "sku": "AXS-0080",
    "slug": "evo-chalk-bucket-liner",
    "name": "EVO Chalk Bucket Liner",
    "category": "Chalk & Grip Basics",
    "categorySlug": "chalk-grip-basics",
    "visual": "liner",
    "price": 8.75,
    "compareAt": 12.05,
    "material": "washable ripstop nylon liner with folded rim",
    "image": "/product-images/evo-chalk-bucket-liner",
    "inventory": 88,
    "badges": [
      "Chalk station",
      "Washable"
    ],
    "shortDescription": "Washable nylon liner for a chalk bucket, shelf bin, or pull-day tray.",
    "description": "The chalk bucket liner gives loose blocks a washable landing spot inside a small bin. Ripstop nylon lifts out for cleanup, and the folded rim helps it sit open on a shelf. It works best with dry chalk blocks, chalk balls, and tape nearby.",
    "features": [
      "Ripstop liner lifts out for quick cleanup.",
      "Folded rim helps the liner sit open in a small bin.",
      "Ships with one washable chalk bucket liner.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "washable ripstop nylon liner with folded rim",
      "Training role": "small chalk bucket or shelf-bin lining",
      "What ships": "One washable chalk bucket liner",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 80,
    "id": "evo-0081",
    "sku": "AXS-0081",
    "slug": "evo-finger-tape-strip-pack",
    "name": "EVO Finger Tape Strip Pack",
    "category": "Chalk & Grip Basics",
    "categorySlug": "chalk-grip-basics",
    "visual": "tape-strips",
    "price": 6.35,
    "compareAt": 9.55,
    "material": "precut cotton tape strips with peel-away backing",
    "image": "/product-images/evo-finger-tape-strip-pack",
    "inventory": 160,
    "badges": [
      "Precut",
      "Grip drawer"
    ],
    "shortDescription": "Precut cotton tape strips for quick finger wraps before pull work.",
    "description": "Precut finger strips save time when the bar is already loaded and hands need a small wrap. The peel-away backing keeps strips flat in a pouch instead of turning into a tape knot. Use them for fingers, not for taping equipment permanently.",
    "features": [
      "Precut strips avoid tearing tape during the session.",
      "Peel-away backing stores flat in a pouch or notebook pocket.",
      "Ships with twelve precut finger tape strips.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "precut cotton tape strips with peel-away backing",
      "Training role": "quick finger wraps before rows or pull-ups",
      "What ships": "Twelve precut finger tape strips",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 81,
    "id": "evo-0082",
    "sku": "AXS-0082",
    "slug": "evo-chalk-station-mat",
    "name": "EVO Chalk Station Mat",
    "category": "Chalk & Grip Basics",
    "categorySlug": "chalk-grip-basics",
    "visual": "mat",
    "price": 30.90,
    "compareAt": 38.65,
    "material": "textured rubber mat with raised edge lip",
    "image": "/product-images/evo-chalk-station-mat",
    "inventory": 55,
    "badges": [
      "Chalk station",
      "Rubber edge"
    ],
    "shortDescription": "Small rubber mat for the shelf or floor under chalk, tape, and grip pieces.",
    "description": "The chalk station mat gives a pull shelf or corner bin a defined landing zone. Textured rubber catches loose dust and keeps tape rolls from sliding under the rack. Lift it out, shake it clean, and put chalk pieces back where hands expect them.",
    "features": [
      "Raised edge lip helps contain loose chalk dust.",
      "Textured rubber stays put on a shelf or floor corner.",
      "Ships with one textured chalk station mat.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "textured rubber mat with raised edge lip",
      "Training role": "chalk dust catch below a shelf or bin",
      "What ships": "One textured chalk station mat",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 82,
    "id": "evo-0083",
    "sku": "AXS-0083",
    "slug": "evo-microfiber-bench-towel",
    "name": "EVO Microfiber Bench Towel",
    "category": "Gym Bag Essentials",
    "categorySlug": "gym-bag-essentials",
    "visual": "towel",
    "price": 12.80,
    "compareAt": 17.10,
    "material": "low-pile microfiber with bound edges",
    "image": "/product-images/evo-microfiber-bench-towel",
    "inventory": 124,
    "badges": [
      "Bag staple",
      "Microfiber"
    ],
    "shortDescription": "Low-pile microfiber towel sized for bench pads, mats, and bag carry.",
    "description": "The microfiber bench towel gives a compact bag one clean layer for bench pads, handles, and warmup sweat. Bound edges keep it from fraying after repeated washing. Hang it over the bench after use, then wash it with other training towels.",
    "features": [
      "Low-pile microfiber folds flat in a gym bag.",
      "Bound edges hold up through repeated wash cycles.",
      "Ships with one microfiber bench towel.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "low-pile microfiber with bound edges",
      "Training role": "bench wipe-downs and warmup sweat control",
      "What ships": "One microfiber bench towel",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 83,
    "id": "evo-0084",
    "sku": "AXS-0084",
    "slug": "evo-bar-towel-2-pack",
    "name": "EVO Bar Towel 2-Pack",
    "category": "Gym Bag Essentials",
    "categorySlug": "gym-bag-essentials",
    "visual": "towel-stack",
    "price": 18.90,
    "compareAt": 24.15,
    "material": "two ribbed microfiber towels with stitched hang tabs",
    "image": "/product-images/evo-bar-towel-2-pack",
    "inventory": 100,
    "badges": [
      "Two pack",
      "Bag staple"
    ],
    "shortDescription": "Two ribbed towels for hands, bar sleeves, bench pads, and post-set cleanup.",
    "description": "The bar towel 2-pack keeps one towel on the rack and one in the bag. Ribbed microfiber grabs sweat from hands, bench vinyl, and handle surfaces without taking up much room. Stitched hang tabs let each towel dry from a hook between sessions.",
    "features": [
      "Two towels let one stay by the rack while one rides in the bag.",
      "Stitched hang tabs make drying easier after training.",
      "Ships with two ribbed microfiber bar towels.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "two ribbed microfiber towels with stitched hang tabs",
      "Training role": "wiping hands, handles, and bench pads",
      "What ships": "Two ribbed microfiber bar towels",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 84,
    "id": "evo-0085",
    "sku": "AXS-0085",
    "slug": "evo-mesh-wrap-wash-bag",
    "name": "EVO Mesh Wrap Wash Bag",
    "category": "Gym Bag Essentials",
    "categorySlug": "gym-bag-essentials",
    "visual": "mesh-bag",
    "price": 12.15,
    "compareAt": 16.55,
    "material": "breathable polyester mesh with coil zipper",
    "image": "/product-images/evo-mesh-wrap-wash-bag",
    "inventory": 105,
    "badges": [
      "Wash bag",
      "Bag staple"
    ],
    "shortDescription": "Breathable mesh bag for wrist wraps, sweatbands, bands, and small towels.",
    "description": "The mesh wrap wash bag keeps straps, sweatbands, and mini bands together on laundry day. Breathable polyester mesh lets small pieces rinse without snagging on heavier clothes. Use it for washable soft goods, then leave it open to dry.",
    "features": [
      "Mesh body keeps small soft goods together in the wash.",
      "Coil zipper keeps straps and bands from slipping out.",
      "Ships with one zippered mesh wash bag.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "breathable polyester mesh with coil zipper",
      "Training role": "washing wraps, bands, and sweatbands together",
      "What ships": "One zippered mesh wash bag",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 85,
    "id": "evo-0086",
    "sku": "AXS-0086",
    "slug": "evo-training-shoe-sack",
    "name": "EVO Training Shoe Sack",
    "category": "Gym Bag Essentials",
    "categorySlug": "gym-bag-essentials",
    "visual": "shoe-sack",
    "price": 16.75,
    "compareAt": 20.95,
    "material": "water-resistant nylon sack with drawcord closure",
    "image": "/product-images/evo-training-shoe-sack",
    "inventory": 72,
    "badges": [
      "Bag staple",
      "Shoe carry"
    ],
    "shortDescription": "Nylon drawcord sack that keeps training shoes separate from clean soft goods.",
    "description": "The training shoe sack keeps chalky soles away from towels, wraps, and shirts inside a packed gym bag. Water-resistant nylon handles damp locker-room floors better than a loose plastic bag. Pull the drawcord closed before it goes back in the trunk or closet.",
    "features": [
      "Nylon shell separates shoes from clean training soft goods.",
      "Drawcord closure cinches quickly after the session.",
      "Ships with one drawcord training shoe sack.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "water-resistant nylon sack with drawcord closure",
      "Training role": "shoe separation from towels and wraps",
      "What ships": "One drawcord training shoe sack",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 86,
    "id": "evo-0087",
    "sku": "AXS-0087",
    "slug": "evo-zipper-gear-pouch",
    "name": "EVO Zipper Gear Pouch",
    "category": "Gym Bag Essentials",
    "categorySlug": "gym-bag-essentials",
    "visual": "zip-pouch",
    "price": 20.60,
    "compareAt": 27.10,
    "material": "600D polyester pouch with lined interior and coil zipper",
    "image": "/product-images/evo-zipper-gear-pouch",
    "inventory": 90,
    "badges": [
      "Bag staple",
      "Organizer"
    ],
    "shortDescription": "Lined pouch for chalk, tape, collars clips, notebook, and small rack tools.",
    "description": "The zipper gear pouch gives the small pieces a home instead of letting them scatter through a duffel. A lined interior handles chalk residue, tape rolls, clips, and a pocket notebook. Keep it packed for the next session and empty it when dust starts to build.",
    "features": [
      "Lined interior handles chalk, tape, and small rack tools.",
      "Coil zipper keeps loose pieces from spilling inside the bag.",
      "Ships with one lined zipper gear pouch.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "600D polyester pouch with lined interior and coil zipper",
      "Training role": "tape, chalk, clip, and small-tool storage",
      "What ships": "One lined zipper gear pouch",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 87,
    "id": "evo-0088",
    "sku": "AXS-0088",
    "slug": "evo-lift-log-pocket-notebook",
    "name": "EVO Lift Log Pocket Notebook",
    "category": "Gym Bag Essentials",
    "categorySlug": "gym-bag-essentials",
    "visual": "notebook",
    "price": 8.90,
    "compareAt": 12.30,
    "material": "soft-cover paper notebook with dot-grid pages",
    "image": "/product-images/evo-lift-log-pocket-notebook",
    "inventory": 140,
    "badges": [
      "Pocket log",
      "Bag staple"
    ],
    "shortDescription": "Pocket notebook for set counts, loads, warmups, and equipment notes.",
    "description": "The pocket lift log keeps set notes close when a phone is not welcome near chalk and sweat. Dot-grid pages leave room for loads, reps, warmup jumps, and quick station notes. The soft cover slides into a gear pouch or side pocket.",
    "features": [
      "Dot-grid pages work for sets, reps, loads, and room notes.",
      "Soft cover fits a side pocket or gear pouch.",
      "Ships with one pocket lift log notebook.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "soft-cover paper notebook with dot-grid pages",
      "Training role": "set notes, load records, and warmup tracking",
      "What ships": "One pocket lift log notebook",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 88,
    "id": "evo-0089",
    "sku": "AXS-0089",
    "slug": "evo-soft-tape-measure",
    "name": "EVO Soft Tape Measure",
    "category": "Gym Bag Essentials",
    "categorySlug": "gym-bag-essentials",
    "visual": "measure",
    "price": 6.65,
    "compareAt": 10.00,
    "material": "flexible fiberglass tape with compact plastic case",
    "image": "/product-images/evo-soft-tape-measure",
    "inventory": 115,
    "badges": [
      "Fit check",
      "Bag staple"
    ],
    "shortDescription": "Flexible tape measure for sleeve sizing, belt checks, and room spacing.",
    "description": "The soft tape measure helps check sleeve sizing, belt fit, and the space around a bench or rack. Flexible fiberglass tape wraps around limbs and corners without kinking like a metal shop tape. Keep it in the gear pouch so sizing checks happen before an order.",
    "features": [
      "Flexible tape suits sleeve, belt, and body measurements.",
      "Compact case fits in a gear pouch or desk drawer.",
      "Ships with one soft tape measure.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "flexible fiberglass tape with compact plastic case",
      "Training role": "body-measurement and room-spacing checks",
      "What ships": "One soft tape measure",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 89,
    "id": "evo-0090",
    "sku": "AXS-0090",
    "slug": "evo-bottle-carabiner-clip",
    "name": "EVO Bottle Carabiner Clip",
    "category": "Gym Bag Essentials",
    "categorySlug": "gym-bag-essentials",
    "visual": "clip",
    "price": 9.70,
    "compareAt": 12.95,
    "material": "anodized aluminum carabiner with silicone bottle collar",
    "image": "/product-images/evo-bottle-carabiner-clip",
    "inventory": 92,
    "badges": [
      "Bag clip",
      "Small carry"
    ],
    "shortDescription": "Aluminum clip with silicone collar for carrying a bottle outside the bag.",
    "description": "The bottle carabiner clip keeps a training bottle out of the towel pocket. The silicone collar grips common bottle necks, and the aluminum clip hangs from a bag loop or rack hook. It is a carry clip, not a load-rated climbing carabiner.",
    "features": [
      "Silicone collar grips common bottle necks.",
      "Aluminum clip hangs from a bag loop or rack hook.",
      "Ships with one bottle carabiner clip.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "anodized aluminum carabiner with silicone bottle collar",
      "Training role": "bottle carry on a bag or rack hook",
      "What ships": "One bottle carabiner clip",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 90,
    "id": "evo-0091",
    "sku": "AXS-0091",
    "slug": "evo-band-keeper-strap-pair",
    "name": "EVO Band Keeper Strap Pair",
    "category": "Gym Bag Essentials",
    "categorySlug": "gym-bag-essentials",
    "visual": "keeper-straps",
    "price": 14.20,
    "compareAt": 18.60,
    "material": "hook-and-loop nylon straps with pull tabs",
    "image": "/product-images/evo-band-keeper-strap-pair",
    "inventory": 108,
    "badges": [
      "Organizer",
      "Matched pair"
    ],
    "shortDescription": "Hook-and-loop straps that keep bands, ropes, and rolled towels bundled.",
    "description": "The band keeper strap pair keeps loops, ropes, and rolled towels from exploding across a shelf. Pull tabs make the straps easy to open with chalky hands. Use one for mini bands and one for the cable, towel, or stretch strap.",
    "features": [
      "Hook-and-loop closure bundles bands and rolled soft goods.",
      "Pull tabs make the straps easier to open after training.",
      "Ships with one matched band keeper strap pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "hook-and-loop nylon straps with pull tabs",
      "Training role": "band, rope, and rolled towel storage",
      "What ships": "One matched band keeper strap pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 91,
    "id": "evo-0092",
    "sku": "AXS-0092",
    "slug": "evo-bench-cover-towel",
    "name": "EVO Bench Cover Towel",
    "category": "Gym Bag Essentials",
    "categorySlug": "gym-bag-essentials",
    "visual": "bench-towel",
    "price": 20.40,
    "compareAt": 26.85,
    "material": "oversized microfiber towel with grippy silicone corner dots",
    "image": "/product-images/evo-bench-cover-towel",
    "inventory": 76,
    "badges": [
      "Bench station",
      "Microfiber"
    ],
    "shortDescription": "Oversized towel with grippy corner dots for bench pads and floor mats.",
    "description": "The bench cover towel adds a larger washable layer for warm rooms and shared bench stations. Grippy silicone corner dots help the towel stay put on vinyl pads and mats. Fold it lengthwise for a narrow bench or open it flat for a mobility mat.",
    "features": [
      "Oversized microfiber covers bench pads and small mats.",
      "Silicone corner dots help reduce sliding during setup.",
      "Ships with one oversized bench cover towel.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "oversized microfiber towel with grippy silicone corner dots",
      "Training role": "bench-pad cover for warm or shared sessions",
      "What ships": "One oversized bench cover towel",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 92,
    "id": "evo-0093",
    "sku": "AXS-0093",
    "slug": "evo-mini-loop-band-light",
    "name": "EVO Mini Loop Band Light",
    "category": "Setup & Mobility Minis",
    "categorySlug": "setup-mobility-minis",
    "visual": "loop-band",
    "price": 10.65,
    "compareAt": 13.85,
    "material": "light resistance latex loop band with matte finish",
    "image": "/product-images/evo-mini-loop-band-light",
    "inventory": 150,
    "badges": [
      "Warmup piece",
      "Light band"
    ],
    "shortDescription": "Light mini loop band for warmups, shoulder prep, and glute activation.",
    "description": "The light mini loop band belongs in the warmup corner for small activation work before heavier lifts. Matte latex gives a familiar stretch without taking much drawer space. Keep it away from sharp rack edges and direct heat between sessions.",
    "features": [
      "Light resistance suits warmups and activation work.",
      "Matte latex loop stores flat in a drawer or pouch.",
      "Ships with one light mini loop band.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "light resistance latex loop band with matte finish",
      "Training role": "glute activation, shoulder prep, and easy warmups",
      "What ships": "One light mini loop band",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 93,
    "id": "evo-0094",
    "sku": "AXS-0094",
    "slug": "evo-mini-loop-band-medium",
    "name": "EVO Mini Loop Band Medium",
    "category": "Setup & Mobility Minis",
    "categorySlug": "setup-mobility-minis",
    "visual": "loop-band",
    "price": 14.60,
    "compareAt": 19.10,
    "material": "medium resistance latex loop band with matte finish",
    "image": "/product-images/evo-mini-loop-band-medium",
    "inventory": 132,
    "badges": [
      "Warmup piece",
      "Medium band"
    ],
    "shortDescription": "Medium mini loop band for hip work, rows, warmups, and accessory drills.",
    "description": "The medium mini loop band adds more tension for hip work, light rows, and controlled warmups. It fits beside a stretch strap or mobility ball without crowding the shelf. Store it flat, not stretched over a hook for days at a time.",
    "features": [
      "Medium resistance adds tension for hip and accessory work.",
      "Compact loop fits warmup shelves and bag pockets.",
      "Ships with one medium mini loop band.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "medium resistance latex loop band with matte finish",
      "Training role": "hip work, rows, and controlled warmups",
      "What ships": "One medium mini loop band",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 94,
    "id": "evo-0095",
    "sku": "AXS-0095",
    "slug": "evo-mini-loop-band-heavy",
    "name": "EVO Mini Loop Band Heavy",
    "category": "Setup & Mobility Minis",
    "categorySlug": "setup-mobility-minis",
    "visual": "loop-band",
    "price": 16.90,
    "compareAt": 22.20,
    "material": "heavy resistance latex loop band with matte finish",
    "image": "/product-images/evo-mini-loop-band-heavy",
    "inventory": 118,
    "badges": [
      "Warmup piece",
      "Heavy band"
    ],
    "shortDescription": "Heavy mini loop band for stronger hip work and short accessory sets.",
    "description": "The heavy mini loop band gives the warmup corner a stronger option for hip work, walks, and short accessory sets. Matte latex keeps the loop compact while still feeling substantial in hand. Inspect the band before use and retire it if cuts appear.",
    "features": [
      "Heavy resistance suits stronger hip and accessory work.",
      "Matte loop is compact enough for a pouch or shelf bin.",
      "Ships with one heavy mini loop band.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "heavy resistance latex loop band with matte finish",
      "Training role": "stronger hip work and banded accessory sets",
      "What ships": "One heavy mini loop band",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 95,
    "id": "evo-0096",
    "sku": "AXS-0096",
    "slug": "evo-lacrosse-mobility-ball",
    "name": "EVO Lacrosse Mobility Ball",
    "category": "Setup & Mobility Minis",
    "categorySlug": "setup-mobility-minis",
    "visual": "mobility-ball",
    "price": 9.95,
    "compareAt": 13.30,
    "material": "firm rubber mobility ball with matte surface",
    "image": "/product-images/evo-lacrosse-mobility-ball",
    "inventory": 110,
    "badges": [
      "Mobility",
      "Small tool"
    ],
    "shortDescription": "Firm rubber ball for foot, calf, shoulder, and rack-side mobility work.",
    "description": "The lacrosse mobility ball is a small pressure tool for the mat, bench, or wall. Firm rubber gives feedback for feet, calves, shoulders, and upper-back spots before training. Keep it in a pouch so it does not roll under the rack.",
    "features": [
      "Firm rubber surface works against a mat, wall, or bench.",
      "Small size stores in a pouch between warmups.",
      "Ships with one firm mobility ball.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "firm rubber mobility ball with matte surface",
      "Training role": "foot, calf, and shoulder pressure work",
      "What ships": "One firm mobility ball",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 96,
    "id": "evo-0097",
    "sku": "AXS-0097",
    "slug": "evo-peanut-mobility-ball",
    "name": "EVO Peanut Mobility Ball",
    "category": "Setup & Mobility Minis",
    "categorySlug": "setup-mobility-minis",
    "visual": "peanut-ball",
    "price": 15.10,
    "compareAt": 20.50,
    "material": "dual-lobed firm rubber mobility tool",
    "image": "/product-images/evo-peanut-mobility-ball",
    "inventory": 98,
    "badges": [
      "Mobility",
      "Warmup piece"
    ],
    "shortDescription": "Dual-lobed rubber mobility tool for upper-back, calf, and wall work.",
    "description": "The peanut mobility ball gives the warmup shelf a two-lobed tool for upper-back and calf work. Its shape leaves space around the spine while still giving firm pressure on each side. Use it on a mat or wall, then store it with the bands.",
    "features": [
      "Dual-lobed shape suits upper-back and calf pressure work.",
      "Firm rubber body stores with bands and stretch straps.",
      "Ships with one dual-lobed peanut mobility ball.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "dual-lobed firm rubber mobility tool",
      "Training role": "upper-back, calf, and rack-side mobility work",
      "What ships": "One dual-lobed peanut mobility ball",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 97,
    "id": "evo-0098",
    "sku": "AXS-0098",
    "slug": "evo-mini-core-slider-pair",
    "name": "EVO Mini Core Slider Pair",
    "category": "Setup & Mobility Minis",
    "categorySlug": "setup-mobility-minis",
    "visual": "sliders",
    "price": 20.15,
    "compareAt": 26.55,
    "material": "low-friction discs with beveled edge and foam grip face",
    "image": "/product-images/evo-mini-core-slider-pair",
    "inventory": 82,
    "badges": [
      "Core work",
      "Matched pair"
    ],
    "shortDescription": "Low-friction slider pair for core drills, hamstring curls, and warmups.",
    "description": "The mini core slider pair adds controlled floor work without needing a large machine. Low-friction discs move on smooth floors, while the foam face gives hands or heels a softer contact point. Stack the pair near the mat when warmups are done.",
    "features": [
      "Low-friction discs move through core and hamstring drills.",
      "Foam grip face gives hands or heels a softer contact point.",
      "Ships with one matched mini core slider pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "low-friction discs with beveled edge and foam grip face",
      "Training role": "core drills, hamstring curls, and warmup slides",
      "What ships": "One matched mini core slider pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 98,
    "id": "evo-0099",
    "sku": "AXS-0099",
    "slug": "evo-compact-stretch-strap",
    "name": "EVO Compact Stretch Strap",
    "category": "Setup & Mobility Minis",
    "categorySlug": "setup-mobility-minis",
    "visual": "stretch-strap",
    "price": 18.90,
    "compareAt": 24.50,
    "material": "woven nylon strap with numbered loop handles",
    "image": "/product-images/evo-compact-stretch-strap",
    "inventory": 95,
    "badges": [
      "Mobility",
      "Loop handles"
    ],
    "shortDescription": "Looped nylon strap for hamstring, shoulder, hip, and cooldown work.",
    "description": "The compact stretch strap keeps warmup work organized with loop handles instead of a loose towel. Woven nylon holds its shape through hamstring, shoulder, and hip positions. Roll it tight and keep it beside the mat or recovery shelf.",
    "features": [
      "Loop handles help repeat the same stretch position.",
      "Woven nylon rolls tightly for drawer or bag storage.",
      "Ships with one compact stretch strap.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "woven nylon strap with numbered loop handles",
      "Training role": "hamstring, shoulder, and hip warmup work",
      "What ships": "One compact stretch strap",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 99,
    "id": "evo-0100",
    "sku": "AXS-0100",
    "slug": "evo-door-anchor-strap",
    "name": "EVO Door Anchor Strap",
    "category": "Setup & Mobility Minis",
    "categorySlug": "setup-mobility-minis",
    "visual": "door-anchor",
    "price": 14.35,
    "compareAt": 18.80,
    "material": "nylon webbing strap with foam door stop and stitched loop",
    "image": "/product-images/evo-door-anchor-strap",
    "inventory": 86,
    "badges": [
      "Anchor point",
      "Band work"
    ],
    "shortDescription": "Foam-ended door anchor for light band rows, presses, and warmups.",
    "description": "The door anchor strap gives light bands a temporary indoor anchor when a rack is not available. Nylon webbing and a foam door stop sit on the hinge side of a closed door. Use it with light bands only and check the door before each session.",
    "features": [
      "Foam door stop creates a temporary anchor for light band work.",
      "Stitched loop accepts common resistance band handles and loops.",
      "Ships with one door anchor strap.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "nylon webbing strap with foam door stop and stitched loop",
      "Training role": "light-band anchor point for rows and warmups",
      "What ships": "One door anchor strap",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 100,
    "id": "evo-0101",
    "sku": "AXS-0101",
    "slug": "evo-foam-wedge-pair",
    "name": "EVO Foam Wedge Pair",
    "category": "Setup & Mobility Minis",
    "categorySlug": "setup-mobility-minis",
    "visual": "wedges",
    "price": 26.40,
    "compareAt": 33.75,
    "material": "dense EVA foam wedges with textured top surface",
    "image": "/product-images/evo-foam-wedge-pair",
    "inventory": 70,
    "badges": [
      "Warmup piece",
      "Matched pair"
    ],
    "shortDescription": "Dense foam wedges for heel elevation, ankle prep, and squat warmups.",
    "description": "The foam wedge pair adds a compact heel-elevation option for ankle prep and squat warmups. Dense EVA foam keeps the wedges light enough for a bag but firm enough for repeated stance checks. Store the pair together so the angles match.",
    "features": [
      "Dense EVA foam gives a light heel-elevation option.",
      "Textured top surface helps feet stay planted during setup.",
      "Ships with one matched foam wedge pair.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "dense EVA foam wedges with textured top surface",
      "Training role": "heel elevation for squats and ankle prep",
      "What ships": "One matched foam wedge pair",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  },
  {
    "index": 101,
    "id": "evo-0102",
    "sku": "AXS-0102",
    "slug": "evo-floor-marker-disc-6-pack",
    "name": "EVO Floor Marker Disc 6-Pack",
    "category": "Setup & Mobility Minis",
    "categorySlug": "setup-mobility-minis",
    "visual": "markers",
    "price": 30.80,
    "compareAt": 39.30,
    "material": "six flexible rubber marker discs with low-profile edges",
    "image": "/product-images/evo-floor-marker-disc-6-pack",
    "inventory": 68,
    "badges": [
      "Six pack",
      "Floor markers"
    ],
    "shortDescription": "Six low-profile marker discs for stance checks, agility lanes, and warmups.",
    "description": "The floor marker disc 6-pack gives a room lightweight markers for stance checks, ladder work, and open-lane drills. Flexible rubber sits low on the floor and stacks neatly after the session. Use the discs to mark positions, not as sliding surfaces.",
    "features": [
      "Six low-profile discs mark stance, lane, and warmup positions.",
      "Flexible rubber stacks flat in a drawer or pouch.",
      "Ships with six flexible floor marker discs.",
      "Covered by a 90-day accessory warranty."
    ],
    "specs": {
      "Material": "six flexible rubber marker discs with low-profile edges",
      "Training role": "stance, ladder, and open-lane drill markers",
      "What ships": "Six flexible floor marker discs",
      "Warranty": "90-day accessory warranty",
      "Ships from": "United States fulfillment network"
    }
  }
] satisfies Product[];

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
