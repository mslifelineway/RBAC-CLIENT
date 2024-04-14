import { GridColDef } from "@mui/x-data-grid";
import { IPermission } from "../../types";

export const getColumns = (): GridColDef<IPermission>[] => {
  return [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
    },
  ];
};
