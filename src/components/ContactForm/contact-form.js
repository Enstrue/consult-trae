// ContactForm component functionality
import axios from 'axios';

export default function initContactForm() {
  const contactForm = document.querySelector('.contact-form__form');
  const formStatus = document.querySelector('.contact-form__status');
  
  // Инициализация модального окна для оплаты
  initPaymentModal();
  
  if (contactForm) {
    // Form validation
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formDataObj = Object.fromEntries(formData.entries());
      
      // Basic validation
      let isValid = true;
      const errors = [];
      
      // Name validation
      if (!formDataObj.name || formDataObj.name.trim() === '') {
        isValid = false;
        errors.push('Пожалуйста, введите ваше имя');
        highlightField(contactForm.querySelector('[name="name"]'), true);
      } else {
        highlightField(contactForm.querySelector('[name="name"]'), false);
      }
      
      // Contact validation (email or phone)
      if (!formDataObj.email || !isValidEmail(formDataObj.email)) {
        isValid = false;
        errors.push('Пожалуйста, введите корректный email');
        highlightField(contactForm.querySelector('[name="email"]'), true);
      } else {
        highlightField(contactForm.querySelector('[name="email"]'), false);
      }
      
      // Phone validation (optional)
      if (formDataObj.phone && !isValidPhone(formDataObj.phone)) {
        isValid = false;
        errors.push('Пожалуйста, введите корректный номер телефона');
        highlightField(contactForm.querySelector('[name="phone"]'), true);
      } else {
        highlightField(contactForm.querySelector('[name="phone"]'), false);
      }
      
      // If form is valid, submit it
      if (isValid) {
        // Show loading state
        formStatus.textContent = 'Отправка...';
        formStatus.classList.add('contact-form__status--loading');
        formStatus.classList.remove('contact-form__status--error', 'contact-form__status--success');
        
        try {
          // In a real project, you would send the data to a server
          // For demo purposes, we'll simulate a successful submission
          // await axios.post('/api/contact', formDataObj);
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Show success message
          formStatus.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
          formStatus.classList.add('contact-form__status--success');
          formStatus.classList.remove('contact-form__status--loading', 'contact-form__status--error');
          
          // Reset form
          contactForm.reset();
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            formStatus.textContent = '';
            formStatus.classList.remove('contact-form__status--success');
          }, 5000);
          
        } catch (error) {
          console.error('Error submitting form:', error);
          
          // Show error message
          formStatus.textContent = 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.';
          formStatus.classList.add('contact-form__status--error');
          formStatus.classList.remove('contact-form__status--loading', 'contact-form__status--success');
        }
      } else {
        // Show error message
        formStatus.textContent = errors.join('. ');
        formStatus.classList.add('contact-form__status--error');
        formStatus.classList.remove('contact-form__status--loading', 'contact-form__status--success');
      }
    });
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('blur', () => {
        // Validate field when user leaves it
        if (input.name === 'name') {
          highlightField(input, !input.value.trim());
        } else if (input.name === 'email') {
          highlightField(input, !isValidEmail(input.value));
        } else if (input.name === 'phone') {
          // Phone is optional, only validate if not empty
          if (input.value.trim()) {
            highlightField(input, !isValidPhone(input.value));
          } else {
            highlightField(input, false);
          }
        }
      });
    });
  }
}

// Helper functions
function highlightField(field, isError) {
  if (isError) {
    field.classList.add('contact-form__input--error');
  } else {
    field.classList.remove('contact-form__input--error');
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Basic phone validation - can be adjusted based on requirements
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

// Функция инициализации модального окна для оплаты
function initPaymentModal() {
  const paymentButton = document.getElementById('paymentButton');
  const paymentModal = document.getElementById('paymentModal');
  const closePaymentModal = document.getElementById('closePaymentModal');
  
  if (paymentButton && paymentModal && closePaymentModal) {
    // Открытие модального окна при клике на кнопку оплаты
    paymentButton.addEventListener('click', (e) => {
      e.preventDefault();
      paymentModal.classList.add('payment-modal--active');
      document.body.classList.add('menu-open'); // Блокировка прокрутки страницы
    });
    
    // Закрытие модального окна при клике на кнопку закрытия
    closePaymentModal.addEventListener('click', () => {
      paymentModal.classList.remove('payment-modal--active');
      document.body.classList.remove('menu-open'); // Разблокировка прокрутки страницы
    });
    
    // Закрытие модального окна при клике на фон (вне контента)
    paymentModal.addEventListener('click', (e) => {
      if (e.target === paymentModal) {
        paymentModal.classList.remove('payment-modal--active');
        document.body.classList.remove('menu-open'); // Разблокировка прокрутки страницы
      }
    });
    
    // Закрытие модального окна при нажатии клавиши ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && paymentModal.classList.contains('payment-modal--active')) {
        paymentModal.classList.remove('payment-modal--active');
        document.body.classList.remove('menu-open'); // Разблокировка прокрутки страницы
      }
    });
  }
}