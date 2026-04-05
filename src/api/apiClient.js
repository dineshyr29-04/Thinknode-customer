import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('tnc_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
);

export const submitOrder = (data) => apiClient.post('/api/customers/orders', data);
export const getOrders = (email) =>
  apiClient.get(`/api/orders?email=${encodeURIComponent(email)}`);
export const getOrderById = (id) => apiClient.get(`/api/customers/orders/${id}`);
export const uploadFiles = (formData) =>
  apiClient.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const sendContactMessage = (data) => apiClient.post('/api/customers/contact', data);

// Authentication endpoints
export const registerUser = (data) => apiClient.post('/api/customer/register', data);
export const loginUser = (credentials) => apiClient.post('/api/customer/login', credentials);

export default apiClient;
