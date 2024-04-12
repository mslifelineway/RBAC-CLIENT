import { createSlice } from "@reduxjs/toolkit";
import { createAccount } from "../actions";

interface InitialState {
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = accountSlice.actions;
export default accountSlice.reducer;
