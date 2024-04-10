import mongoose from 'mongoose';

const { Schema } = mongoose;

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  currency: {
    type: String,
    required: true,
    trim: true,
  },
  admins: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      img: {
        type: String,
        required: false,
        trim: true,
      },
    },
  ],
  fb: {
    type: String,
    required: false,
    trim: true,
  },
  ig: {
    type: String,
    required: false,
    trim: true,
  },
  yt: {
    type: String,
    required: false,
    trim: true,
  },
  customLink: {
    type: String,
    required: false,
    trim: true,
  },
});

storeSchema.index({ name: 1 });

const Store = mongoose.models.Store || mongoose.model('Store', storeSchema);
export default Store;
