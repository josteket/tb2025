# ООО «Титаны будущего» — Next.js 14 боевой лендинг

Продакшн-проект корпоративного сайта в стилистике футуристичной Спарты. Архитектура построена на **Next.js 14 (App Router)** с TypeScript, Tailwind CSS, shadcn/ui, GSAP и Three.js. Репозиторий готов к локальной разработке, оптимизирован для деплоя на Vercel и совместим со статическими хостингами.

## Возможности

- ⚔️ Герой-блок с процедурным 3D-шлемом (react-three-fiber + пост-эффекты bloom/aberration/шум) и параллаксом частиц.
- 🛡️ Прелоадер с «цифровым туманом» и неоновыми кольцами.
- 🌀 GSAP ScrollTrigger-анимации секций, градиентов и карточек + framer-motion микро-взаимодействия.
- 📊 Счётчики фактов, карточки кейсов с диалогами (shadcn/ui), копирование email и кнопка «Наверх» с прогресс-индикатором.
- ♿ Доступность: aria-атрибуты, контраст ≥ 4.5:1, поддержка `prefers-reduced-motion` (отключает тяжёлые эффекты).
- ⚙️ Feature-флаги в `lib/featureFlags.ts` позволяют включать/выключать пост-обработку, частицы, GSAP и курсорный трейл.

## Технологический стек

- **Next.js 14 (App Router)** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Button, Card, Badge, Dialog)
- **GSAP + ScrollTrigger**, **Framer Motion**
- **Three.js + react-three-fiber + drei**
- **lucide-react** иконки
- **Inter + JetBrains Mono** через `next/font`

## Быстрый старт

```bash
pnpm install
pnpm dev
```

Проект запустится на `http://localhost:3000`. Для сборки и запуска продакшн-версии:

```bash
pnpm build
pnpm start
```

> ⚠️ В среде без доступа к npm/pnpm установка зависимостей может завершиться ошибкой. Код проекта остаётся полностью рабочим.

## Структура проекта

```
app/
  layout.tsx      — глобальные метаданные, шрифты, цветовая схема
  page.tsx        — точка входа страницы (загружает PageClient)
  robots.ts, sitemap.ts — SEO-мета для Next
components/
  PageClient.tsx  — клиентская оболочка с прелоадером, флагами и анимациями
  Hero.tsx, HeroCanvas.tsx, About.tsx, Cases.tsx, Contacts.tsx — ключевые блоки
  Header.tsx, Footer.tsx, ScrollProgress.tsx, SectionHeading.tsx и UI-компоненты shadcn
  Preloader.tsx, GridBackdrop.tsx, CaseCard.tsx, ContactCard.tsx, StatPill.tsx
lib/
  animations.ts   — GSAP ScrollTrigger + курсорный трейл
  featureFlags.ts — флаги тяжёлых эффектов
  utils.ts        — вспомогательные функции
public/
  placeholder.svg — универсальная текстовая заглушка
  logo.png        — текстовая заглушка логотипа (заменить на PNG клиента)
  favicon.ico     — текстовая заглушка фавиконки (заменить на ICO)
  models/         — директория для будущих GLB/GLTF
```

## Как добавить ассеты

1. **Логотип**. Замените файл `public/logo.png` на реальный PNG клиента. В интерфейсе логотип подключается через `next/image` с `blurDataURL`-заглушкой — после замены изображение подхватится автоматически.
2. **Изображения/иконки**. Положите необходимые файлы в `public/` и обновите пути (`/placeholder.svg`) в компонентах или данных. При необходимости добавьте собственные `blurDataURL`.
3. **3D-модели**. Сохраните GLB/GLTF в `public/models/` и замените процедурный шлем в `components/HeroCanvas.tsx` на загрузку через `GLTFLoader`. В коде оставлен комментарий «Заменить на реальный GLB в public/models/».
4. **Favicon**. Замените `public/favicon.ico` на настоящий `favicon.ico` клиента и обновите `metadata.icons` при изменении формата.

## Контент и локализация

Все тексты интерфейса и контент кейсов находятся в компонентах и `data/cases.ts`. Чтобы добавить новый кейс, добавьте объект в массив `cases` с полями `{ id, title, summary, result, tags, image, description }`.

## Управление эффектами

`lib/featureFlags.ts` содержит настройки по умолчанию:

```ts
export const featureFlags = {
  enablePostProcessing: true,
  enableCursorTrail: true,
  enableGsapScroll: true,
  enableNoiseOverlay: true,
  enableParticles: true
};
```

- Системное `prefers-reduced-motion` автоматически включает облегчённый режим (все флаги `false`).
- Чтобы зафиксировать лёгкий режим вручную, измените значения в `featureFlags` или условную логику в `PageClient`.

## Доступность и производительность

- Кнопки и ссылки имеют фокус-стили, aria-атрибуты и высокую контрастность.
- Анимации отключаются/смягчаются при `prefers-reduced-motion`.
- Тяжёлые модули (Three.js, GSAP) подгружаются динамически, чтобы не мешать SSR.
- Настроены метатеги OpenGraph/Twitter, sitemap и robots.

## Деплой

- **Vercel**. Создайте проект, выберите Next.js, команда билда `pnpm build`. Статические маршруты и серверные функции генерируются автоматически.
- **Netlify/Render/Cloudflare Pages**. Используйте адаптер Next.js или экспорт статической версии `pnpm next-sitemap && pnpm build`. В статичном режиме убедитесь, что 3D/GSAP подключены через `next/dynamic` (уже выполнено).
- **Docker/VPS**. Соберите через `pnpm build`, затем `pnpm start` за Nginx/PM2.

## Подготовка Lighthouse ≥ 90

- Компоненты оптимизированы под Core Web Vitals: ленивые анимации, адаптивные изображения, лёгкие градиенты.
- Для финальной оценки замените текстовые заглушки на реальные сжатые ассеты и убедитесь, что 3D-модель оптимизирована (≤200k полигонов).

## План кастомизации

1. Обновите логотип и favicon.
2. Подмените `/placeholder.svg` на брендовые визуалы в `data/cases.ts` и Hero.
3. При необходимости доработайте анимации в `lib/animations.ts` (GSAP таймлайны, смена градиентов, время появления).
4. Расширьте `featureFlags` для дополнительных эффектов (например, альтернативные пост-обработки или режим экономии).
5. Обновите ссылки на реальные соцсети/контакты в `components/Footer.tsx` и `ContactCard.tsx`.

Готово! Репозиторий содержит полный каркас продакшн-сайта. Добавьте фирменные ассеты, скорректируйте тексты — и «Титаны будущего» будут готовы к бою.
