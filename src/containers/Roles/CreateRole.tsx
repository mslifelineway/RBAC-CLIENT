import React, { ChangeEvent, FormEvent, useState } from "react";
import { BackButton, PrivateLayout } from "../../components";
import {
  Box,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { MakeApiCallProps } from "../../services";
import { EBaseURLs, EHttpMethods } from "../../services/axios";
import { endpoints, messages } from "../../constants";
import { LoadingButton } from "@mui/lab";
import { ICreateRole, ICreateRoleError } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch, RequestStatus, useAppSelector } from "../../redux/store";
import { createRole } from "../../redux/actions";
import { toast } from "react-toastify";

const defaultValues: ICreateRole = {
  name: "",
  description: "",
};

const defaultErrors: ICreateRoleError = {
  name: "",
  description: "",
};

const errorMessages: ICreateRoleError = {
  name: "Please enter the role name",
  description: "Please enter the role description",
};

export const CreateRole = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCreating } = useAppSelector((state) => state.roleReducer);
  const [formData, setFormData] = useState<ICreateRole>(defaultValues);
  const [errors, setErrors] = useState<ICreateRoleError>(defaultErrors);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (value === "") {
      setErrors((prev) => ({
        ...prev,
        [id]: errorMessages[id as keyof ICreateRoleError],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const isFormDataValid = (): boolean => {
    const newErrors: ICreateRoleError = { ...defaultErrors };
    const isValid = Object.keys(formData).every((e: string) => {
      if (formData[e as keyof ICreateRole] !== "") {
        return true;
      } else {
        newErrors[e as keyof ICreateRoleError] =
          errorMessages[e as keyof ICreateRoleError];
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (isFormDataValid()) {
      const callProps: MakeApiCallProps<ICreateRole> = {
        endpoint: endpoints.root,
        payload: formData,
        method: EHttpMethods.POST,
        baseURL: EBaseURLs.ROLE,
      };

      const res = await dispatch(createRole(callProps));
      if (res.meta.requestStatus === RequestStatus.FULFILLED) {
        toast.success(messages.roleCreated);
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
            Create New Role
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
              label="Role Name"
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
