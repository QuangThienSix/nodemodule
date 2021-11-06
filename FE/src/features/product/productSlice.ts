import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, PaginationParams, Product } from 'models';

export interface ProductState {
  loading: boolean;
  listProduct: Product[];
  listtop5Ratting: Product[];
  listtop5Price: Product[];
  listtop5Active: Product[];
  listtop5Recoment: Product[];
  pagination: PaginationParams;
  paginationtop5Ratting: PaginationParams;
  paginationtop5Price: PaginationParams;
  paginationtop5Active: PaginationParams;
  paginationtop5Recoment: PaginationParams;
}
const initialState: ProductState = {
  loading: false,
  listProduct: [],
  listtop5Ratting: [],
  listtop5Price: [],
  listtop5Active: [],
  listtop5Recoment: [],
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
  paginationtop5Ratting: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
  paginationtop5Price: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
  paginationtop5Active: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
  paginationtop5Recoment: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },

    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    getProductSuccess(state, action: PayloadAction<ListParams>): void {
      state.listProduct = action.payload.data;
      state.pagination = action.payload.pagination;
    },

    getTop5Ratting(state, action: PayloadAction<ListParams>): void {
      state.listtop5Ratting = action.payload.data;
      state.paginationtop5Ratting = action.payload.pagination;
    },

    getTop5Price(state, action: PayloadAction<ListParams>): void {
      state.listtop5Price = action.payload.data;
      state.paginationtop5Price = action.payload.pagination;
    },

    getTop5Active(state, action: PayloadAction<ListParams>): void {
      state.listtop5Active = action.payload.data;
      state.pagination = action.payload.pagination;
    },

    getTop5Recomment(state, action: PayloadAction<ListParams>): void {
      state.listtop5Recoment = action.payload.data;
      state.listtop5Recoment = action.payload.pagination;
    },
  },
});

// Action

export const productActios = productSlice.actions;

// Selector
export const selectProductList = (state: RootState) => state.product.listProduct;
export const selectProductPagination = (state: RootState) => state.product.pagination;

export const selectTop5Ratting = (state: RootState) => state.product.listtop5Ratting;
export const selectTop5RattingPagination = (state: RootState) =>
  state.product.paginationtop5Ratting;

export const selectTop5PriceList = (state: RootState) => state.product.listtop5Price;
export const selectTop5PricePagination = (state: RootState) => state.product.paginationtop5Price;

export const selectTop5RecommentList = (state: RootState) => state.product.listtop5Recoment;
export const selectTop5RecommentPagination = (state: RootState) =>
  state.product.paginationtop5Recoment;

export const selectTop5ActiveList = (state: RootState) => state.product.listtop5Active;
export const selectTop5ActivePagination = (state: RootState) => state.product.paginationtop5Active;

// // Reducer
const productReducer = productSlice.reducer;
export default productReducer;
