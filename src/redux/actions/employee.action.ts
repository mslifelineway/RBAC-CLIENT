import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { callApi } from "./callApi";
import { MakeApiCallProps } from "../../services";
import { ICreateEmployee } from "../../types";

export const fetchEmployees = createAsyncThunk(
  "employees",
  async (
    params: MakeApiCallProps<null>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<null>(params, thunkAPI)
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (
    params: MakeApiCallProps<ICreateEmployee>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<ICreateEmployee>(params, thunkAPI)
);

export const assignRoles = createAsyncThunk(
  "employees/assignRoles",
  async (
    params: MakeApiCallProps<string[]>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<string[]>(params, thunkAPI)
);
