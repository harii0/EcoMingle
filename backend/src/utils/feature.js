import { ProductItem } from '../features/product/models/product.model.js';
import { ApiError } from './ApiError.js';

//Reduce quantity of product item
export const reduceQuantity = async (productId, quantity) => {
  const product = await ProductItem.findOne({ productId: productId });
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  if (product.inventoryCount < quantity) {
    throw new ApiError(400, 'Insufficient inventory');
  }
  product.inventoryCount -= quantity;

  try {
    product.save();
  } catch (error) {
    console.log(error);
    throw new ApiError(500, 'Internal server error');
  }
};

//Increase quantity of product item
export const increaseQuantity = async (productId, quantity) => {
  const product = await ProductItem.findOne({ productId: productId });
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  product.inventoryCount += quantity;
  try {
    product.save();
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};
