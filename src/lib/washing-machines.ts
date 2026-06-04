// Washing machine collection. Same shape + image flow as the other galleries.
import type { Product } from "@/lib/catalog"
import lqipData from "./washing-machine-lqip.json"

const lqip = lqipData as Record<string, { lqip: string }>
const enhanced = (id: string) => `/washing-machines/${id}-enhanced.webp`
const original = (id: string, n = 1) => `/washing-machines/${id}-original-${n}.webp`

const data: { id: string; name: string }[] = [
  { id: "washer-001", name: "Black Washing Machine" },
  { id: "washer-002", name: "White Washing Machine" },
]

export const washingMachines: Product[] = data.map((w) => ({
  id: w.id,
  name: w.name,
  category: "washer",
  enhancedImages: [enhanced(w.id)],
  originalImages: [original(w.id)],
  price: null,
  available: true,
  lqip: lqip[w.id]?.lqip,
}))
