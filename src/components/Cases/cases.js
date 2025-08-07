// Cases component functionality
export default function initCases() {
  // Add any specific functionality for the Cases section here
  
  // Enhanced carousel/slider for case studies
  const casesSlider = document.querySelector('.cases__slider');
  const casesSlides = document.querySelectorAll('.cases__slide');
  const prevButton = document.querySelector('.cases__nav-prev');
  const nextButton = document.querySelector('.cases__nav-next');
  
  if (casesSlider && casesSlides.length && prevButton && nextButton) {
    let currentSlide = 0;
    const slideCount = casesSlides.length;
    let slidesPerView = 1;
    
    // Function to determine how many slides to show based on screen width
    function getSlidesPerView() {
      if (window.innerWidth >= 1024) {
        return 3; // Desktop: 3 slides
      } else if (window.innerWidth >= 768) {
        return 2; // Tablet: 2 slides
      } else {
        return 1; // Mobile: 1 slide
      }
    }
    
    // Initialize slider
    function initSlider() {
      slidesPerView = getSlidesPerView();
      updateSlider();
    }
    
    // Event listeners for navigation
    prevButton.addEventListener('click', () => {
      currentSlide = Math.max(0, currentSlide - 1);
      updateSlider();
    });
    
    nextButton.addEventListener('click', () => {
      const maxSlide = Math.max(0, slideCount - slidesPerView);
      currentSlide = Math.min(maxSlide, currentSlide + 1);
      updateSlider();
    });
    
    // Update slider position and active states
    function updateSlider() {
      const slideWidth = casesSlides[0].offsetWidth;
      casesSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      
      // Update active class and button states
      casesSlides.forEach((slide, index) => {
        if (index >= currentSlide && index < currentSlide + slidesPerView) {
          slide.classList.add('cases__slide--active');
        } else {
          slide.classList.remove('cases__slide--active');
        }
      });
      
      // Update button states
      prevButton.disabled = currentSlide === 0;
      prevButton.classList.toggle('cases__nav-button--disabled', currentSlide === 0);
      
      const maxSlide = slideCount - slidesPerView;
      nextButton.disabled = currentSlide >= maxSlide;
      nextButton.classList.toggle('cases__nav-button--disabled', currentSlide >= maxSlide);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
      const newSlidesPerView = getSlidesPerView();
      if (newSlidesPerView !== slidesPerView) {
        slidesPerView = newSlidesPerView;
        // Adjust current slide if needed
        const maxSlide = Math.max(0, slideCount - slidesPerView);
        currentSlide = Math.min(maxSlide, currentSlide);
      }
      updateSlider();
    });
    
    // Initialize the slider
    initSlider();
  }
}