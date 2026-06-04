// Oven & cooker collection. Same shape + image flow as the other galleries.
import type { Product } from "@/lib/catalog"
import lqipData from "./oven-lqip.json"

export type OvenCategory = "oven" | "gas-cooker"

export const OVEN_FILTERS: { value: OvenCategory | null; label: string }[] = [
  { value: null, label: "All" },
  { value: "oven", label: "Ovens" },
  { value: "gas-cooker", label: "Gas Cookers" },
]

export const OVEN_CATEGORY_LABEL: Record<OvenCategory, string> = {
  oven: "Oven",
  "gas-cooker": "Gas Cooker",
}

const lqip = lqipData as Record<string, { lqip: string }>
const enhanced = (id: string) => `/ovens/${id}-enhanced.webp`
const original = (id: string, n = 1) => `/ovens/${id}-original-${n}.webp`

const data: { id: string; name: string; category: OvenCategory }[] = [
  { id: "oven-001", name: "Stainless Gas Cooker", category: "gas-cooker" },
  { id: "oven-002", name: "Microwave Oven", category: "oven" },
  { id: "oven-003", name: "Electric Oven", category: "oven" },
  { id: "oven-004", name: "Microwave Oven", category: "oven" },
]

export const ovens: Product[] = data.map((o) => ({
  id: o.id,
  name: o.name,
  category: o.category,
  enhancedImages: [enhanced(o.id)],
  originalImages: [original(o.id)],
  price: null,
  available: true,
  lqip: lqip[o.id]?.lqip,
}))
