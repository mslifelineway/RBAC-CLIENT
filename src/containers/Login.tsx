import React, { ChangeEvent, FormEvent, useState } from "react";
import { Layout } from "../components";
import {
  Box,
  Button,
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
import { endpoints } from "../constants";

interface LoginData {
  email: string;
  password: string;
}

interface LoginError {
  email: string;
  password: string;
}

const defaultValues: LoginData = {
  email: "",
  password: "",
};

const defaultErrors: LoginData = {
  email: "",
  password: "",
};

const errorMessages: LoginError = {
  email: "Please enter the valid email",
  password: "Please enter the valid password",
};

export const Login = () => {
  const [formData, setFormData] = useState<LoginData>(defaultValues);
  const [errors, setErrors] = useState<LoginError>(defaultErrors);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [asAdministrator, setAsAdministrator] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id, checked } = e.target;
    console.log(value, checked);
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (value === "") {
      setErrors((prev) => ({
        ...prev,
        [id]: errorMessages[id as keyof LoginError],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const isFormDataValid = (): boolean => {
    const newErrors: LoginError = { ...defaultErrors };
    const isValid = Object.keys(formData).every((e: string) => {
      if (formData[e as keyof LoginData] !== "") {
        return true;
      } else {
        newErrors[e as keyof LoginError] = errorMessages[e as keyof LoginError];
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (isFormDataValid()) {
      setIsSubmitting(true);
      //TODO: call login api
      try {
        const callProps: MakeApiCallProps<LoginData> = {
          endpoint: endpoints.login,
          payload: formData,
          method: EHttpMethods.POST,
          baseURL: asAdministrator
            ? EBaseURLs.ADMINISTRATOR
            : EBaseURLs.EMPLOYEE,
        };
        const res = await makeApiCall(callProps);
        console.log("res", res);
      } catch (error) {
        console.log("error while login", error);
      }
    }
  };

  return (
    <Layout>
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
              // alignItems: "center",
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
              <Button
                type="submit"
                size="small"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};
