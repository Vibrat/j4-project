import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  authenticated: boolean;
  email?: string;
  token?: string;
}

export const intialAuthState: AuthState = {
  authenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: intialAuthState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthState>) => {
      const payload = action.payload
      state = {
        ...state,
        ...payload
      }
      return state
    },
    logout: (state: AuthState, action: PayloadAction<void>) => {
      return {
        ...intialAuthState
      }
    }
  }
})

export const selectAuth = (state: any) => state.auth
export const { login, logout } = authSlice.actions
export default authSlice.reducer