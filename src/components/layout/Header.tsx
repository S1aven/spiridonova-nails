'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { siteSettings } from '@/lib/data/site';

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Услуги', href: '/services' },
  { name: 'Портфолио', href: '/gallery' },
  { name: 'О мастере', href: '/about' },
  { name: 'Контакты', href: '/#contacts' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hash, setHash] = useState(''); // Состояние для хранения hash
  const pathname = usePathname();
  const router = useRouter();

  // Получаем hash только на клиенте
  useEffect(() => {
    setHash(window.location.hash);
  }, []); // Пустой массив зависимостей - выполняется только один раз при монтировании

  // Обновляем hash при изменении URL
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, anchor] = href.split('#');

    if (anchor) {
      e.preventDefault();

      if (path === '' || path === pathname) {
        // Плавный скролл к элементу
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          // Обновляем URL без перезагрузки
          window.history.pushState({}, '', `#${anchor}`);
        }
      } else {
        router.push(`${path}#${anchor}`);
      }
    }
  };

  useEffect(() => {
    if (window.location.hash) {
      const anchor = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Функция для определения активного пункта меню
  const isActiveLink = (itemHref: string) => {
    if (itemHref === pathname) return true;

    if (itemHref.includes('#')) {
      const [path, anchor] = itemHref.split('#');
      // Если мы на главной и hash совпадает
      if (pathname === '/' && hash === `#${anchor}`) return true;
      // Если мы на той же странице и hash совпадает
      if (path === pathname && hash === `#${anchor}`) return true;
    }

    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-4" aria-label="Главная навигация">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link
            href="/"
            className="relative z-10 flex items-center space-x-2"
            aria-label={siteSettings.name}
          >
            <div className="relative w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <span className={`font-bold text-xl hidden sm:block ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              {siteSettings.shortName}
            </span>
          </Link>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const hasHash = item.href.includes('#');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => hasHash && handleNavigation(e, item.href)}
                  className={`font-medium transition-colors hover:text-pink-500 cursor-pointer ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  } ${
                    isActiveLink(item.href) ? 'text-pink-500' : ''
                  }`}
                  aria-current={isActiveLink(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Кнопка записи и мобильное меню */}
          <div className="flex items-center space-x-4">
            <Button
              href="/booking"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Записаться онлайн
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 block w-6 h-0.5 transition-all duration-300 ${
                    isScrolled ? 'bg-gray-800' : 'bg-white'
                  } ${
                    isMenuOpen
                      ? 'top-2 rotate-45'
                      : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 block w-6 h-0.5 transition-all duration-300 ${
                    isScrolled ? 'bg-gray-800' : 'bg-white'
                  } ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block w-6 h-0.5 transition-all duration-300 ${
                    isScrolled ? 'bg-gray-800' : 'bg-white'
                  } ${
                    isMenuOpen
                      ? 'top-2 -rotate-45'
                      : 'top-4'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        <div
          className={`fixed inset-0 bg-white z-0 transition-transform duration-300 md:hidden ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ top: '64px' }}
        >
          <div className="flex flex-col h-full p-8 pt-8">
            <nav className="flex flex-col space-y-6" aria-label="Мобильная навигация">
              {navigation.map((item) => {
                const hasHash = item.href.includes('#');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (hasHash) handleNavigation(e, item.href);
                      setIsMenuOpen(false);
                    }}
                    className={`text-2xl font-semibold transition-colors hover:text-pink-500 ${
                      isActiveLink(item.href) ? 'text-pink-500' : 'text-gray-800'
                    }`}
                    aria-current={isActiveLink(item.href) ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pb-12">
              <Button
                href="/booking"
                variant="primary"
                size="lg"
                className="w-full mb-4"
              >
                Записаться онлайн
              </Button>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-2">Звоните, мы онлайн</p>
                <a
                  href="tel:+79001234567"
                  className="text-xl font-semibold text-pink-500 hover:text-pink-600"
                >
                  +7 (900) 123-45-67
                </a>
                <p className="text-sm text-gray-500 mt-4">
                  Ежедневно с 10:00 до 21:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Оверлей для мобильного меню */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-0 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}