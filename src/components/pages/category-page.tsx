import { ArrowLeft, MessageCircle } from "lucide-react"
import { Link } from "@/lib/router"
import { waLink } from "@/lib/site"
import { ProductGallery } from "@/components/gallery/product-gallery"
import type { CategoryDef } from "@/lib/categories-registry"

/** A dedicated category page: back bar + WhatsApp shortcut, then the full
 *  product gallery (all products + filters + details modal). */
export function CategoryPage({ category }: { category: CategoryDef }) {
  return (
    <div className="pt-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 pt-6">
        <Link
          to="/"
          className="flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
        <a
          href={waLink(`Hello, I am interested in your ${category.title} products.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask about ${category.title} on WhatsApp`}
          className="flex min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-black transition-transform hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
        >
          <MessageCircle className="size-4" />
          WhatsApp
        </a>
      </div>

      <ProductGallery
        id={category.slug}
        eyebrow={category.eyebrow}
        title={category.title}
        subtitle={category.subtitle}
        products={category.products}
        filters={category.filters}
        filterAriaLabel={category.filterAriaLabel}
        icon={category.productIcon}
        categoryLabel={category.categoryLabel}
      />
    </div>
  )
}
