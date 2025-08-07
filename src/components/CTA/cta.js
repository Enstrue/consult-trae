// CTA component functionality
export default function initCTA() {
  // Add any specific functionality for the CTA section here
  // For example, animations, scroll effects, etc.
  
  // Example: Add a simple animation when the section comes into view
  const ctaSection = document.querySelector('.cta');
  
  if (ctaSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ctaSection.classList.add('cta--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(ctaSection);
  }
}