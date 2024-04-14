import { GridColDef } from "@mui/x-data-grid";
import { IPermission, IRole } from "../../types";
import { Chip, Stack } from "@mui/material";

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
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {params.value
            ? params.value.map((p: IPermission) => (
                <Chip
                  size="small"
                  label={p.name}
                  color="primary"
                  variant="outlined"
                />
              ))
            : null}
        </Stack>
      ),
    },
  ];
};
