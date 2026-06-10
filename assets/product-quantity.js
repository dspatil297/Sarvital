(function () {
  'use strict';

  function handleProductQuantityClick(e) {
    var btn = e.target && e.target.closest ? e.target.closest('button.quantity-btn[data-action]') : null;
    if (!btn) return;
    var form = btn.closest ? btn.closest('#product-form') : null;
    if (!form) return;
    var selector = btn.closest ? btn.closest('.quantity-selector') : null;
    var inp = selector ? selector.querySelector('input[name="quantity"], input.quantity-input') : null;
    if (!inp) return;
    e.preventDefault();
    e.stopPropagation();
    var action = btn.getAttribute('data-action');
    var cur = parseInt(inp.value, 10) || 1;
    var min = parseInt(inp.getAttribute('min'), 10) || 1;
    var max = parseInt(inp.getAttribute('max'), 10) || 10;
    if (action === 'increase' && cur < max) inp.value = cur + 1;
    else if (action === 'decrease' && cur > min) inp.value = cur - 1;
  }

  document.addEventListener('click', handleProductQuantityClick, true);
})();
