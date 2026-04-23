import axios from 'axios';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost/3000').replace(/\/+$/, '');
console.log('API base URL:', BASE_URL);

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('tnc_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.code === 'ECONNABORTED') {
      console.error('API request timed out:', err.message);
    } else if (err.request && !err.response) {
      console.error('No response received from API. Possible network/CORS issue or backend down.', err.message);
    } else if (err.response) {
      console.error('API responded with error:', err.response.status, err.response.data);
    } else {
      console.error('API error:', err.message);
    }
    return Promise.reject(err);
  },
);

export const submitOrder = (data) => apiClient.post('/api/customer/orders', data);
export const getOrders = (email) =>
  apiClient.get(`/api/customer/my-orders?email=${encodeURIComponent(email)}`);
export const getOrderById = (id) => apiClient.get(`/api/customer/orders/${id}`);
export const uploadFiles = (formData) =>  
  apiClient.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const sendContactMessage = (data) => apiClient.post('/api/customer/contact', data);

// Authentication endpoints
export const registerUser = (data) => apiClient.post('/api/customer/register', data);
export const loginUser = (credentials) => apiClient.post('/api/customer/login', credentials);

export default apiClient;
