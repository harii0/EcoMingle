import api from '../../../utils/api';

export const addcart = async (data) => {
  return await api.put('/user/cart', data);
};

export const removeCart = async (data) => {
  return await api.delete('/user/cart', data);
};

export const getCart = async () => {
  return await api.get('/user/cart');
};
