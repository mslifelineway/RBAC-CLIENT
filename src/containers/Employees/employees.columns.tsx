import { GridColDef } from "@mui/x-data-grid";
import { IEmployee, IRole } from "../../types";
import { Chip, Stack } from "@mui/material";

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
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {params.value
            ? params.value.map((r: IRole) => (
                <Chip
                  size="small"
                  label={r.name}
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
