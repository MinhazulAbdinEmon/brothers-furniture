import { useState } from "react"
import { cn } from "@/lib/utils"

interface GalleryImageProps {
  src: string
  alt: string
  /** Tiny inline blur-up placeholder (data URI). */
  lqip?: string
  className?: string
  /** Tailwind object-fit. Cards use cover, the detail view uses contain. */
  fit?: "cover" | "contain"
  /** First gallery image should load eagerly; everything else is lazy. */
  priority?: boolean
  sizes?: string
}

/**
 * Image with a blur-up placeholder and a soft fade-in once decoded.
 * The wrapper holds the aspect ratio (set via `className`) so there is no
 * layout shift while loading.
 */
export function GalleryImage({
  src,
  alt,
  lqip,
  className,
  fit = "cover",
  priority = false,
  sizes,
}: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={cn("relative overflow-hidden bg-secondary", className)}
      style={
        lqip
          ? {
              backgroundImage: `url(${lqip})`,
              backgroundSize: fit,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {/* Soft blur over the placeholder until the real image fades in */}
      {lqip && !loaded && (
        <div className="absolute inset-0 backdrop-blur-xl" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full transition-opacity duration-700 ease-out",
          fit === "cover" ? "object-cover" : "object-contain",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  )
}
