import { createSlice } from "@reduxjs/toolkit";
import { createPermission, fetchPermissions } from "../actions";
import { IPermission } from "../../types";

interface InitialState {
  loading: boolean;
  isCreating: boolean;
  error: string | null;
  data: IPermission[];
}

const initialState: InitialState = {
  loading: false,
  isCreating: false,
  error: null,
  data: [],
};

const permissionSlice = createSlice({
  name: "permissionSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPermission.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.isCreating = false;
        state.data.push(action.payload);
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = permissionSlice.actions;
export default permissionSlice.reducer;
