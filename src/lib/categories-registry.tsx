// Single source of truth for product sections: drives the homepage category
// nav, the homepage previews, and each dedicated category page.
//
// Products themselves live in src/data/products.ts (the owner-edited file);
// this registry only adds the presentation layer (labels, icons, filter
// ordering). Filter buttons are generated from the product data — a filter
// only shows when at least one product uses that `type`, and a brand-new
// `type` value automatically gets its own button.
import type { ReactNode } from "react"
import { Sofa, Refrigerator, WashingMachine, Utensils } from "lucide-react"
import { FilterIcon } from "@/components/sofas/sofa-icons"
import { FridgeFilterIcon } from "@/components/fridges/fridge-icons"
import { OvenFilterIcon } from "@/components/ovens/oven-icons"
import { WardrobeIcon } from "@/components/wardrobes/wardrobe-icons"
import { productsBySection, type Product } from "@/lib/catalog"
import type { SectionId } from "@/data/products"
import type { Filter } from "@/components/gallery/product-gallery"

export interface CategoryDef {
  /** Route is `/${slug}`. */
  slug: SectionId
  /** Short label for nav + chips. */
  label: string
  eyebrow: string
  title: string
  subtitle: string
  /** Category-level icon (nav tiles, page header). */
  navIcon: (className: string) => ReactNode
  products: Product[]
  filters?: Filter[]
  filterAriaLabel?: string
  /** Icon for a product's type / a filter value. */
  productIcon: (value: string | null, className: string) => ReactNode
  /** Display label for a product's type. */
  categoryLabel: (type: string) => string
}

/** "gas-cooker" → "Gas Cooker" — fallback label for new, unmapped types. */
function prettify(type: string): string {
  return type
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

/** Build the filter bar from the data: known types keep their curated label
 *  and order, unknown types are appended automatically. Returns undefined
 *  (no filter bar) when there are fewer than two types. */
function buildFilters(
  products: Product[],
  allLabel: string,
  order: string[],
  labels: Record<string, string>
): Filter[] | undefined {
  const present = [...new Set(products.map((p) => p.type).filter(Boolean))]
  const ordered = [
    ...order.filter((t) => present.includes(t)),
    ...present.filter((t) => !order.includes(t)),
  ]
  if (ordered.length < 2) return undefined
  return [
    { value: null, label: allLabel },
    ...ordered.map((t) => ({ value: t, label: labels[t] ?? prettify(t) })),
  ]
}

interface SectionConfig {
  slug: SectionId
  label: string
  eyebrow: string
  title: string
  subtitle: string
  navIcon: (className: string) => ReactNode
  productIcon: (value: string | null, className: string) => ReactNode
  /** Preferred filter-button order; types not listed are appended. */
  typeOrder: string[]
  /** Curated display labels per type; unmapped types are auto-prettified. */
  typeLabels: Record<string, string>
  /** "All …" filter label. */
  allLabel: string
  /** Card label for products with no `type`. */
  defaultTypeLabel: string
  filterAriaLabel?: string
}

const SECTIONS: SectionConfig[] = [
  {
    slug: "sofas",
    label: "Sofas",
    eyebrow: "Sofa Collection",
    title: "Sofas",
    subtitle: "Comfortable sofas for every home.",
    navIcon: (c) => <Sofa className={c} />,
    productIcon: (v, c) => <FilterIcon value={v} className={c} />,
    typeOrder: ["sofa-set", "l-shaped", "3-seater", "2-seater", "single"],
    typeLabels: {
      "sofa-set": "Sofa Set",
      "l-shaped": "L-Shaped",
      "3-seater": "3 Seater",
      "2-seater": "2 Seater",
      single: "Single Chair",
    },
    allLabel: "All Sofas",
    defaultTypeLabel: "Sofa",
    filterAriaLabel: "Filter sofas by type",
  },
  {
    slug: "fridges",
    label: "Fridges",
    eyebrow: "Appliances",
    title: "Fridges",
    subtitle: "Reliable cooling for your home.",
    navIcon: (c) => <Refrigerator className={c} />,
    productIcon: (v, c) => <FridgeFilterIcon value={v} className={c} />,
    typeOrder: ["silver", "white"],
    typeLabels: { silver: "Silver", white: "White" },
    allLabel: "All Fridges",
    defaultTypeLabel: "Fridge",
    filterAriaLabel: "Filter fridges by colour",
  },
  {
    slug: "ovens",
    label: "Ovens",
    eyebrow: "Appliances",
    title: "Ovens & Cookers",
    subtitle: "Kitchen appliances for everyday cooking.",
    navIcon: (c) => <OvenFilterIcon value={null} className={c} />,
    productIcon: (v, c) => <OvenFilterIcon value={v} className={c} />,
    typeOrder: ["oven", "gas-cooker"],
    typeLabels: { oven: "Oven", "gas-cooker": "Gas Cooker" },
    allLabel: "All",
    defaultTypeLabel: "Oven",
    filterAriaLabel: "Filter ovens and cookers by type",
  },
  {
    slug: "washing-machines",
    label: "Washers",
    eyebrow: "Appliances",
    title: "Washing Machines",
    subtitle: "Dependable laundry for your home.",
    navIcon: (c) => <WashingMachine className={c} />,
    productIcon: (_v, c) => <WashingMachine className={c} />,
    typeOrder: [],
    typeLabels: {},
    allLabel: "All",
    defaultTypeLabel: "Washing Machine",
  },
  {
    slug: "wardrobes",
    label: "Wardrobes",
    eyebrow: "Storage & Cabinets",
    title: "Wardrobes",
    subtitle: "Keep every room tidy and organised.",
    navIcon: (c) => <WardrobeIcon className={c} />,
    productIcon: (_v, c) => <WardrobeIcon className={c} />,
    typeOrder: [],
    typeLabels: {},
    allLabel: "All",
    defaultTypeLabel: "Wardrobe",
  },
  {
    slug: "dining-tables",
    label: "Dining",
    eyebrow: "Dining Room",
    title: "Dining Tables",
    subtitle: "Tables for family meals.",
    navIcon: (c) => <Utensils className={c} />,
    productIcon: (_v, c) => <Utensils className={c} />,
    typeOrder: [],
    typeLabels: {},
    allLabel: "All",
    defaultTypeLabel: "Dining Table",
  },
]

export const CATEGORIES: CategoryDef[] = SECTIONS.map((s) => {
  const products = productsBySection(s.slug)
  return {
    slug: s.slug,
    label: s.label,
    eyebrow: s.eyebrow,
    title: s.title,
    subtitle: s.subtitle,
    navIcon: s.navIcon,
    products,
    filters: buildFilters(products, s.allLabel, s.typeOrder, s.typeLabels),
    filterAriaLabel: s.filterAriaLabel,
    productIcon: s.productIcon,
    categoryLabel: (type) =>
      type ? s.typeLabels[type] ?? prettify(type) : s.defaultTypeLabel,
  }
})

export function categoryBySlug(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
