# Спиридонова Nails

Сайт студии ногтевого сервиса **Спиридонова Nails** — маникюр, педикюр и дизайн ногтей в центре Москвы. Онлайн-запись, галерея работ, описание услуг и контакты.

## Стек

- **Next.js 16** (App Router)
- **React 19**, **TypeScript**
- **Tailwind CSS 4**
- **next-sitemap** — генерация sitemap после сборки

## Запуск

```bash
# установка зависимостей
npm install

# режим разработки (http://localhost:3000)
npm run dev

# сборка для production
npm run build

# запуск production-сервера
npm start
```

Дополнительно: `npm run lint` — проверка линтером.

## Структура проекта

- `src/app/` — страницы (главная, услуги, галерея) и layout
- `src/components/` — компоненты (Hero, Header, Footer, блоки услуг и контактов)
- `src/lib/` — данные салона, SEO-схемы (JSON-LD), утилиты
- `src/types/` — типы TypeScript
- `public/` — статика (изображения, favicon, manifest)

## Деплой

Сборка: `npm run build`. После сборки автоматически генерируется sitemap (`postbuild: next-sitemap`).

Удобно деплоить на [Vercel](https://vercel.com) (Next.js) или любой хостинг с поддержкой Node.js.

## Лицензия

Приватный проект.

---

## Первый пуш на удалённый репозиторий

1. **Убрать из индекса Git папки IDE** (если они уже коммитились):
   ```bash
   git rm -r --cached .idea 2>/dev/null
   git rm -r --cached .vscode 2>/dev/null
   ```
   В Git Bash и на Windows используйте `2>/dev/null`, иначе `2>nul` может создать файл `nul` в папке проекта.

2. **Закоммитить изменения** (в т.ч. обновлённые `.gitignore` и `README.md`):
   ```bash
   git add .gitignore README.md
   git add .
   git status
   git commit -m "chore: обновлён .gitignore и README, подготовка к пушу"
   ```

3. **Подключить удалённый репозиторий и отправить код**:
   ```bash
   git remote add origin https://github.com/ВАШ_ЛОГИН/spiridonova_nails_cursor.git
   git branch -M main
   git push -u origin main
   ```
   Или по SSH: `git@github.com:ВАШ_ЛОГИН/spiridonova_nails_cursor.git`. Имя репозитория замените на своё.
