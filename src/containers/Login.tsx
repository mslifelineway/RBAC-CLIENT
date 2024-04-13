import React, { ChangeEvent, FormEvent, useState } from "react";
import {} from "../components";
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
import { LoadingButton } from "@mui/lab";
import { MakeApiCallProps } from "../services";
import { EBaseURLs, EHttpMethods } from "../services/axios";
import { CURRENT_USER, endpoints, messages } from "../constants";
import { ILogin, ILoginError } from "../types";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import { AppDispatch, RequestStatus, useAppSelector } from "../redux/store";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const defaultValues: ILogin = {
  // email: "",
  // password: "",
  email: "admin@gmail.com",
  password: "Pass@123",
};

const defaultErrors: ILogin = {
  email: "",
  password: "",
};

const errorMessages: ILoginError = {
  email: "Please enter the valid email",
  password: "Please enter the valid password",
};

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticating } = useAppSelector((state) => state.authReducer);
  const [formData, setFormData] = useState<ILogin>(defaultValues);
  const [errors, setErrors] = useState<ILoginError>(defaultErrors);
  const [asAdministrator, setAsAdministrator] = useState<boolean>(!false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (value === "") {
      setErrors((prev) => ({
        ...prev,
        [id]: errorMessages[id as keyof ILoginError],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const isFormDataValid = (): boolean => {
    const newErrors: ILoginError = { ...defaultErrors };
    const isValid = Object.keys(formData).every((e: string) => {
      if (formData[e as keyof ILogin] !== "") {
        return true;
      } else {
        newErrors[e as keyof ILoginError] =
          errorMessages[e as keyof ILoginError];
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (isFormDataValid()) {
      const callProps: MakeApiCallProps<ILogin> = {
        endpoint: endpoints.login,
        payload: formData,
        method: EHttpMethods.POST,
        baseURL: asAdministrator
          ? EBaseURLs.ADMINISTRATOR_AUTH
          : EBaseURLs.EMPLOYEE_AUTH,
      };
      const res = await dispatch(login(callProps));
      if (res.meta.requestStatus === RequestStatus.FULFILLED) {
        toast.success(messages.loginSuccess);
        Cookies.set(CURRENT_USER, JSON.stringify(res.payload));
      }
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ background: "#eee" }}
    >
      <Card
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Typography variant="h6" align="center">
            Login
          </Typography>
          <Divider />
          <Box height={24} />
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
            }}
            onSubmit={handleSubmit}
          >
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
                label="As Administrator"
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
                loading={isAuthenticating}
                variant="contained"
                size="small"
              >
                Login
              </LoadingButton>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
