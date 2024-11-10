import api from '../../utils/api.js';

export const login = async (data) => {
  return await api.post('/user/login', data, { skipInterceptor: true });
};

export const logout = async () => {
  return await api.post('/user/logout', { skipInterceptor: true });
};

export const register = async (data) => {
  return await api.post('/user/register', data, { skipInterceptor: true });
};

export const forgetPassword = async (data) => {
  console.log('data', data);
  return await api.post('/user/forgot-password', data, {
    skipInterceptor: true,
  });
};

export const resetPassword = async (data, token) => {
  return await api.post(`/user/reset-password?token=${token}`, data, {
    skipInterceptor: true,
  });
};

export const vendorRegister = async (data) => {
  return await api.post(`/vendor/register`, data, {
    skipInterceptor: true,
  });
};
