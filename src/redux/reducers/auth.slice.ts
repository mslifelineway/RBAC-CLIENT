import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../actions";

export interface IPermission {
  _id: string;
  name: string;
  permissionUniqueKey: string;
  description: string;
}

export interface IRole {
  _id: string;
  name: string;
  description: string;
  permissions: IPermission[];
}

export type IAdministrator = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roles: string[] | IRole[];
  permissionUniqueKeys: string[];
};

export type IEmployee = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roles: string[];
  permissionUniqueKeys: string[];
};

export interface InitialState {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  error: string | null;
  data: IAdministrator | IEmployee | null;
}

const initialState: InitialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  error: null,
  data: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLoginTestData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isAuthenticating = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.isAuthenticated = true;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.isAuthenticating = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticating = false;
        state.isAuthenticated = false;
        state.data = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoginTestData } = authSlice.actions;
export default authSlice.reducer;
