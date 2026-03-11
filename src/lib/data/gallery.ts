// Модуль данных галереи
import { GalleryItem } from '@/types';
import { isStrapiEnabled, fetchStrapi, getStrapiUrl } from '@/lib/strapi/client';
import type { StrapiGalleryResponse } from '@/lib/strapi/map-gallery';
import { mapStrapiGalleryToItem } from '@/lib/strapi/map-gallery';

export const gallery: GalleryItem[] = [
  {
    id: '1',
    imageUrl: '/images/gallery/work1.jpg',
    title: 'Френч с блестками',
    category: 'маникюр',
    description: 'Классический френч с добавлением блесток на безымянном пальце'
  },
  {
    id: '2',
    imageUrl: '/images/gallery/work2.jpg',
    title: 'Красный матовый',
    category: 'маникюр',
    description: 'Яркий красный матовый маникюр с гель-лаком'
  },
  {
    id: '3',
    imageUrl: '/images/gallery/work3.jpg',
    title: 'Педикюр с дизайном',
    category: 'педикюр',
    description: 'Педикюр с дизайном и стразами'
  },
  {
    id: '4',
    imageUrl: '/images/gallery/work4.jpg',
    title: 'Нюдовый маникюр',
    category: 'маникюр',
    description: 'Нежный нюдовый маникюр с втиркой'
  },
  {
    id: '5',
    imageUrl: '/images/gallery/work5.jpg',
    title: 'Кошачий глаз',
    category: 'маникюр',
    description: 'Маникюр с эффектом кошачий глаз'
  },
  {
    id: '6',
    imageUrl: '/images/gallery/work6.jpg',
    title: 'Педикюр классический',
    category: 'педикюр',
    description: 'Классический педикюр с покрытием гель-лак'
  },
  {
    id: '7',
    imageUrl: '/images/gallery/work7.jpg',
    title: 'Омбре розовый',
    category: 'дизайн',
    description: 'Нежный градиент розового цвета'
  },
  {
    id: '8',
    imageUrl: '/images/gallery/work8.jpg',
    title: 'Стемпинг дизайн',
    category: 'дизайн',
    description: 'Дизайн с использованием стемпинга'
  },
  {
    id: '9',
    imageUrl: '/images/gallery/work9.jpg',
    title: 'Бархатный песок',
    category: 'дизайн',
    description: 'Дизайн с эффектом бархатного песка'
  },
  {
    id: '10',
    imageUrl: '/images/gallery/work10.jpg',
    title: 'Втирка жемчужная',
    category: 'маникюр',
    description: 'Жемчужная втирка на нюдовой базе'
  },
  {
    id: '11',
    imageUrl: '/images/gallery/work11.jpg',
    title: 'Педикюр красный',
    category: 'педикюр',
    description: 'Красный педикюр с дизайном'
  },
  {
    id: '12',
    imageUrl: '/images/gallery/work12.jpg',
    title: 'Геометричный дизайн',
    category: 'дизайн',
    description: 'Современный геометричный дизайн'
  }
];

export const getAllGallery = () => gallery;

export const getGalleryByCategory = (category: string) =>
  category === 'all' ? gallery : gallery.filter(item => item.category === category);

export const getGalleryItemById = (id: string) =>
  gallery.find((item) => item.id === id) ?? null;

/** Данные из Strapi или статика. Использовать в Server Components. */
export async function getGallery(): Promise<GalleryItem[]> {
  if (!isStrapiEnabled()) return gallery;
  try {
    const res = await fetchStrapi<StrapiGalleryResponse>('api/gallery-items', {
      populate: 'media',
      publicationState: 'live',
      sort: 'order:asc',
    });
    const baseUrl = getStrapiUrl();
    return (res.data ?? []).map((doc) => mapStrapiGalleryToItem(doc, baseUrl));
  } catch {
    return gallery;
  }
}

/** Один элемент галереи по id из Strapi или статики. */
export async function getGalleryItemByIdAsync(id: string): Promise<GalleryItem | null> {
  if (!isStrapiEnabled()) return getGalleryItemById(id);
  try {
    const res = await fetchStrapi<{ data: StrapiGalleryResponse['data'][0] }>(`api/gallery-items/${id}`, {
      populate: 'media',
      publicationState: 'live',
    });
    const doc = (res as { data?: StrapiGalleryResponse['data'][0] }).data;
    if (!doc) return getGalleryItemById(id);
    return mapStrapiGalleryToItem(doc, getStrapiUrl());
  } catch {
    return getGalleryItemById(id);
  }
}