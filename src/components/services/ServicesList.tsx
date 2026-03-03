'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import { siteSettings } from '@/lib/data/site'
import type { Service } from '@/types'

const categoryNames: Record<string, string> = {
  all: 'Все услуги',
  manicure: 'Маникюр',
  pedicure: 'Педикюр',
  other: 'Дизайн',
}

const categoryIcons: Record<string, string> = {
  manicure: '💅',
  pedicure: '🦶',
  other: '✨',
}

interface ServicesListProps {
  services: Service[]
}

export default function ServicesList({ services }: ServicesListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const categories = ['all', ...new Set(services.map((s) => s.category))]

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((s) => s.category === selectedCategory)

  return (
    <>
      {/* Фильтр по категориям — в стиле галереи */}
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

      {/* Сетка карточек услуг */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        itemScope
        itemType="https://schema.org/ItemList"
        itemProp="itemListElement"
      >
        {filteredServices.map((service) => (
          <article
            key={service.id}
            className="group h-full"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/Product"
          >
            <Link
              href={`/services/${service.slug}`}
              className="block h-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-xl"
              itemProp="url"
            >
              <Card
                hover
                shadow="md"
                className="overflow-hidden h-full flex flex-col"
              >
                {/* Изображение */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      itemProp="image"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                      <span className="text-4xl">
                        {categoryIcons[service.category] || '✨'}
                      </span>
                    </div>
                  )}
                  {service.isPopular && (
                    <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Популярное
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {categoryNames[service.category]}
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-5">
                  <h2
                    className="text-lg font-semibold mb-2 group-hover:text-pink-500 transition-colors"
                    itemProp="name"
                  >
                    {service.name}
                  </h2>
                  <p
                    className="text-gray-600 text-sm mb-3 line-clamp-2"
                    itemProp="description"
                  >
                    {service.description}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xl font-bold text-gray-900"
                        itemProp="offers"
                        itemScope
                        itemType="https://schema.org/Offer"
                      >
                        <span itemProp="price" content={String(service.price)}>
                          {service.price} ₽
                        </span>
                        <meta itemProp="priceCurrency" content={siteSettings.currency} />
                      </span>
                      <span className="text-sm text-gray-500">
                        {service.duration} мин
                      </span>
                    </div>
                    {service.features && service.features.length > 0 && (
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 2).map((feature, i) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {service.features.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{service.features.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          </article>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          В этой категории пока нет услуг.
        </p>
      )}
    </>
  )
}
