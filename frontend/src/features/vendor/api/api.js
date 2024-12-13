import api from '../../../utils/api';

export const vendorRegister = async (data) => {
  return await api.post(`/vendor/register`, data, {
    skipInterceptor: true,
  });
};

export const vendorLogin = async (data) => {
  return await api.post('/vendor/login', data, {
    skipInterceptor: true,
  });
};

export const getProfile = async (vId) => {
  return await api.get(`/vendor/profile/${vId}`);
};

export const getProducts = async (vId) => {
  return await api.get(`/vendor/products/${vId}`);
};
