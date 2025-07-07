const { check } = require('express-validator');

exports.validateOrder = [
  check('orderItems', 'Order items are required').isArray({ min: 1 }),
  check('orderItems.*.product', 'Product ID is required').not().isEmpty(),
  check('orderItems.*.quantity', 'Quantity must be at least 1').isInt({ min: 1 }),
  check('shippingAddress', 'Shipping address ID is required').not().isEmpty(),
  check('totalAmount', 'Total amount is required').isFloat({ min: 0 })
];