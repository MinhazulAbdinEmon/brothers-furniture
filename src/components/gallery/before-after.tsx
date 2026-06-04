import { useCallback, useRef, useState } from "react"
import { MoveHorizontal } from "lucide-react"

interface BeforeAfterProps {
  /** Left/under image — the real photo. */
  originalSrc: string
  /** Right/over image — the enhanced photo. */
  enhancedSrc: string
  alt: string
}

/**
 * Draggable before / after comparison. Pointer + keyboard accessible.
 * Both images are object-cover in the same box so a shared centre lines up;
 * if two photos are framed very differently, prefer the two-tab gallery.
 */
export function BeforeAfter({ originalSrc, enhancedSrc, alt }: BeforeAfterProps) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX)
  }
  const onPointerUp = () => {
    dragging.current = false
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5))
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5))
  }

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl bg-secondary"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Original underneath, full width */}
      <img
        src={originalSrc}
        alt={`Original photo — ${alt}`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        Original Photo
      </span>

      {/* Enhanced clipped to the left of the handle */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={enhancedSrc}
          alt={`Enhanced view — ${alt}`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-accent-foreground backdrop-blur-sm">
          Enhanced View
        </span>
      </div>

      {/* Handle */}
      <div
        role="slider"
        aria-label="Drag to compare the original photo and the enhanced view"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="absolute inset-y-0 z-10 flex w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/90" />
        <span className="flex size-10 items-center justify-center rounded-full border border-white/70 bg-white shadow-lg">
          <MoveHorizontal className="size-5 text-neutral-800" />
        </span>
      </div>
    </div>
  )
}
