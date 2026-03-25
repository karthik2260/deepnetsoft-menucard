// frontend/src/config/api/axiosInstance.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
console.log('API Base URL:', BASE_URL); // must print your Render URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL || 'http://localhost:5001/api',
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message, error.config?.url);
    return Promise.reject(error);
  }
);