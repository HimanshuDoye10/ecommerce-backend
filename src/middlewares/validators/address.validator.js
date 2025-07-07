const { check } = require('express-validator');

exports.validateAddress = [
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('phoneNumber', 'Please include a valid phone number').isMobilePhone(),
  check('addressLine1', 'Address line 1 is required').not().isEmpty(),
  check('city', 'City is required').not().isEmpty(),
  check('state', 'State is required').not().isEmpty(),
  check('postalCode', 'Postal code is required').not().isEmpty(),
  check('country', 'Country is required').not().isEmpty()
];