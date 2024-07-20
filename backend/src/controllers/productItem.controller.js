import { ProductItem, ProductItem } from '../models/product.model';
import asyncHandler from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

//get product
const createProductItem = asyncHandler(async (req, res) => {
  const { SKU, inventoryCount } = req.body;
  if (!(productId || SKU || inventoryCount)) {
    throw new ApiError(400, 'please provide all values');
  }
  const newProductItem = await ProductItem.create({
    productId,
    SKU,
    inventoryCount,
  });
  await newProductItem.save();
  return res
    .status(200)
    .json(
      new ApiResponse(200, { newProductItem }, 'item created successfully'),
    );
});
//update product item

//delete product item

export { createProductItem };
