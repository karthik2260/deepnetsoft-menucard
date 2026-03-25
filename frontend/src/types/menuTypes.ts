export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  menuId: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuNode {
  _id: string;
  name: string;
  description?: string;
  parentId: string | null;
  children: MenuNode[];
}

export interface MenuFormValues {
  name: string;
  description: string;
  parentId: string | null;
}

export interface ItemFormValues {
  name: string;
  price: number | string;
  menuId: string;
  description?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}