import type { MetadataRoute } from 'next'
import { getServices } from '@/lib/data/services'
import { getGallery } from '@/lib/data/gallery'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://salon-spiridonova-nails.ru'

  const staticPages = [
    '',
    '/services',
    '/gallery',
    '/about',
    '/booking',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const services = await getServices()
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const gallery = await getGallery()
  const galleryPages = gallery.map((item) => ({
    url: `${baseUrl}/gallery/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...servicePages, ...galleryPages]
}