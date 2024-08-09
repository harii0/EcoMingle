import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    productItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
  },
  { timestamps: true },
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
