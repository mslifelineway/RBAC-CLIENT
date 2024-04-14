import { GridColDef } from "@mui/x-data-grid";
import { IRole } from "../../types";

export const getColumns = (): GridColDef<IRole>[] => {
  return [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Role",
      width: 250,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
    },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 1,
      valueFormatter: (params) => (params.value ? params.value.join(",") : ""),
    },
  ];
};
