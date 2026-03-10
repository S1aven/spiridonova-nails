import Link from 'next/link'
import { getGallery } from '@/lib/data/gallery'
import JsonLd from '@/components/shared/JsonLd'
import { getBreadcrumbSchema } from '@/lib/seo/schemas'
import GalleryPageClient from '@/components/gallery/GalleryPageClient'

export default async function GalleryPage() {
  const gallery = await getGallery()
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Портфолио', url: '/gallery' },
  ]

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <GalleryPageClient gallery={gallery} />
    </>
  )
}
