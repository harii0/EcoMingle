import api from '../../../utils/api.js';

export const createOrder = async (data) => {
  return api.post('/order/', data);
};

export const processOrder = async (data) => {
  return api.post('/order/process-payment', data);
};

export const confirmOrder = async (data) => {
  return api.post('/order/confirm-payment', data);
};
