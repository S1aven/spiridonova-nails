import type { Metadata } from 'next'
import { getAllServices } from '@/lib/data/services'
import { siteSettings } from '@/lib/data/site'
// import ServicesList from '@/components/services/ServicesList'
import JsonLd from '@/components/shared/JsonLd'
import { getBreadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Все услуги | Маникюр, педикюр, дизайн | Салон Спиридонова Nails',
  description: 'Полный список услуг салона красоты Спиридонова Nails: классический и аппаратный маникюр, педикюр, наращивание, дизайн ногтей. Цены от 500 до 3500 ₽. Онлайн-запись.',
  openGraph: {
    title: 'Услуги салона красоты Спиридонова Nails',
    description: 'Все услуги с ценами и описанием. Записывайтесь онлайн!',
    url: `${siteSettings.url}/services`,
  },
}

export default function ServicesPage() {
  const services = getAllServices()

  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Услуги', url: '/services' }
  ]

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Наши услуги</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Профессиональный уход за ногтями в центре Москвы. Стерильные инструменты, премиальные материалы.
        </p>
        {/*<ServicesList services={services} />*/}
      </div>
    </>
  )
}