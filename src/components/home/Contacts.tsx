// Компонент секции контактов на главной
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { contactInfo, siteSettings } from '@/lib/data/site';

// Иконки для соцсетей (можно заменить на SVG-спрайты)
const socialLinks = [
  {
    name: 'Telegram',
    href: `https://t.me/${contactInfo.telegram.replace('@', '')}`,
    icon: '📱',
    color: 'bg-blue-500',
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`,
    icon: '💬',
    color: 'bg-green-500',
  },
  {
    name: 'VKontakte',
    href: 'https://vk.com/spiridonova-nails',
    icon: 'VK',
    color: 'bg-blue-600',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/spiridonova-nails',
    icon: '📷',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
  },
];

// Часы работы по дням
const workingHours = [
  { day: 'Понедельник', hours: '10:00 - 21:00' },
  { day: 'Вторник', hours: '10:00 - 21:00' },
  { day: 'Среда', hours: '10:00 - 21:00' },
  { day: 'Четверг', hours: '10:00 - 21:00' },
  { day: 'Пятница', hours: '10:00 - 21:00' },
  { day: 'Суббота', hours: '11:00 - 20:00' },
  { day: 'Воскресенье', hours: 'Выходной' },
];

export default function Contacts() {
  const [mapError, setMapError] = useState(false);

  // Определяем, открыт ли салон сейчас
  const isOpenNow = () => {
    const now = new Date();
    const day = now.getDay(); // 0 - воскресенье, 1 - понедельник, ...
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 60 + minutes;

    // Понедельник - пятница: 10:00 - 21:00 (600 - 1260 минут)
    if (day >= 1 && day <= 5) {
      return time >= 600 && time <= 1260;
    }
    // Суббота: 11:00 - 20:00 (660 - 1200 минут)
    if (day === 6) {
      return time >= 660 && time <= 1200;
    }
    // Воскресенье: закрыто
    return false;
  };

  const open = isOpenNow();

  return (
    <section
      id="contacts"
      className="py-20 bg-gray-50"
      aria-labelledby="contacts-heading"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
            Контакты
          </span>
          <h2
            id="contacts-heading"
            className="text-3xl md:text-4xl font-bold mt-2 mb-4"
          >
            Как нас найти
          </h2>
          <p className="text-gray-600 text-lg">
            Мы находимся в центре Москвы. Уютная студия с удобной транспортной доступностью.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Контактная информация */}
          <div className="space-y-8">
            {/* Статус работы */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Режим работы</h3>
                <div className="flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-2 ${
                      open ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {open ? 'Открыто сейчас' : 'Закрыто'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {workingHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-600">{item.day}</span>
                    <span className={`font-medium ${
                      item.hours === 'Выходной' ? 'text-red-500' : 'text-gray-900'
                    }`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Контакты */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Связаться с нами</h3>

              <div className="space-y-4">
                {/* Телефон */}
                <a
                  href={`tel:${contactInfo.phoneFormatted}`}
                  className="flex items-center p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Позвоните нам</div>
                    <div className="font-semibold text-lg">{contactInfo.phone}</div>
                  </div>
                </a>

                {/* Адрес */}
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white mr-3">
                    📍
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Адрес студии</div>
                    <div className="font-semibold">{contactInfo.address}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {contactInfo.addressFull}
                    </div>

                    {/* Как добраться */}
                    <div className="mt-3 text-sm">
                      <p className="font-medium text-gray-700 mb-1">Как добраться:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Метро Пушкинская (5 мин пешком)</li>
                        <li>Вход со двора, 3-й подъезд</li>
                        <li>Есть парковка для клиентов</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Социальные сети */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Мы в соцсетях
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity`}
                        aria-label={`Перейти в ${social.name}`}
                      >
                        <span className="text-lg">{social.icon}</span>
                        <span className="text-sm font-medium">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Кнопка записи */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Запишитесь онлайн</h3>
              <p className="text-pink-100 mb-4">
                Заполните форму, и мы подберем удобное время
              </p>
              <Button
                href="/booking"
                variant="primary"
                size="lg"
                className="w-full bg-white text-pink-600 hover:bg-gray-100 border-0"
              >
                Записаться сейчас
              </Button>
            </div>
          </div>

          {/* Карта */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-4 h-[500px] relative">
              <h3 className="text-xl font-semibold mb-4">Мы на карте</h3>

              {!mapError ? (
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?ll=${contactInfo.longitude}%2C${contactInfo.latitude}&z=17&l=map&pt=${contactInfo.longitude}%2C${contactInfo.latitude}%2Cpm2rdl`}
                  width="100%"
                  height="400"
                  className="rounded-lg"
                  allowFullScreen
                  loading="lazy"
                  title="Карта расположения салона"
                  onError={() => setMapError(true)}
                />
              ) : (
                <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p>Карта временно недоступна</p>
                    <p className="text-sm mt-2">{contactInfo.address}</p>
                    <a
                      href={contactInfo.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 mt-4 inline-block"
                    >
                      Открыть в Яндекс.Картах →
                    </a>
                  </div>
                </div>
              )}

              {/* Кнопка построить маршрут */}
              <div className="mt-4">
                <a
                  href={contactInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium"
                >
                  <span className="mr-1">🗺️</span>
                  Построить маршрут в Яндекс.Картах
                </a>
              </div>
            </div>

            {/* Фото студии */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold mb-3">Фото студии</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group cursor-pointer"
                  >
                    <Image
                      src={`/images/studio/studio-${i}.jpg`}
                      alt={`Интерьер салона ${i}`}
                      fill
                      sizes="(max-width: 768px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Микроразметка для LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BeautySalon',
            name: siteSettings.name,
            image: `${siteSettings.url}/images/studio/studio-1.jpg`,
            telephone: contactInfo.phoneFormatted,
            email: 'info@salon-spiridonova-nails.ru',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'ул. Пушкина, д. 10',
              addressLocality: 'Москва',
              postalCode: '101000',
              addressCountry: 'RU',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: contactInfo.latitude,
              longitude: contactInfo.longitude,
            },
            openingHoursSpecification: workingHours
              .filter(item => item.hours !== 'Выходной')
              .map(item => ({
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: item.day,
                opens: item.hours.split(' - ')[0],
                closes: item.hours.split(' - ')[1],
              })),
            sameAs: socialLinks.map(link => link.href),
            priceRange: siteSettings.priceRange,
          }),
        }}
      />
    </section>
  );
}