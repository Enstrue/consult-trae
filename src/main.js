// Импорт стилей
import './styles/main.scss'

// Импорт компонентов
import initHeader from './components/Header/header.js'
import initHero from './components/Hero/hero.js'
import initAbout from './components/About/about.js'
import initServices from './components/Services/services.js'
import initCases from './components/Cases/cases.js'
import initCTA from './components/CTA/cta.js'
import initContactForm from './components/ContactForm/contact-form.js'
import initFooter from './components/Footer/footer.js'

// Импорт утилит
import initResponsiveImages from './components/utils/responsive-images.js'

// Импорт библиотеки для плавной прокрутки
import SmoothScroll from 'smooth-scroll'

// Загрузка HTML компонентов
const loadComponents = async () => {
  try {
    // Загрузка HTML шаблонов компонентов
    const headerHTML = await import('./components/Header/header.html?raw')
    const heroHTML = await import('./components/Hero/hero.html?raw')
    const aboutHTML = await import('./components/About/about.html?raw')
    const servicesHTML = await import('./components/Services/services.html?raw')
    const casesHTML = await import('./components/Cases/cases.html?raw')
    const ctaHTML = await import('./components/CTA/cta.html?raw')
    const contactFormHTML = await import('./components/ContactForm/contact-form.html?raw')
    const footerHTML = await import('./components/Footer/footer.html?raw')
    
    // Вставка компонентов в DOM
    document.querySelector('#app').innerHTML = `
      ${headerHTML.default}
      <main>
        ${heroHTML.default}
        ${aboutHTML.default}
        ${servicesHTML.default}
        ${casesHTML.default}
        ${ctaHTML.default}
        ${contactFormHTML.default}
      </main>
      ${footerHTML.default}
    `
    
    // Инициализация компонентов после загрузки DOM
    initHeader()
    initHero()
    initAbout()
    initServices()
    initCases()
    initCTA()
    initContactForm()
    initFooter()
    
    // Инициализация адаптивных изображений
    initResponsiveImages()
    
    // Инициализация плавной прокрутки
    new SmoothScroll('a[href*="#"]', {
      speed: 400, // Уменьшенная скорость для более быстрой анимации
      speedAsDuration: true,
      easing: 'easeInOutCubic', // Добавление плавности анимации
      offset: 80 // Отступ для учета фиксированного хедера
    })
    
    console.log('Все компоненты успешно загружены')
  } catch (error) {
    console.error('Ошибка при загрузке компонентов:', error)
  }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', loadComponents)
