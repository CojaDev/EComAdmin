import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  quantity: {
    type: String,
    required: false,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  expenses: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  images: {
    type: [String],
    required: true,
    trim: true,
  },
  colors: {
    type: [String],
    required: true,
    trim: true,
  },
  sizes: {
    type: [String],
    required: true,
    trim: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
