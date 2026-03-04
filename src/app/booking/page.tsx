import Link from 'next/link'
import { siteSettings, contactInfo } from '@/lib/data/site'
import JsonLd from '@/components/shared/JsonLd'
import { getBreadcrumbSchema } from '@/lib/seo/schemas'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Запись онлайн | Спиридонова Nails',
  description: 'Записаться на маникюр и педикюр в салон Спиридонова Nails. Онлайн-запись скоро будет доступна — пока свяжитесь с нами по телефону или в мессенджере.',
}

export default function BookingPage() {
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Запись', url: '/booking' },
  ]

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <section
        className="py-20 bg-white"
        aria-labelledby="booking-heading"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Хлебные крошки */}
          <nav aria-label="Хлебные крошки" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-pink-500 transition-colors">
                  Главная
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Запись
              </li>
            </ol>
          </nav>

          {/* Заголовок */}
          <div className="mb-12">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
              Запись
            </span>
            <h1
              id="booking-heading"
              className="text-3xl md:text-4xl font-bold mt-2 mb-4"
            >
              Онлайн-запись скоро
            </h1>
            <p className="text-gray-600 text-lg">
              Форма записи на сайте пока в разработке. Вы можете записаться к нам по телефону или в мессенджере — мы подберём удобное время.
            </p>
          </div>

          {/* Контакты для записи */}
          <div className="prose prose-gray max-w-none mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Как записаться сейчас
            </h2>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-pink-500 shrink-0" aria-hidden>📞</span>
                Позвоните:{' '}
                <a
                  href={`tel:${contactInfo.phoneFormatted}`}
                  className="text-pink-500 hover:text-pink-600 font-medium underline underline-offset-2"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-500 shrink-0" aria-hidden>✈️</span>
                Напишите в{' '}
                <a
                  href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600 font-medium underline underline-offset-2"
                >
                  Telegram
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-500 shrink-0" aria-hidden>💬</span>
                Или в{' '}
                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600 font-medium underline underline-offset-2"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <p className="text-gray-600 text-sm">
              {siteSettings.shortName} — {contactInfo.address}. Работаем {contactInfo.workHours}.
            </p>
          </div>

          {/* Кнопки */}
          <div className="flex flex-wrap gap-4">
            <Button
              href={`tel:${contactInfo.phoneFormatted}`}
              variant="primary"
              size="lg"
            >
              Позвонить
            </Button>
            <Button href="/#contacts" variant="outline" size="lg">
              Контакты на сайте
            </Button>
            <Button href="/" variant="secondary" size="lg">
              На главную
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
