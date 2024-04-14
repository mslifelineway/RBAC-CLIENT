import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { callApi } from "./callApi";
import { MakeApiCallProps } from "../../services";
import { ICreatePermission } from "../../types";

export const fetchPermissions = createAsyncThunk(
  "permissions",
  async (
    params: MakeApiCallProps<null>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<null>(params, thunkAPI)
);

export const createPermission = createAsyncThunk(
  "permissions/create",
  async (
    params: MakeApiCallProps<ICreatePermission>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<ICreatePermission>(params, thunkAPI)
);
