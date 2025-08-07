// Hero component functionality
export default function initHero() {
  // Animation for hero content (optional)
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('hero__content--visible');
    }, 300);
  }
}