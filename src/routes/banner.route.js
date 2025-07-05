const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', bannerController.getAllBanners);
router.get('/:id', bannerController.getBanner);

// Admin routes
router.post('/admin/new', isAuthenticatedUser, authorizeRoles('admin'), bannerController.createBanner);
router.route('/admin/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), bannerController.updateBanner)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), bannerController.deleteBanner);

module.exports = router;