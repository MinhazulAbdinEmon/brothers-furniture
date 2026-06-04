import { useState, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Reveal } from "@/components/reveal"
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
}

/**
 * One reusable product gallery: header, optional filter bar, responsive card
 * grid, and the details modal. Every product section (sofas, fridges, ovens,
 * …) is just this component plus its data + icons.
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
}: ProductGalleryProps) {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)

  const showFilters = !!filters && filters.length > 1
  const visible = filter ? products.filter((p) => p.category === filter) : products
  const open = products.find((p) => p.id === openId) ?? null

  return (
    <section id={id} className="scroll-anchor px-6 py-24 md:py-32">
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
          <Reveal delay={80}>
            <div
              role="group"
              aria-label={filterAriaLabel ?? "Filter products"}
              className="-mx-6 mb-12 flex gap-2.5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0"
            >
              {filters!.map((f) => {
                const active = filter === f.value
                return (
                  <button
                    key={f.label}
                    onClick={() => setFilter(f.value)}
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
          </Reveal>
        )}

        <motion.div
          layout={!reduce}
          className={cn(
            "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            !showFilters && "mt-2"
          )}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <motion.div
                key={product.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard
                  product={product}
                  categoryLabel={categoryLabel(product.category)}
                  icon={icon(product.category, "size-4")}
                  onOpen={() => setOpenId(product.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
