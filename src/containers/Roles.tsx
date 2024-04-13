import React, { useEffect } from "react";
import { PrivateLayout } from "../components";
import { AppDispatch, useAppSelector } from "../redux/store";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchRoles } from "../redux/actions";
import { MakeApiCallProps } from "../services";
import { endpoints } from "../constants";
import { EBaseURLs, EHttpMethods } from "../services/axios";

export const Roles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useAppSelector((state) => state.roleReducer);

  useEffect(() => {
    const callProps: MakeApiCallProps<null> = {
      payload: null,
      endpoint: endpoints.roles,
      method: EHttpMethods.GET,
      baseURL: EBaseURLs.ROLE,
    };
    dispatch(fetchRoles(callProps));
  }, []);

  return (
    <PrivateLayout>
      <Typography variant="h4">Roles</Typography>
      {data.map((r) => r.name)}
    </PrivateLayout>
  );
};
