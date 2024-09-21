import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Product, ProductMutation } from '../../types';
import { RootState } from '../../app/store';

export const fetchProducts = createAsyncThunk<Product[], string | undefined>(
  'products/fetchAll',
  async (categoryId) => {
    const { data: products } = await axiosApi.get<Product[]>(`/products`, { params: { category: categoryId } });
    return products;
  },
);

export const createProduct = createAsyncThunk<void, ProductMutation, {state: RootState}>('products/create', async (productMutation, {getState}) => {
  const token = getState().users.user?.token;

  if (!token) {
    throw new Error('No token found');
  }

  const formData = new FormData();

  const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
  keys.forEach((key) => {
    const value = productMutation[key];
    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosApi.post('/products', formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
});

export const fetchOneProduct = createAsyncThunk<Product, string>('products/fetchOne', async (id) => {
  const { data: product } = await axiosApi.get<Product>(`/products/${id}`);
  return product;
});

export const deleteProduct = createAsyncThunk<void, string, {state: RootState}>(
  'products/delete',
  async (id, {getState}) => {
    const token = getState().users.user?.token;

    if (!token) {
      throw new Error('No token found');
    }

    await axiosApi.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
);
