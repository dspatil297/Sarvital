# Order Delivery Date Setup Guide

## Overview
Estimated delivery date is calculated based on shipping address pincode and displayed to customers after they place an order.

## Implementation

### 1. Order Confirmation Email (Recommended)
To show estimated delivery date in order confirmation emails:

1. Go to **Shopify Admin → Settings → Notifications**
2. Click **Order confirmation** email template
3. Add this code before the closing `</body>` tag:

```liquid
{% if order.shipping_address.zip %}
  {% render 'order-delivery-date', order: order %}
{% endif %}
```

### 2. Order Status Page (If Custom)
If you have a custom order status page, add:

```liquid
{% if order.shipping_address.zip %}
  {% render 'order-delivery-date', order: order %}
{% endif %}
```

### 3. Cart Page (Optional - Shows after shipping address entered)
The delivery date will automatically appear on the cart page once shipping address is entered during checkout.

## Files Created

- `snippets/order-delivery-date.liquid` - Displays estimated delivery date
- `assets/delivery-estimator.js` - Contains date calculation functions
- `snippets/delivery-estimator.liquid` - Product page pincode checker

## How It Works

1. When an order is placed, the system reads the shipping address pincode
2. Calculates estimated delivery based on distance from warehouse (422010)
3. Adds business days (excluding weekends) to today's date
4. Displays date range (e.g., "15 Jan 2025 - 17 Jan 2025")

## Delivery Time Estimates

- **Same region (West)**: 2-4 business days
- **Adjacent regions**: 4-6 business days  
- **Distant regions**: 6-8 business days

## Testing

1. Place a test order with different pincodes:
   - 422010 (same region - Nashik)
   - 400001 (Mumbai - adjacent)
   - 110001 (Delhi - distant)
2. Check order confirmation email for delivery date
3. Verify dates are calculated correctly (business days only)
