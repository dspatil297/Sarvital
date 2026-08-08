(function () {
  'use strict';

  function showProductCardQtyRow(form, lineKey, quantity) {
    if (lineKey) form.setAttribute('data-line-key', lineKey);
    var qtyRow = form.querySelector('.product-card__quantity-row');
    if (qtyRow) {
      qtyRow.classList.remove('product-card__quantity-row--hidden');
      qtyRow.style.display = 'flex';
      qtyRow.style.visibility = 'visible';
    }
    var qtyInput = form.querySelector('.product-card__qty-input');
    if (qtyInput) qtyInput.value = quantity || 1;
    var addBtn = form.querySelector('.product-card__add-to-cart');
    if (addBtn) addBtn.style.display = 'none';
  }

  function doProductCardAddToCart(form) {
    var idInput = form.querySelector('input[name="id"]');
    var variantId = idInput ? idInput.value : null;
    if (!variantId) return;
    var submitBtn = form.querySelector('button[type="submit"][name="add"]');
    var originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Adding...';
    }
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: 1 })
    })
      .then(function (r) {
        return r.json().then(function (data) {
          return { ok: r.ok, data: data };
        });
      })
      .then(function (result) {
        if (result.ok) {
          var data = result.data || result;
          var key = (data && data.key) || null;
          var qty = data && data.quantity != null ? data.quantity : 1;
          function done() {
            document.dispatchEvent(new CustomEvent('cart:updated'));
          }
          // Shopify Customer Events: ensure AJAX add-to-cart triggers standard event pipeline (Meta/GA4/Ads via pixel.modern.js).
          try {
            if (window.Shopify && Shopify.analytics && typeof Shopify.analytics.publish === 'function') {
              Shopify.analytics.publish('product_added_to_cart', {
                cartLine: { quantity: qty },
                productVariant: { id: variantId }
              });
            }
          } catch (e) {}
          if (!key) {
            fetch('/cart.js')
              .then(function (r) {
                return r.json();
              })
              .then(function (cart) {
                var item = (cart.items || []).find(function (i) {
                  return String(i.variant_id) === String(variantId) || String(i.id) === String(variantId);
                });
                key = item ? item.key : null;
                showProductCardQtyRow(form, key, item ? item.quantity : qty);
                done();
              })
              .catch(function () {
                showProductCardQtyRow(form, null, qty);
                done();
              });
          } else {
            showProductCardQtyRow(form, key, qty);
            done();
          }
        } else {
          alert((result.data && result.data.description) || result.description || 'Could not add to cart.');
        }
      })
      .catch(function () {
        alert('Could not add to cart.');
      })
      .then(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
  }

  document.addEventListener(
    'click',
    function (e) {
      var addBtn = e.target && e.target.closest ? e.target.closest('button.product-card__add-to-cart') : null;
      if (addBtn) {
        var form = addBtn.closest('form.product-card__form');
        if (form) {
          e.preventDefault();
          e.stopPropagation();
          doProductCardAddToCart(form);
          return;
        }
      }
      if (e.target && e.target.closest && e.target.closest('form.product-card__form')) {
        e.stopPropagation();
      }
    },
    true
  );

  document.addEventListener(
    'click',
    function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('.product-card__qty-btn') : null;
      if (!btn) return;
      var selector = btn.closest ? btn.closest('.product-card__quantity-selector') : null;
      var inp = selector ? selector.querySelector('.product-card__qty-input') : null;
      var form = btn.closest ? btn.closest('form.product-card__form') : null;
      if (!inp || !form) return;
      e.preventDefault();
      e.stopPropagation();
      var action = btn.getAttribute('data-action');
      var cur = parseInt(inp.value, 10) || 1;
      var max = parseInt(inp.getAttribute('max'), 10) || 10;
      var lineKey = form.getAttribute('data-line-key');
      if (lineKey) {
        var newQty = action === 'increase' ? (cur < max ? cur + 1 : cur) : cur > 0 ? cur - 1 : 0;
        if (action === 'increase' && cur >= max) return;
        btn.disabled = true;
        var idInput = form.querySelector('input[name="id"]');
        var variantId = idInput ? idInput.value : null;
        var changePayload = { id: variantId || lineKey, quantity: newQty };
        fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(changePayload)
        })
          .then(function (r) {
            return r.json().then(function (data) {
              return { ok: r.ok, data: data };
            });
          })
          .then(function (result) {
            if (result.ok) {
              inp.value = newQty;
              document.dispatchEvent(new CustomEvent('cart:updated'));
              if (newQty === 0) {
                form.removeAttribute('data-line-key');
                var qtyRow = form.querySelector('.product-card__quantity-row');
                if (qtyRow) {
                  qtyRow.classList.add('product-card__quantity-row--hidden');
                  qtyRow.style.display = '';
                  qtyRow.style.visibility = '';
                }
                var addBtn = form.querySelector('.product-card__add-to-cart');
                if (addBtn) addBtn.style.display = '';
              }
            } else {
              alert(result.data && result.data.description ? result.data.description : 'Could not update cart.');
            }
          })
          .catch(function () {
            alert('Could not update cart.');
          })
          .then(function () {
            btn.disabled = false;
          });
        return;
      }
      var min = parseInt(inp.getAttribute('min'), 10) || 0;
      if (action === 'increase' && cur < max) inp.value = cur + 1;
      else if (action === 'decrease' && cur > min) inp.value = cur - 1;
    },
    true
  );

  document.addEventListener(
    'submit',
    function (e) {
      if (!e.target || !e.target.classList || !e.target.classList.contains('product-card__form')) return;
      e.preventDefault();
      e.stopPropagation();
      doProductCardAddToCart(e.target);
    },
    true
  );

  function syncProductCardsWithCart() {
    fetch('/cart.js')
      .then(function (r) {
        return r.json();
      })
      .then(function (cart) {
        var items = cart.items || [];
        var forms = document.querySelectorAll('form.product-card__form');
        for (var i = 0; i < forms.length; i++) {
          var form = forms[i];
          var idInput = form.querySelector('input[name="id"]');
          var variantId = idInput ? idInput.value : null;
          if (!variantId) continue;
          var item = items.find(function (it) {
            return String(it.variant_id) === String(variantId) || String(it.id) === String(variantId);
          });
          if (item) showProductCardQtyRow(form, item.key, item.quantity);
        }
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncProductCardsWithCart);
  } else {
    syncProductCardsWithCart();
  }
  document.addEventListener('cart:updated', syncProductCardsWithCart);
})();
