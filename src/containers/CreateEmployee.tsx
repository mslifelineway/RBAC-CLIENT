import React, { ChangeEvent, FormEvent, useState } from "react";
import { PrivateLayout } from "../components";
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
import { MakeApiCallProps, makeApiCall } from "../services";
import { EBaseURLs, EHttpMethods } from "../services/axios";
import { endpoints, messages } from "../constants";
import { LoadingButton } from "@mui/lab";
import { CreateAccount, CreateAccountError } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch, RequestStatus, useAppSelector } from "../redux/store";
import { createAccount } from "../redux/actions";
import { toast } from "react-toastify";

const defaultValues: CreateAccount = {
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

const defaultErrors: CreateAccountError = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
};

const errorMessages: CreateAccountError = {
  firstName: "Please enter the first name",
  lastName: "Please enter the last name",
  email: "Please enter the valid email",
  phoneNumber: "Please enter the phone number",
  password: "Please enter the valid password",
};

export const CreateEmployee = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useAppSelector((state) => state.accountReducer);
  const [formData, setFormData] = useState<CreateAccount>(defaultValues);
  const [errors, setErrors] = useState<CreateAccountError>(defaultErrors);
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
        [id]: errorMessages[id as keyof CreateAccountError],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const isFormDataValid = (): boolean => {
    const newErrors: CreateAccountError = { ...defaultErrors };
    const isValid = Object.keys(formData).every((e: string) => {
      if (formData[e as keyof CreateAccount] !== "") {
        return true;
      } else {
        newErrors[e as keyof CreateAccountError] =
          errorMessages[e as keyof CreateAccountError];
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (isFormDataValid()) {
      const callProps: MakeApiCallProps<CreateAccount> = {
        endpoint: endpoints.createAccount,
        payload: formData,
        method: EHttpMethods.POST,
        baseURL: asAdministrator ? EBaseURLs.ADMINISTRATOR : EBaseURLs.EMPLOYEE,
      };

      const res = await dispatch(createAccount(callProps));
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
              }}
            >
              <LoadingButton
                type="submit"
                loading={loading}
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
