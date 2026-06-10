(function () {
  'use strict';

  function handleCartPageClick(e) {
    var btn = e.target && e.target.closest ? e.target.closest('button[data-cart-increase], button[data-cart-decrease], [data-cart-remove]') : null;
    if (!btn) return;
    var row = btn.closest ? btn.closest('.cart-item-row') : null;
    if (!row) return;
    e.preventDefault();
    e.stopPropagation();
    var key;
    var qty;
    if (btn.hasAttribute && btn.hasAttribute('data-cart-increase')) {
      key = btn.getAttribute('data-cart-increase');
      var valEl = row.querySelector('[data-cart-quantity-value]');
      var cur = valEl ? parseInt(valEl.textContent, 10) || 1 : 1;
      qty = cur + 1;
      if (valEl) valEl.textContent = qty;
      var inp = row.querySelector('input[data-cart-quantity]');
      if (inp) inp.value = qty;
    } else if (btn.hasAttribute && btn.hasAttribute('data-cart-decrease')) {
      key = btn.getAttribute('data-cart-decrease');
      var valEl2 = row.querySelector('[data-cart-quantity-value]');
      var cur2 = valEl2 ? parseInt(valEl2.textContent, 10) || 1 : 1;
      if (cur2 <= 1) return;
      qty = cur2 - 1;
      if (valEl2) valEl2.textContent = qty;
      var inp2 = row.querySelector('input[data-cart-quantity]');
      if (inp2) inp2.value = qty;
    } else if (btn.hasAttribute && btn.hasAttribute('data-cart-remove')) {
      key = btn.getAttribute('data-cart-remove');
      if (!confirm('Remove this item from cart?')) return;
      qty = 0;
    } else return;

    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: String(key), quantity: qty })
    })
      .then(function (r) {
        if (!r.ok) return r.json().then(function (err) { throw new Error(err.description || 'Cart update failed'); });
        return r.json();
      })
      .then(function () { window.location.reload(); })
      .catch(function (err) {
        console.error('Cart update error:', err);
        window.location.reload();
      });
  }

  document.addEventListener('click', handleCartPageClick, true);
})();
