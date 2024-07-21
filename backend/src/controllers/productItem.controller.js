import Product, { ProductItem } from '../models/product.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const createProductItem = asyncHandler(async (req, res) => {
  const { SKU, productId } = req.body;
  const inventoryCount = Number.parseInt(req.body.inventoryCount);
  if (!(productId || SKU || inventoryCount)) {
    throw new ApiError(400, 'please provide all values');
  }
  const newProductItem = await ProductItem.create({
    productId,
    SKU,
    inventoryCount,
  });

  const product = await Product.findById(productId).populate('productItems');
  console.log('product', product);
  product.productItems.push(newProductItem._id);
  await product.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { product }, 'item created successfully'));
});
//update product item
const updateProductItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { SKU, inventoryCount } = req.body;
  const productItem = await ProductItem.findById(id);
  if (!productItem) {
    throw new ApiError(404, 'Product item not found');
  }
  productItem.SKU = SKU || productItem.SKU;
  productItem.inventoryCount = inventoryCount || productItem.inventoryCount;
  await productItem.save();
  const updatedProductItem = await ProductItem.findById(id);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { updatedProductItem },
        'Product item updated successfully',
      ),
    );
});
//delete product item
const deleteProductItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const productItem = await ProductItem.findById(id);
  if (!productItem) {
    throw new ApiError(404, 'Product item not found');
  }
  await productItem.deleteOne();
  return res
    .status(200)
    .json(new ApiResponse(200, 'Product item deleted successfully'));
});
export { createProductItem, updateProductItem, deleteProductItem };
