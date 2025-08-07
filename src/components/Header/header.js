// Header component functionality
export default function initHeader() {
  const header = document.querySelector('.header');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  
  // Sticky header functionality
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });
  
  // Function to toggle mobile menu state
  const toggleMobileMenu = (isOpen) => {
    if (isOpen === undefined) {
      // Toggle mode
      mobileMenu.classList.toggle('mobile-menu--active');
      mobileMenuToggle.classList.toggle('mobile-menu-toggle--active');
      mobileMenuOverlay.classList.toggle('mobile-menu-overlay--active');
      document.body.classList.toggle('menu-open');
    } else if (isOpen) {
      // Open mode
      mobileMenu.classList.add('mobile-menu--active');
      mobileMenuToggle.classList.add('mobile-menu-toggle--active');
      mobileMenuOverlay.classList.add('mobile-menu-overlay--active');
      document.body.classList.add('menu-open');
    } else {
      // Close mode
      mobileMenu.classList.remove('mobile-menu--active');
      mobileMenuToggle.classList.remove('mobile-menu-toggle--active');
      mobileMenuOverlay.classList.remove('mobile-menu-overlay--active');
      document.body.classList.remove('menu-open');
    }
  };
  
  // Mobile menu toggle
  if (mobileMenuToggle && mobileMenu && mobileMenuOverlay) {
    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', () => toggleMobileMenu());
    
    // Close menu when clicking on overlay
    mobileMenuOverlay.addEventListener('click', () => toggleMobileMenu(false));
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });
    
    // Close menu on ESC key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--active')) {
        toggleMobileMenu(false);
      }
    });
  }
}