import type { Metadata } from 'next'
import { siteSettings } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'Все услуги | Маникюр, педикюр, дизайн | Салон Спиридонова Nails',
  description: 'Полный список услуг салона красоты Спиридонова Nails: классический и аппаратный маникюр, педикюр, наращивание, дизайн ногтей. Цены от 500 до 3500 ₽. Онлайн-запись.',
  openGraph: {
    title: 'Услуги салона красоты Спиридонова Nails',
    description: 'Все услуги с ценами и описанием. Записывайтесь онлайн!',
    url: `${siteSettings.url}/services`,
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
