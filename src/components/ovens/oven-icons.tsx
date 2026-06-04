import type { SVGProps } from "react"

function Svg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  )
}

/** Oven — box with a control panel and a door window. (lucide has no oven.) */
export function OvenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 8h18" />
      <path d="M7 5.5h.01M10 5.5h.01" />
      <rect x="6.5" y="11" width="11" height="6.5" rx="1" />
      <path d="M9 14.2h6" />
    </Svg>
  )
}

/** Gas cooker — cooktop with two burners. */
export function GasCookerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <circle cx="9" cy="12.5" r="2.2" />
      <circle cx="15" cy="12.5" r="2.2" />
      <path d="M6 19v1.5M18 19v1.5" />
    </Svg>
  )
}

/** Filter icon for the ovens section. `null` = "All". */
export function OvenFilterIcon({
  value,
  className,
}: {
  value: string | null
  className?: string
}) {
  return value === "gas-cooker" ? (
    <GasCookerIcon className={className} />
  ) : (
    <OvenIcon className={className} />
  )
}
