import api from '../../../utils/api.js';

export const getProfile = async () => {
  return await api.get('/user/profile');
};

export const getOrders = async () => {
  return await api.get('/order/my_orders');
};

export const updateProfile = async (data) => {
  return await api.post('/user/update', data);
};
