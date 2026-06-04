// Fridge collection data. Same shape + image flow as sofas.
//
// Image conventions (files live in /public/fridges/):
//   fridge-XXX-enhanced.webp     → cleaned / studio photo (gallery hero) — optional
//   fridge-XXX-original-1.webp   → real workshop / showroom photo
//
// A fridge may have only a real photo (no enhanced one) — the card then shows
// the real photo with no "Enhanced View" badge, and the modal hides the
// Enhanced/Compare tabs automatically.

import type { Product } from "@/lib/catalog"
import lqipData from "./fridge-lqip.json"

export type FridgeCategory = "silver" | "white"

export const FRIDGE_FILTERS: { value: FridgeCategory | null; label: string }[] = [
  { value: null, label: "All Fridges" },
  { value: "silver", label: "Silver" },
  { value: "white", label: "White" },
]

export const FRIDGE_CATEGORY_LABEL: Record<FridgeCategory, string> = {
  silver: "Silver",
  white: "White",
}

const lqip = lqipData as Record<string, { lqip: string }>

const enhanced = (id: string) => `/fridges/${id}-enhanced.webp`
const original = (id: string, n = 1) => `/fridges/${id}-original-${n}.webp`

// `hasEnhanced: false` → only a real photo exists for this unit.
const data: {
  id: string
  name: string
  category: FridgeCategory
  hasEnhanced?: boolean
}[] = [
  { id: "fridge-001", name: "Silver Top-Freezer Fridge", category: "silver" },
  { id: "fridge-002", name: "Silver Top-Freezer Fridge", category: "silver" },
  { id: "fridge-003", name: "Silver Top-Freezer Fridge", category: "silver" },
  { id: "fridge-004", name: "Silver Top-Freezer Fridge", category: "silver" },
  { id: "fridge-005", name: "White Top-Freezer Fridge", category: "white" },
  { id: "fridge-006", name: "White Top-Freezer Fridge", category: "white" },
]

export const fridges: Product[] = data.map((f) => ({
  id: f.id,
  name: f.name,
  category: f.category,
  enhancedImages: f.hasEnhanced === false ? [] : [enhanced(f.id)],
  originalImages: [original(f.id)],
  price: null,
  available: true,
  lqip: lqip[f.id]?.lqip,
}))
