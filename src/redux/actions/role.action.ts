import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { callApi } from "./callApi";
import { MakeApiCallProps } from "../../services";
import { ICreateRole } from "../../types";

export const fetchRoles = createAsyncThunk(
  "roles",
  async (
    params: MakeApiCallProps<null>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<null>(params, thunkAPI)
);

export const createRole = createAsyncThunk(
  "roles/create",
  async (
    params: MakeApiCallProps<ICreateRole>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<ICreateRole>(params, thunkAPI)
);

export const assignPermissions = createAsyncThunk(
  "roles/assignPermissions",
  async (
    params: MakeApiCallProps<string[]>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<string[]>(params, thunkAPI)
);
