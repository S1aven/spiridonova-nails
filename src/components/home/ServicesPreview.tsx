// components/home/ServicesPreview.tsx
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { getAllServices } from '@/lib/data/services';
import { siteSettings } from '@/lib/data/site';

// Иконки для категорий (можно заменить на SVG)
const categoryIcons = {
  manicure: '💅',
  pedicure: '🦶',
  other: '✨',
};

const categoryNames = {
  manicure: 'Маникюр',
  pedicure: 'Педикюр',
  other: 'Дизайн',
};

export default function ServicesPreview() {
  const services = getAllServices();

  // Берем только популярные услуги для превью (первые 3-4)
  const popularServices = services
    .filter(service => service.isPopular)
    .slice(0, 4);

  // Если нет популярных, берем любые первые 4
  const previewServices = popularServices.length > 0
    ? popularServices
    : services.slice(0, 4);

  // Группируем услуги по категориям для статистики
  const servicesByCategory = services.reduce((acc, service) => {
    acc[service.category] = (acc[service.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-pink-50"
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/OfferCatalog"
    >
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
            Наши услуги
          </span>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-bold mt-2 mb-4"
            itemProp="name"
          >
            Профессиональный уход для ваших рук и ног
          </h2>
          <p className="text-gray-600 text-lg">
            Используем только премиальные материалы и стерильные инструменты.
            Каждый клиент для нас — особенный.
          </p>
        </div>

        {/* Статистика категорий */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {Object.entries(servicesByCategory).map(([category, count]) => (
            <div
              key={category}
              className="text-center"
              itemProp="category"
              content={categoryNames[category as keyof typeof categoryNames]}
            >
              <div className="text-3xl mb-2">
                {categoryIcons[category as keyof typeof categoryIcons]}
              </div>
              <div className="font-semibold text-gray-900">
                {categoryNames[category as keyof typeof categoryNames]}
              </div>
              <div className="text-sm text-gray-500">
                {count} {count === 1 ? 'услуга' : count < 5 ? 'услуги' : 'услуг'}
              </div>
            </div>
          ))}

          <div className="text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="font-semibold text-gray-900">Средний рейтинг</div>
            <div className="text-sm text-gray-500">4.9 из 5</div>
          </div>
        </div>

        {/* Сетка услуг */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          {previewServices.map((service, index) => (
            <article
              key={service.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/Product"
            >
              <Link
                href={`/services/${service.slug}`}
                className="block"
                itemProp="url"
              >
                {/* Изображение услуги */}
                <div className="relative h-48 overflow-hidden">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      itemProp="image"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                      <span className="text-4xl">
                        {categoryIcons[service.category]}
                      </span>
                    </div>
                  )}

                  {/* Бейдж "Популярное" */}
                  {service.isPopular && (
                    <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Популярное 🔥
                    </div>
                  )}

                  {/* Категория */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {categoryNames[service.category]}
                  </div>
                </div>

                {/* Информация об услуге */}
                <div className="p-5">
                  <h3
                    className="text-lg font-semibold mb-2 group-hover:text-pink-500 transition-colors"
                    itemProp="name"
                  >
                    {service.name}
                  </h3>

                  <p
                    className="text-gray-600 text-sm mb-3 line-clamp-2"
                    itemProp="description"
                  >
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-xl font-bold text-gray-900"
                        itemProp="offers"
                        itemScope
                        itemType="https://schema.org/Offer"
                      >
                        <span itemProp="price" content={service.price.toString()}>
                          {service.price} ₽
                        </span>
                        <meta itemProp="priceCurrency" content={siteSettings.currency} />
                      </span>
                      {service.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {service.oldPrice} ₽
                        </span>
                      )}
                    </div>

                    <span className="text-sm text-gray-500">
                      {service.duration} мин
                    </span>
                  </div>

                  {/* Характеристики (первые 2) */}
                  {service.features && service.features.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
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
              </Link>
            </article>
          ))}
        </div>

        {/* Призыв к действию */}
        <div className="text-center">
          <Button
            href="/services"
            variant="primary"
            size="lg"
            className="shadow-lg shadow-pink-500/30"
          >
            Смотреть все услуги
            <span className="ml-2" aria-hidden="true">→</span>
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            Более {services.length} услуг для вашей красоты и уюта
          </p>
        </div>
      </div>

      {/* Микроразметка для списка услуг */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Популярные услуги салона красоты',
            description: 'Список наших самых востребованных услуг',
            numberOfItems: previewServices.length,
            itemListElement: previewServices.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Product',
                name: service.name,
                description: service.description,
                image: `${siteSettings.url}${service.image}`,
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
  );
}