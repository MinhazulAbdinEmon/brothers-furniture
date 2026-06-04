import { useState, type ReactNode } from "react"
import { AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Link } from "@/lib/router"
import { waLink } from "@/lib/site"
import type { Product } from "@/lib/catalog"
import { cn } from "@/lib/utils"
import { ProductCard } from "./product-card"
import { ProductModal } from "./product-modal"

export interface Filter {
  value: string | null
  label: string
}

interface ProductGalleryProps {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  products: Product[]
  /** Omit (or pass ≤1) to hide the filter bar entirely. */
  filters?: Filter[]
  filterAriaLabel?: string
  /** Icon for a category value (`null` = the "All" filter). */
  icon: (value: string | null, className: string) => ReactNode
  /** Display label for a product's category. */
  categoryLabel: (category: string) => string
  /** Show only this many cards at first, with a "View all" button. */
  previewCount?: number
  /** Homepage preview mode: "View all" links to this route instead of
   *  expanding in place, and a category WhatsApp button is shown. */
  viewAllHref?: string
  /** Category name used in the preview's WhatsApp message. */
  whatsappCategory?: string
}

/**
 * One reusable product gallery: header, optional filter bar, responsive card
 * grid, and the details modal. Every product section (sofas, fridges, ovens,
 * …) is just this component plus its data + icons.
 *
 * The grid is intentionally plain DOM (no per-card layout animation) so it
 * stays smooth on phones even with many products.
 */
export function ProductGallery({
  id,
  eyebrow,
  title,
  subtitle,
  products,
  filters,
  filterAriaLabel,
  icon,
  categoryLabel,
  previewCount,
  viewAllHref,
  whatsappCategory,
}: ProductGalleryProps) {
  const [filter, setFilter] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const showFilters = !!filters && filters.length > 1
  const matched = filter ? products.filter((p) => p.category === filter) : products
  const capped = previewCount && !showAll ? matched.slice(0, previewCount) : matched
  const hiddenCount = matched.length - capped.length
  const open = products.find((p) => p.id === openId) ?? null

  return (
    <section id={id} className="scroll-anchor px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </Reveal>

        {showFilters && (
          <div
            role="group"
            aria-label={filterAriaLabel ?? "Filter products"}
            className="-mx-6 mb-10 flex gap-2.5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0"
          >
            {filters!.map((f) => {
              const active = filter === f.value
              return (
                <button
                  key={f.label}
                  onClick={() => {
                    setFilter(f.value)
                    setShowAll(false)
                  }}
                  aria-pressed={active}
                  className={cn(
                    "flex min-h-[44px] shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground"
                  )}
                >
                  {icon(f.value, "size-5 shrink-0")}
                  {f.label}
                </button>
              )
            })}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {capped.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryLabel={categoryLabel(product.category)}
              icon={icon(product.category, "size-4")}
              onOpen={() => setOpenId(product.id)}
            />
          ))}
        </div>

        {/* Homepage preview: link to the full category page + WhatsApp */}
        {viewAllHref ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={viewAllHref}
              className="flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-transform hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
            >
              View all {title}
              <ArrowRight className="size-4" />
            </Link>
            {whatsappCategory && (
              <a
                href={waLink(
                  `Hello, I am interested in your ${whatsappCategory} products.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask about ${whatsappCategory} on WhatsApp`}
                className="flex min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-black transition-transform hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            )}
          </div>
        ) : hiddenCount > 0 ? (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View all {matched.length} {title}
              <ChevronDown className="size-4" />
            </button>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {open && (
          <ProductModal
            key={open.id}
            product={open}
            categoryLabel={categoryLabel(open.category)}
            icon={icon(open.category, "size-5")}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
