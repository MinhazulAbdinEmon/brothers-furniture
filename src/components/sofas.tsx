import { ProductGallery } from "./gallery/product-gallery"
import { FilterIcon } from "./sofas/sofa-icons"
import {
  sofas,
  SOFA_FILTERS,
  CATEGORY_LABEL,
  type SofaCategory,
} from "@/lib/sofas"

export function Sofas() {
  return (
    <ProductGallery
      id="sofas"
      eyebrow="Sofa Collection"
      title="Sofas"
      subtitle="Find the perfect sofa for your home."
      products={sofas}
      filters={SOFA_FILTERS}
      filterAriaLabel="Filter sofas by type"
      icon={(value, className) => (
        <FilterIcon value={value as SofaCategory | null} className={className} />
      )}
      categoryLabel={(c) => CATEGORY_LABEL[c as SofaCategory]}
    />
  )
}
