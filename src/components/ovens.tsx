import { ProductGallery } from "./gallery/product-gallery"
import { OvenFilterIcon } from "./ovens/oven-icons"
import { ovens, OVEN_FILTERS, OVEN_CATEGORY_LABEL, type OvenCategory } from "@/lib/ovens"

export function Ovens() {
  return (
    <ProductGallery
      id="ovens"
      eyebrow="Appliances"
      title="Ovens & Cookers"
      subtitle="Ovens and gas cookers — checked and ready to use."
      products={ovens}
      filters={OVEN_FILTERS}
      filterAriaLabel="Filter ovens and cookers by type"
      icon={(value, className) => (
        <OvenFilterIcon value={value} className={className} />
      )}
      categoryLabel={(c) => OVEN_CATEGORY_LABEL[c as OvenCategory]}
    />
  )
}
