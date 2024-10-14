import api from '../../../utils/api.js';
export const getWishlist = async () => {
  return await api.get('/user/wishlist');
};

export const addToWishlist = async (id) => {
  const data = { productId: id };
  return await api.put('/user/wishlist', data);
};
