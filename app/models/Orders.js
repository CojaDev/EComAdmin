import mongoose from 'mongoose';

const { Schema } = mongoose;

const ordersSchema = new Schema({
  recipient: [
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
      address: {
        street: {
          type: String,
          required: true,
          trim: true,
        },
        city: {
          type: String,
          required: true,
          trim: true,
        },
        state: {
          type: String,
          required: true,
          trim: true,
        },
        postalCode: {
          type: String,
          required: true,
          trim: true,
        },
        country: {
          type: String,
          required: true,
          trim: true,
        },
      },
    },
  ],

  products: [
    {
      productName: {
        type: String,
        require: true,
        trim: true,
      },
      price: {
        type: Number,
        require: true,
        trim: true,
      },
      expenses: {
        type: Number,
        require: true,
        trim: true,
      },
    },
  ],
  created: {
    type: Date, // Changed type to Date to store dates
    required: true,
    default: Date.now, // Set default value to current date
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const Orders = mongoose.models.Orders || mongoose.model('Orders', ordersSchema);
export default Orders;
