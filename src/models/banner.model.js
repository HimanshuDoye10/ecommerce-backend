const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter banner title'],
    trim: true,
    maxlength: [100, 'Banner title cannot exceed 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Please select banner type'],
    enum: ['main', 'promo', 'category', 'seasonal']
  },
  image: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  description: {
    type: String,
    required: [true, 'Please enter banner description']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Banner', bannerSchema);