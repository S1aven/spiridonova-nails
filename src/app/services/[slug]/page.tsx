import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServices, getServiceBySlugAsync } from '@/lib/data/services'
import { siteSettings } from '@/lib/data/site'
import ServiceDetail from '@/components/services/ServiceDetail'
import JsonLd from '@/components/shared/JsonLd'
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/seo/schemas'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlugAsync(slug)

  if (!service) {
    return {
      title: 'Услуга не найдена',
    }
  }

  return {
    title: service.seoTitle || `${service.name} | Цена ${service.price} ₽ | Салон Спиридонова Nails`,
    description: service.seoDescription || `${service.description} Запись онлайн 24/7. ${service.duration} минут, мастер Любовь. Адрес: ${siteSettings.url}`,
    openGraph: {
      title: service.seoTitle || `${service.name} в салоне Спиридонова Nails`,
      description: service.seoDescription || service.description,
      url: `${siteSettings.url}/services/${service.slug}`,
      images: service.image ? [{
        url: service.image.startsWith('http') ? service.image : `${siteSettings.url}${service.image}`,
        width: 800,
        height: 600,
        alt: service.name,
      }] : undefined,
    },
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  }
}

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlugAsync(slug)

  if (!service) {
    notFound()
  }

  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Услуги', url: '/services' },
    { name: service.name, url: `/services/${service.slug}` }
  ]

  return (
    <>
      <JsonLd data={getServiceSchema(service)} />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <ServiceDetail service={service} />
    </>
  )
}