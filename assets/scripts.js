/**
 * Sarvital Theme - scripts.js
 * This file mirrors application.js (~318 lines). Theme layout loads application.js.
 * If GoKwik reported an error at "scripts.js line 760", that line is not in this file;
 * see docs/GOKWIK-SCRIPTS-JS-NOTE.md and check Liquid sections (cart-drawer, header, product-main).
 */
(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initSmoothScroll();
    initLazyLoading();
    initFormValidation();
    initScrollAnimations();
    initImageOptimization();
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

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
      document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
  }

  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!validateForm(this)) e.preventDefault();
      });
      form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', function() { validateField(this); });
      });
    });
  }

  function validateForm(form) {
    let isValid = true;
    form.querySelectorAll('input[required], textarea[required], select[required]').forEach(input => {
      if (!validateField(input)) isValid = false;
    });
    return isValid;
  }

  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) existingError.remove();
    field.classList.remove('error');
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    if (type === 'email' && value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    if (type === 'tel' && value) {
      if (!/^[\d\s\-\+\(\)]+$/.test(value) || value.length < 10) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    if (!isValid) {
      field.classList.add('error');
      const errorElement = document.createElement('span');
      errorElement.className = 'field-error';
      errorElement.textContent = errorMessage;
      field.parentElement.appendChild(errorElement);
    }
    return isValid;
  }

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

  function initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach(el => el.classList.add('animated'));
      return;
    }
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('animated');
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach(el => animationObserver.observe(el));
    } else {
      document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach(el => el.classList.add('animated'));
    }
  }

  function initImageOptimization() {
    function handleImageError(img) {
      img.classList.add('image-error');
      if (!img.alt || img.alt === '') img.alt = 'Image failed to load';
      if (!img.dataset.placeholderAttempted) img.dataset.placeholderAttempted = 'true';
    }
    document.querySelectorAll('img').forEach(img => {
      if (img.dataset.errorHandlerAdded) return;
      img.dataset.errorHandlerAdded = 'true';
      img.addEventListener('error', function() { handleImageError(this); }, { once: true });
      if (img.loading === 'lazy') {
        img.addEventListener('load', function() {
          this.classList.add('loaded');
          this.style.opacity = '1';
        }, { once: true });
      }
    });
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
              img.removeAttribute('data-srcset');
            }
            if (img.complete && img.naturalHeight !== 0) {
              img.classList.add('loaded');
              img.style.opacity = '1';
            }
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '50px' });
      document.querySelectorAll('img[data-src], img[data-srcset], img[loading="lazy"]').forEach(img => imageObserver.observe(img));
    } else {
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
      document.querySelectorAll('img[data-srcset]').forEach(img => {
        img.srcset = img.dataset.srcset;
        img.removeAttribute('data-srcset');
      });
    }
    document.querySelectorAll('img[loading="eager"], img[fetchpriority="high"]').forEach(img => {
      if (img.complete && img.naturalHeight !== 0) img.classList.add('loaded');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageOptimization);
  } else {
    initImageOptimization();
  }

  window.SarvitalTheme = { debounce: debounce, throttle: throttle };
})();
