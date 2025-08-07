/**
 * Utility function to make images responsive
 * Adds the responsive-image class to all images on the site
 * Excludes images that have the 'no-responsive' class
 */

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
  
  // Вызываем функцию при загрузке страницы
  checkImagesVisibility();
  
  // Вызываем функцию при изменении размера окна
  window.addEventListener('resize', checkImagesVisibility);
}