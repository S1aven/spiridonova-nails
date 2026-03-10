'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import { siteSettings } from '@/lib/data/site'
import type { GalleryItem } from '@/types'

const categoryNames: Record<string, string> = {
  all: 'Все работы',
  'маникюр': 'Маникюр',
  'педикюр': 'Педикюр',
  'дизайн': 'Дизайн',
}

interface GalleryPageClientProps {
  gallery: GalleryItem[]
}

export default function GalleryPageClient({ gallery }: GalleryPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const categories = ['all', ...new Set(gallery.map((item) => item.category))]

  const filteredGallery =
    selectedCategory === 'all'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory)

  const imageUrlForSchema = (item: GalleryItem) =>
    item.imageUrl.startsWith('http') ? item.imageUrl : `${siteSettings.url}${item.imageUrl}`

  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="gallery-page-heading"
      itemScope
      itemType="https://schema.org/ImageGallery"
    >
      <div className="container mx-auto px-4">
        <nav aria-label="Хлебные крошки" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-pink-500 transition-colors">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">
              Портфолио
            </li>
          </ol>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
            Портфолио
          </span>
          <h1
            id="gallery-page-heading"
            className="text-3xl md:text-4xl font-bold mt-2 mb-4"
          >
            Наши работы
          </h1>
          <p className="text-gray-600 text-lg">
            Каждая работа выполнена с любовью и вниманием к деталям.
            Смотрите примеры маникюра, педикюра и дизайна ногтей.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={selectedCategory === category}
            >
              {categoryNames[category] || category}
            </button>
          ))}
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          itemProp="imageGallery"
        >
          {filteredGallery.map((item, index) => (
            <Link
              key={item.id}
              href={`/gallery/${item.id}`}
              className="relative group overflow-hidden rounded-xl block focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              itemScope
              itemType="https://schema.org/ImageObject"
              itemProp="image"
            >
              <figure className="h-full">
                <Card padding="none" className="aspect-square overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    itemProp="contentUrl"
                    loading={index < 8 ? 'eager' : 'lazy'}
                  />
                </Card>
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 pointer-events-none z-10">
                  <h2 className="text-sm font-semibold truncate" itemProp="name">
                    {item.title}
                  </h2>
                  <p className="text-xs text-gray-200 truncate" itemProp="description">
                    {item.description || item.category}
                  </p>
                </figcaption>
              </figure>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              <meta itemProp="author" content={siteSettings.name} />
            </Link>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            В этой категории пока нет работ.
          </p>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Портфолио салона красоты Спиридонова Nails',
            description: 'Примеры наших работ: маникюр, педикюр и дизайн ногтей',
            url: `${siteSettings.url}/gallery`,
            image: filteredGallery.slice(0, 12).map((item) => ({
              '@type': 'ImageObject',
              contentUrl: imageUrlForSchema(item),
              name: item.title,
              description: item.description || item.category,
            })),
          }),
        }}
      />
    </section>
  )
}
