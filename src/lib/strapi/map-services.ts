import type { Service } from '@/types';

export interface StrapiServiceDoc {
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  price: number;
  oldPrice?: number;
  duration: number;
  category: 'manicure' | 'pedicure' | 'other';
  image?: { url: string } | null;
  features?: string[];
  isPopular?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface StrapiServicesResponse {
  data: StrapiServiceDoc[];
  meta?: { pagination?: { total: number } };
}

export function mapStrapiServiceToService(doc: StrapiServiceDoc, baseUrl: string): Service {
  const imageUrl = doc.image?.url;
  return {
    id: String(doc.documentId),
    slug: doc.slug,
    name: doc.name,
    description: doc.description ?? '',
    longDescription: doc.longDescription,
    price: doc.price,
    oldPrice: doc.oldPrice,
    duration: doc.duration,
    category: doc.category,
    image: imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`) : undefined,
    features: Array.isArray(doc.features) ? doc.features : undefined,
    isPopular: doc.isPopular ?? false,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
  };
}
