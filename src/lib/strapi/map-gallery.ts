import type { GalleryItem } from '@/types';

export interface StrapiGalleryItemDoc {
  documentId: string;
  title: string;
  category: string;
  description?: string;
  media?: { url: string; mime?: string } | null;
  order?: number;
}

export interface StrapiGalleryResponse {
  data: StrapiGalleryItemDoc[];
  meta?: { pagination?: { total: number } };
}

export function mapStrapiGalleryToItem(doc: StrapiGalleryItemDoc, baseUrl: string): GalleryItem {
  const mediaUrl = doc.media?.url;
  return {
    id: String(doc.documentId),
    imageUrl: mediaUrl ? (mediaUrl.startsWith('http') ? mediaUrl : `${baseUrl}${mediaUrl}`) : '',
    title: doc.title,
    category: doc.category,
    description: doc.description,
  };
}
