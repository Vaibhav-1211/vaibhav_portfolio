import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Important for refresh token cookie
});

// We will attach the access token dynamically from the useAuth hook,
// but for interceptors that need to retry, we need a way to get the token.
// A common pattern is to keep a closure reference to it, or just use the hook context.
// Let's set a global interceptor that grabs it if we store it.
let currentAccessToken = '';

export const setAccessToken = (token: string) => {
  currentAccessToken = token;
};

api.interceptors.request.use((config) => {
  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/login' && originalRequest.url !== '/auth/refresh') {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
        setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        
        // Custom event for useAuth hook to update its state
        window.dispatchEvent(new CustomEvent('auth:token-refreshed', { detail: data.accessToken }));

        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, user is logged out
        setAccessToken('');
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
