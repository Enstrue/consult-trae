// About component functionality
export default function initAbout() {
  // Add any specific functionality for the About section here
  // For example, animations, counters, etc.
  
  // Example: Animate numbers on scroll
  const animateNumbers = () => {
    const counters = document.querySelectorAll('.about__stat-number');
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // ms
      const step = target / (duration / 16); // 60fps
      
      let current = 0;
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  };
  
  // Trigger animation when section is in viewport
  const aboutSection = document.querySelector('#about');
  if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(aboutSection);
  }
}