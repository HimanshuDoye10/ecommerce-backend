const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getSingleProduct);

// Admin routes
router.post('/admin/new', isAuthenticatedUser, authorizeRoles('admin'), productController.newProduct);
router.route('/admin/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), productController.updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), productController.deleteProduct);

module.exports = router;