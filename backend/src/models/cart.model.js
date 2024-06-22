import mongoose from 'mongoose';

//cart
const cartItemSchema = new Schema({
    productItem: { type: Schema.Types.ObjectId, ref: 'ProductItem' },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    }
});

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [cartItemSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart
