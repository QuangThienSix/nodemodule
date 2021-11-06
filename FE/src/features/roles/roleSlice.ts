import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Role, ListResponse } from 'models';

export interface RoleState {
  loading: boolean;
  list: Role[];
}

const initialState: RoleState = {
  loading: false,
  list: [],
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    fetchRoleList(state) {
      state.loading = true;
    },
    fetchRoleListSuccess(state, action: PayloadAction<ListResponse<Role>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchRoleListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const roleActions = roleSlice.actions;

// Selectors
export const selectRoleList = (state: RootState) => state.role.list;

export const selectRoleMap = createSelector(selectRoleList, (roleList) =>
  roleList.reduce((map: { [key: string]: Role }, role) => {
    map[role.role_id] = role;
    return map;
  }, {})
);

export const selectRoleOptions = createSelector(selectRoleList, (roleList) =>
  roleList.map((role) => ({
    label: role.role_id,
    value: role.role_name,
  }))
);

// Reducer
const roleReducer = roleSlice.reducer;
export default roleReducer;
