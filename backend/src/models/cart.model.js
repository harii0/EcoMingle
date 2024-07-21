import mongoose from 'mongoose';

//cart
const cartItemSchema = new mongoose.Schema({
  productItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [cartItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
