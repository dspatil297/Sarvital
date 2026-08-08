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
    initQuickView();
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
   * Global quick-view modal (desktop only). Fetches /products/{handle}.js on demand.
   */
  function initQuickView() {
    var modal = document.querySelector('[data-quick-view-global-modal]');
    if (!modal) return;

    var imageEl = modal.querySelector('[data-quick-view-image]');
    var imagePlaceholder = modal.querySelector('[data-quick-view-image-placeholder]');
    var loadingEl = modal.querySelector('[data-quick-view-loading]');
    var titleEl = modal.querySelector('[data-quick-view-title]');
    var priceCurrentEl = modal.querySelector('[data-quick-view-price-current]');
    var priceCompareSpan = modal.querySelector('[data-quick-view-price-compare]');
    var descriptionEl = modal.querySelector('[data-quick-view-description]');
    var badgesEl = modal.querySelector('[data-quick-view-badges]');
    var variantSelect = modal.querySelector('[data-quick-view-variant-select]');
    var variantHidden = modal.querySelector('[data-quick-view-variant-hidden]');
    var fullUrlEl = modal.querySelector('[data-quick-view-full-url]');
    var addBtn = modal.querySelector('.quick-view__add-to-cart');
    var fetchCache = Object.create(null);

    function formatMoney(cents) {
      if (typeof Shopify !== 'undefined' && typeof Shopify.formatMoney === 'function') {
        return Shopify.formatMoney(cents);
      }
      return '₹' + (Number(cents) / 100).toFixed(2);
    }

    function stripHtml(html) {
      var tmp = document.createElement('div');
      tmp.innerHTML = html || '';
      return (tmp.textContent || tmp.innerText || '').trim();
    }

    function truncateWords(text, maxWords) {
      var words = text.split(/\s+/).filter(Boolean);
      if (words.length <= maxWords) return text;
      return words.slice(0, maxWords).join(' ') + '…';
    }

    function setLoading(isLoading) {
      if (loadingEl) loadingEl.hidden = !isLoading;
    }

    function openModal() {
      modal.hidden = false;
      modal.classList.add('active');
      if (window.lockBodyScroll) window.lockBodyScroll();
      else document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.hidden = true;
      if (window.unlockBodyScroll) window.unlockBodyScroll();
      else document.body.style.overflow = '';
    }

    function populateModal(product) {
      if (titleEl) titleEl.textContent = product.title || '';

      var compareAt = product.compare_at_price;
      var price = product.price;
      if (priceCompareSpan) {
        if (compareAt && compareAt > price) {
          priceCompareSpan.textContent = formatMoney(compareAt);
          priceCompareSpan.hidden = false;
        } else {
          priceCompareSpan.hidden = true;
        }
      }
      if (priceCurrentEl) priceCurrentEl.textContent = formatMoney(price);

      var descriptionText = truncateWords(stripHtml(product.body_html || product.description || ''), 30);
      if (descriptionEl) {
        if (descriptionText) {
          descriptionEl.textContent = descriptionText;
          descriptionEl.hidden = false;
        } else {
          descriptionEl.hidden = true;
        }
      }

      if (badgesEl) {
        badgesEl.innerHTML = '';
        var healthTags = (product.tags || []).filter(function(tag) {
          return String(tag).indexOf('health-') === 0;
        }).slice(0, 3);
        if (healthTags.length) {
          healthTags.forEach(function(tag) {
            var badge = document.createElement('span');
            badge.className = 'badge badge--health';
            badge.textContent = String(tag).replace(/^health-/, '').replace(/^\w/, function(c) { return c.toUpperCase(); });
            badgesEl.appendChild(badge);
          });
          badgesEl.hidden = false;
        } else {
          badgesEl.hidden = true;
        }
      }

      var imageSrc = '';
      if (product.featured_image) {
        imageSrc = product.featured_image;
      } else if (product.images && product.images.length) {
        imageSrc = product.images[0];
      }

      if (imageEl && imageSrc) {
        imageEl.src = imageSrc;
        imageEl.alt = product.title || '';
        imageEl.hidden = false;
        if (imagePlaceholder) imagePlaceholder.hidden = true;
      } else {
        if (imageEl) imageEl.hidden = true;
        if (imagePlaceholder) imagePlaceholder.hidden = false;
      }

      var variants = product.variants || [];
      if (variantSelect && variantHidden) {
        if (variants.length > 1) {
          variantSelect.innerHTML = '';
          variants.forEach(function(variant) {
            var option = document.createElement('option');
            option.value = variant.id;
            option.textContent = variant.title + ' - ' + formatMoney(variant.price);
            if (variant.available === false) option.disabled = true;
            variantSelect.appendChild(option);
          });
          variantSelect.hidden = false;
          variantHidden.hidden = true;
          variantHidden.removeAttribute('name');
          variantSelect.name = 'id';
        } else if (variants.length === 1) {
          variantSelect.hidden = true;
          variantSelect.removeAttribute('name');
          variantHidden.hidden = false;
          variantHidden.name = 'id';
          variantHidden.value = variants[0].id;
        }
      }

      if (addBtn) {
        var available = product.available !== false;
        addBtn.disabled = !available;
        addBtn.setAttribute('aria-disabled', String(!available));
      }

      if (fullUrlEl && product.handle) {
        fullUrlEl.href = '/products/' + product.handle;
      }
    }

    function fetchProduct(handle) {
      if (fetchCache[handle]) {
        return Promise.resolve(fetchCache[handle]);
      }
      return fetch('/products/' + encodeURIComponent(handle) + '.js', {
        credentials: 'same-origin',
        headers: { Accept: 'application/json' }
      })
        .then(function(res) {
          if (!res.ok) throw new Error('Product fetch failed');
          return res.json();
        })
        .then(function(data) {
          fetchCache[handle] = data;
          return data;
        });
    }

    document.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-quick-view-handle]');
      if (!btn) return;
      if (window.innerWidth <= 767) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      var handle = btn.getAttribute('data-quick-view-handle');
      if (!handle) return;

      openModal();
      setLoading(true);
      if (imageEl) imageEl.hidden = true;
      if (imagePlaceholder) imagePlaceholder.hidden = true;

      fetchProduct(handle)
        .then(function(product) {
          populateModal(product);
        })
        .catch(function() {
          if (titleEl) titleEl.textContent = 'Unable to load product';
        })
        .finally(function() {
          setLoading(false);
        });
    }, true);

    document.addEventListener('click', function(e) {
      if (e.target.closest('[data-quick-view-close]')) closeModal();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
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
   * Enhanced image optimization and lazy loading with error handling
   */
  function initImageOptimization() {
    // Enhanced error handling for all images
    function handleImageError(img) {
      img.classList.add('image-error');
      if (!img.alt || img.alt === '') {
        img.alt = 'Image failed to load';
      }
      // Try to load a placeholder if available
      if (!img.dataset.placeholderAttempted) {
        img.dataset.placeholderAttempted = 'true';
        // Could add placeholder image logic here if needed
      }
    }

    // Add error handlers to all images
    document.querySelectorAll('img').forEach(img => {
      // Skip if already has error handler
      if (img.dataset.errorHandlerAdded) return;
      img.dataset.errorHandlerAdded = 'true';
      
      // Add error event listener
      img.addEventListener('error', function() {
        handleImageError(this);
      }, { once: true });

      // Add load event listener for fade-in effect
      if (img.loading === 'lazy') {
        img.addEventListener('load', function() {
          this.classList.add('loaded');
          this.style.opacity = '1';
        }, { once: true });
      }
    });

    // IntersectionObserver for lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Handle data-src for lazy loading
            if (img.dataset.src) {
              const newSrc = img.dataset.src;
              img.src = newSrc;
              img.removeAttribute('data-src');
            }
            
            // Handle srcset for responsive images
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
              img.removeAttribute('data-srcset');
            }
            
            // Add loaded class when image loads
            if (img.complete && img.naturalHeight !== 0) {
              img.classList.add('loaded');
              img.style.opacity = '1';
            }
            
            // Stop observing once loaded
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      // Observe all images with lazy loading attributes
      document.querySelectorAll('img[data-src], img[data-srcset], img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
      document.querySelectorAll('img[data-srcset]').forEach(img => {
        img.srcset = img.dataset.srcset;
        img.removeAttribute('data-srcset');
      });
    }

    // Preload critical images (above the fold)
    const criticalImages = document.querySelectorAll('img[loading="eager"], img[fetchpriority="high"]');
    criticalImages.forEach(img => {
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
      }
    });
  }

  // Initialize image optimization on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageOptimization);
  } else {
    initImageOptimization();
  }

  // Export utilities to window for global access
  window.SarvitalTheme = {
    debounce: debounce,
    throttle: throttle
  };

})();

