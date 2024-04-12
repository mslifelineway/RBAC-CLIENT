import { createAsyncThunk } from "@reduxjs/toolkit";
import { MakeApiCallProps, makeApiCall } from "../../services";
import { CreateAccount } from "../../types";
import axios from "axios";

export const createAccount = createAsyncThunk(
  "accounts/create",
  async (
    params: MakeApiCallProps<CreateAccount>,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const res = await makeApiCall(params);
      return fulfillWithValue(res.data.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Handle AxiosError and extract the error message
        return rejectWithValue(error.response?.data?.message || error.message);
      } else {
        // Handle other types of errors
        throw error; // Rethrow the error for Redux Toolkit to handle
      }
    }
  }
);
