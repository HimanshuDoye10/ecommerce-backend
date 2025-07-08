const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');
const { isAuthenticatedUser } = require('../middlewares/auth.middleware');
const { validateAddress } = require('../middlewares/validators/address.validator');

// Authenticated user routes
router.post('/', isAuthenticatedUser, validateAddress, addressController.createAddress);
router.get('/', isAuthenticatedUser, addressController.getMyAddresses);
router.get('/:id', isAuthenticatedUser, addressController.getAddress);
router.put('/:id', isAuthenticatedUser, validateAddress, addressController.updateAddress);
router.delete('/:id', isAuthenticatedUser, addressController.deleteAddress);
router.get('/user/:userId',
    isAuthenticatedUser,
    addressController.getAddressesByUserId
);
module.exports = router;