// Single source of truth for product categories: drives the homepage category
// nav, the homepage previews, and each dedicated category page.
import type { ReactNode } from "react"
import { Sofa, Refrigerator, WashingMachine } from "lucide-react"
import { FilterIcon } from "@/components/sofas/sofa-icons"
import { FridgeFilterIcon } from "@/components/fridges/fridge-icons"
import { OvenFilterIcon } from "@/components/ovens/oven-icons"
import { WardrobeIcon } from "@/components/wardrobes/wardrobe-icons"
import {
  sofas,
  SOFA_FILTERS,
  CATEGORY_LABEL,
  type SofaCategory,
} from "@/lib/sofas"
import {
  fridges,
  FRIDGE_FILTERS,
  FRIDGE_CATEGORY_LABEL,
  type FridgeCategory,
} from "@/lib/fridges"
import {
  ovens,
  OVEN_FILTERS,
  OVEN_CATEGORY_LABEL,
  type OvenCategory,
} from "@/lib/ovens"
import { washingMachines } from "@/lib/washing-machines"
import { wardrobes } from "@/lib/wardrobes"
import type { Product } from "@/lib/catalog"
import type { Filter } from "@/components/gallery/product-gallery"

export interface CategoryDef {
  /** Route is `/${slug}`. */
  slug: string
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
  /** Icon for a product's subcategory / a filter value. */
  productIcon: (value: string | null, className: string) => ReactNode
  /** Display label for a product's subcategory. */
  categoryLabel: (category: string) => string
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "sofas",
    label: "Sofas",
    eyebrow: "Sofa Collection",
    title: "Sofas",
    subtitle: "Comfortable sofas for every home.",
    navIcon: (c) => <Sofa className={c} />,
    products: sofas,
    filters: SOFA_FILTERS,
    filterAriaLabel: "Filter sofas by type",
    productIcon: (v, c) => (
      <FilterIcon value={v as SofaCategory | null} className={c} />
    ),
    categoryLabel: (c) => CATEGORY_LABEL[c as SofaCategory],
  },
  {
    slug: "fridges",
    label: "Fridges",
    eyebrow: "Appliances",
    title: "Fridges",
    subtitle: "Reliable cooling for your home.",
    navIcon: (c) => <Refrigerator className={c} />,
    products: fridges,
    filters: FRIDGE_FILTERS,
    filterAriaLabel: "Filter fridges by colour",
    productIcon: (v, c) => (
      <FridgeFilterIcon value={v as FridgeCategory | null} className={c} />
    ),
    categoryLabel: (c) => FRIDGE_CATEGORY_LABEL[c as FridgeCategory],
  },
  {
    slug: "ovens",
    label: "Ovens",
    eyebrow: "Appliances",
    title: "Ovens & Cookers",
    subtitle: "Kitchen appliances for everyday cooking.",
    navIcon: (c) => <OvenFilterIcon value={null} className={c} />,
    products: ovens,
    filters: OVEN_FILTERS,
    filterAriaLabel: "Filter ovens and cookers by type",
    productIcon: (v, c) => <OvenFilterIcon value={v} className={c} />,
    categoryLabel: (c) => OVEN_CATEGORY_LABEL[c as OvenCategory],
  },
  {
    slug: "washing-machines",
    label: "Washers",
    eyebrow: "Appliances",
    title: "Washing Machines",
    subtitle: "Dependable laundry for your home.",
    navIcon: (c) => <WashingMachine className={c} />,
    products: washingMachines,
    productIcon: (_v, c) => <WashingMachine className={c} />,
    categoryLabel: () => "Washing Machine",
  },
  {
    slug: "wardrobes",
    label: "Wardrobes",
    eyebrow: "Storage & Cabinets",
    title: "Wardrobes",
    subtitle: "Keep every room tidy and organised.",
    navIcon: (c) => <WardrobeIcon className={c} />,
    products: wardrobes,
    productIcon: (_v, c) => <WardrobeIcon className={c} />,
    categoryLabel: () => "Wardrobe",
  },
]

export function categoryBySlug(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
