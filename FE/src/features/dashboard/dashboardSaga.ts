import { all, call, takeLatest } from '@redux-saga/core/effects';
// import { ListResponse ,Users } from 'models';
import { dashboardAction } from './dashboardSlice';

function* fetchStatistics() {}
function* fetchListUsers() {
    // const {}: ListResponse<Users> =
}

function* fetchDashboardData() {
  try {
    yield all([call(fetchStatistics), call(fetchListUsers)]);
  } catch (error) {
    console.log('Failed to fetch dashboard data', error);
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardAction.fetchData.type, fetchDashboardData);
}
