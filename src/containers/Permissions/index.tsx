import React, { useEffect, useMemo } from "react";
import { PrivateLayout } from "../../components";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchPermissions } from "../../redux/actions";
import { MakeApiCallProps } from "../../services";
import { endpoints, paths } from "../../constants";
import { EBaseURLs, EHttpMethods } from "../../services/axios";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { getColumns } from "./permissions.columns";

export const Permissions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useAppSelector((state) => state.permissionReducer);

  const columns = useMemo(() => getColumns(), []);

  useEffect(() => {
    const callProps: MakeApiCallProps<null> = {
      payload: null,
      endpoint: endpoints.root,
      method: EHttpMethods.GET,
      baseURL: EBaseURLs.PERMISSION,
    };
    dispatch(fetchPermissions(callProps));
  }, []);

  return (
    <PrivateLayout>
      <Card>
        <CardContent
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6">Permissions</Typography>
          <Link to={paths.createPermission}>
            <Button variant="contained" size="small">
              New
            </Button>
          </Link>
        </CardContent>
      </Card>
      <DataGrid
        getRowId={(params) => params._id}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </PrivateLayout>
  );
};
