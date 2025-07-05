const Banner = require('../models/banner.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create new banner - Admin
exports.createBanner = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.create(req.body);
  
  res.status(201).json({
    success: true,
    banner
  });
});

// Get all banners
exports.getAllBanners = catchAsyncErrors(async (req, res, next) => {
  const banners = await Banner.find({ isActive: true });
  
  res.status(200).json({
    success: true,
    banners
  });
});

// Get single banner
exports.getBanner = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    return next(new ErrorHandler('Banner not found', 404));
  }

  res.status(200).json({
    success: true,
    banner
  });
});

// Update banner - Admin
exports.updateBanner = catchAsyncErrors(async (req, res, next) => {
  let banner = await Banner.findById(req.params.id);

  if (!banner) {
    return next(new ErrorHandler('Banner not found', 404));
  }

  banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    banner
  });
});

// Delete banner - Admin
exports.deleteBanner = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    return next(new ErrorHandler('Banner not found', 404));
  }

  await banner.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Banner is deleted'
  });
});