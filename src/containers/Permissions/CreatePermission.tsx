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
import { ICreatePermission, ICreatePermissionError } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch, RequestStatus, useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { createEmployee, createPermission } from "../../redux/actions";

const defaultValues: ICreatePermission = {
  name: "",
  description: "",
};

const defaultErrors: ICreatePermissionError = {
  name: "",
  description: "",
};

const errorMessages: ICreatePermissionError = {
  name: "Please enter the permission name",
  description: "Please enter the permission description",
};

export const CreatePermission = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCreating } = useAppSelector((state) => state.permissionReducer);
  const [formData, setFormData] = useState<ICreatePermission>(defaultValues);
  const [errors, setErrors] = useState<ICreatePermissionError>(defaultErrors);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (value === "") {
      setErrors((prev) => ({
        ...prev,
        [id]: errorMessages[id as keyof ICreatePermissionError],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const isFormDataValid = (): boolean => {
    const newErrors: ICreatePermissionError = { ...defaultErrors };
    const isValid = Object.keys(formData).every((e: string) => {
      if (formData[e as keyof ICreatePermission] !== "") {
        return true;
      } else {
        newErrors[e as keyof ICreatePermissionError] =
          errorMessages[e as keyof ICreatePermissionError];
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (isFormDataValid()) {
      const callProps: MakeApiCallProps<ICreatePermission> = {
        endpoint: endpoints.root,
        payload: formData,
        method: EHttpMethods.POST,
        baseURL: EBaseURLs.PERMISSION,
      };

      const res = await dispatch(createPermission(callProps));
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
            Create New Permission
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
              id="name"
              label="Permission Name"
              variant="standard"
              value={formData.name}
              helperText={errors.name}
              onChange={handleChange}
            />
            <TextField
              id="description"
              label="Description"
              variant="standard"
              value={formData.description}
              helperText={errors.description}
              onChange={handleChange}
            />
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
