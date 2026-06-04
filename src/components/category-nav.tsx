import { LayoutGrid } from "lucide-react"
import { Link } from "@/lib/router"
import { Reveal } from "@/components/reveal"
import { CATEGORIES } from "@/lib/categories-registry"

const tileClass =
  "group flex min-h-[116px] flex-col items-center justify-center gap-2.5 rounded-2xl border border-border bg-card p-4 text-center transition-colors hover:border-accent/50 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

const iconWrap =
  "flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20"

/** Visual, tappable category navigation — large icons + short labels so it's
 *  usable without reading. Each tile opens that category's page. */
export function CategoryNav() {
  return (
    <section id="categories" className="scroll-anchor px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Browse</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
            Shop by category
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/${c.slug}`} className={tileClass}>
                  <span className={iconWrap}>{c.navIcon("size-6")}</span>
                  <span className="text-sm font-medium text-foreground">
                    {c.label}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/all-products" className={tileClass}>
                <span className={iconWrap}>
                  <LayoutGrid className="size-6" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  All Products
                </span>
              </Link>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
