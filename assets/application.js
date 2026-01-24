/**
 * Sarvital Theme - Base JavaScript
 * Common interactions and utilities
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Initialize all modules
    initSmoothScroll();
    initLazyLoading();
    initFormValidation();
    initScrollAnimations();
    initImageOptimization();
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Lazy loading for images
   */
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              img.classList.add('loaded');
            }
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Basic form validation
   */
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
          e.preventDefault();
        }
      });

      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', function() {
          validateField(this);
        });
      });
    });
  }

  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';

    // Remove previous error
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    field.classList.remove('error');

    // Required validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value) || value.length < 10) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    // Show error
    if (!isValid) {
      field.classList.add('error');
      const errorElement = document.createElement('span');
      errorElement.className = 'field-error';
      errorElement.textContent = errorMessage;
      field.parentElement.appendChild(errorElement);
    }

    return isValid;
  }

  /**
   * Utility: Debounce function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Utility: Throttle function
   */
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Scroll-triggered animations
   */
  function initScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Remove animation classes and show elements immediately
      document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach(el => {
        el.classList.add('animated');
      });
      return;
    }

    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Optionally unobserve after animation
            // animationObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe all elements with scroll-animate classes
      document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach(el => {
        animationObserver.observe(el);
      });
    } else {
      // Fallback: show all animations immediately
      document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach(el => {
        el.classList.add('animated');
      });
    }
  }

  /**
   * Enhanced image optimization and lazy loading
   */
  function initImageOptimization() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Handle data-src for lazy loading
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            // Handle srcset for responsive images
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
              img.removeAttribute('data-srcset');
            }
            
            // Add loaded class for fade-in effect
            img.classList.add('loaded');
            
            // Stop observing once loaded
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      // Observe all images with lazy loading attributes
      document.querySelectorAll('img[data-src], img[data-srcset]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Add loading state to images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
    });
  }

  // Export utilities to window for global access
  window.SarvitalTheme = {
    debounce: debounce,
    throttle: throttle
  };

})();

