import React from "react";
import { Box } from "@mui/material";

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  return <Box className="main-content">{children}</Box>;
};
