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
import { assignRoles, fetchEmployees, fetchRoles } from "../redux/actions";
import { useDispatch } from "react-redux";
import { IEmployee, IRole } from "../types";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

interface IAssignRole {
  employeeId: string;
  roles: string[];
}
interface IAssignRoleError {
  employeeId: string;
  roles: string;
}

const defaultValues: IAssignRole = {
  employeeId: "",
  roles: [],
};

const defaultErrors: IAssignRoleError = {
  employeeId: "",
  roles: "",
};
const errorMessages: IAssignRoleError = {
  employeeId: "Please select a valid employee",
  roles: "Please select atleast one roles",
};

export const AssignRolesToEmployee = () => {
  const { data: roles } = useAppSelector((state) => state.roleReducer);
  const { data: employees, isRoleAssigning } = useAppSelector(
    (state) => state.employeeReducer
  );
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<IAssignRole>(defaultValues);
  const [errors, setErrors] = useState<IAssignRoleError>(defaultErrors);
  console.log(employees);
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
      baseURL: EBaseURLs.EMPLOYEE,
    };
    dispatch(fetchEmployees(callProps));
  }, []);

  useEffect(() => {
    if (formData.employeeId) {
      const currentEmp = employees.find((e) => e._id === formData.employeeId);
      if (currentEmp)
        setFormData((prev) => ({
          ...prev,
          roles: currentEmp.roles.map((r) => r._id),
        }));
    }
  }, [formData.employeeId]);

  const handleRoleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const id = event.target.value;
    if (checked) {
      setFormData((prev) => ({ ...prev, roles: [...prev.roles, id] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        roles: prev.roles.filter((r) => r !== id),
      }));
    }
    if (id) {
      setErrors((prev) => ({ ...prev, roles: "" }));
    } else {
      setErrors((prev) => ({ ...prev, roles: errorMessages.roles }));
    }
  };

  const isRoleSelected = (id: string) => formData.roles.includes(id);

  const roleItem = (role: IRole) => {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id={role.name}
              value={role._id}
              checked={isRoleSelected(role._id)}
              onChange={handleRoleChange}
            />
          }
          label={role.name}
        />
      </FormGroup>
    );
  };

  const isFormDataValid = (): boolean => {
    let valid = true;
    if (formData.employeeId === "") {
      setErrors((prev) => ({ ...prev, employeeId: errorMessages.employeeId }));
      valid = false;
    }
    if (formData.roles.length === 0) {
      setErrors((prev) => ({ ...prev, roles: errorMessages.roles }));
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (isFormDataValid()) {
      const callProps: MakeApiCallProps<string[]> = {
        endpoint: `/${formData.employeeId + endpoints.assignRoles}`,
        payload: formData.roles,
        method: EHttpMethods.PATCH,
        baseURL: EBaseURLs.EMPLOYEE,
      };

      const res = await dispatch(assignRoles(callProps));
      if (res.meta.requestStatus === RequestStatus.FULFILLED) {
        toast.success(messages.rolesAssigned);
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
              Assign roles to an employee
            </Typography>
            <Divider />
            <Box height={24} />
            <Box sx={{ width: 150 }}>
              <TextField
                id="employeeId"
                select
                label="Select Employee"
                helperText={errors.employeeId}
                variant="standard"
                fullWidth
                value={formData.employeeId}
                onChange={(e) => {
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, employeeId: "" }));
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      employeeId: errorMessages.employeeId,
                    }));
                  }
                  setFormData((prev) => ({
                    ...prev,
                    employeeId: e.target.value,
                  }));
                }}
              >
                <MenuItem value="">Select</MenuItem>
                {employees.map((employee: IEmployee) => (
                  <MenuItem key={employee._id} value={employee._id}>
                    {employee.firstName + " " + employee.lastName}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Typography variant="body1" mt={2}>
              Select Roles
            </Typography>
            {roles.map((r) => {
              return <Fragment key={r._id}>{roleItem(r)}</Fragment>;
            })}
            {errors.roles ? <p>{errors.roles}</p> : null}
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
                loading={isRoleAssigning}
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
