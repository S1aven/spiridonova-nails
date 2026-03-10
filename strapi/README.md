# Strapi CMS — Спиридонова Nails

Управление услугами и галереей (фото; позже — видео).

## Запуск

```bash
# Установка (уже сделана в корне проекта)
npm install

# Разработка (админка + API на http://localhost:1337)
npm run develop
```

При первом запуске откроется браузер — создайте учётную запись администратора.

## Подключение к Next.js

В корне проекта в `.env` задайте:

```env
STRAPI_URL=http://localhost:1337
```

Перезапустите `npm run dev` в корне. Услуги и галерея будут подтягиваться из Strapi. Без `STRAPI_URL` используется статический контент из кода.

## Контент

- **Content Manager → Services (Услуги)** — название, slug, описание, цена, длительность, категория, изображение, пункты (features), SEO.
- **Content Manager → Gallery Items (Элементы галереи)** — название, категория, описание, медиа (фото; позже можно добавлять видео), порядок (order).

В **Settings → Users & Permissions → Roles → Public** включите для **Service** и **Gallery-item** права **find** и **findOne**, чтобы фронт мог читать данные.

## Продакшен

- Смените в `.env` секреты (`APP_KEYS`, `ADMIN_JWT_SECRET`, `JWT_SECRET` и т.д.).
- Для продакшена лучше использовать PostgreSQL: задайте `DATABASE_CLIENT=postgres` и переменные `DATABASE_*`.
- Медиа можно вынести в Yandex Object Storage (S3-провайдер в Strapi).
