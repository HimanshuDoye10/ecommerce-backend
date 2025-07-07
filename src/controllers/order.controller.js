const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Address = require('../models/address.model');
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create new COD order
exports.createCODOrder = catchAsyncErrors(async (req, res, next) => {
  const { orderItems, shippingAddress, totalAmount } = req.body;

  // 1. Verify product stock and calculate total
  let orderTotal = 0;
  const products = [];

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      return next(new ErrorHandler(`Product not found with ID: ${item.product}`, 404));
    }

    if (product.stock < item.quantity) {
      return next(new ErrorHandler(`Not enough stock for product: ${product.name}`, 400));
    }

    orderTotal += product.price * item.quantity;
    products.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price
    });
  }

  // 2. Verify total amount matches calculated total
  if (orderTotal !== totalAmount) {
    return next(new ErrorHandler('Order total does not match calculated amount', 400));
  }

  // 3. Verify shipping address belongs to user
  const address = await Address.findOne({
    _id: shippingAddress,
    user: req.user.id
  });
  if (!address) {
    return next(new ErrorHandler('Address not found or does not belong to user', 404));
  }

  // 4. Create order
  const order = await Order.create({
    user: req.user.id,
    orderItems: products,
    shippingAddress,
    paymentMethod: 'COD',
    totalAmount: orderTotal
  });

  // 5. Update product stock
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity }
    });
  }

  // 6. Populate order details for response
  const populatedOrder = await Order.findById(order._id)
    .populate('user', 'name email')
    .populate('orderItems.product', 'name price images')
    .populate('shippingAddress');

  res.status(201).json({
    success: true,
    order: populatedOrder
  });
});

// Get order details
exports.getOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user.id
  })
    .populate('user', 'name email')
    .populate('orderItems.product', 'name price images')
    .populate('shippingAddress');

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  res.status(200).json({
    success: true,
    order
  });
});