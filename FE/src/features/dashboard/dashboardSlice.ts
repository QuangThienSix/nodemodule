import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Users } from 'models/users';

export interface DashboardStatistics {
  sellCount: number;
  buyCount: number;
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  ListUsers: Users[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    buyCount: 0,
    sellCount: 0,
  },
  ListUsers: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
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

    setStatistice(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
  },
});

// Actions
export const dashboardAction = dashboardSlice.actions;
// Selecttor
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectDashboardListUsers = (state: RootState) => state.dashboard.ListUsers;
// Reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
