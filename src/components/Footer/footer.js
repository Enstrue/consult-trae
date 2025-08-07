/**
 * Footer Component
 * 
 * Handles footer functionality including smooth scrolling for footer navigation links
 */

export default function initFooter() {
  // Get all footer navigation links that point to anchors
  const footerLinks = document.querySelectorAll('.footer__nav-link[href^="#"]');
  
  // Add click event listeners to each footer link
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target element from the href attribute
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Scroll to the target element smoothly
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Get the current year for copyright
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.querySelector('.footer__copyright');
  
  // Update copyright year if element exists
  if (copyrightElement) {
    copyrightElement.textContent = copyrightElement.textContent.replace('2023', currentYear);
  }
}