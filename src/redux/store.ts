import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { rootReducer } from "./reducer";
import Cookies from "js-cookie";
import { CURRENT_USER } from "../constants";

const persistedState = Cookies.get(CURRENT_USER)
  ? JSON.parse(Cookies.get(CURRENT_USER)!)
  : null;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    authReducer: {
      isAuthenticating: false,
      isAuthenticated: Boolean(persistedState),
      error: null,
      data: persistedState,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const RequestStatus = {
  FULFILLED: "fulfilled",
  PENDING: "pending",
  REJECTED: "rejected",
};
