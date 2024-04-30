import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setupAxiosInterceptors(store) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const { token } = state.auth;
      if (token) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      throw new Error('You must login first');
    }

    return Promise.reject(error);
  }
);
