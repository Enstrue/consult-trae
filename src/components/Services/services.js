// Services component functionality
export default function initServices() {
  // Add any specific functionality for the Services section here
  
  // Example: Add hover effects or animations
  const serviceCards = document.querySelectorAll('.services__card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('services__card--active');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('services__card--active');
    });
  });
}