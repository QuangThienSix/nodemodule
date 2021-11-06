import { takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import productApi from 'api/productApi';
import { ListParams, ListResponse, Product } from 'models';
import { all, call, put } from 'redux-saga/effects';
import { productActios } from './productSlice';

function* fetchProduct() {
  const data: ListResponse<Product> = yield call(productApi.getProduct, {
    _page: 1,
    _limit: 5,
  });
  yield put(productActios.getProductSuccess(data));
}
function* fetchProductTop5Ratting() {
  const data: ListResponse<Product> = yield call(productApi.getProductTop5Rating, {
    _page: 1,
    _limit: 5,
  });
  yield put(productActios.getTop5Ratting(data));
}
function* fetchTop5PriceList() {
  const data: ListResponse<Product> = yield call(productApi.getProductTop5Price, {
    _page: 1,
    _limit: 5,
  });
  yield put(productActios.getTop5Price(data));
}
function* fetchTop5RecommentList() {
  const data: ListResponse<Product> = yield call(productApi.getProductTop5Comments, {
    _page: 1,
    _limit: 5,
  });
  yield put(productActios.getTop5Recomment(data));
}
function* fetchTop5ActiveList() {
  const data: ListResponse<Product> = yield call(productApi.getProductTop5Active, {
    _page: 1,
    _limit: 5,
  });
  yield put(productActios.getTop5Active(data));
}

function* fetchList(action: PayloadAction<ListParams>) {
  try {
    yield all([
      call(fetchProduct),
      call(fetchProductTop5Ratting),
      call(fetchTop5PriceList),
      // call(fetchTop5RecommentList),
      call(fetchTop5ActiveList),
    ]);
    yield put(productActios.fetchDataSuccess());
  } catch (error) {
    console.log('Failed to fetch product data', error);
    yield put(productActios.fetchDataFailed());
  }
}

export default function* productSaga() {
  yield takeLatest(productActios.fetchData.type, fetchList);
}
