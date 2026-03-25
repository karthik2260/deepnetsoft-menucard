import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
console.log('API Base URL:', BASE_URL); // must print Render URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL || 'http://localhost:5001/api',
  headers: { 'Content-Type': 'application/json' },
});