import api from '../../../utils/api';

export const addcart = async (data) => {
  return await api.put('/user/cart', data);
};

export const removeCart = async (productId) => {
  return await api.delete(`/user/cart/${productId}`);
};

export const getCart = async () => {
  return await api.get('/user/cart');
};
