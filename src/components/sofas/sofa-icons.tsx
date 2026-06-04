// Simple, distinct line icons for each sofa type — drawn so they read clearly
// even at a glance, for visitors who rely on pictures rather than words.
// Same 24×24 / currentColor style as lucide-react, so they sit beside it cleanly.
import type { ReactNode, SVGProps } from "react"
import type { SofaCategory } from "@/lib/sofas"

function Svg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  )
}

/** Couch body + back + legs, shared by the seater icons. */
function SofaBody({ children }: { children?: ReactNode }) {
  return (
    <>
      <path d="M5 11V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2" />
      <path d="M3 17v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
      <path d="M4 17v2M20 17v2" />
      {children}
    </>
  )
}

export const AllSofasIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <rect x="3" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="3" width="7" height="7" rx="2" />
    <rect x="3" y="14" width="7" height="7" rx="2" />
    <rect x="14" y="14" width="7" height="7" rx="2" />
  </Svg>
)

export const SofaSetIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <rect x="2" y="9" width="12" height="8" rx="2" />
    <path d="M2 12.5h12" />
    <path d="M4 17v2M12 17v2" />
    <rect x="16" y="10" width="6" height="7" rx="2" />
    <path d="M17 17v2M21 17v2" />
  </Svg>
)

export const LShapedIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M4 4h6a1 1 0 0 1 1 1v7h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    <path d="M11 12h2M11 16h8" />
  </Svg>
)

export const ThreeSeaterIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <SofaBody>
      <path d="M10 11.5v5M14 11.5v5" />
    </SofaBody>
  </Svg>
)

export const TwoSeaterIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <SofaBody>
      <path d="M12 11.5v5" />
    </SofaBody>
  </Svg>
)

export const SingleChairIcon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M8 11V9a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v2" />
    <path d="M6 17v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
    <path d="M7 17v2M17 17v2" />
  </Svg>
)

/** Icon for a filter value (null = "All Sofas"). */
export function FilterIcon({
  value,
  className,
}: {
  value: SofaCategory | null
  className?: string
}) {
  switch (value) {
    case null:
      return <AllSofasIcon className={className} />
    case "sofa-set":
      return <SofaSetIcon className={className} />
    case "l-shaped":
      return <LShapedIcon className={className} />
    case "3-seater":
      return <ThreeSeaterIcon className={className} />
    case "2-seater":
      return <TwoSeaterIcon className={className} />
    case "single":
      return <SingleChairIcon className={className} />
  }
}
