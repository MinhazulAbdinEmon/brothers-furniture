// Single source of truth for all Shahid Used Furniture business content.

export interface Phone {
  label: string
  tel: string
  primary?: boolean
}

const phones: Phone[] = [
  { label: "+971 55 628 2836", tel: "+971556282836", primary: true },
  { label: "+971 55 137 5050", tel: "+971551375050" },
  { label: "+971 50 868 1162", tel: "+971508681162" },
]

export const site = {
  name: "Shahid Used Furniture",
  legalName: "Shahid Used Furniture Trading",
  tagline: "Furniture, beautifully lived in.",
  location: {
    label: "Ajman, United Arab Emirates",
    // Official Google Maps listing for Shahid Used Furniture Trdg
    mapsUrl: "https://maps.app.goo.gl/MokovPrWTssvCoJb7",
  },
  hours: "Open daily · 8:00 AM – 11:30 PM",
  phones,
  whatsapp: "https://wa.me/971556282836",
  // email: "",  // pending — to be added once confirmed
  socials: {
    facebook: "https://www.facebook.com/share/18fR8vPNaq/?mibextid=wwXIfr",
    instagram:
      "https://www.instagram.com/brothersusedfurniture?igsh=MWE5eTV6cHo3bnA2eQ%3D%3D&utm_source=qr",
  },
}

export const primaryPhone = phones.find((p) => p.primary) ?? phones[0]

/** WhatsApp deep link with an optional pre-filled message. */
export function waLink(message?: string): string {
  return message
    ? `${site.whatsapp}?text=${encodeURIComponent(message)}`
    : site.whatsapp
}
