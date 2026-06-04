// Shared types + helpers for the product galleries (sofas, fridges, …).
import { waLink } from "@/lib/site"

export interface Product {
  id: string
  /** Short, plain name — colour + type. Easy to read aloud. */
  name: string
  /** Section-specific category key, used only for filtering. */
  category: string
  /** Cleaned / studio photos. First entry is the card hero. May be empty. */
  enhancedImages: string[]
  /** Real, untouched photos. May be empty if none exist yet. */
  originalImages: string[]
  /** Price in AED, or null when unknown — never invent one. */
  price: number | null
  available: boolean
  /** Tiny blur-up placeholder for the hero image. */
  lqip?: string
}

/** Hero image for a card / the default modal image. */
export function heroImage(p: Product): string | undefined {
  return p.enhancedImages[0] ?? p.originalImages[0]
}

function message(name: string, id: string) {
  return `Hello, I am interested in this item: ${name} (${id}). Is it available?`
}

/**
 * Open a WhatsApp chat to our business number, pre-filled with the message and
 * a link to the product photo. WhatsApp deep links can target a specific number
 * (so it always reaches us) but can't attach a file, so we include the photo's
 * public URL in the text — WhatsApp renders it as an image preview on the live
 * site. The customer just taps Send.
 */
export function shareWithPhoto(opts: {
  name: string
  id: string
  imagePath?: string
}): void {
  const { name, id, imagePath } = opts
  const base = message(name, id)
  const absUrl =
    imagePath && typeof window !== "undefined"
      ? new URL(imagePath, window.location.origin).href
      : undefined
  const text = absUrl ? `${base}\n${absUrl}` : base
  window.open(waLink(text), "_blank", "noopener,noreferrer")
}
