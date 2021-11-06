import roleApi from 'api/roleApi';
import { Role, ListResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { roleActions } from './roleSlice';

function* fetchRoleList() {
  try {
    const response: ListResponse<Role> = yield call(roleApi.getAll);
    yield put(roleActions.fetchRoleListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch role list', error);
    yield put(roleActions.fetchRoleListFailed());
  }
}

export default function* roleSaga() {
  yield takeLatest(roleActions.fetchRoleList.type, fetchRoleList);
}
