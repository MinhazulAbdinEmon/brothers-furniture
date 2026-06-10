import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Gem,
  Camera,
  ArrowLeftRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  ImageOff,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { primaryPhone } from "@/lib/site"
import { formatPrice, shareWithPhoto, type Product } from "@/lib/catalog"
import { GalleryImage } from "./gallery-image"
import { BeforeAfter } from "./before-after"

type Tab = "enhanced" | "original" | "compare"

const SWIPE_THRESHOLD = 48

export function ProductModal({
  product,
  categoryLabel,
  icon,
  onClose,
}: {
  product: Product
  categoryLabel: string
  icon: ReactNode
  onClose: () => void
}) {
  const reduce = useReducedMotion()
  const hasEnhanced = product.images.length > 0
  const hasOriginal = product.realPhotos.length > 0
  const canCompare = hasEnhanced && hasOriginal
  const hasAnyPhoto = hasEnhanced || hasOriginal

  const [tab, setTab] = useState<Tab>(hasEnhanced ? "enhanced" : "original")
  const [index, setIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const swipeStart = useRef<number | null>(null)

  const images = tab === "original" ? product.realPhotos : product.images
  const count = images.length

  // Make the phone's Back button / gesture close the modal instead of leaving
  // the page. We push one history entry when the modal opens; popping it (via
  // the Back button, or our own close controls calling history.back()) closes
  // the modal. `requestClose` is what every close control calls.
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const pushedRef = useRef(false)
  const requestClose = useCallback(() => window.history.back(), [])
  useEffect(() => {
    if (!pushedRef.current) {
      window.history.pushState({ productModal: true }, "")
      pushedRef.current = true
    }
    const onPop = () => onCloseRef.current()
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  // Lock background scroll + trap focus; Escape and arrow keys for navigation.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose()
      } else if (e.key === "ArrowLeft" && tab !== "compare") {
        setIndex((i) => (i - 1 + count) % count)
      } else if (e.key === "ArrowRight" && tab !== "compare") {
        setIndex((i) => (i + 1) % count)
      } else if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [requestClose, count, tab])

  const goTab = (t: Tab) => {
    setTab(t)
    setIndex(0)
  }
  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  const onSwipeEnd = (clientX: number) => {
    if (swipeStart.current === null || count < 2) return
    const dx = clientX - swipeStart.current
    if (dx > SWIPE_THRESHOLD) prev()
    else if (dx < -SWIPE_THRESHOLD) next()
    swipeStart.current = null
  }

  const titleId = `product-${product.id}-title`

  const tabs: { id: Tab; label: string; short: string; icon: JSX.Element; show: boolean }[] = [
    {
      id: "enhanced",
      label: "Enhanced View",
      short: "Enhanced",
      icon: <Gem className="size-4" />,
      show: hasEnhanced,
    },
    {
      id: "original",
      label: "Original Photo",
      short: "Original",
      icon: <Camera className="size-4" />,
      show: hasOriginal,
    },
    {
      id: "compare",
      label: "Compare",
      short: "Compare",
      icon: <ArrowLeftRight className="size-4" />,
      show: canCompare,
    },
  ]
  const visibleTabs = tabs.filter((t) => t.show)

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-stretch justify-center bg-black/80 md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
      onClick={requestClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full w-full max-w-3xl flex-col overflow-y-auto bg-card text-card-foreground md:h-auto md:max-h-[90vh] md:rounded-3xl md:border md:border-border"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-card px-5 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              {icon}
            </span>
            <div className="min-w-0">
              <h2
                id={titleId}
                className="truncate font-serif text-xl leading-tight text-foreground"
              >
                {product.name}
              </h2>
              <p className="text-xs text-muted-foreground">{categoryLabel}</p>
            </div>
          </div>
          <button
            ref={closeRef}
            onClick={requestClose}
            aria-label="Close"
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Tabs (only if there is a choice to make) */}
        {visibleTabs.length > 1 && (
          <div className="px-5 pt-4">
            <div
              role="tablist"
              aria-label="Choose photo view"
              className={cn(
                "grid gap-2 rounded-2xl bg-secondary p-1.5",
                visibleTabs.length === 3 ? "grid-cols-3" : "grid-cols-2"
              )}
            >
              {visibleTabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => goTab(t.id)}
                  className={cn(
                    "flex h-11 items-center justify-center gap-1.5 rounded-xl px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    tab === t.id
                      ? t.id === "original"
                        ? "bg-foreground text-background"
                        : "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.icon}
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">{t.short}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stage */}
        <div className="px-5 pt-4">
          {tab === "compare" ? (
            <BeforeAfter
              originalSrc={product.realPhotos[0]}
              enhancedSrc={product.images[0]}
              alt={product.name}
            />
          ) : !hasAnyPhoto ? (
            /* Clean placeholder when the product has no photo yet */
            <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-secondary text-muted-foreground">
              <ImageOff className="size-10" />
              <span className="text-sm font-medium">Photo coming soon</span>
            </div>
          ) : (
            <div
              className="relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-2xl bg-secondary"
              onPointerDown={(e) => (swipeStart.current = e.clientX)}
              onPointerUp={(e) => onSwipeEnd(e.clientX)}
            >
              <GalleryImage
                key={`${tab}-${index}`}
                src={images[index]}
                alt={
                  tab === "original"
                    ? `Original photo of ${product.name}`
                    : `${product.name}, enhanced presentation photo`
                }
                lqip={tab === "enhanced" ? product.lqip : undefined}
                fit="contain"
                priority
                className="h-full w-full"
              />

              <span
                className={cn(
                  "pointer-events-none absolute left-3 top-3 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium shadow-sm",
                  tab === "original"
                    ? "bg-black/60 text-white"
                    : "bg-accent/90 text-accent-foreground"
                )}
              >
                {tab === "original" ? (
                  <Camera className="size-3.5" />
                ) : (
                  <Gem className="size-3.5" />
                )}
                {tab === "original" ? "Original Photo" : "Enhanced View"}
              </span>

              {count > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "size-1.5 rounded-full transition-colors",
                          i === index ? "bg-white" : "bg-white/40"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Thumbnails */}
          {tab !== "compare" && count > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setIndex(i)}
                  aria-label={`View photo ${i + 1}`}
                  className={cn(
                    "size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                    i === index ? "border-accent" : "border-transparent"
                  )}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price / condition / description — each part hides when not set */}
        {(product.price != null ||
          product.condition ||
          product.description ||
          !product.available) && (
          <div className="mx-5 mt-4 space-y-2">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {product.price != null && (
                <span className="text-2xl font-semibold text-foreground">
                  {formatPrice(product.price)}
                </span>
              )}
              {product.price != null && product.oldPrice != null && (
                <span className="text-base text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              {product.condition && (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {product.condition}
                </span>
              )}
              {!product.available && (
                <span className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">
                  Sold Out
                </span>
              )}
            </div>
            {product.description && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}
          </div>
        )}

        {/* Trust message — only meaningful when a real photo exists */}
        {hasOriginal && (
          <div className="mx-5 mt-4 flex items-start gap-2.5 rounded-2xl border border-border bg-secondary/50 px-4 py-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Original photo included so you can see the real item before
              contacting us.
            </p>
          </div>
        )}

        {/* Contact actions — large, fixed at the bottom of the panel */}
        <div className="sticky bottom-0 z-20 mt-4 grid grid-cols-2 gap-3 border-t border-border bg-card px-5 py-4">
          <button
            type="button"
            onClick={() => shareWithPhoto(product)}
            aria-label={`Message us on WhatsApp about ${product.name}, with the photo`}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#25D366] text-base font-semibold text-black transition-transform hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
          >
            <MessageCircle className="size-5" />
            WhatsApp
          </button>
          <a
            href={`tel:${primaryPhone.tel}`}
            aria-label={`Call us about ${product.name}`}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-accent text-base font-semibold text-accent-foreground transition-transform hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
          >
            <Phone className="size-5" />
            Call Now
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
