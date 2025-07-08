const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { isAuthenticatedUser } = require('../middlewares/auth.middleware');
const { validateOrder } = require('../middlewares/validators/order.validator');

// Authenticated user routes
router.post('/cod', isAuthenticatedUser, validateOrder, orderController.createCODOrder);
router.get('/:id', isAuthenticatedUser, orderController.getOrder);
// Add this with other routes
router.get('/user/:userId', 
  isAuthenticatedUser, 
  orderController.getOrdersByUserId
);

module.exports = router;