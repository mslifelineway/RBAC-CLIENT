import { createAsyncThunk } from "@reduxjs/toolkit";
import { MakeApiCallProps } from "../../services";
import { ILogin } from "../../types";
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { callApi } from "./callApi";

export const login = createAsyncThunk(
  "auth/login",
  async (
    params: MakeApiCallProps<ILogin>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<ILogin>(params, thunkAPI)
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (
    params: MakeApiCallProps<null>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<null>(params, thunkAPI)
);
