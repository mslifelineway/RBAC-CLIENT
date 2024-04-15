import { Button } from "@mui/material";
import styled from "styled-components";

export const StyledButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-root": {
    textTransform: "none",
    color: "#5e5e5e",
    "&.active": {
      color: "#1976d2",
    },
    "&.active-bg": {
      color: "#1976d2",
      backgroundColor: "#cce6ff",
    },
    "&:hover": {
      color: "#1976d2",
    },
  },
}));
