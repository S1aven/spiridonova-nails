'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { contactInfo } from '@/lib/data/site';
import { format, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { Service } from '@/types';

interface BookingFormData {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  comment?: string;
}

const availableTimes = [
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = addDays(today, i);
    dates.push(date);
  }
  return dates;
};

interface BookingWidgetProps {
  services: Service[];
}

export default function BookingWidget({ services }: BookingWidgetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableDates = generateAvailableDates();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<BookingFormData>({
    mode: 'onChange',
    defaultValues: {
      service: '',
      date: '',
      time: '',
      name: '',
      phone: '',
      comment: '',
    },
  });

  const watchedService = watch('service');

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setError(null); // Сбрасываем ошибку перед отправкой

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(result.error || 'Произошла ошибка при отправке');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError('Ошибка сети. Проверьте подключение и попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50"
      aria-labelledby="booking-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-10">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
              Онлайн-запись
            </span>
            <h2
              id="booking-heading"
              className="text-3xl md:text-4xl font-bold mt-2 mb-4"
            >
              Запишитесь на удобное время
            </h2>
            <p className="text-gray-600 text-lg">
              Выберите услугу, дату и время, и мы подтвердим запись в течение 15 минут
            </p>
          </div>

          {/* Успешная отправка */}
          {isSuccess && (
            <Card className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 animate-fade-in">
              <p className="font-semibold">✓ Заявка отправлена!</p>
              <p className="text-sm">Мы свяжемся с вами в ближайшее время</p>
            </Card>
          )}

          {/* Ошибка отправки */}
          {error && (
            <Card className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 animate-fade-in">
              <p className="font-semibold">✗ Ошибка!</p>
              <p className="text-sm">{error}</p>
            </Card>
          )}

          {/* Форма записи - Card */}
          <Card shadow="lg" className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Выбор услуги */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Выберите услугу <span className="text-pink-500">*</span>
                  </label>
                  <select
                    id="service"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.service ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                    {...register('service', {
                      required: 'Выберите услугу'
                    })}
                  >
                    <option value="">-- Выберите услугу --</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} — {service.price} ₽ ({service.duration} мин)
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.service.message}
                    </p>
                  )}
                </div>

                {/* Выбор даты */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Дата <span className="text-pink-500">*</span>
                  </label>
                  <select
                    id="date"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.date ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                    {...register('date', {
                      required: 'Выберите дату'
                    })}
                  >
                    <option value="">-- Выберите дату --</option>
                    {availableDates.map((date) => (
                      <option key={date.toISOString()} value={format(date, 'yyyy-MM-dd')}>
                        {format(date, 'dd MMMM yyyy', { locale: ru })}
                      </option>
                    ))}
                  </select>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                {/* Выбор времени */}
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Время <span className="text-pink-500">*</span>
                  </label>
                  <select
                    id="time"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.time ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                    {...register('time', {
                      required: 'Выберите время'
                    })}
                  >
                    <option value="">-- Выберите время --</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.time.message}
                    </p>
                  )}
                </div>

                {/* Имя */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ваше имя <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Анна"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                    {...register('name', {
                      required: 'Введите имя',
                      minLength: {
                        value: 2,
                        message: 'Имя должно содержать минимум 2 символа'
                      },
                      pattern: {
                        value: /^[а-яА-ЯёЁa-zA-Z\s-]+$/,
                        message: 'Имя может содержать только буквы, пробелы и дефис'
                      }
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Телефон */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Телефон <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+7 (900) 123-45-67"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                    {...register('phone', {
                      required: 'Введите телефон',
                      pattern: {
                        value: /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
                        message: 'Введите корректный номер телефона'
                      }
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Комментарий */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Комментарий
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    placeholder="Пожелания по дизайну, аллергии и т.д."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    {...register('comment')}
                  />
                </div>
              </div>

              {/* Информация о выбранной услуге */}
              {watchedService && (
                <Card className="mt-6 p-4 bg-pink-50 border border-pink-100">
                  <h3 className="font-semibold text-pink-800 mb-2">
                    Информация о записи:
                  </h3>
                  {services.find(s => s.id === watchedService) && (
                    <p className="text-sm text-pink-700">
                      ⏱ Длительность: {services.find(s => s.id === watchedService)?.duration} мин<br />
                      💅 Мастер: Любовь (стаж 7 лет)
                    </p>
                  )}
                </Card>
              )}

              {/* Кнопка отправки */}
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Отправка...
                    </span>
                  ) : (
                    'Записаться'
                  )}
                </Button>
              </div>

              {/* Юридическая информация */}
              <p className="text-xs text-gray-500 text-center mt-4">
                Нажимая кнопку «Записаться», вы соглашаетесь с
                <Link href="/privacy" className="text-pink-500 hover:text-pink-600 mx-1">
                  политикой конфиденциальности
                </Link>
                и
                <Link href="/offer" className="text-pink-500 hover:text-pink-600 ml-1">
                  договором оферты
                </Link>
              </p>
            </form>

            {/* Альтернативные способы связи */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-3">
                Или свяжитесь с нами напрямую:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${contactInfo.phoneFormatted}`}
                  className="flex items-center text-sm text-gray-700 hover:text-pink-500 transition-colors"
                >
                  <span className="mr-1">📞</span>
                  {contactInfo.phone}
                </a>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-gray-700 hover:text-pink-500 transition-colors"
                >
                  <span className="mr-1">💬</span>
                  WhatsApp
                </a>
                <a
                  href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-gray-700 hover:text-pink-500 transition-colors"
                >
                  <span className="mr-1">📱</span>
                  Telegram
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}