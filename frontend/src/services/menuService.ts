import { axiosInstance } from '../config/api/axiosInstance';
import type { MenuFormValues, ItemFormValues, ApiResponse, MenuNode, MenuItem } from '../types/menuTypes';

// ─── Menu ─────────────────────────────────────────────────────────────────
export const getMenus = () =>
  axiosInstance.get<ApiResponse<MenuNode[]>>('/menus');

export const createMenu = (data: MenuFormValues) =>
  axiosInstance.post<ApiResponse<MenuNode>>('/menus', data);

export const deleteMenu = (menuId: string) =>
  axiosInstance.delete<ApiResponse<null>>(`/menus/${menuId}`);

// ─── Items ────────────────────────────────────────────────────────────────
export const getItemsByMenu = (menuId: string) =>
  axiosInstance.get<ApiResponse<MenuItem[]>>(`/items/${menuId}`);

export const createItem = (data: ItemFormValues) =>
  axiosInstance.post<ApiResponse<MenuItem>>('/items', data);

export const deleteItem = (itemId: string) =>
  axiosInstance.delete<ApiResponse<null>>(`/items/${itemId}`);