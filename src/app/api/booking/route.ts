import { NextResponse } from 'next/server';
import { getAllServices } from '@/lib/data/services';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, date, time, name, phone, comment } = body;

    // Валидация с русскими сообщениями для пользователя
    if (!service || !date || !time || !name || !phone) {
      return NextResponse.json(
        { error: 'Заполните все обязательные поля' }, // ← Изменено на русский
        { status: 400 }
      );
    }

    // Дополнительная валидация телефона (простая проверка)
    const phoneRegex = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Неверный формат телефона' },
        { status: 400 }
      );
    }

    // Дополнительная валидация имени
    if (name.length < 2) {
      return NextResponse.json(
        { error: 'Имя должно содержать минимум 2 символа' },
        { status: 400 }
      );
    }

    const services = getAllServices();
    const selectedService = services.find(s => s.id === service);

    if (!selectedService) {
      return NextResponse.json(
        { error: 'Выбранная услуга не найдена' },
        { status: 400 }
      );
    }

    const message = `
🔔 Новая запись!
      
👤 Имя: ${name}
📞 Телефон: ${phone}
💅 Услуга: ${selectedService?.name} (${selectedService?.price} ₽)
📅 Дата: ${date}
⏰ Время: ${time}
💬 Комментарий: ${comment || 'Нет'}
    `;

    // Отправка в Telegram
    try {
      const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
      const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

      if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        });
        console.log('✅ Telegram notification sent');
      } else {
        console.log('⚠️ Telegram credentials not configured');
      }
    } catch (telegramError) {
      // Логируем ошибку Telegram, но не прерываем выполнение
      console.error('❌ Failed to send Telegram notification:', telegramError);
    }

    // Здесь можно добавить отправку email
    // ...

    console.log('✅ Booking received:', message);

    return NextResponse.json(
      {
        success: true,
        message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', // ← Русское сообщение
        data: { name, phone, date, time }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Booking error:', error);

    // Определяем тип ошибки
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Неверный формат данных' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.' }, // ← Русское сообщение
      { status: 500 }
    );
  }
}

// GET для проверки доступных слотов
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Дата не указана' },
        { status: 400 }
      );
    }

    // TODO: Здесь нужно проверить занятые слоты в этот день
    // Например, из базы данных или внешнего API

    // Временная заглушка - все слоты свободны
    const availableTimes = [
      '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
    ];

    return NextResponse.json({
      success: true,
      date,
      available: true,
      availableTimes,
      message: 'Доступное время на выбранную дату',
    });

  } catch (error) {
    console.error('❌ Error checking availability:', error);
    return NextResponse.json(
      { error: 'Ошибка при проверке доступности' },
      { status: 500 }
    );
  }
}
