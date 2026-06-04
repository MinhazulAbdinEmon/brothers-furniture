import { useEffect, useState, type ComponentType, type SVGProps } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Sofa, BedDouble, Refrigerator, WashingMachine } from "lucide-react"
import { cn } from "@/lib/utils"
import { OvenIcon } from "@/components/ovens/oven-icons"
import { WardrobeIcon } from "@/components/wardrobes/wardrobe-icons"

export interface HeroCategory {
  key: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  image: string
  alt: string
  href: string
  /** True when the image is a stand-in to be replaced with a real cleaned photo. */
  placeholder?: boolean
}

// Order matters — this is the showcase sequence. Swap `image`/`href` as real
// photos and sections are added (see the hero notes in the chat / README).
export const HERO_CATEGORIES: HeroCategory[] = [
  {
    key: "sofas",
    label: "Sofas",
    Icon: Sofa,
    image: "/sofas/sofa-002-enhanced.webp",
    alt: "Mustard three-seater sofa",
    href: "#sofas",
  },
  {
    key: "beds",
    label: "Beds",
    Icon: BedDouble,
    image: "/covers/bedroom.webp",
    alt: "Bedroom with a double bed",
    href: "#categories",
    placeholder: true,
  },
  {
    key: "fridges",
    label: "Fridges",
    Icon: Refrigerator,
    image: "/fridges/fridge-002-enhanced.webp",
    alt: "Silver double-door refrigerator",
    href: "#fridges",
  },
  {
    key: "ovens",
    label: "Ovens",
    Icon: OvenIcon,
    image: "/ovens/oven-003-enhanced.webp",
    alt: "Black electric countertop oven",
    href: "#ovens",
  },
  {
    key: "washers",
    label: "Washers",
    Icon: WashingMachine,
    image: "/washing-machines/washer-002-enhanced.webp",
    alt: "White front-load washing machine",
    href: "#washing-machines",
  },
  {
    key: "wardrobes",
    label: "Wardrobes",
    Icon: WardrobeIcon,
    image: "/hero/wardrobe-demo.webp",
    alt: "Sage green wardrobe cabinet",
    href: "#wardrobes",
  },
]

const INTERVAL = 2000 // ~12s for the full 6-category loop

/**
 * Cinematic product-category showcase. Cross-fades through real product photos
 * so a visitor understands what's sold within a few seconds — no reading needed.
 * Pauses when the tab is hidden and falls back to a single static image when the
 * visitor prefers reduced motion.
 */
export function CategoryShowcase() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const n = HERO_CATEGORIES.length

  useEffect(() => {
    if (reduce) return
    let id: number | undefined
    const start = () => {
      id = window.setInterval(() => setActive((a) => (a + 1) % n), INTERVAL)
    }
    const stop = () => {
      if (id) window.clearInterval(id)
      id = undefined
    }
    const onVisibility = () => {
      stop()
      if (!document.hidden) start()
    }
    start()
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [reduce, n])

  const current = HERO_CATEGORIES[active]

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary via-card to-background shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      {/* Soft showroom glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,hsl(var(--accent)/0.16),transparent_60%)]"
      />

      {/* Stacked images — only opacity/scale animate, smooth on low-end phones */}
      {HERO_CATEGORIES.map((c, i) => (
        <img
          key={c.key}
          src={c.image}
          alt={i === 0 ? `${c.label} — ${c.alt}` : ""}
          aria-hidden={i !== 0}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={cn(
            "absolute inset-0 h-full w-full object-contain p-6 transition-[opacity,transform] duration-700 ease-out md:p-10",
            i === active
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-105 opacity-0"
          )}
        />
      ))}

      {/* Bottom scrim so the label is always legible */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/90 to-transparent"
      />

      {/* Category label chip */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 md:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card/85 px-4 py-2.5 backdrop-blur-md"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <current.Icon className="size-5" />
            </span>
            <span className="font-serif text-2xl leading-none text-foreground">
              {current.label}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots — which category is showing */}
        <div className="flex gap-1.5" aria-hidden>
          {HERO_CATEGORIES.map((c, i) => (
            <span
              key={c.key}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === active ? "w-5 bg-accent" : "w-1.5 bg-foreground/30"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/** Always-visible, tappable category shortcuts (icon + short label). */
export function CategoryShortcuts({ className }: { className?: string }) {
  return (
    <nav aria-label="Shop by category" className={className}>
      <ul className="flex flex-wrap gap-2.5">
        {HERO_CATEGORIES.map((c) => (
          <li key={c.key}>
            <a
              href={c.href}
              className="flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <c.Icon className="size-5 text-accent" aria-hidden />
              {c.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
