import type { Metadata } from 'next'
import { siteSettings } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'Портфолио | Наши работы — маникюр, педикюр, дизайн | Салон Спиридонова Nails',
  description: 'Фото работ салона Спиридонова Nails: маникюр, педикюр, дизайн ногтей. Примеры работ с описанием. Вдохновляйтесь и записывайтесь онлайн.',
  openGraph: {
    title: 'Портфолио — наши работы | Салон Спиридонова Nails',
    description: 'Примеры маникюра, педикюра и дизайна ногтей. Смотрите работы и записывайтесь.',
    url: `${siteSettings.url}/gallery`,
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
