'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { siteSettings, contactInfo } from '@/lib/data/site';

// Статистика для привлечения внимания
const stats = [
  { label: 'Довольных клиентов', value: '500+' },
  { label: 'Лет опыта', value: '7' },
  { label: 'Работ в портфолио', value: '1000+' },
  { label: 'Средний рейтинг', value: '4.9' },
];

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Предзагрузка важных ссылок для ускорения навигации
  useEffect(() => {
    const prefetchLinks = ['/services', '/booking', '/gallery'];
    prefetchLinks.forEach((link) => {
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.href = link;
      document.head.appendChild(prefetchLink);
    });
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Главный экран с предложением услуг"
    >
      {/* Фоновое изображение / видео */}
      <div className="absolute inset-0 z-0">
        {/* Затемнение для лучшей читаемости текста */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Фоновое изображение (можно заменить на видео) */}
        <Image
          src="/images/hero/hero-bg.jpg" // Добавь свое изображение
          alt="Интерьер салона красоты"
          fill
          priority
          quality={90}
          className="object-cover"
          onLoadingComplete={() => setIsVideoLoaded(true)}
        />

        {/* Микроразметка для изображения */}
        <meta itemProp="image" content="/images/hero/hero-bg.jpg" />
      </div>

      {/* Основной контент */}
      <div className="container relative z-20 px-4 mx-auto text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Бейдж с акцией */}
          <div className="inline-flex items-center bg-pink-500/20 backdrop-blur-sm border border-pink-400/50 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            <span className="text-sm font-medium text-pink-100">
              🔥 Первое посещение — скидка 10%
            </span>
          </div>

          {/* Заголовок H1 (самый важный для SEO) */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
            Салон красоты{' '}
            <span className="text-pink-400">{siteSettings.shortName}</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-gray-200 font-light">
              Маникюр и педикюр в центре Москвы
            </span>
          </h1>

          {/* Подзаголовок H2 */}
          <h2 className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Профессиональный уход за ногтями с душой.
            Стерильные инструменты, премиальные материалы, опытный мастер.
          </h2>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              href="/booking"
              variant="primary"
              size="lg"
              className="shadow-lg shadow-pink-500/30 hover:shadow-pink-500/40 transform hover:-translate-y-0.5 transition-all"
            >
              Записаться онлайн
              <span className="ml-2" aria-hidden="true">→</span>
            </Button>

            <Button
              href="/services"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Посмотреть услуги
            </Button>
          </div>

          {/* Быстрые контакты */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-16">
            <a
              href={`tel:${contactInfo.phoneFormatted}`}
              className="flex items-center hover:text-pink-300 transition-colors group"
              aria-label="Позвонить нам"
            >
              <span className="bg-white/20 rounded-full p-2 mr-2 group-hover:bg-pink-500/30 transition-colors">
                📞
              </span>
              {contactInfo.phone}
            </a>

            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-pink-300 transition-colors group"
              aria-label="Написать в WhatsApp"
            >
              <span className="bg-white/20 rounded-full p-2 mr-2 group-hover:bg-pink-500/30 transition-colors">
                💬
              </span>
              WhatsApp
            </a>

            <a
              href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-pink-300 transition-colors group"
              aria-label="Написать в Telegram"
            >
              <span className="bg-white/20 rounded-full p-2 mr-2 group-hover:bg-pink-500/30 transition-colors">
                📱
              </span>
              {contactInfo.telegram}
            </a>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-pink-300 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Кнопка скролла вниз */}
      <button
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
          });
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/70 hover:text-white transition-colors animate-bounce"
        aria-label="Прокрутить вниз"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7-7-7m14-6l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Стили для анимаций */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      {/* Микроразметка для Hero секции */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'OfferCatalog',
            name: 'Основные услуги салона',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Маникюр',
                  description: 'Классический и аппаратный маникюр с покрытием',
                },
                price: 'от 2000',
                priceCurrency: 'RUB',
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Педикюр',
                  description: 'Комплексный уход за стопами',
                },
                price: 'от 3000',
                priceCurrency: 'RUB',
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Дизайн ногтей',
                  description: 'Эксклюзивный дизайн любой сложности',
                },
                price: 'от 500',
                priceCurrency: 'RUB',
              },
            ],
          }),
        }}
      />
    </section>
  );
}