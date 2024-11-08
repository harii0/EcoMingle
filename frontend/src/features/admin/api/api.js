import api from '../../../utils/api.js';

export const getAllUsers = async () => {
  return await api.get('/admin/users');
};

export const getUserById = async (id) => {
  return await api.get(`/admin/users/${id}`);
};

export const getAllProducts = async () => {
  return await api.get('/admin/products');
};

export const getProductById = async (id) => {
  return await api.get(`/admin/products/${id}`);
};
