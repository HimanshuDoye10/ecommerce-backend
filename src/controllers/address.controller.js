const Address = require('../models/address.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create new address - Authenticated User
exports.createAddress = catchAsyncErrors(async (req, res, next) => {
  // Add user to request body
  req.body.user = req.user.id;
  
  const address = await Address.create(req.body);
  
  res.status(201).json({
    success: true,
    address
  });
});

// Get all addresses for logged-in user
exports.getMyAddresses = catchAsyncErrors(async (req, res, next) => {
  const addresses = await Address.find({ user: req.user.id });
  
  res.status(200).json({
    success: true,
    addresses
  });
});

// Get single address - must belong to user
exports.getAddress = catchAsyncErrors(async (req, res, next) => {
  const address = await Address.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!address) {
    return next(new ErrorHandler('Address not found', 404));
  }

  res.status(200).json({
    success: true,
    address
  });
});

// Update address - must belong to user
exports.updateAddress = catchAsyncErrors(async (req, res, next) => {
  let address = await Address.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!address) {
    return next(new ErrorHandler('Address not found', 404));
  }

  address = await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    address
  });
});

// Delete address - must belong to user
exports.deleteAddress = catchAsyncErrors(async (req, res, next) => {
  const address = await Address.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!address) {
    return next(new ErrorHandler('Address not found', 404));
  }

  await address.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Address is deleted'
  });
});

exports.getAddressesByUserId = catchAsyncErrors(async (req, res, next) => {
  const addresses = await Address.find({ user: req.params.userId });
  
  res.status(200).json({
    success: true,
    addresses
  });
});