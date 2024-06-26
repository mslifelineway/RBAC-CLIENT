import { createSlice } from "@reduxjs/toolkit";
import { assignPermissions, createRole, fetchRoles } from "../actions";
import { IRole } from "../../types";

interface InitialState {
  loading: boolean;
  isCreating: boolean;
  isPermissionAssigning: boolean;
  error: string | null;
  data: IRole[];
}

const initialState: InitialState = {
  loading: false,
  isCreating: false,
  isPermissionAssigning: false,
  error: null,
  data: [],
};

const roleSlice = createSlice({
  name: "roleSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createRole.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.isCreating = false;
        state.data.push(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      .addCase(assignPermissions.pending, (state) => {
        state.isPermissionAssigning = true;
        state.error = null;
      })
      .addCase(assignPermissions.fulfilled, (state, action) => {
        state.isPermissionAssigning = false;
        const data = state.data.find((e) => e._id === action.payload._id);
        if (data) {
          data.permissions = action.payload.permissions;
        }
      })
      .addCase(assignPermissions.rejected, (state, action) => {
        state.isPermissionAssigning = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = roleSlice.actions;
export default roleSlice.reducer;
