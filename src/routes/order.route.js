const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth.middleware');
const { validateOrder } = require('../middlewares/validators/order.validator');

// Admin routes (must come before parameterized routes)
router.get('/admin/all', 
  isAuthenticatedUser, 
  authorizeRoles('admin'), 
  orderController.getAllOrders
);

// Authenticated user routes
router.post('/cod', isAuthenticatedUser, validateOrder, orderController.createCODOrder);
router.get('/user/:userId', 
  isAuthenticatedUser, 
  orderController.getOrdersByUserId
);
router.get('/:id', isAuthenticatedUser, orderController.getOrder);

module.exports = router;