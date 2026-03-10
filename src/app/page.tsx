import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import ServicesPreview from '@/components/home/ServicesPreview'
import GalleryPreview from '@/components/home/GalleryPreview'
import BookingWidget from '@/components/home/BookingWidget'
import Contacts from '@/components/home/Contacts'
import JsonLd from '@/components/shared/JsonLd'
import { getSalonSchema, getBreadcrumbSchema } from '@/lib/seo/schemas'
import { siteSettings } from '@/lib/data/site'
import { getServices } from '@/lib/data/services'
import { getGallery } from '@/lib/data/gallery'

export const metadata: Metadata = {
  title: 'Студия Спиридонова Nails | Маникюр и педикюр с онлайн-записью',
  description: '✧ Студия ногтевого сервиса Спиридонова Nails в центре Москвы. Классический и аппаратный маникюр, педикюр, дизайн ногтей. Онлайн-запись 24/7, подарки и акции. Первое посещение - скидка 10%!',
  openGraph: {
    title: 'Студия Спиридонова Nails | Маникюр и педикюр в центре Москвы',
    description: 'Студия ногтевого сервиса с онлайн-записью. Уютная атмосфера, опытный мастер, стерильные инструменты.',
    url: siteSettings.url,
  },
}

export default async function HomePage() {
  const [services, gallery] = await Promise.all([getServices(), getGallery()])
  const breadcrumbs = [
    { name: 'Главная', url: '/' }
  ]

  return (
    <>
      <JsonLd data={getSalonSchema()} />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      <Hero />
      <ServicesPreview services={services} />
      <GalleryPreview gallery={gallery} />
      {/* BookingWidget отключён: онлайн-запись пока не нужна; включить при необходимости */}
      {/*<BookingWidget services={services} />*/}
      <Contacts />
    </>
  )
}
