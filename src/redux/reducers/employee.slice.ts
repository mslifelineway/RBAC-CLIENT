import { createSlice } from "@reduxjs/toolkit";
import { assignRoles, createEmployee, fetchEmployees } from "../actions";
import { IEmployee, IRole } from "../../types";

interface InitialState {
  loading: boolean;
  isCreating: boolean;
  isRoleAssigning: boolean;
  error: string | null;
  data: IEmployee[];
}

const initialState: InitialState = {
  loading: false,
  isCreating: false,
  isRoleAssigning: false,
  error: null,
  data: [],
};

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createEmployee.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isCreating = false;
        state.data.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      .addCase(assignRoles.pending, (state) => {
        state.isRoleAssigning = true;
        state.error = null;
      })
      .addCase(assignRoles.fulfilled, (state, action) => {
        state.isRoleAssigning = false;
        const data = state.data.find((e) => e._id === action.payload._id);
        if (data) {
          data.roles = action.payload.roles;
        }
      })
      .addCase(assignRoles.rejected, (state, action) => {
        state.isRoleAssigning = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = employeeSlice.actions;
export default employeeSlice.reducer;
