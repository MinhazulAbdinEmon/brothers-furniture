import type { SVGProps } from "react"

/** Wardrobe — tall two-door cabinet with handles. (lucide has no wardrobe.) */
export function WardrobeIcon(props: SVGProps<SVGSVGElement>) {
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
    >
      <rect x="5" y="2.5" width="14" height="19" rx="1.5" />
      <path d="M12 2.5v19" />
      <path d="M10 10.5v2.5M14 10.5v2.5" />
      <path d="M6.5 21.5v1M17.5 21.5v1" />
    </svg>
  )
}
