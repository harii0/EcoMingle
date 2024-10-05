import api from './api';
import store from '../redux/store';
import { logoutUser } from '../features/auth/authSlice';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalConfig.headers['Authorization'] = 'Bearer ' + token;
            return api(originalConfig);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalConfig._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post('/user/refresh_token');
        const { token } = data;
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        processQueue(null, token);
        return api(originalConfig);
      } catch (_error) {
        processQueue(_error, null);
        api.defaults.headers.common['Authorization'] = null;
        console.log(_error);
        store.dispatch(logoutUser());
        return Promise.reject(_error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
