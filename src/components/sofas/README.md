# Product galleries — how they work & how to add more

Every product gallery (Sofas, Fridges, Ovens, Washing Machines, Wardrobes)
renders the **same** `ProductGallery` component and differs only in its data
file + icons.

| Gallery | Data | Section | Icons | Images |
|---|---|---|---|---|
| Sofas | `src/lib/sofas.ts` | `src/components/sofas.tsx` | `sofas/sofa-icons.tsx` | `public/sofas/` |
| Fridges | `src/lib/fridges.ts` | `src/components/fridges.tsx` | `fridges/fridge-icons.tsx` | `public/fridges/` |
| Ovens | `src/lib/ovens.ts` | `src/components/ovens.tsx` | `ovens/oven-icons.tsx` | `public/ovens/` |
| Washing Machines | `src/lib/washing-machines.ts` | `src/components/washing-machines.tsx` | lucide `WashingMachine` | `public/washing-machines/` |
| Wardrobes | `src/lib/wardrobes.ts` | `src/components/wardrobes.tsx` | `wardrobes/wardrobe-icons.tsx` | `public/wardrobes/` |

Blur placeholders live next to each data file as `<prefix>-lqip.json`.

Shared, reusable pieces (don't usually need to touch these):

- `src/lib/catalog.ts` — the `Product` type + `shareWithPhoto()` (WhatsApp + photo)
- `src/components/gallery/product-gallery.tsx` — header + filters + grid + modal
- `src/components/gallery/` — `product-card`, `product-modal`, `gallery-image`
  (blur-up), `before-after` (comparison slider)

Category cover images on the home "Collection" cards live in `public/covers/`
and are set in `src/components/categories.tsx`.

## Add a new item to an existing gallery

1. **Name your source files** so the script can pair them (`N` = next number).
   The number just has to appear after the prefix — all of these work:
   - cleaned / studio photo → `sofaN.png` / `fridgeN.png`
   - real photo(s) → `sofaN original.jpeg` / `original fridgeN.jpeg`

2. **Optimize them** (creates WebP files + blur placeholders):
   ```bash
   pip install Pillow
   # python scripts/optimize-images.py <prefix> "<cleaned folder>" "<original folder>"
   python scripts/optimize-images.py sofa "…/cleaned photos" "…/original photos"
   ```

3. **Add one entry** to the array in `src/lib/sofas.ts` (or `fridges.ts`):
   ```ts
   { id: "sofa-024", name: "Charcoal 3-Seater Sofa", category: "3-seater" },
   ```
   - `category` must be one of the keys in that file's `*_FILTERS`.
   - Image paths, `price: null`, and the blur placeholder are wired up automatically.

That's it — card, modal, filters, blur-up, WhatsApp/Call and the before/after
slider all work with no further changes.

## Notes

- **No enhanced photo?** Set `hasEnhanced: false` (see `fridges.ts`). The card uses
  the real photo with no "Enhanced View" badge, and the modal hides the
  Enhanced/Compare tabs. Missing a real photo works the same way in reverse.
- **Price**: leave it out (defaults to `null` → no price shown). Only add a number
  once you actually have one — never invent prices, sizes or materials.
- **Multiple photos**: the data model already supports arrays
  (`enhancedImages` / `originalImages`); the gallery shows arrows + thumbnails.
- **WhatsApp button**: on phones it opens the share sheet with the photo attached;
  on desktop it opens WhatsApp with the message plus a link to the photo.

## Add a whole new gallery (e.g. Beds)

1. Run `python scripts/optimize-images.py bed "<cleaned>" "<original>"`.
2. Copy `src/lib/washing-machines.ts` → `beds.ts` and fill in the items.
3. Copy `src/components/washing-machines.tsx` → `beds.tsx`; set `id`, `title`,
   `subtitle`, `products`, and the `icon`. Add `filters` only if there are real
   sub-categories (otherwise the filter bar is hidden automatically).
4. Drop `<Beds />` into `src/App.tsx` and add a nav link in `navbar.tsx`.
5. If it should appear in the homepage hero, add it to `HERO_CATEGORIES` in
   `src/components/hero/category-showcase.tsx`.
