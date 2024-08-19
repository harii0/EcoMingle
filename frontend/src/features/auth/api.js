import api from '../../utils/api.js';

export const login = async (data) => {
  return await api.post('/user/login', data);
};
