import { Product } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createProduct, deleteProduct, fetchOneProduct, fetchProducts } from './productsThunks';

export interface ProductsState {
  items: Product[];
  product: Product | null;
  itemsFetching: boolean;
  oneFetching: boolean;
  isCreating: boolean;
  deletingProductId: string | null;
  isDeleting: boolean;
}

const initialState: ProductsState = {
  items: [],
  product: null,
  itemsFetching: false,
  oneFetching: false,
  isCreating: false,
  deletingProductId: null,
  isDeleting: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload: products }) => {
        state.itemsFetching = false;
        state.items = products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(fetchOneProduct.pending, (state) => {
        state.product = null;
        state.oneFetching = true;
      })
      .addCase(fetchOneProduct.fulfilled, (state, { payload: product }) => {
        state.product = product;
        state.oneFetching = false;
      })
      .addCase(fetchOneProduct.rejected, (state) => {
        state.oneFetching = false;
      });

    builder
      .addCase(deleteProduct.pending, (state, action) => {
        state.deletingProductId = action.meta.arg;
        state.isDeleting = true;
      }).addCase(deleteProduct.fulfilled, (state) => {
        state.deletingProductId = null;
        state.isDeleting = false;
      }).addCase(deleteProduct.rejected, (state) => {
        state.isDeleting = false;
    });
  },
  selectors: {
    selectProducts: (state) => state.items,
    selectProductsFetching: (state) => state.itemsFetching,
    selectProductCreating: (state) => state.isCreating,
    selectOneProduct: (state) => state.product,
    selectOneProductFetching: (state) => state.oneFetching,
    selectDeletingProductId: (state) => state.deletingProductId,
    selectProductDeleting: (state) => state.isDeleting,
  },
});

export const productsReducer = productsSlice.reducer;

export const {
  selectProducts,
  selectProductsFetching,
  selectProductCreating,
  selectOneProduct,
  selectOneProductFetching,
  selectDeletingProductId,
  selectProductDeleting,
} = productsSlice.selectors;
