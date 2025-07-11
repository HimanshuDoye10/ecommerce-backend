const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.route');
const productRoutes = require('./product.route');
const bannerRoutes = require('./banner.route');
const addressRoutes = require('./address.route');
const orderRoutes = require('./order.route');


// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Auth routes
router.use('/auth', authRoutes);  // Changed from '/api/v1'
// Product routes
router.use('/products', productRoutes);  // Changed from '/api/v1'

router.use('/banners', bannerRoutes);

router.use('/addresses', addressRoutes);
router.use('/orders', orderRoutes);


module.exports = router;