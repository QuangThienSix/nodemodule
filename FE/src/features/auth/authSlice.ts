import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Users } from 'models/users';

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  errormessage: string;
  currentUser?: Users;
}

export interface LoginPayload {
  username: string;
  password: string;
  currentUser?: Users;
}
export interface VerifyPayload {
  email: string;
  tokenMail: string;
}
export interface RegisterPayload {
  currentUser?: Users;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  errormessage: '',
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<Users>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },

    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
      state.errormessage = action.payload;
    },

    register(state, action: PayloadAction<RegisterPayload>) {
      state.logging = true;
    },

    registerSuccess(state, action: PayloadAction<Users>) {
      state.logging = true;
      state.errormessage = '';
    },

    registerFailed(state, action: PayloadAction<string>) {
      state.logging = true;
      state.errormessage = action.payload;
    },

    verify(state, action: PayloadAction<VerifyPayload>) {
      state.logging = true;
    },

    verifySuccess(state, action: PayloadAction<Users>) {
      state.logging = true;
      state.errormessage = '';
    },

    verifyFailed(state, action: PayloadAction<string>) {
      state.logging = true;
      state.errormessage = action.payload;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Action
export const authActions = authSlice.actions;

// Selecttors

export const selecttorsIsLoggedIn = (state: { auth: { isLoggedIn: any } }) => state.auth.isLoggedIn;
export const selecttorsIslogging = (state: { auth: { logging: any } }) => state.auth.logging;
export const selecttorsCurrentUser = (state: { auth: { currentUser: Users } }) =>
  state.auth.currentUser;

export const selecttorsErrorMessage = (state: RootState) => state.auth.errormessage;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
