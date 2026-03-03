import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllGallery, getGalleryItemById } from '@/lib/data/gallery'
import { siteSettings } from '@/lib/data/site'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import JsonLd from '@/components/shared/JsonLd'
import { getBreadcrumbSchema } from '@/lib/seo/schemas'

const categoryNames: Record<string, string> = {
  'маникюр': 'Маникюр',
  'педикюр': 'Педикюр',
  'дизайн': 'Дизайн',
}

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const item = getGalleryItemById(id)

  if (!item) {
    return {
      title: 'Работа не найдена',
    }
  }

  return {
    title: `${item.title} | Портфолио | Салон Спиридонова Nails`,
    description: item.description || `Работа: ${item.title}. Категория: ${categoryNames[item.category] || item.category}. Салон красоты Спиридонова Nails.`,
    openGraph: {
      title: `${item.title} | Портфолио Спиридонова Nails`,
      description: item.description || item.title,
      url: `${siteSettings.url}/gallery/${item.id}`,
      images: [{
        url: `${siteSettings.url}${item.imageUrl}`,
        width: 800,
        height: 800,
        alt: item.title,
      }],
    },
    alternates: {
      canonical: `/gallery/${item.id}`,
    },
  }
}

export async function generateStaticParams() {
  const gallery = getAllGallery()
  return gallery.map((item) => ({
    id: item.id,
  }))
}

export default async function GalleryItemPage({ params }: Props) {
  const { id } = await params
  const item = getGalleryItemById(id)

  if (!item) {
    notFound()
  }

  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Портфолио', url: '/gallery' },
    { name: item.title, url: `/gallery/${item.id}` },
  ]

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <section className="py-20 bg-white" aria-labelledby="gallery-item-heading">
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
    </>
  )
}
