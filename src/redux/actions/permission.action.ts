import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { callApi } from "./callApi";
import { MakeApiCallProps } from "../../services";

export const fetchPermissions = createAsyncThunk(
  "roles",
  async (
    params: MakeApiCallProps<null>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<null>(params, thunkAPI)
);
