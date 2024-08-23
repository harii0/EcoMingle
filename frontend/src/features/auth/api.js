import api from '../../utils/api.js';

export const login = async (data) => {
  return await api.post('/user/login', data);
};

export const logout = async () => {
  return await api.post('/user/logout');
};

export const register = async (data) => {
  return await api.post('/user/register', data);
};

export const forgetPassword = async (data) => {
  console.log('data', data);
  return await api.post('/user/forgot-password', data);
};

export const resetPassword = async (data, token) => {
  return await api.post(`/user/reset-password?token=${token}`, data);
};
