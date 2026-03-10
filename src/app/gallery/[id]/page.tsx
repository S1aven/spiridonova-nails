import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGallery, getGalleryItemByIdAsync } from '@/lib/data/gallery'
import { siteSettings } from '@/lib/data/site'
import JsonLd from '@/components/shared/JsonLd'
import { getBreadcrumbSchema } from '@/lib/seo/schemas'
import GalleryItemDetail from '@/components/gallery/GalleryItemDetail'

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
  const item = await getGalleryItemByIdAsync(id)

  if (!item) {
    return {
      title: 'Работа не найдена',
    }
  }

  const imageUrl = item.imageUrl.startsWith('http') ? item.imageUrl : `${siteSettings.url}${item.imageUrl}`

  return {
    title: `${item.title} | Портфолио | Салон Спиридонова Nails`,
    description: item.description || `Работа: ${item.title}. Категория: ${categoryNames[item.category] || item.category}. Салон красоты Спиридонова Nails.`,
    openGraph: {
      title: `${item.title} | Портфолио Спиридонова Nails`,
      description: item.description || item.title,
      url: `${siteSettings.url}/gallery/${item.id}`,
      images: [{
        url: imageUrl,
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
  const gallery = await getGallery()
  return gallery.map((item) => ({
    id: item.id,
  }))
}

export default async function GalleryItemPage({ params }: Props) {
  const { id } = await params
  const item = await getGalleryItemByIdAsync(id)

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
      <GalleryItemDetail item={item} />
    </>
  )
}
