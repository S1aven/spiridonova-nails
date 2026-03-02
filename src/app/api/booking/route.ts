import { NextResponse } from 'next/server';
import { getAllServices } from '@/lib/data/services';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, date, time, name, phone, comment } = body;

    // Валидация
    if (!service || !date || !time || !name || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Здесь должна быть интеграция с CRM/email/telegram
    // Например, отправка в Telegram:

    const services = getAllServices();
    const selectedService = services.find(s => s.id === service);

    const message = `
🔔 Новая запись!
      
👤 Имя: ${name}
📞 Телефон: ${phone}
💅 Услуга: ${selectedService?.name} (${selectedService?.price} ₽)
📅 Дата: ${date}
⏰ Время: ${time}
💬 Комментарий: ${comment || 'Нет'}
    `;

    // Отправка в Telegram (раскомментируй и добавь свои токены)
    /*
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
    */

    // Отправка email (пример с nodemailer)
    // Здесь можно добавить отправку на почту

    console.log('Booking received:', message);

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        data: { name, phone, date, time }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Опционально: GET для проверки доступных слотов
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  // Здесь можно проверить занятые слоты в этот день
  // И вернуть доступное время

  return NextResponse.json({
    available: true,
    message: 'Endpoint for checking availability',
  });
}