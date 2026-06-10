import { Refrigerator } from "lucide-react"
import { cn } from "@/lib/utils"

// Colour swatch per fridge type; new types without a swatch fall back to the
// fridge outline icon.
const SWATCH: Record<string, string> = {
  silver: "bg-zinc-400 ring-black/20",
  white: "bg-zinc-100 ring-black/20",
}

/**
 * Filter icon for fridges. "All" uses the fridge outline; the colour filters
 * use a clear colour swatch so the choice reads at a glance.
 */
export function FridgeFilterIcon({
  value,
  className,
}: {
  value: string | null
  className?: string
}) {
  const swatch = value ? SWATCH[value] : undefined
  if (!swatch) {
    return <Refrigerator className={className} aria-hidden="true" />
  }
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block rounded-full ring-1", swatch, className)}
    />
  )
}
