import type { MetadataRoute } from 'next'
import { getAllServices } from '@/lib/data/services'
import { getAllGallery } from '@/lib/data/gallery'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://salon-spiridonova-nails.ru'

  // Статические страницы (только существующие в app)
  const staticPages = [
    '',
    '/services',
    '/gallery',
    // '/about', '/booking' — добавить, когда будут созданы страницы
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Динамические страницы услуг
  const services = getAllServices()
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Страницы галереи (отдельная страница на каждую работу)
  const gallery = getAllGallery()
  const galleryPages = gallery.map((item) => ({
    url: `${baseUrl}/gallery/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...servicePages, ...galleryPages]
}