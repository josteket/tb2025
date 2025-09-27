# ООО «Титаны будущего» — футуристичный сайт

Продакшн-проект корпоративного сайта на Next.js 14 (App Router) с акцентом на футуристичный дизайн, 3D-графику и плавные анимации.

## Технологический стек

- **Next.js 14 (App Router)** + **TypeScript**
- **Tailwind CSS** + кастомные токены темы
- **shadcn/ui** (Button, Card, Badge, Dialog) на базе Radix UI
- **Framer Motion** для микро-анимаций, **GSAP + ScrollTrigger** для скролл-таймлайнов
- **Three.js + react-three-fiber + drei + postprocessing** — 3D-сцена шлема
- **Lucide-react** — иконки
- Шрифты **Inter** и **JetBrains Mono** через `next/font`

## Быстрый старт

### Требования

- Node.js >= 18.17
- pnpm >= 8 (рекомендуется для повторяемых сборок)

### Установка и запуск

```bash
pnpm install
pnpm dev          # запуск в режиме разработки
pnpm build        # сборка продакшн-версии
pnpm start        # запуск готовой сборки
```

После запуска разработческого сервера проект доступен на `http://localhost:3000`.

## Структура проекта

```
app/
  layout.tsx      # шрифты, общие метаданные, базовые компоненты
  page.tsx        # корневой роут, подключает PageClient
components/
  Hero.tsx, About.tsx, Cases.tsx, Contacts.tsx
  HeroCanvas.tsx  # Three.js сцена шлема и частицы
  Header.tsx, Footer.tsx, GridBackdrop.tsx, ScrollProgress.tsx, Preloader.tsx, CursorTrail.tsx
  CaseCard.tsx, ContactCard.tsx, SectionHeading.tsx, StatPill.tsx
  ui/             # шадсн-компоненты (button, card, badge, dialog)
data/
  cases.ts        # массив демо-кейсов
lib/
  animations.ts   # инициализация GSAP ScrollTrigger и счётчиков
  featureFlags.ts # фиче-флаги для лёгкого режима
  utils.ts        # утилита cn
public/
  placeholder.svg # универсальная текстовая заглушка изображений
  favicon.ico     # текстовая заглушка под реальный фавикон
  robots.txt, sitemap.xml
styles/
  globals.css     # Tailwind + глобальные эффекты (glassmorphism, glow)
```

## Как добавить ассеты

1. **Изображения и иконки**: положите реальные файлы (PNG/JPG/SVG и т.д.) в директорию `public/` и обновите пути в компонентах, заменив `/placeholder.svg` на нужные URL. Это касается логотипов, обложек кейсов, карты и open graph превью.
2. **3D-модели**: поместите GLB/GLTF или другие модели в `public/models/` и обновите компонент `HeroCanvas`, заменив процедурную геометрию на загрузку модели. В коде оставлен комментарий «Заменить на реальный GLB в public/models/».
3. **Favicon**: замените текстовый файл `public/favicon.ico` на настоящий фавикон (ICO или совместимый формат), после чего обновите метаданные при необходимости.

## Контент и локализация

Вся текстовая информация находится в компонентах и `data/cases.ts`. Для добавления нового кейса добавьте объект в массив `cases` со структурой:

```ts
{
  title: string;
  summary: string;
  result: string;
  tags: string[];
  image: string;      // путь к изображению в /public
  description: string;
}
```

Компонент `Cases` автоматически подтянет новые элементы.

## Настройка анимаций и производительности

В `lib/featureFlags.ts` определены флаги, которые автоматически учитывают системный `prefers-reduced-motion` и позволяют вручную управлять визуальными эффектами:

```ts
export const featureFlags = {
  enablePostProcessing: true, // bloom + хром. аберрация в 3D-сцене
  enableCursorTrail: true,    // неоновый шлейф за курсором (desktop)
  enableParticles: true,      // частицы фона и 3D-хвост
  enableScrollAnimations: true // GSAP ScrollTrigger
};
```

Чтобы форсировать «лёгкий» режим (например, на слабых устройствах), замените значения на `false` или добавьте собственную логику определения в этом файле.

Дополнительно:

- Компоненты Three.js и CursorTrail грузятся динамически (`ssr: false`), чтобы не нагружать SSR.
- GSAP и ScrollTrigger импортируются лениво при первом рендере клиента.

## Оптимизация и Lighthouse

- Разметка доступна: aria-атрибуты, фокус-стили, контраст ≥ 4.5:1.
- Изображения оптимизируются через `next/image` и адаптивные размеры.
- Хэдер фиксированный с динамической подложкой, есть кнопка «Наверх» с прогрессом.
- Прелоадер отключается автоматически через 1.8 сек и не блокирует навигацию.

## Режим для малопроизводительных устройств

1. Системная настройка `prefers-reduced-motion` автоматически отключает пост-эффекты, частицы и ScrollTrigger.
2. Для ручного переключения измените значения в `featureFlags` или подключите свой детектор (например, проверку FPS).

## Деплой на Vercel

1. Создайте новый проект на [vercel.com](https://vercel.com/).
2. Подключите репозиторий и выберите фреймворк **Next.js**.
3. Переменные окружения не требуются.
4. После деплоя обновите `metadataBase`, `robots.txt` и `sitemap.xml`, указав финальный домен (например, `https://example.com`).

## Дополнительные заметки

- Все компоненты сейчас используют `/placeholder.svg` как универсальную заглушку. После добавления реальных ассетов обновите пути в JSX и данных.
- 3D-шлем — процедурная low-poly модель. Чтобы подключить полноценный GLB-файл, замените компонент `Helmet` в `HeroCanvas.tsx` на загрузку модели через `useGLTF` из `@react-three/drei` (см. комментарий в коде).
- Для кастомизации палитры отредактируйте CSS-переменные в `styles/globals.css`.

Готово! 🎯
