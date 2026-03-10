import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import type { GalleryItem } from '@/types'

const categoryNames: Record<string, string> = {
  'маникюр': 'Маникюр',
  'педикюр': 'Педикюр',
  'дизайн': 'Дизайн',
}

interface GalleryItemDetailProps {
  item: GalleryItem
}

export default function GalleryItemDetail({ item }: GalleryItemDetailProps) {
  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="gallery-item-heading"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <nav aria-label="Хлебные крошки" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-pink-500 transition-colors">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/gallery" className="hover:text-pink-500 transition-colors">
                Портфолио
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium line-clamp-1" aria-current="page">
              {item.title}
            </li>
          </ol>
        </nav>

        <article itemScope itemType="https://schema.org/ImageObject">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
            {categoryNames[item.category] || item.category}
          </span>
          <h1
            id="gallery-item-heading"
            className="text-3xl md:text-4xl font-bold mt-2 mb-4"
            itemProp="name"
          >
            {item.title}
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Card padding="none" className="h-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  itemProp="contentUrl"
                  priority
                  unoptimized={item.imageUrl.startsWith('http')}
                />
              </Card>
            </div>
            <div>
              {item.description && (
                <p className="text-gray-600 text-lg mb-6" itemProp="description">
                  {item.description}
                </p>
              )}
              <p className="text-sm text-gray-500 mb-8">
                Салон красоты Спиридонова Nails. Запись онлайн 24/7.
              </p>
              <Button href="/gallery" variant="outline" size="md">
                ← Все работы
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
