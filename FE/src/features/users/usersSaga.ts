import { call, put, takeLatest, debounce } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import usersApi from 'api/usersApi';
import { ListParams, ListResponse, Users } from 'models';
import { usersAction } from './usersSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Users> = yield call(usersApi.getAllUsers, action.payload);
    yield put(usersAction.fetchUsersListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(usersAction.fetchStudentListFailed());
  }
}
function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(usersAction.setFilter(action.payload));
}

export default function* usersSaga() {
  yield takeLatest(usersAction.fetchUsersList, fetchStudentList);

  yield debounce(500, usersAction.setFilterWithDebounce.type, handleSearchDebounce);
}
