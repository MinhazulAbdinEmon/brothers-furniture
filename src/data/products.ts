// ============================================================================
//  PRODUCTS — THE ONLY FILE YOU EDIT TO MANAGE YOUR SHOP
// ============================================================================
//
//  Every product on the website lives in the list below. The website reads
//  this list automatically:
//
//    • ADD a product      → copy the template below, paste it into the list,
//                           change the details. It appears on the site.
//    • DELETE a product   → remove its { ... } block. It disappears.
//    • CHANGE a price     → edit the `price` number. (price: 450 shows
//                           "AED 450". price: null shows no price.)
//    • CHANGE a photo     → upload the photo to the  public/products/  folder,
//                           then write its path here, e.g. "/products/my-sofa.jpg"
//    • MARK AS SOLD       → set  available: false  (card shows "Sold Out")
//    • FEATURE a product  → set  featured: true  (shown first on the homepage)
//
//  ── TEMPLATE — copy from here ──────────────────────────────────────────────
//  {
//    id: "sofa-024",                          // unique, never reuse an old id
//    name: "Brown Leather Sofa",              // shown on the card
//    section: "sofas",                        // which page it appears on:
//                                             // "sofas" | "fridges" | "ovens"
//                                             // | "washing-machines" | "wardrobes"
//    type: "3-seater",                        // filter group (optional)
//    price: 250,                              // AED number, or null = "ask us"
//    oldPrice: 600,                           // optional — shown crossed out
//    condition: "Good Condition",             // optional — small text on card
//    images: ["/products/my-photo.jpg"],      // main photos (first = card photo)
//    realPhotos: ["/products/my-photo-2.jpg"],// optional untouched photos
//    description: "Clean and comfortable.",   // optional — shown in the popup
//    featured: true,                          // optional — first on homepage
//    available: true,                         // false = Sold Out badge
//  },
//  ── to here ────────────────────────────────────────────────────────────────
//
//  Only `id`, `name` and `section` are required — leave the rest out and the
//  card simply hides that part (no broken layout).
//
//  Existing photos live in /public/sofas, /public/fridges, /public/ovens,
//  /public/washing-machines, /public/wardrobes. NEW photos go in
//  /public/products — any folder under /public works, the path you write
//  here just has to match.
//
//  Full instructions: PRODUCT_MANAGEMENT_GUIDE.md in the project root.
// ============================================================================

/** Set to false to completely HIDE sold-out products from the website
 *  (instead of showing them with a "Sold Out" badge). */
export const SHOW_SOLD_OUT_ITEMS = true

/** The five shop sections (each has its own page). */
export type SectionId =
  | "sofas"
  | "fridges"
  | "ovens"
  | "washing-machines"
  | "wardrobes"
  | "dinning-tables"

export interface ProductEntry {
  /** Unique id, e.g. "sofa-024". Used in WhatsApp messages. */
  id: string
  /** Short, plain name — colour + type reads best. */
  name: string
  /** Which page/section the product appears on. */
  section: SectionId
  /** Filter group inside the section (e.g. "l-shaped", "silver"). Optional. */
  type?: string
  /** Price in AED. null (or omitted) = no price shown, customers ask. */
  price?: number | null
  /** Old price in AED, shown crossed out next to the price. Optional. */
  oldPrice?: number | null
  /** e.g. "Good Condition", "Like New". Optional. */
  condition?: string | null
  /** Main photos. First one is the card photo. */
  images?: string[]
  /** Real, untouched photos (shown in the "Original Photo" tab). Optional. */
  realPhotos?: string[]
  /** Short description shown in the product popup. Optional. */
  description?: string | null
  /** true = shown first in the homepage previews. */
  featured?: boolean
  /** false = "Sold Out" badge (or hidden — see SHOW_SOLD_OUT_ITEMS). */
  available?: boolean
  /** Custom WhatsApp message for this product. Optional. */
  whatsappMessage?: string | null
}

