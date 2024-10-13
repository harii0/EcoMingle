import api from '../../../utils/api.js';
export const getWishlist = async () => {
  return await api.get('/user/wishlist');
};

export const addToWishlist = async () => {
  return await api.put('/user/wishlist');
};
