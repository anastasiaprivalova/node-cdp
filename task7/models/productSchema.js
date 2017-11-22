import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User id is required']
  },
  text: {
    type: String,
    required: [true, 'Review text is required']
  }
});

export const productSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Product id is required']
  },
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  type: {
    type: String,
    required: [true, 'Product type is required']
  },
  reviews: {
    type: [reviewSchema],
    required: false,
    default: []
  },
  lastModifiedDate: {
    type: Date,
    required: false,
    default: Date.now()
  }
});

productSchema.pre('update', function() {
  this.update({},{ $set: { lastModifiedDate: new Date() } });
});

export default productSchema;