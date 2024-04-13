import { createAsyncThunk } from "@reduxjs/toolkit";
import { MakeApiCallProps } from "../../services";
import { CreateAccount } from "../../types";
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { callApi } from "./callApi";

export const createAccount = createAsyncThunk(
  "accounts/create",
  async (
    params: MakeApiCallProps<CreateAccount>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) => await callApi<CreateAccount>(params, thunkAPI)
);
