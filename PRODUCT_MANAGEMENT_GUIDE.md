# 🛋️ Product Management Guide — Shahid Used Furniture

This guide explains how to manage everything in your shop **without knowing
how to code**. You only ever touch **two places**:

| What | Where |
|---|---|
| 📝 All product info (names, prices, photos, sold-out…) | `src/data/products.ts` |
| 📷 New product photos | `public/products/` folder |

That's it. Everything else updates automatically.

---

## 1. How the website works

Every product is one small block of text in `src/data/products.ts`, like this:

```js
{
  id: "sofa-001",
  name: "Blue 2-Seater Sofa",
  section: "sofas",
  type: "2-seater",
  price: 450,
  images: ["/sofas/sofa-001-enhanced.webp"],
  realPhotos: ["/sofas/sofa-001-original-1.webp"],
},
```

The website reads this list and builds all the pages from it:

- **Add a block** → the product appears on the website.
- **Delete a block** → the product disappears.
- **Change anything inside a block** → the website shows the new info.

Only `id`, `name` and `section` are required. If you leave out the price,
photo, condition or description, the card simply hides that part — nothing
breaks.

---

## 2. Add a new product

1. Take a photo of the item.
2. Save the photo into the **`public/products/`** folder.
   Use a simple name: small letters, numbers and dashes, **no spaces**.
   ✅ `brown-sofa-1.jpg`  ❌ `My New Sofa (1).JPG`
3. Open `src/data/products.ts`, copy the template from the big comment at the
   top, paste it into the list, and fill it in:

```js
{
  id: "sofa-024",                       // must be NEW — never reuse an old id
  name: "Brown Leather Sofa",
  section: "sofas",                     // "sofas" | "fridges" | "ovens"
                                        // | "washing-machines" | "wardrobes"
  type: "3-seater",                     // which filter button it appears under
  price: 450,                           // or null if you prefer "ask us"
  condition: "Good Condition",
  images: ["/products/brown-sofa-1.jpg"],
  description: "Clean and comfortable, available in Ajman.",
},
```

4. Save the file. Done — the product now shows on the Sofas page, the
   homepage preview, and the All Products page.

**Filter buttons are automatic.** If you give a product a new `type`
(for example `type: "recliner"`), a "Recliner" filter button appears by
itself. You never edit the buttons.

---

## 3. Delete a product

Open `src/data/products.ts`, find the product's block — everything from its
`{` to its `},` — and delete it. Save. It's gone from the website.

💡 **Tip:** if the item is just sold (and might come back, or you want people
to see it sold), don't delete it — mark it sold instead (next section).

---

## 4. Mark a product as SOLD

In the product's block, add:

```js
available: false,
```

The card stays on the website with a red **"Sold Out"** badge and a
black-and-white photo.

**Want sold items hidden completely?** Near the top of `products.ts` change:

```js
export const SHOW_SOLD_OUT_ITEMS = true    // ← change true to false
```

…and every sold-out product disappears from the site (but stays in your file,
so you can bring it back anytime with `available: true`).

---

## 5. Change a price

Find the product and edit the number:

```js
price: 450,        // shows "AED 450"
price: null,       // shows NO price (customers ask on WhatsApp)
```

Want to show a discount? Add the old price too:

```js
price: 350,
oldPrice: 450,     // shown crossed out: AED 350  ~~AED 450~~
```

---

## 6. Change or add photos

- **Replace a photo:** upload the new photo to `public/products/`, then change
  the path in the product's block:
  ```js
  images: ["/products/new-photo.jpg"],
  ```
- **More than one photo:** just add more paths — visitors can swipe through
  them in the popup:
  ```js
  images: ["/products/sofa-front.jpg", "/products/sofa-side.jpg"],
  ```
- **Real (untouched) photos:** `realPhotos` works the same way. When a product
  has both, the popup gets the "Original Photo" and "Compare" tabs
  automatically.
- **No photo yet?** Leave `images` out — the card shows a clean
  "Photo coming soon" placeholder.

The old photos in `public/sofas/`, `public/fridges/` etc. keep working — you
don't need to move them. Just put **new** photos in `public/products/`.

---

## 7. Feature a product on the homepage

The homepage shows the first 4 products of each section. To push a product to
the front of its section's preview, add:

```js
featured: true,
```

---

## 8. Change the WhatsApp number / phone / hours

