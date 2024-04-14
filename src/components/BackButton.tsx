import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  text?: string;
}
export const BackButton = (props: BackButtonProps) => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <Button
      variant="outlined"
      color="error"
      size="small"
      onClick={navigateBack}
    >
      {props.text || "Back"}
    </Button>
  );
};
