import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import type { Service } from '@/types'

const categoryNames: Record<string, string> = {
  manicure: 'Маникюр',
  pedicure: 'Педикюр',
  other: 'Дизайн',
}

interface ServiceDetailProps {
  service: Service
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="service-detail-heading"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Хлебные крошки */}
        <nav aria-label="Хлебные крошки" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-pink-500 transition-colors">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/services" className="hover:text-pink-500 transition-colors">
                Услуги
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium line-clamp-1" aria-current="page">
              {service.name}
            </li>
          </ol>
        </nav>

        <article>
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
            {categoryNames[service.category]}
          </span>
          <h1
            id="service-detail-heading"
            className="text-3xl md:text-4xl font-bold mt-2 mb-4"
            itemProp="name"
          >
            {service.name}
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Изображение */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Card padding="none" className="h-full overflow-hidden">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    itemProp="image"
                    priority
                    unoptimized={service.image?.startsWith('http')}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-5xl">
                    {service.category === 'manicure' ? '💅' : service.category === 'pedicure' ? '🦶' : '✨'}
                  </div>
                )}
              </Card>
            </div>

            {/* Цена, время, описание */}
            <div>
              <div className="flex flex-wrap items-baseline gap-3 mb-4">
                <span
                  className="text-2xl font-bold text-gray-900"
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <span itemProp="price" content={String(service.price)}>
                    {service.price} ₽
                  </span>
                  <meta itemProp="priceCurrency" content="RUB" />
                </span>
                {service.oldPrice && (
                  <span className="text-base text-gray-400 line-through">
                    {service.oldPrice} ₽
                  </span>
                )}
                <span className="text-gray-500">
                  · {service.duration} мин
                </span>
              </div>

              <p className="text-gray-600 text-lg mb-6" itemProp="description">
                {service.longDescription || service.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button href="/booking" variant="primary" size="lg">
                  Записаться онлайн
                </Button>
                <Button href="/services" variant="outline" size="lg">
                  Все услуги
                </Button>
              </div>
            </div>
          </div>

          {/* Что входит в услугу */}
          {service.features && service.features.length > 0 && (
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold mb-4">Что входит в услугу</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="text-pink-500 shrink-0" aria-hidden>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </div>
    </section>
  )
}