All business info is in **one file**: `src/lib/site.ts`
— phone numbers, the WhatsApp number (`whatsapp: "https://wa.me/971..."`),
opening hours, map link, Facebook/Instagram links, and the currency (`AED`).
Change it there and the whole website updates (every button, every product).

Each product card already has a green WhatsApp button. It opens WhatsApp with
a ready message like *"Hello, I am interested in this item: Blue 2-Seater
Sofa (sofa-001). Is it available?"* plus a link that opens your website with
that exact product's popup already showing. To customise the message for one
product, add:

```js
whatsappMessage: "Hello! Is the brown leather sofa still available?",
```

---

## 9. ⚠️ Important: when do changes go live?

Your website is **static** — it is built once and served by Vercel. Editing
`products.ts` on your computer does **not** change the live site by itself.
Changes go live when the code is pushed to GitHub
(`MinhazulAbdinEmon/brothers-furniture`) — Vercel then rebuilds and deploys
automatically, usually in 1–2 minutes.

**Easiest way to edit (no tools needed):** open the file on the GitHub
website → press the ✏️ pencil → edit → **Commit changes**. Photos can be
uploaded on GitHub too: open the `public/products` folder → **Add file →
Upload files**. Each commit triggers a new deployment automatically.

**If you want true live editing one day** (change prices from your phone with
no deployment), the simplest future upgrades are, in order of effort:

1. **Google Sheet as product list** — smallest step, prices in a spreadsheet.
2. **Sanity or Supabase** — a free, friendly admin panel for products + image
   uploads; the site reads from it instantly.
3. **A small custom admin dashboard** — most flexible, most work.

Ask a developer (or Claude 🙂) for any of these when you're ready — the code
is now structured so this swap only touches one file (`src/lib/catalog.ts`).

---

## 10. Add a whole new section (e.g. ACs, Dining Tables…)

A "section" is a page with its own nav link, like Sofas or Fridges. Adding
one takes **two small edits** — everything else (navbar link, "Shop by
category" tile, homepage preview, the page itself, the All Products filter)
appears automatically.

**Edit 1 — `src/data/products.ts`:** find the `SectionId` list near the top
and add your new section name to it:

```ts
export type SectionId =
  | "sofas"
  | "fridges"
  | "ovens"
  | "washing-machines"
  | "wardrobes"
  | "acs"          // ← add this line
```

**Edit 2 — `src/lib/categories-registry.tsx`:** find the `SECTIONS` list,
copy the whole `wardrobes` block (from its `{` to its `},`), paste it at the
end of the list, and change the words:

```tsx
  {
    slug: "acs",                          // must match what you wrote in Edit 1
    label: "ACs",                         // navbar + category tile text
    eyebrow: "Appliances",                // small text above the page title
    title: "Air Conditioners",            // big page title
    subtitle: "Stay cool all summer.",    // text under the title
    navIcon: (c) => <AirVent className={c} />,
    productIcon: (_v, c) => <AirVent className={c} />,
    typeOrder: [],
    typeLabels: {},
    allLabel: "All",
    defaultTypeLabel: "Air Conditioner",  // small label on each card
  },
```

For the icon: pick any name from **lucide.dev** (e.g. `AirVent`, `Fan`,
`Lamp`, `Tv`, `Armchair`) and add it to the import line at the top of the
same file:

```tsx
import { Sofa, Refrigerator, WashingMachine, AirVent } from "lucide-react"
```

Then add products with `section: "acs"` in `products.ts` — done. If a
product gets a `type` (e.g. `type: "split"`), filter buttons appear on the
page automatically once there are two or more types.

(The only place a new section does NOT appear automatically is the rotating
photo showcase in the hero at the very top of the homepage — that list is
hand-picked in `src/components/hero/category-showcase.tsx`.)

---

## 11. Quick safety rules

- Every product needs a **unique `id`** — never two products with the same id.
- Keep the `{ }` and the `,` after each block exactly as in the template.
- Text goes inside quotes: `name: "Brown Sofa",` — numbers don't: `price: 450,`.
- File names in `public/products/`: small letters, numbers, dashes, no spaces.
- If the site ever fails to build after an edit, check the last product you
  touched for a missing quote, comma or bracket — that's the cause 99% of the
  time. (A broken edit does **not** take the live site down — Vercel keeps the
  previous version online until a build succeeds.)
