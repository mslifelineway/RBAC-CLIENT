import { GridColDef } from "@mui/x-data-grid";
import { IEmployee } from "../../types";

export const getColumns = (): GridColDef<IEmployee>[] => {
  return [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "roles",
      headerName: "Roles",
      width: 150,
      valueFormatter: (params) => (params.value ? params.value.join(",") : ""),
    },
  ];
};
