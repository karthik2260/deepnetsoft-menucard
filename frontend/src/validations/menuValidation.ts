import * as Yup from 'yup';

export const menuValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Menu name must be at least 2 characters')
    .max(50, 'Menu name must not exceed 50 characters')
    .required('Menu name is required'),
  description: Yup.string().trim().max(200, 'Max 200 characters'),
  parentId: Yup.string().nullable(),
});

export const itemValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Item name must be at least 2 characters')
    .max(100, 'Item name must not exceed 100 characters')
    .required('Item name is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price is required'),
  description: Yup.string().trim().max(200, 'Max 200 characters'),
});