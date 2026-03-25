// frontend/src/config/api/axiosInstance.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // only if using cookies/auth
});