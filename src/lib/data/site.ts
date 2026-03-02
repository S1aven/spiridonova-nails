import { ContactInfo, SiteSettings } from '@/types'

export const siteSettings: SiteSettings = {
  name: 'Салон красоты Спиридонова Nails',
  shortName: 'Спиридонова Nails',
  url: 'https://salon-spiridonova-nails.ru',
  logo: '/images/logo.png',
  currency: 'RUB',
  priceRange: '800₽ - 3500₽'
}

export const contactInfo: ContactInfo = {
  phone: '+7 (900) 123-45-67',
  phoneFormatted: '+79001234567',
  telegram: '@spiridonova_nails',
  whatsapp: '+79001234567',
  address: 'ул. Пушкина, д. 10, Москва',
  addressFull: 'Москва, ул. Пушкина, д. 10, подъезд 2, этаж 3',
  mapLink: 'https://yandex.ru/maps/...',
  latitude: 55.7558,
  longitude: 37.6173,
  workHours: 'Ежедневно с 10:00 до 21:00',
  workHoursSchema: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '10:00',
    closes: '21:00'
  }
}