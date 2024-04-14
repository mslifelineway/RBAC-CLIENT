import React, { ChangeEvent, FormEvent, useState } from "react";
import { BackButton, PrivateLayout } from "../../components";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { MakeApiCallProps } from "../../services";
import { EBaseURLs, EHttpMethods } from "../../services/axios";
import { endpoints, messages } from "../../constants";
import { LoadingButton } from "@mui/lab";
import { ICreateEmployee, ICreateEmployeeError } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch, RequestStatus, useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { createEmployee } from "../../redux/actions";

const defaultValues: ICreateEmployee = {
  firstName: "test",
  lastName: "admin",
  email: "test@gmail.com",
  phoneNumber: "7015720216",
  password: "Pass@123",
  // firstName: "",
  // lastName: "",
  // email: "",
  // phoneNumber: "",
  // password: "",
};

const defaultErrors: ICreateEmployeeError = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
};

const errorMessages: ICreateEmployeeError = {
  firstName: "Please enter the first name",
  lastName: "Please enter the last name",
  email: "Please enter the valid email",
  phoneNumber: "Please enter the phone number",
  password: "Please enter the valid password",
};

export const CreateEmployee = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCreating } = useAppSelector((state) => state.employeeReducer);
  const [formData, setFormData] = useState<ICreateEmployee>(defaultValues);
  const [errors, setErrors] = useState<ICreateEmployeeError>(defaultErrors);
  const [asAdministrator, setAsAdministrator] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (value === "") {
      setErrors((prev) => ({
        ...prev,
        [id]: errorMessages[id as keyof ICreateEmployeeError],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const isFormDataValid = (): boolean => {
    const newErrors: ICreateEmployeeError = { ...defaultErrors };
    const isValid = Object.keys(formData).every((e: string) => {
      if (formData[e as keyof ICreateEmployee] !== "") {
        return true;
      } else {
        newErrors[e as keyof ICreateEmployeeError] =
          errorMessages[e as keyof ICreateEmployeeError];
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (isFormDataValid()) {
      const callProps: MakeApiCallProps<ICreateEmployee> = {
        endpoint: endpoints.root,
        payload: formData,
        method: EHttpMethods.POST,
        baseURL: asAdministrator ? EBaseURLs.ADMINISTRATOR : EBaseURLs.EMPLOYEE,
      };

      const res = await dispatch(createEmployee(callProps));
      if (res.meta.requestStatus === RequestStatus.FULFILLED) {
        toast.success(messages.accountCreated);
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
          <Typography variant="h6" align="center">
            Create New {asAdministrator ? "Administrator" : "Employee"}
          </Typography>
          <Divider />
          <Box height={24} />
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
            <TextField
              id="firstName"
              label="First Name"
              variant="standard"
              value={formData.firstName}
              helperText={errors.firstName}
              onChange={handleChange}
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="standard"
              value={formData.lastName}
              helperText={errors.lastName}
              onChange={handleChange}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="standard"
              value={formData.email}
              helperText={errors.email}
              onChange={handleChange}
            />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              variant="standard"
              value={formData.phoneNumber}
              helperText={errors.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              value={formData.password}
              helperText={errors.password}
              onChange={handleChange}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id="asAdministrator"
                    checked={asAdministrator}
                    onChange={(e) => setAsAdministrator(e.target.checked)}
                  />
                }
                label="Administrator ?"
              />
            </FormGroup>
            <Box
              mt={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <BackButton text="Cancel" />
              <LoadingButton
                type="submit"
                loading={isCreating}
                variant="contained"
                size="small"
              >
                Create
              </LoadingButton>
            </Box>
          </form>
        </CardContent>
      </Card>
    </PrivateLayout>
  );
};
