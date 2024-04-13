import {
  AsyncThunkConfig,
  GetThunkAPI,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { MakeApiCallProps, makeApiCall } from "../../services";
import axios from "axios";
import { toast } from "react-toastify";

export const callApi = async <T extends unknown>(
  params: MakeApiCallProps<T>,
  { rejectWithValue, fulfillWithValue }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const res = await makeApiCall(params);
    return fulfillWithValue(res.data.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError and extract the error message
      toast.error(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    } else {
      // Handle other types of errors
      throw error; // Rethrow the error for Redux Toolkit to handle
    }
  }
};