export const products: ProductEntry[] = [
  // ──────────────────────────── SOFAS ────────────────────────────
  // type: "sofa-set" | "l-shaped" | "3-seater" | "2-seater" | "single"
  {
    id: "sofa-001",
    name: "Blue 2-Seater Sofa",
    section: "sofas",
    type: "2-seater",
    price: 222,
    oldPrice: 500,
    images: ["/sofas/sofa-001-enhanced.webp"],
    realPhotos: ["/sofas/sofa-001-original-1.webp"],
  },
  {
    id: "sofa-002",
    name: "Mustard 3-Seater Sofa",
    section: "sofas",
    type: "3-seater",
    images: ["/sofas/sofa-002-enhanced.webp"],
    realPhotos: ["/sofas/sofa-002-original-1.webp"],
  },
  {
    id: "sofa-003",
    name: "Teal Single Armchair",
    section: "sofas",
    type: "single",
    images: ["/sofas/sofa-003-enhanced.webp"],
    realPhotos: ["/sofas/sofa-003-original-1.webp"],
  },
  {
    id: "sofa-004",
    name: "Grey Chesterfield Sofa Set",
    section: "sofas",
    type: "sofa-set",
    images: ["/sofas/sofa-004-enhanced.webp"],
    realPhotos: ["/sofas/sofa-004-original-1.webp"],
  },
  {
    id: "sofa-005",
    name: "White Classic Loveseat",
    section: "sofas",
    type: "2-seater",
    images: ["/sofas/sofa-005-enhanced.webp"],
    realPhotos: ["/sofas/sofa-005-original-1.webp"],
  },
  {
    id: "sofa-006",
    name: "Brown & Red 2-Seater Sofa",
    section: "sofas",
    type: "2-seater",
    images: ["/sofas/sofa-006-enhanced.webp"],
    realPhotos: ["/sofas/sofa-006-original-1.webp"],
  },
  {
    id: "sofa-007",
    name: "Brown 3-Seater Sofa Bed",
    section: "sofas",
    type: "3-seater",
    images: ["/sofas/sofa-007-enhanced.webp"],
    realPhotos: ["/sofas/sofa-007-original-1.webp"],
  },
  {
    id: "sofa-008",
    name: "Blue Chesterfield Sofa",
    section: "sofas",
    type: "3-seater",
    images: ["/sofas/sofa-008-enhanced.webp"],
    realPhotos: ["/sofas/sofa-008-original-1.webp"],
  },
  {
    id: "sofa-009",
    name: "Grey Single Armchair",
    section: "sofas",
    type: "single",
    images: ["/sofas/sofa-009-enhanced.webp"],
    realPhotos: ["/sofas/sofa-009-original-1.webp"],
  },
  {
    id: "sofa-010",
    name: "Brown 2-Seater Sofa",
    section: "sofas",
    type: "2-seater",
    images: ["/sofas/sofa-010-enhanced.webp"],
    realPhotos: ["/sofas/sofa-010-original-1.webp"],
  },
  {
    id: "sofa-011",
    name: "Grey 3-Seater Sofa",
    section: "sofas",
    type: "3-seater",
    images: ["/sofas/sofa-011-enhanced.webp"],
    realPhotos: ["/sofas/sofa-011-original-1.webp"],
  },
  {
    id: "sofa-012",
    name: "Teal L-Shaped Sofa",
    section: "sofas",
    type: "l-shaped",
    images: ["/sofas/sofa-012-enhanced.webp"],
    realPhotos: ["/sofas/sofa-012-original-1.webp"],
  },
  {
    id: "sofa-013",
    name: "Brown L-Shaped Sofa",
    section: "sofas",
    type: "l-shaped",
    images: ["/sofas/sofa-013-enhanced.webp"],
    realPhotos: ["/sofas/sofa-013-original-1.webp"],
  },
  {
    id: "sofa-014",
    name: "Navy L-Shaped Sofa",
    section: "sofas",
    type: "l-shaped",
    images: ["/sofas/sofa-014-enhanced.webp"],
    realPhotos: ["/sofas/sofa-014-original-1.webp"],
  },
  {
    id: "sofa-015",
    name: "Cream & Gold Loveseat",
    section: "sofas",
    type: "2-seater",
    images: ["/sofas/sofa-015-enhanced.webp"],
    realPhotos: ["/sofas/sofa-015-original-1.webp"],
  },
  {
    id: "sofa-016",
    name: "Green Single Armchair",
    section: "sofas",
    type: "single",
    images: ["/sofas/sofa-016-enhanced.webp"],
    realPhotos: ["/sofas/sofa-016-original-1.webp"],
  },
  {
    id: "sofa-017",
    name: "Pink 3-Seater Sofa",
    section: "sofas",
    type: "3-seater",
    images: ["/sofas/sofa-017-enhanced.webp"],
    realPhotos: ["/sofas/sofa-017-original-1.webp"],
  },
  {
    id: "sofa-018",
    name: "Beige Sofa Set",
    section: "sofas",
    type: "sofa-set",
    images: ["/sofas/sofa-018-enhanced.webp"],
    realPhotos: ["/sofas/sofa-018-original-1.webp"],
  },
  {
    id: "sofa-019",
    name: "Pink Wingback Armchair",
    section: "sofas",
    type: "single",
    images: ["/sofas/sofa-019-enhanced.webp"],
    realPhotos: ["/sofas/sofa-019-original-1.webp"],
  },
  {
    id: "sofa-020",
    name: "Mauve L-Shaped Sofa",
    section: "sofas",
    type: "l-shaped",
    images: ["/sofas/sofa-020-enhanced.webp"],
    realPhotos: ["/sofas/sofa-020-original-1.webp"],
  },
  {
    id: "sofa-021",
    name: "Orange Leather Armchair",
    section: "sofas",
    type: "single",
    images: ["/sofas/sofa-021-enhanced.webp"],
    realPhotos: ["/sofas/sofa-021-original-1.webp"],
  },
  {
    id: "sofa-022",
    name: "Tan 2-Seater Sofa",
    section: "sofas",
    type: "2-seater",
    images: ["/sofas/sofa-022-enhanced.webp"],
    realPhotos: ["/sofas/sofa-022-original-1.webp"],
  },
  {
    id: "sofa-023",
    name: "Cream Tufted Bench Sofa",
    section: "sofas",
    type: "3-seater",
    images: ["/sofas/sofa-023-enhanced.webp"],
    realPhotos: ["/sofas/sofa-023-original-1.webp"],
  },

  // ─────────────────────────── FRIDGES ───────────────────────────
  // type: "silver" | "white"
  {
    id: "fridge-001",
    name: "Silver Top-Freezer Fridge",
    section: "fridges",
    type: "silver",
    price: 450,
    oldPrice: 550,
    images: ["/fridges/fridge-001-enhanced.webp"],
    realPhotos: ["/fridges/fridge-001-original-1.webp"],
  },
  {
    id: "fridge-002",
    name: "Silver Top-Freezer Fridge",
    section: "fridges",
    type: "silver",
    price: 450,
    oldPrice: 550,
    images: ["/fridges/fridge-002-enhanced.webp"],
    realPhotos: ["/fridges/fridge-002-original-1.webp"],
  },
  {
    id: "fridge-003",
    name: "Silver Top-Freezer Fridge",
    section: "fridges",
    type: "silver",
    price: 450,
    oldPrice: 550,
    images: ["/fridges/fridge-003-enhanced.webp"],
    realPhotos: ["/fridges/fridge-003-original-1.webp"],
  },
  {
    id: "fridge-004",
    name: "Silver Top-Freezer Fridge",
    section: "fridges",
    type: "silver",
    price: 450,
    oldPrice: 550,
    images: ["/fridges/fridge-004-enhanced.webp"],
    realPhotos: ["/fridges/fridge-004-original-1.webp"],
  },
  {
    id: "fridge-005",
    name: "White Top-Freezer Fridge",
    section: "fridges",
    type: "white",
    price: 450,
    oldPrice: 550,
    images: ["/fridges/fridge-005-enhanced.webp"],
    realPhotos: ["/fridges/fridge-005-original-1.webp"],
  },
  {
    id: "fridge-006",
    name: "White Top-Freezer Fridge",
    section: "fridges",
    type: "white",
    price: 450,
    oldPrice: 550,
    images: ["/fridges/fridge-006-enhanced.webp"],
    realPhotos: ["/fridges/fridge-006-original-1.webp"],
  },

  // ──────────────────────── OVENS & COOKERS ──────────────────────
  // type: "oven" | "gas-cooker"
  {
    id: "oven-001",
    name: "Stainless Gas Cooker",
    section: "ovens",
    type: "gas-cooker",
    price: 50,
    oldPrice: 75,
    images: ["/ovens/oven-001-enhanced.webp"],
    realPhotos: ["/ovens/oven-001-original-1.webp"],
  },
  {
    id: "oven-002",
    name: "Microwave Oven",
    section: "ovens",
    type: "oven",
    price:100,
    images: ["/ovens/oven-002-enhanced.webp"],
    realPhotos: ["/ovens/oven-002-original-1.webp"],
  },
  {
    id: "oven-003",
    name: "Electric Oven",
    section: "ovens",
    type: "oven",
    price:100,
    images: ["/ovens/oven-003-enhanced.webp"],
    realPhotos: ["/ovens/oven-003-original-1.webp"],
  },
  {
    id: "oven-004",
    name: "Microwave Oven",
    section: "ovens",
    type: "oven",
    price:100,
    available:false,
    images: ["/ovens/oven-004-enhanced.webp"],
    realPhotos: ["/ovens/oven-004-original-1.webp"],
  },

  // ─────────────────────── WASHING MACHINES ──────────────────────
  {
    id: "washer-001",
    name: "Black Washing Machine",
    section: "washing-machines",
    price: 200,
    oldPrice: 245,
    images: ["/washing-machines/washer-001-enhanced.webp"],
    realPhotos: ["/washing-machines/washer-001-original-1.webp"],
  },
  {
    id: "washer-002",
    name: "White Washing Machine",
    section: "washing-machines",
    price: 250,
    oldPrice: 300,
    images: ["/washing-machines/washer-002-enhanced.webp"],
    realPhotos: ["/washing-machines/washer-002-original-1.webp"],
  },

  // ─────────────────────────── WARDROBES ─────────────────────────
  {
    id: "wardrobe-001",
    name: "White Wardrobe",
    section: "wardrobes",
    images: ["/wardrobes/wardrobe-001-enhanced.webp"],
    realPhotos: ["/wardrobes/wardrobe-001-original-1.webp"],
  },
  {
    id: "wardrobe-002",
    name: "White Mirrored Wardrobe",
    section: "wardrobes",
    price: 200,
    oldPrice: 250,
    images: ["/wardrobes/wardrobe-002-enhanced.webp"],
    realPhotos: ["/wardrobes/wardrobe-002-original-1.webp"],
  },
]
