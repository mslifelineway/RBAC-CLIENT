import React from "react";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { StyledAppBar } from "./styled";

import { Menu } from "@mui/icons-material";

interface AppBarProps {
  handleDrawerOpen: () => void;
  open?: boolean;
}
export const AppBar = (props: AppBarProps) => {
  const { handleDrawerOpen, open } = props;

  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Mini variant drawer
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};
