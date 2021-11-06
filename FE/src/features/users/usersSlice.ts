import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Users } from 'models';

export interface UsersState {
  loading: boolean;
  list: Users[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: UsersState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 1,
  },
  pagination: {
    _page: 1,
    _limit: 1,
    _totalRows: 1,
  },
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchUsersListSuccess(state, action: PayloadAction<ListResponse<Users>>) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchStudentListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// Action

export const  usersAction = userSlice.actions;
export const selectUsersList = (state: RootState) => state.users.list;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersFilter = (state: RootState) => state.users.filter;
export const selectUsersPagination = (state: RootState) => state.users.pagination;


// Selecttors

// // Reducer
const usersReducer = userSlice.reducer;
export default usersReducer;
