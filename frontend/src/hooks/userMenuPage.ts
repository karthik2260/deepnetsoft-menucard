import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import { menuValidationSchema, itemValidationSchema } from '../validations/menuValidation';
import { getMenus, createMenu, getItemsByMenu, createItem, deleteMenu, deleteItem } from '../services/menuService';
import { showToastMessage } from '../utils/toast';
import type { MenuNode, MenuItem, MenuFormValues, ItemFormValues } from '../types/menuTypes';

interface ErrorResponse {
  message?: string;
  error?: string;
}

const menuInitialValues: MenuFormValues = { name: '', description: '', parentId: null };
const itemInitialValues: ItemFormValues  = { name: '', price: '', menuId: '', description: '' };

export const useMenuPage = () => {
  const [menus,           setMenus]           = useState<MenuNode[]>([]);
  const [activeMenuId,    setActiveMenuId]    = useState<string | null>(null);
  const [activeMenu,      setActiveMenu]      = useState<MenuNode | null>(null);
  const [items,           setItems]           = useState<MenuItem[]>([]);
  const [isLoadingMenus,  setIsLoadingMenus]  = useState(false);
  const [isLoadingItems,  setIsLoadingItems]  = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  // ─── Helpers ────────────────────────────────────────────────────────────
  const flattenMenus = useCallback(
    (nodes: MenuNode[], depth = 0): Array<MenuNode & { depth: number }> => {
      const result: Array<MenuNode & { depth: number }> = [];
      nodes.forEach((node) => {
        result.push({ ...node, depth });
        if (node.children?.length) result.push(...flattenMenus(node.children, depth + 1));
      });
      return result;
    },
    []
  );

  const findMenuById = useCallback((nodes: MenuNode[], id: string): MenuNode | null => {
    for (const node of nodes) {
      if (node._id === id) return node;
      const found = findMenuById(node.children, id);
      if (found) return found;
    }
    return null;
  }, []);

  const handleAxiosError = (error: unknown, fallback: string) => {
    if (axios.isAxiosError(error)) {
      const e = error as AxiosError<ErrorResponse>;
      showToastMessage(e.response?.data?.message || e.response?.data?.error || fallback, 'error');
    }
  };

  // ─── Fetch menus ─────────────────────────────────────────────────────────
  const fetchMenus = useCallback(async () => {
    try {
      setIsLoadingMenus(true);
      const response = await getMenus();
      const data = response.data.data;
      setMenus(data);
      if (data.length > 0 && !activeMenuId) {
        setActiveMenuId(data[0]._id);
        setActiveMenu(data[0]);
      }
    } catch (error) {
      handleAxiosError(error, 'Failed to fetch menus');
    } finally {
      setIsLoadingMenus(false);
    }
  }, [activeMenuId]);

  // ─── Fetch items ──────────────────────────────────────────────────────────
  const fetchItems = useCallback(async (menuId: string) => {
    try {
      setIsLoadingItems(true);
      const response = await getItemsByMenu(menuId);
      setItems(response.data.data);
    } catch (error) {
      handleAxiosError(error, 'Failed to fetch items');
      setItems([]);
    } finally {
      setIsLoadingItems(false);
    }
  }, []);

  // ─── Interactions ─────────────────────────────────────────────────────────
  const handleMenuClick = useCallback((menuId: string) => {
    setActiveMenuId(menuId);
    setActiveMenu(findMenuById(menus, menuId));
    fetchItems(menuId);
  }, [menus, findMenuById, fetchItems]);

  const handleDeleteMenu = useCallback(async (menuId: string) => {
    try {
      await deleteMenu(menuId);
      showToastMessage('Menu deleted successfully', 'success');
      setActiveMenuId(null);
      setActiveMenu(null);
      setItems([]);
      fetchMenus();
    } catch (error) {
      handleAxiosError(error, 'Failed to delete menu');
    }
  }, [fetchMenus]);

  const handleDeleteItem = useCallback(async (itemId: string) => {
    try {
      await deleteItem(itemId);
      showToastMessage('Item deleted successfully', 'success');
      if (activeMenuId) fetchItems(activeMenuId);
    } catch (error) {
      handleAxiosError(error, 'Failed to delete item');
    }
  }, [activeMenuId, fetchItems]);

  // ─── Menu Formik ──────────────────────────────────────────────────────────
  const menuFormik = useFormik<MenuFormValues>({
    initialValues: menuInitialValues,
    validationSchema: menuValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await createMenu({ ...values, parentId: values.parentId || null });
        showToastMessage(response.data.message, 'success');
        resetForm();
        setIsMenuModalOpen(false);
        fetchMenus();
      } catch (error) {
        handleAxiosError(error, 'Failed to create menu');
      }
    },
  });

  // ─── Item Formik ──────────────────────────────────────────────────────────
  const itemFormik = useFormik<ItemFormValues>({
    initialValues: { ...itemInitialValues, menuId: activeMenuId || '' },
    validationSchema: itemValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await createItem({
          ...values,
          menuId: activeMenuId || values.menuId,
          price: Number(values.price),
        });
        showToastMessage(response.data.message, 'success');
        resetForm();
        setIsItemModalOpen(false);
        if (activeMenuId) fetchItems(activeMenuId);
      } catch (error) {
        handleAxiosError(error, 'Failed to create item');
      }
    },
  });

  // ─── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => { fetchMenus(); }, []);
  useEffect(() => { if (activeMenuId) fetchItems(activeMenuId); }, [activeMenuId]);

  return {
    menus,
    flatMenuList: flattenMenus(menus),
    activeMenuId,
    activeMenu,
    items,
    isLoadingMenus,
    isLoadingItems,
    isMenuModalOpen,
    isItemModalOpen,
    menuFormik,
    itemFormik,
    setIsMenuModalOpen,
    setIsItemModalOpen,
    handleMenuClick,
    handleDeleteMenu,
    handleDeleteItem,
  };
};