import React, { useEffect } from "react";
import { PrivateLayout } from "../components";
import { AppDispatch, useAppSelector } from "../redux/store";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchPermissions } from "../redux/actions";
import { MakeApiCallProps } from "../services";
import { endpoints } from "../constants";
import { EBaseURLs, EHttpMethods } from "../services/axios";

export const Permissions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useAppSelector((state) => state.permissionReducer);

  useEffect(() => {
    const callProps: MakeApiCallProps<null> = {
      payload: null,
      endpoint: endpoints.permissions,
      method: EHttpMethods.GET,
      baseURL: EBaseURLs.PERMISSION,
    };
    dispatch(fetchPermissions(callProps));
  }, []);

  return (
    <PrivateLayout>
      <Typography variant="h4">Permissions</Typography>
      {data.map((r) => r.name)}
    </PrivateLayout>
  );
};
