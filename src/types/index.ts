export interface Service {
  id: string
  slug: string
  name: string
  description: string
  longDescription?: string
  price: number
  oldPrice?: number
  duration: number // минуты
  category: 'manicure' | 'pedicure' | 'other'
  image?: string
  features?: string[]
  isPopular?: boolean
  seoTitle?: string
  seoDescription?: string
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
  description?: string;
  date?: string; // опционально
  tags?: string[]; // опционально
}

export interface ContactInfo {
  phone: string
  phoneFormatted: string
  telegram: string
  whatsapp: string
  address: string
  addressFull: string
  mapLink: string
  latitude: number
  longitude: number
  workHours: string
  workHoursSchema: {
    dayOfWeek: string[]
    opens: string
    closes: string
  }
}

export interface SiteSettings {
  name: string
  shortName: string
  url: string
  logo: string
  currency: 'RUB'
  priceRange: string
}