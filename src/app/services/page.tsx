import Link from 'next/link'
import { getAllServices } from '@/lib/data/services'
import { siteSettings } from '@/lib/data/site'
import JsonLd from '@/components/shared/JsonLd'
import { getBreadcrumbSchema } from '@/lib/seo/schemas'
import ServicesList from '@/components/services/ServicesList'

export default function ServicesPage() {
  const services = getAllServices()

  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Услуги', url: '/services' },
  ]

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <section
        className="py-20 bg-gradient-to-b from-white to-pink-50"
        aria-labelledby="services-page-heading"
        itemScope
        itemType="https://schema.org/OfferCatalog"
      >
        <div className="container mx-auto px-4">
          {/* Хлебные крошки */}
          <nav aria-label="Хлебные крошки" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-pink-500 transition-colors">
                  Главная
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Услуги
              </li>
            </ol>
          </nav>

          {/* Заголовок страницы */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
              Наши услуги
            </span>
            <h1
              id="services-page-heading"
              className="text-3xl md:text-4xl font-bold mt-2 mb-4"
              itemProp="name"
            >
              Профессиональный уход для ваших рук и ног
            </h1>
            <p className="text-gray-600 text-lg">
              Используем только премиальные материалы и стерильные инструменты.
              Выберите услугу и записывайтесь онлайн 24/7.
            </p>
          </div>

          <ServicesList services={services} />
        </div>

        {/* Микроразметка */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Услуги салона красоты Спиридонова Nails',
              description: 'Полный список услуг: маникюр, педикюр, дизайн ногтей',
              numberOfItems: services.length,
              itemListElement: services.map((service, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Product',
                  name: service.name,
                  description: service.description,
                  image: service.image ? `${siteSettings.url}${service.image}` : undefined,
                  offers: {
                    '@type': 'Offer',
                    price: service.price,
                    priceCurrency: siteSettings.currency,
                  },
                },
              })),
            }),
          }}
        />
      </section>
    </>
  )
}
