import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
}, { timestamps: true });

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

const orderSchema = new Schema({
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem', required: true }],
    shippingAddress1: { type: String, required: true },
    shippingAddress2: { type: String },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    totalPrice: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateOrdered: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
export { OrderItem };
