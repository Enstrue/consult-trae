# Адаптивные изображения в проекте

## Обзор

В проекте реализована система адаптивного отображения изображений, которая автоматически управляет видимостью и размерами изображений на разных устройствах (мобильных, планшетах и десктопах).

## Основные особенности

- **Автоматическое применение**: Все изображения на сайте автоматически получают класс `responsive-image`
- **Адаптивное поведение по умолчанию**:
  - На мобильных устройствах (до 768px) изображения скрываются
  - На планшетах и экранах меньше 1024px изображения отображаются с уменьшенным размером (80%)
  - На десктопах (от 1024px) изображения отображаются в полном размере
- **Специальные классы для исключений**:
  - `no-responsive` - изображение не будет обрабатываться системой адаптивных изображений
  - `always-visible` - изображение будет отображаться на всех устройствах

## Компонентные стили

Для разных компонентов реализованы специфические адаптивные стили:

### Hero

```scss
// На мобильных устройствах уменьшаем размер
@include media-breakpoint-down(md) {
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}

// Дополнительные стили для изображений в Hero секции
&.responsive-image {
  box-shadow: 0 10px 25px rgba($primary-color, 0.1);
}
```

### About

```scss
// На мобильных устройствах центрируем и уменьшаем
@include media-breakpoint-down(md) {
  max-width: 85%;
  margin-left: auto;
  margin-right: auto;
}

// Эффект при наведении на десктопах
&.responsive-image {
  transition: transform 0.3s ease;
  
  @include lg {
    &:hover {
      transform: scale(1.03);
    }
  }
}
```

### Cases (логотипы)

```scss
// Логотипы всегда видны
&.responsive-image {
  display: block !important;
}

// Но уменьшаются на мобильных
@include media-breakpoint-down(sm) {
  max-width: 30px;
  max-height: 30px;
}
```

## Как использовать

### Стандартное использование

Ничего делать не нужно! Все изображения автоматически обрабатываются:

```html
<img src="path/to/image.jpg" alt="Описание">
```

### Исключение изображения из адаптивной системы

Добавьте класс `no-responsive`:

```html
<img src="path/to/image.jpg" alt="Описание" class="no-responsive">
```

### Принудительное отображение на всех устройствах

Добавьте класс `always-visible`:

```html
<img src="path/to/image.jpg" alt="Описание" class="always-visible">
```

## Технические детали

### CSS

Основные стили определены в `src/styles/main.scss`:

```scss
img {
  max-width: 100%;
  height: auto;
  
  &.responsive-image {
    display: block;
    
    // На мобильных устройствах скрываем изображения
    @include media-breakpoint-down(md) {
      display: none;
    }
    
    // На планшетах показываем с уменьшенным размером
    @include md {
      display: block;
      max-width: 80%;
      margin: 0 auto;
    }
    
    // На экранах менее 1024px показываем с размером 80%
    @include media-breakpoint-down(lg) {
      max-width: 80%;
      margin: 0 auto;
    }
    
    // На десктопах показываем полностью
    @include lg {
      max-width: 100%;
    }
  }
}
```

### JavaScript

Функционал реализован в `src/components/utils/responsive-images.js`:

```js
export default function initResponsiveImages() {
  // Находим все изображения на странице
  const images = document.querySelectorAll('img:not(.no-responsive)');
  
  // Добавляем класс responsive-image ко всем найденным изображениям
  images.forEach(img => {
    img.classList.add('responsive-image');
  });
  
  // Функция для проверки видимости изображений на мобильных устройствах
  function checkImagesVisibility() {
    const isMobile = window.innerWidth < 768; // Соответствует breakpoint-md
    
    // Находим все изображения с классом responsive-image
    const responsiveImages = document.querySelectorAll('.responsive-image');
    
    // Устанавливаем атрибут loading="lazy" для отложенной загрузки
    responsiveImages.forEach(img => {
      // Добавляем атрибут loading="lazy" для оптимизации загрузки
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Если изображение имеет класс 'always-visible', оно будет отображаться на всех устройствах
      if (img.classList.contains('always-visible')) {
        img.style.display = 'block';
      }
    });
  }
  
  // Вызываем функцию при загрузке страницы и при изменении размера окна
  checkImagesVisibility();
  window.addEventListener('resize', checkImagesVisibility);
}
```

## Рекомендации

1. Для критически важных изображений используйте класс `always-visible`
2. Для декоративных изображений позвольте системе управлять их отображением
3. Для оптимизации производительности все изображения автоматически получают атрибут `loading="lazy"`
4. При необходимости добавьте специфические стили для изображений в SCSS файлах компонентов