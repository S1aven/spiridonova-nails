import { contactInfo, siteSettings } from '@/lib/data'
import { Service } from '@/types'

// Схема для салона (главная)
export const getSalonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: siteSettings.name,
  image: [
    `${siteSettings.url}/images/salon.jpg`,
    `${siteSettings.url}/images/gallery/work1.jpg`,
    `${siteSettings.url}/images/gallery/work2.jpg`
  ],
  '@id': siteSettings.url,
  url: siteSettings.url,
  telephone: contactInfo.phoneFormatted,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Пушкина, д. 10',
    addressLocality: 'Москва',
    postalCode: '101000',
    addressCountry: 'RU'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: contactInfo.latitude,
    longitude: contactInfo.longitude
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: contactInfo.workHoursSchema.dayOfWeek,
    opens: contactInfo.workHoursSchema.opens,
    closes: contactInfo.workHoursSchema.closes
  }],
  priceRange: siteSettings.priceRange,
  sameAs: [
    'https://t.me/spiridonova-nails',
    'https://vk.com/donova-nails'
  ]
})

// Схема для услуги
export const getServiceSchema = (service: Service) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: service.name,
  description: service.description,
  image: `${siteSettings.url}${service.image}`,
  offers: {
    '@type': 'Offer',
    price: service.price,
    priceCurrency: siteSettings.currency,
    availability: 'https://schema.org/InStock',
    url: `${siteSettings.url}/services/${service.slug}`,
    priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  },
  brand: {
    '@type': 'Brand',
    name: siteSettings.shortName
  }
})

// Схема для хлебных крошек
export const getBreadcrumbSchema = (items: { name: string, url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${siteSettings.url}${item.url}`
  }))
})

// Схема для отзывов (если будут)
export const getReviewSchema = (ratingValue: number, reviewCount: number) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: siteSettings.name,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: ratingValue,
    reviewCount: reviewCount,
    bestRating: '5',
    worstRating: '1'
  }
})