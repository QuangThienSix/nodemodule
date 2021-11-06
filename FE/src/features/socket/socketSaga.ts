import { PayloadAction } from '@reduxjs/toolkit';
import { put, take, takeLatest } from 'redux-saga/effects';
import { socketActions, State } from './socketSlice';

function* fetchSocket() {
  try {
    const action: PayloadAction<State> = yield take([socketActions.getMessage.type]);
    yield put(socketActions.getMessageSuccess(action.payload));
  } catch (error: any) {
    console.log('Failed to message socket list', error);
    yield put(socketActions.getMessageFailed());
  }
}

export default function* socketSaga() {
  yield takeLatest(socketActions.getMessage.type, fetchSocket);
}
