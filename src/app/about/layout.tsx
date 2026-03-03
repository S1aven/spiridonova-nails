import type { Metadata } from 'next'
import { siteSettings } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'О мастере и салоне | Спиридонова Nails — маникюр и педикюр в Москве',
  description: 'Любовь Спиридонова — мастер ногтевого сервиса с многолетним опытом. Салон в центре Москвы: стерильность, премиальные материалы, индивидуальный подход. Запись онлайн 24/7.',
  openGraph: {
    title: 'О мастере | Салон Спиридонова Nails',
    description: 'Опытный мастер маникюра и педикюра в центре Москвы. Уютная атмосфера, стерильные инструменты.',
    url: `${siteSettings.url}/about`,
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
