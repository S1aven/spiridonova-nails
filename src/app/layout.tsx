import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://salon-spiridonova-nails.ru'),
  title: {
    default: 'Салон красоты Спиридонова Nails | Маникюр и педикюр в центре Москвы',
    template: '%s | Салон Спиридонова Nails'
  },
  description: 'Салон красоты Спиридонова Nails предлагает профессиональный маникюр, педикюр и дизайн ногтей. Онлайн-запись 24/7, доступные цены, индивидуальный подход в центре Москвы.',
  keywords: ['маникюр', 'педикюр', 'салон красоты', 'дизайн ногтей', 'Москва', 'ЦАО', 'Пресненский район'],
  authors: [{ name: 'Любовь', url: 'https://salon-spiridonova-nails.ru' }],
  creator: 'Любовь',
  publisher: 'Салон Спиридонова Nails',

  openGraph: {
    title: 'Салон красоты Спиридонова Nails | Маникюр и педикюр',
    description: 'Профессиональный маникюр и педикюр в центре Москвы. Онлайн-запись 24/7.',
    url: 'https://salon-spiridonova-nails.ru',
    siteName: 'Салон Спиридонова Nails',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Салон красоты Спиридонова Nails',
    }],
    locale: 'ru_RU',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Салон красоты Спиридонова Nails',
    description: 'Маникюр и педикюр в центре Москвы',
    images: ['/images/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // Раскомментировать, когда появятся коды верификации из Яндекс.Вебмастер и Google Search Console:
  // verification: {
  //   yandex: 'ваш-код-верификации',
  //   google: 'ваш-код-верификации',
  // },

  alternates: {
    canonical: 'https://salon-spiridonova-nails.ru',
  },

  category: 'beauty salon',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
    <body className={inter.className}>
    <Header />
    <main>{children}</main>
    <Footer />
    </body>
    </html>
  )
}
