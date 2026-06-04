import type { ReactNode } from "react"
import { Gem, Camera, Eye, MessageCircle } from "lucide-react"
import { heroImage, shareWithPhoto, type Product } from "@/lib/catalog"
import { GalleryImage } from "./gallery-image"

export function ProductCard({
  product,
  categoryLabel,
  icon,
  onOpen,
}: {
  product: Product
  categoryLabel: string
  /** Small category icon shown above the name. */
  icon: ReactNode
  onOpen: () => void
}) {
  const hero = heroImage(product)
  const hasEnhanced = product.enhancedImages.length > 0
  const hasOriginal = product.originalImages.length > 0

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 ease-out hover:shadow-xl md:hover:-translate-y-1">
      {/* Image — opens details */}
      <button
        onClick={onOpen}
        aria-label={`View ${product.name}`}
        className="relative block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        {hero && (
          <GalleryImage
            src={hero}
            alt={
              hasEnhanced
                ? `${product.name}, enhanced presentation photo`
                : `${product.name}, photo`
            }
            lqip={product.lqip}
            fit="cover"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}

        {/* Enhanced View badge — only when the hero is actually an enhanced photo */}
        {hasEnhanced && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground shadow-sm">
            <Gem className="size-3.5" />
            Enhanced View
          </span>
        )}

        {/* Real-photo-available indicator */}
        {hasOriginal && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
            <Camera className="size-3.5" />
            Real photo
          </span>
        )}
      </button>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-accent">
          {icon}
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {categoryLabel}
          </span>
        </div>
        <h3 className="mt-1.5 font-serif text-xl leading-snug text-foreground">
          {product.name}
        </h3>

        {/* Price only when known — never invented */}
        {product.price != null && (
          <p className="mt-1 text-sm font-medium text-foreground">
            AED {product.price.toLocaleString()}
          </p>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={onOpen}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-accent text-sm font-semibold text-accent-foreground transition-transform hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
          >
            <Eye className="size-4" />
            View
          </button>
          <button
            type="button"
            onClick={() =>
              shareWithPhoto({
                name: product.name,
                id: product.id,
                imagePath: hero,
              })
            }
            aria-label={`Message us on WhatsApp about ${product.name}`}
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-black transition-transform hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
          >
            <MessageCircle className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
