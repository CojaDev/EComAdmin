import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  images: {
    type: String,
    required: true,
    trim: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

// Exporting just the model
const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;
