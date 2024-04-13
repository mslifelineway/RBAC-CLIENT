import { createSlice } from "@reduxjs/toolkit";
import { fetchRoles } from "../actions";
import { IRole } from "../../types";

interface InitialState {
  loading: boolean;
  error: string | null;
  data: IRole[];
}

const initialState: InitialState = {
  loading: false,
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
      });
  },
});

export const {} = roleSlice.actions;
export default roleSlice.reducer;
