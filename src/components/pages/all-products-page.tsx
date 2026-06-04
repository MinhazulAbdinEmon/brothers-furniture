import { ArrowLeft, LayoutGrid } from "lucide-react"
import { Link } from "@/lib/router"
import { ProductGallery, type Filter } from "@/components/gallery/product-gallery"
import { CATEGORIES } from "@/lib/categories-registry"
import type { Product } from "@/lib/catalog"

// Flatten every category's products, re-tagging each with its top-level slug so
// the gallery can filter by category (e.g. "sofas", "fridges").
const allProducts: Product[] = CATEGORIES.flatMap((c) =>
  c.products.map((p) => ({ ...p, category: c.slug }))
)

const filters: Filter[] = [
  { value: null, label: "All" },
  ...CATEGORIES.map((c) => ({ value: c.slug, label: c.label })),
]

const labelBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)?.label ?? ""

function icon(value: string | null, className: string) {
  const c = value ? CATEGORIES.find((x) => x.slug === value) : undefined
  return c ? c.navIcon(className) : <LayoutGrid className={className} />
}

export function AllProductsPage() {
  return (
    <div className="pt-16">
      <div className="mx-auto flex max-w-6xl items-center px-6 pt-6">
        <Link
          to="/"
          className="flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </div>

      <ProductGallery
        id="all-products"
        eyebrow="Everything in store"
        title="All Products"
        subtitle="Browse the full range of furniture and appliances."
        products={allProducts}
        filters={filters}
        filterAriaLabel="Filter products by category"
        icon={icon}
        categoryLabel={labelBySlug}
      />
    </div>
  )
}
