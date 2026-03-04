import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Салон красоты Spiridonova Nails',
    short_name: 'Салон Spiridonova Nails',
    description: 'Профессиональный маникюр и педикюр в центре Москвы',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ec4899',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'  // ✅ исправлено
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'  // ✅ исправлено
      }
    ]
  }
}