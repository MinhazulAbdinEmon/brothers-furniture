import { Refrigerator } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FridgeCategory } from "@/lib/fridges"

/**
 * Filter icon for fridges. "All" uses the fridge outline; the colour filters
 * use a clear colour swatch so the choice reads at a glance.
 */
export function FridgeFilterIcon({
  value,
  className,
}: {
  value: FridgeCategory | null
  className?: string
}) {
  if (value === null) {
    return <Refrigerator className={className} aria-hidden="true" />
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block rounded-full ring-1",
        value === "silver"
          ? "bg-zinc-400 ring-black/20"
          : "bg-zinc-100 ring-black/20",
        className
      )}
    />
  )
}
