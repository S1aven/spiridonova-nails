import Link from 'next/link'
import { siteSettings, contactInfo } from '@/lib/data/site'
import JsonLd from '@/components/shared/JsonLd'
import { getBreadcrumbSchema } from '@/lib/seo/schemas'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'О мастере', url: '/about' },
  ]

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <section
        className="py-20 bg-white"
        aria-labelledby="about-heading"
        itemScope
        itemType="https://schema.org/ProfilePage"
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
                О мастере
              </li>
            </ol>
          </nav>

          {/* Заголовок */}
          <div className="mb-12">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
              О нас
            </span>
            <h1
              id="about-heading"
              className="text-3xl md:text-4xl font-bold mt-2 mb-4"
              itemProp="name"
            >
              {siteSettings.name}
            </h1>
            <p className="text-gray-600 text-lg">
              Уютная студия ногтевого сервиса в центре Москвы. Работаем с душой и заботимся о каждом клиенте.
            </p>
          </div>

          {/* Контент о мастере */}
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              О мастере
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Меня зовут Любовь. Я — мастер маникюра и педикюра с многолетним опытом. 
              Для меня важно, чтобы вы выходили из салона не только с красивыми ногтями, 
              но и с отличным настроением. Использую только премиальные материалы и 
              стерильные инструменты — ваше здоровье и комфорт всегда на первом месте.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Работаю в технике классического и аппаратного маникюра, делаю педикюр, 
              наращивание и дизайн ногтей. Люблю воплощать ваши идеи и подбирать 
              решения под ваш образ жизни и предпочтения.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Почему выбирают нас
            </h2>
            <ul className="space-y-2 text-gray-600 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-pink-500 shrink-0 mt-0.5" aria-hidden>✓</span>
                Стерилизация инструментов и одноразовые расходники
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 shrink-0 mt-0.5" aria-hidden>✓</span>
                Премиальные лаки и материалы проверенных брендов
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 shrink-0 mt-0.5" aria-hidden>✓</span>
                Удобная запись онлайн 24/7 без звонков
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 shrink-0 mt-0.5" aria-hidden>✓</span>
                Уютная атмосфера и индивидуальный подход к каждому гостю
              </li>
            </ul>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Салон находится в центре Москвы, {contactInfo.address}. 
              Работаем {contactInfo.workHours}. Жду вас в гости — записывайтесь онлайн или звоните.
            </p>
          </div>

          {/* Кнопки */}
          <div className="flex flex-wrap gap-4">
            <Button href="/booking" variant="primary" size="lg">
              Записаться онлайн
            </Button>
            <Button href="/#contacts" variant="outline" size="lg">
              Контакты
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
