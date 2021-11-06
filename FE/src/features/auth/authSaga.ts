import { call, fork, take } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import userApi from 'api/usersApi';
import { push } from 'connected-react-router';
import { ListResponses, Users } from 'models';
import { put } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import { addSingle, getItem, removeItem, setItem } from 'utils';

function* handleLogin(payload: LoginPayload) {
  try {
    const response: ListResponses<Users> = yield call(userApi.postLogin, payload);
    setItem('users', response.data);

    yield put(authActions.loginSuccess(response.data));
    addSingle('success', response.message);
    //   redirest to admin page
    yield put(push('/admin/dashboard'));
  } catch (error: any) {
    yield put(authActions.loginFailed(error?.data.error.message));
    yield put(push('/login'));
  }
}

function* handleLogout() {
  removeItem('users');
  //   redirest to login page
  yield put(push('/'));
}

function* watchLogimFlow() {
  while (true) {
    const { accessToken } = getItem('users');
    const isLoggedIn = Boolean(accessToken);

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take([
        authActions.login.type,
        authActions.register.type,
        authActions.verify.type,
      ]);
      if (action.type === authActions.login.type) {
        yield fork(handleLogin, action.payload);
      }
      if (action.type === authActions.register.type) {
        yield fork(handleRegister, action.payload);
      }
      if (action.type === authActions.verify.type) {
        yield fork(handleVerify, action.payload);
      }
    }

    yield take([
      authActions.logout.type,
      authActions.loginFailed.type,
      authActions.registerFailed.type,
      authActions.verifyFailed.type,
      authActions.registerSuccess.type,
      authActions.verifySuccess.type,
    ]);
    yield call(handleLogout);
  }
}
function* handleRegister(payload: LoginPayload) {
  try {
    const response: ListResponses<Users> = yield call(userApi.postsignup, payload);
    yield put(authActions.registerSuccess(response.data));
    yield put(push(`/verify/${response.data.email}`));
    addSingle('success', response.message);
  } catch (error: any) {
    yield put(authActions.registerFailed(error.data.error.message));
    yield put(push('/regis'));
  }
}
function* handleVerify(payload: LoginPayload) {
  try {
    const response: ListResponses<Users> = yield call(userApi.postverify, payload);
    yield put(authActions.verifySuccess(response.data));
    yield put(push('/login'));
    addSingle('success', response.message);
  } catch (error: any) {
    yield put(authActions.verifyFailed(error?.data?.error?.message));
    yield put(push('/verify'));
  }
}
export default function* authSaga() {
  yield fork(watchLogimFlow);
}
