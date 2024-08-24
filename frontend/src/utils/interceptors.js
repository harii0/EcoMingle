import api from './api';

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      try {
        await api.post('/user/refresh_token');
        console.log('route hitted');
        console.log(originalConfig);
        return api(originalConfig);
      } catch (_error) {
        // Handle failed refresh token scenario (e.g., logout user)
        api.defaults.headers.common['Authorization'] = null;
        console.log(_error);
        return Promise.reject(_error);
      }
    }
    console.log('error', error);
    return Promise.reject(error);
  },
);
