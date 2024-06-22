import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    discount: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;

const productItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    SKU: { type: String, unique: true, required: true },
    inventoryCount: { type: Number, required: true },
    // other fields
}, { timestamps: true });

const ProductItem = mongoose.model('ProductItem', productItemSchema);

export { ProductItem };
