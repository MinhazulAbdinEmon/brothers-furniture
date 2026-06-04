// Wardrobe collection. Same shape + image flow as the other galleries.
import type { Product } from "@/lib/catalog"
import lqipData from "./wardrobe-lqip.json"

const lqip = lqipData as Record<string, { lqip: string }>
const enhanced = (id: string) => `/wardrobes/${id}-enhanced.webp`
const original = (id: string, n = 1) => `/wardrobes/${id}-original-${n}.webp`

const data: { id: string; name: string }[] = [
  { id: "wardrobe-001", name: "White Wardrobe" },
  { id: "wardrobe-002", name: "White Mirrored Wardrobe" },
]

export const wardrobes: Product[] = data.map((w) => ({
  id: w.id,
  name: w.name,
  category: "wardrobe",
  enhancedImages: [enhanced(w.id)],
  originalImages: [original(w.id)],
  price: null,
  available: true,
  lqip: lqip[w.id]?.lqip,
}))
