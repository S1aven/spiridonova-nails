import Link from 'next/link';
import Image from 'next/image';
import { siteSettings, contactInfo } from '@/lib/data/site';

const navigation = {
  main: [
    { name: 'Главная', href: '/' },
    { name: 'Услуги', href: '/services' },
    { name: 'Портфолио', href: '/gallery' },
    { name: 'О мастере', href: '/about' },
  ],
  services: [
    { name: 'Классический маникюр', href: '/services/manikur-klassicheskij' },
    { name: 'Аппаратный маникюр', href: '/services/manikur-apparatnyj' },
    { name: 'Комплексный педикюр', href: '/services/pedikur-kompleksnyj' },
    { name: 'Наращивание ногтей', href: '/services/narashchivanie-nogtej' },
    { name: 'Дизайн ногтей', href: '/services/dizajn-nogtej' },
  ],
};

const socialLinks = [
  {
    name: 'Telegram',
    href: `https://t.me/${contactInfo.telegram.replace('@', '')}`,
    icon: '📱',
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`,
    icon: '💬',
  },
  {
    name: 'VK',
    href: 'https://vk.com/spiridonova-nails',
    icon: 'VK',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Информация о салоне и навигация
      </h2>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Колонка 1: Информация о салоне */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="text-white font-bold text-xl">
                {siteSettings.shortName}
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Профессиональный маникюр и педикюр в центре Москвы.
              Индивидуальный подход, стерильные инструменты, премиальные материалы.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                  aria-label={`Перейти в ${item.name}`}
                >
                  <span className="text-2xl">{item.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Колонка 2: Основные разделы */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3: Услуги */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Услуги</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 4: Контакты */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${contactInfo.phoneFormatted}`}
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2 text-pink-500">📞</span>
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2 text-pink-500">📱</span>
                  {contactInfo.telegram}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2 text-pink-500">💬</span>
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-pink-500 mt-1">📍</span>
                <address className="not-italic text-gray-400">
                  {contactInfo.address}
                  <br />
                  <span className="text-sm">(вход со двора)</span>
                </address>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-pink-500">🕒</span>
                <span className="text-gray-400">{contactInfo.workHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© {currentYear} {siteSettings.name}.</p>
              <p>Все права защищены.</p>
            </div>

            <div className="flex space-x-6">
              <span className="text-sm text-gray-500 cursor-default" aria-disabled="true">
                Вопросы и ответы
              </span>
            </div>

            {/* Счетчики и кнопки-соцсети (можно добавить позже) */}
            <div className="flex space-x-2">
              <span className="text-gray-600 text-sm">Сделано с ❤️ в Москве</span>
            </div>
          </div>
        </div>
      </div>

      {/* Схема для LocalBusiness (можно добавить JSON-LD здесь или в layout) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: siteSettings.name,
            image: `${siteSettings.url}/images/salon.jpg`,
            telephone: contactInfo.phoneFormatted,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'ул. Пушкина, д. 10',
              addressLocality: 'Москва',
              addressRegion: 'Москва',
              postalCode: '101000',
              addressCountry: 'RU',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: contactInfo.latitude,
              longitude: contactInfo.longitude,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '10:00',
                closes: '21:00',
              },
            ],
            priceRange: siteSettings.priceRange,
          }),
        }}
      />
    </footer>
  );
}