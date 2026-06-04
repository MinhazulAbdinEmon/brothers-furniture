import { WashingMachine } from "lucide-react"
import { ProductGallery } from "./gallery/product-gallery"
import { washingMachines } from "@/lib/washing-machines"

export function WashingMachines() {
  return (
    <ProductGallery
      id="washing-machines"
      eyebrow="Appliances"
      title="Washing Machines"
      subtitle="Front-load machines — see the real photo before you contact us."
      products={washingMachines}
      icon={(_value, className) => <WashingMachine className={className} />}
      categoryLabel={() => "Washing Machine"}
    />
  )
}
