import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { BackButton, PrivateLayout } from "../components";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { AppDispatch, RequestStatus, useAppSelector } from "../redux/store";
import { MakeApiCallProps } from "../services";
import { endpoints, messages } from "../constants";
import { EBaseURLs, EHttpMethods } from "../services/axios";
import {
  assignPermissions,
  assignRoles,
  fetchEmployees,
  fetchPermissions,
  fetchRoles,
} from "../redux/actions";
import { useDispatch } from "react-redux";
import { IEmployee, IPermission, IRole } from "../types";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

interface IAssignPermission {
  roleId: string;
  permissions: string[];
}
interface IAssignPermissionError {
  roleId: string;
  permissions: string;
}

const defaultValues: IAssignPermission = {
  roleId: "",
  permissions: [],
};

const defaultErrors: IAssignPermissionError = {
  roleId: "",
  permissions: "",
};
const errorMessages: IAssignPermissionError = {
  roleId: "Please select a valid role",
  permissions: "Please select atleast one permission",
};

export const AssignPermissionsToRole = () => {
  const { data: roles, isPermissionAssigning } = useAppSelector(
    (state) => state.roleReducer
  );
  const { data: permissions } = useAppSelector(
    (state) => state.permissionReducer
  );

  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<IAssignPermission>(defaultValues);
  const [errors, setErrors] = useState<IAssignPermissionError>(defaultErrors);
  console.log(roles, "roles");
  useEffect(() => {
    const callProps: MakeApiCallProps<null> = {
      payload: null,
      endpoint: endpoints.root,
      method: EHttpMethods.GET,
      baseURL: EBaseURLs.ROLE,
    };
    dispatch(fetchRoles(callProps));
  }, []);

  useEffect(() => {
    const callProps: MakeApiCallProps<null> = {
      payload: null,
      endpoint: endpoints.root,
      method: EHttpMethods.GET,
      baseURL: EBaseURLs.PERMISSION,
    };
    dispatch(fetchPermissions(callProps));
  }, []);

  useEffect(() => {
    if (formData.roleId) {
      const currentRole = roles.find((e) => e._id === formData.roleId);
      if (currentRole)
        setFormData((prev) => ({
          ...prev,
          permissions: currentRole.permissions as string[],
        }));
    }
  }, [formData.roleId]);

  const handlePermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const id = event.target.value;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        permissions: [...prev.permissions, id],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        permissions: prev.permissions.filter((r) => r !== id),
      }));
    }
    if (id) {
      setErrors((prev) => ({ ...prev, permissions: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        permissions: errorMessages.permissions,
      }));
    }
  };

  const isPermissionelected = (id: string) => formData.permissions.includes(id);

  const permissionItem = (permission: IPermission) => {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id={permission.name}
              value={permission._id}
              checked={isPermissionelected(permission._id)}
              onChange={handlePermissionChange}
            />
          }
          label={permission.name}
        />
      </FormGroup>
    );
  };

  const isFormDataValid = (): boolean => {
    let valid = true;
    if (formData.roleId === "") {
      setErrors((prev) => ({ ...prev, roleId: errorMessages.roleId }));
      valid = false;
    }
    if (formData.permissions.length === 0) {
      setErrors((prev) => ({
        ...prev,
        permissions: errorMessages.permissions,
      }));
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (isFormDataValid()) {
      const callProps: MakeApiCallProps<string[]> = {
        endpoint: `/${formData.roleId + endpoints.assignPermissions}`,
        payload: formData.permissions,
        method: EHttpMethods.PATCH,
        baseURL: EBaseURLs.ROLE,
      };

      const res = await dispatch(assignPermissions(callProps));
      if (res.meta.requestStatus === RequestStatus.FULFILLED) {
        toast.success(messages.permissionsAssigned);
        setFormData(defaultValues);
        setErrors(defaultErrors);
      }
    }
  };

  return (
    <PrivateLayout>
      <Card
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          padding: 4,
        }}
      >
        <CardContent style={{ width: "100%" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
              width: "100%",
            }}
            onSubmit={handleSubmit}
          >
            <Typography variant="h6" align="center">
              Assign permissions to a role
            </Typography>
            <Divider />
            <Box height={24} />
            <Box sx={{ width: 150 }}>
              <TextField
                id="roleId"
                select
                label="Select Role"
                helperText={errors.roleId}
                variant="standard"
                fullWidth
                value={formData.roleId}
                onChange={(e) => {
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, roleId: "" }));
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      roleId: errorMessages.roleId,
                    }));
                  }
                  setFormData((prev) => ({
                    ...prev,
                    roleId: e.target.value,
                  }));
                }}
              >
                <MenuItem value="">Select</MenuItem>
                {roles.map((role: IRole) => (
                  <MenuItem key={role._id} value={role._id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Typography variant="body1" mt={2}>
              Select Permissions
            </Typography>
            {permissions.map((r) => {
              return <Fragment key={r._id}>{permissionItem(r)}</Fragment>;
            })}
            {errors.permissions ? <p>{errors.permissions}</p> : null}
            <Box
              mt={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <BackButton text="Cancel" />
              <LoadingButton
                type="submit"
                loading={isPermissionAssigning}
                variant="contained"
                size="small"
              >
                Save Changes
              </LoadingButton>
            </Box>
          </form>
        </CardContent>
      </Card>
    </PrivateLayout>
  );
};
