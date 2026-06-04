// Sofa collection data. See src/components/sofas/README.md to add more.
//
// Image conventions (files live in /public/sofas/):
//   sofa-XXX-enhanced.webp     → cleaned / studio presentation photo (gallery hero)
//   sofa-XXX-original-1.webp   → real workshop / showroom photo (trust)

import type { Product } from "@/lib/catalog"
import lqipData from "./sofa-lqip.json"

export type SofaCategory =
  | "sofa-set"
  | "l-shaped"
  | "3-seater"
  | "2-seater"
  | "single"

/** Filter buttons, in display order. `null` value = "All". */
export const SOFA_FILTERS: { value: SofaCategory | null; label: string }[] = [
  { value: null, label: "All Sofas" },
  { value: "sofa-set", label: "Sofa Sets" },
  { value: "l-shaped", label: "L-Shaped" },
  { value: "3-seater", label: "3 Seater" },
  { value: "2-seater", label: "2 Seater" },
  { value: "single", label: "Single Chair" },
]

/** Short human label per category, shown on cards. */
export const CATEGORY_LABEL: Record<SofaCategory, string> = {
  "sofa-set": "Sofa Set",
  "l-shaped": "L-Shaped",
  "3-seater": "3 Seater",
  "2-seater": "2 Seater",
  single: "Single Chair",
}

const lqip = lqipData as Record<string, { lqip: string }>

const enhanced = (id: string) => `/sofas/${id}-enhanced.webp`
const original = (id: string, n = 1) => `/sofas/${id}-original-${n}.webp`

// Names describe colour + type only. No prices, materials or dimensions are
// invented — `price: null` means "ask in store / WhatsApp".
const data: { id: string; name: string; category: SofaCategory }[] = [
  { id: "sofa-001", name: "Blue 2-Seater Sofa", category: "2-seater" },
  { id: "sofa-002", name: "Mustard 3-Seater Sofa", category: "3-seater" },
  { id: "sofa-003", name: "Teal Single Armchair", category: "single" },
  { id: "sofa-004", name: "Grey Chesterfield Sofa Set", category: "sofa-set" },
  { id: "sofa-005", name: "White Classic Loveseat", category: "2-seater" },
  { id: "sofa-006", name: "Brown & Red 2-Seater Sofa", category: "2-seater" },
  { id: "sofa-007", name: "Brown 3-Seater Sofa Bed", category: "3-seater" },
  { id: "sofa-008", name: "Blue Chesterfield Sofa", category: "3-seater" },
  { id: "sofa-009", name: "Grey Single Armchair", category: "single" },
  { id: "sofa-010", name: "Brown 2-Seater Sofa", category: "2-seater" },
  { id: "sofa-011", name: "Grey 3-Seater Sofa", category: "3-seater" },
  { id: "sofa-012", name: "Teal L-Shaped Sofa", category: "l-shaped" },
  { id: "sofa-013", name: "Brown L-Shaped Sofa", category: "l-shaped" },
  { id: "sofa-014", name: "Navy L-Shaped Sofa", category: "l-shaped" },
  { id: "sofa-015", name: "Cream & Gold Loveseat", category: "2-seater" },
  { id: "sofa-016", name: "Green Single Armchair", category: "single" },
  { id: "sofa-017", name: "Pink 3-Seater Sofa", category: "3-seater" },
  { id: "sofa-018", name: "Beige Sofa Set", category: "sofa-set" },
  { id: "sofa-019", name: "Pink Wingback Armchair", category: "single" },
  { id: "sofa-020", name: "Mauve L-Shaped Sofa", category: "l-shaped" },
  { id: "sofa-021", name: "Orange Leather Armchair", category: "single" },
  { id: "sofa-022", name: "Tan 2-Seater Sofa", category: "2-seater" },
  { id: "sofa-023", name: "Cream Tufted Bench Sofa", category: "3-seater" },
]

export const sofas: Product[] = data.map((s) => ({
  id: s.id,
  name: s.name,
  category: s.category,
  enhancedImages: [enhanced(s.id)],
  originalImages: [original(s.id)],
  price: null,
  available: true,
  lqip: lqip[s.id]?.lqip,
}))
