export const ROUTES = {
  HOME: '/',
  MENU: '/menu',
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const NAV_LINKS = [
  { label: 'HOME',              path: '/' },
  { label: 'MENU',              path: '/menu' },
  { label: 'MAKE A RESERVATION',path: '/reservation' },
  { label: 'CONTACT US',        path: '/contact' },
];