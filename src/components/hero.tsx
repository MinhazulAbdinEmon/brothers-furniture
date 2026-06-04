import { motion, useReducedMotion, type Variants } from "framer-motion"
import { MessageCircle, ArrowRight, Phone, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site, primaryPhone, waLink } from "@/lib/site"
import { CategoryShowcase, CategoryShortcuts } from "@/components/hero/category-showcase"

const EASE = [0.22, 1, 0.36, 1] as const

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

export function Hero({ start = true }: { start?: boolean }) {
  const reduce = useReducedMotion()
  const active = start || reduce
  const waHref = waLink(
    "Hello, I'm interested in your furniture and appliances. Could you help me?"
  )

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Clean, elegant background — subtle warm glow, no busy imagery */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,hsl(var(--accent)/0.10),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-28 lg:grid-cols-2 lg:gap-14 lg:py-24">
        {/* Showcase (first on mobile so the products are seen immediately) */}
        <motion.div
          className="order-1 lg:order-2"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: active ? 0.15 : 0 }}
        >
          <CategoryShowcase />
        </motion.div>

        {/* Copy + actions */}
        <motion.div
          className="order-2 lg:order-1"
          variants={container}
          initial="hidden"
          animate={active ? "visible" : "hidden"}
        >
          <motion.p
            variants={item}
            className="text-xs uppercase tracking-[0.3em] text-accent"
          >
            {site.name} · {site.location.label}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Furniture &amp; Appliances for Every Home
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Shop sofas, beds, chairs, fridges, ovens, and more.
          </motion.p>

          {/* Primary actions */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-accent px-7 text-base text-accent-foreground hover:bg-accent/90"
            >
              <a href="#categories">
                Browse Products
                <ArrowRight className="ml-2 size-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[#25D366] px-7 text-base text-black hover:bg-[#25D366]/90"
            >
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 size-5" />
                WhatsApp Us
              </a>
            </Button>
          </motion.div>

          {/* Trust line + call */}
          <motion.div
            variants={item}
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-accent" />
              Real products. Original photos available.
            </span>
            <a
              href={`tel:${primaryPhone.tel}`}
              className="flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"
            >
              <Phone className="size-4" />
              Or call us
            </a>
          </motion.div>

          {/* Category shortcuts — large, tappable, icon + label */}
          <motion.div variants={item}>
            <CategoryShortcuts className="mt-7" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
