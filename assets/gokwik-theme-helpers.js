(function () {
  'use strict';

  if (!window.lockBodyScroll) {
    window.lockBodyScroll = function () {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollY + 'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-scroll-position', String(scrollY));
    };
  }
  if (!window.unlockBodyScroll) {
    window.unlockBodyScroll = function () {
      var scrollY = document.body.getAttribute('data-scroll-position') || '0';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.removeAttribute('data-scroll-position');
      window.scrollTo(0, parseInt(scrollY, 10));
    };
  }

  window.openCartDrawer = function () {
    var url = new URL(window.location.href);
    if (!url.searchParams.has('open_cart')) url.searchParams.set('open_cart', '1');
    if (!url.searchParams.has('openCart')) url.searchParams.set('openCart', '1');
    var newUrl = url.pathname + (url.search ? url.search : '');
    window.location.href = newUrl;
  };

  var q = window.location.search || '';
  if (q.indexOf('open_cart=') !== -1 || q.indexOf('openCart=') !== -1) {
    var attempts = 0;
    var maxAttempts = 25;
    function tryOpen() {
      attempts++;
      if (typeof window.KwikCart !== 'undefined') {
        if (typeof window.KwikCart.open === 'function') window.KwikCart.open();
        if (typeof window.KwikCart.show === 'function') window.KwikCart.show();
        if (typeof window.KwikCart.openCart === 'function') window.KwikCart.openCart();
      }
      if (attempts === 3) {
        document.dispatchEvent(new CustomEvent('open-cart-drawer'));
        document.dispatchEvent(new CustomEvent('openCart'));
        document.dispatchEvent(new CustomEvent('cart:open'));
      }
      if (attempts < maxAttempts) setTimeout(tryOpen, 250);
    }
    function unfreezeIfNeeded() {
      if (document.body && document.body.style && document.body.style.position === 'fixed') {
        if (typeof window.unlockBodyScroll === 'function') window.unlockBodyScroll();
        else {
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.overflow = '';
          document.body.removeAttribute('data-scroll-position');
        }
      }
    }
    function run() {
      tryOpen();
      setTimeout(unfreezeIfNeeded, 4000);
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  }

  function openGoKwikPopup() {
    if (typeof window.buyNowCheckoutClick === 'function') {
      try {
        window.buyNowCheckoutClick();
        return true;
      } catch (e) {}
    }
    if (window.gokwikSdk && typeof window.gokwikSdk.initCheckout === 'function') {
      try {
        window.gokwikSdk.initCheckout(window.merchantInfo || window.merchantParams || {});
        return true;
      } catch (e) {}
    }
    if (window.KwikCheckout && typeof window.KwikCheckout.open === 'function') {
      try {
        window.KwikCheckout.open();
        return true;
      } catch (e) {}
    }
    if (window.GoKwik && typeof window.GoKwik.openCheckout === 'function') {
      try {
        window.GoKwik.openCheckout();
        return true;
      } catch (e) {}
    }
    return false;
  }

  function isInGoKwikCart(el) {
    if (!el || !el.closest) return false;
    return Boolean(
      el.closest(
        '[id*="kwik"], [class*="kwik"], [class*="Kwik"], [id*="gokwik"], [class*="gokwik"], [class*="slide-cart"], [class*="slideCart"], [data-kwik-cart], [data-gokwik], [data-kwik]'
      )
    );
  }

  function looksLikeCheckout(el) {
    if (!el) return false;
    var href = el.getAttribute && el.getAttribute('href') ? String(el.getAttribute('href')) : '';
    if (href.indexOf('/checkout') !== -1 || href.indexOf('/checkouts/') !== -1) return true;
    var name = el.getAttribute && el.getAttribute('name') ? String(el.getAttribute('name')) : '';
    if (name && name.toLowerCase() === 'checkout') return true;
    var id = el.id != null ? String(el.id).toLowerCase() : '';
    var cls = el.className != null ? String(el.className).toLowerCase() : '';
    if (id.indexOf('checkout') !== -1 || cls.indexOf('checkout') !== -1) return true;
    var txt = (el.textContent || '').trim().toLowerCase();
    return txt === 'checkout' || txt === 'checkout now' || txt.indexOf('checkout') !== -1;
  }

  document.addEventListener(
    'click',
    function (e) {
      var t = e.target;
      var clickable = t && t.closest ? t.closest('a, button, input[type="submit"], input[type="button"], [role="button"]') : null;
      if (!clickable || !looksLikeCheckout(clickable) || !isInGoKwikCart(clickable)) return;
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
      openGoKwikPopup();
    },
    true
  );

  var loc = window.location;
  var nativeAssign = loc.assign && loc.assign.bind(loc);
  var nativeReplace = loc.replace && loc.replace.bind(loc);
  if (nativeAssign) {
    loc.assign = function (u) {
      var url = (u && String(u)) || '';
      if (url.indexOf('/checkout') !== -1 || url.indexOf('/checkouts/') !== -1) {
        openGoKwikPopup();
        return;
      }
      nativeAssign(u);
    };
  }
  if (nativeReplace) {
    loc.replace = function (u) {
      var url = (u && String(u)) || '';
      if (url.indexOf('/checkout') !== -1 || url.indexOf('/checkouts/') !== -1) {
        openGoKwikPopup();
        return;
      }
      nativeReplace(u);
    };
  }
  window.cartCheckoutClick = function () {
    openGoKwikPopup();
    return false;
  };
  var reapply = 0;
  var tid = setInterval(function () {
    reapply++;
    window.cartCheckoutClick = function () {
      openGoKwikPopup();
      return false;
    };
    if (reapply >= 20) clearInterval(tid);
  }, 500);
})();
