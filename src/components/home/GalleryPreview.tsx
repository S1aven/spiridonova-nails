'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getAllGallery } from '@/lib/data/gallery';
import { siteSettings } from '@/lib/data/site';

export default function GalleryPreview() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const gallery = getAllGallery();

  const categories = ['all', ...new Set(gallery.map(item => item.category))];

  const filteredGallery = selectedCategory === 'all'
    ? gallery.slice(0, 6)
    : gallery.filter(item => item.category === selectedCategory).slice(0, 6);

  const categoryNames: Record<string, string> = {
    all: 'Все работы',
    'маникюр': 'Маникюр',
    'педикюр': 'Педикюр',
    'дизайн': 'Дизайн',
  };

  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="gallery-heading"
      itemScope
      itemType="https://schema.org/ImageGallery"
    >
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
            Портфолио
          </span>
          <h2
            id="gallery-heading"
            className="text-3xl md:text-4xl font-bold mt-2 mb-4"
          >
            Наши работы
          </h2>
          <p className="text-gray-600 text-lg">
            Каждая работа выполнена с любовью и вниманием к деталям.
            Смотрите примеры наших работ и вдохновляйтесь!
          </p>
        </div>

        {/* Фильтр по категориям */}
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

        {/* Сетка галереи */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          itemProp="imageGallery"
        >
          {filteredGallery.map((item, index) => (
            <figure
              key={item.id}
              className="relative group overflow-hidden rounded-xl" // ← Добавлен rounded-xl и overflow-hidden
              itemProp="image"
              itemScope
              itemType="https://schema.org/ImageObject"
              onClick={() => {
                console.log('Open image:', item.id);
              }}
            >
              {/* Карточка с изображением */}
              <Card padding="none" className="aspect-square overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  itemProp="contentUrl"
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
              </Card>

              {/* Оверлей при наведении */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              {/* Информация при наведении - теперь внутри оверлея */}
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <h3 className="text-sm font-semibold truncate" itemProp="name">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-200 truncate" itemProp="description">
                  {item.description || item.category}
                </p>
              </figcaption>

              {/* Метаданные для SEO */}
              <meta itemProp="author" content={siteSettings.name} />
              <meta itemProp="datePublished" content="2024" />
            </figure>
          ))}
        </div>

        {/* Кнопка "Смотреть всё портфолио" */}
        <div className="text-center">
          <Button
            href="/gallery"
            variant="primary"
            size="lg"
            className="shadow-lg shadow-pink-500/30"
          >
            Смотреть всё портфолио
            <span className="ml-2" aria-hidden="true">→</span>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            {gallery.length}+ работ в нашем портфолио
          </p>
        </div>
      </div>

      {/* Микроразметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Портфолио салона красоты Марии',
            description: 'Примеры наших работ: маникюр, педикюр и дизайн ногтей',
            url: `${siteSettings.url}/gallery`,
            image: filteredGallery.map(item => ({
              '@type': 'ImageObject',
              contentUrl: `${siteSettings.url}${item.imageUrl}`,
              name: item.title,
              description: item.description || item.category,
            })),
          }),
        }}
      />
    </section>
  );
}