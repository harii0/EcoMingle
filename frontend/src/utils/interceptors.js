import api from './api';
import store from '../redux/store';
import { logoutUser } from '../features/auth/authSlice';

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (
      error.response &&
      (error.response.status === 401 ||
        (error.response.status === 400 &&
          error.response.data.message?.errorCode === 'TOKEN_EXPIRED')) &&
      !originalConfig._retry &&
      !originalConfig.skipInterceptor
    ) {
      originalConfig._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          console.log('Attempting to refresh token...');
          const { data } = await api.post('/user/refresh_token');
          console.log('Refresh token success:', data);
          return api(originalConfig);
        } catch (_error) {
          console.error('Error during refresh token request:', _error);
          console.error('Error response:', _error.response);
          console.error('Error status:', _error.response?.status);

          // Make sure we're checking for all possible 401 scenarios
          if (
            _error.response?.status === 401 ||
            (_error.response?.status === 400 &&
              _error.response?.data?.message?.errorCode === 'TOKEN_EXPIRED')
          ) {
            localStorage.removeItem('user');
            localStorage.removeItem('vendor');
            store.dispatch(logoutUser());
          }
          return Promise.reject(_error);
        } finally {
          isRefreshing = false;
        }
      }

      let retryCount = 0;
      const maxRetries = 5;
      while (isRefreshing && retryCount < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        retryCount++;
      }

      if (retryCount === maxRetries) {
        return Promise.reject(new Error('Timeout waiting for token refresh'));
      }

      return api(originalConfig);
    }

    return Promise.reject(error);
  },
);
