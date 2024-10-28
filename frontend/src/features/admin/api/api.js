import api from '../../../utils/api.js';

export const getAllUsers = async () => {
  return await api.get('/admin/users');
};
