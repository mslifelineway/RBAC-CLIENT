import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Divider from "@mui/material/Divider";
import { StyledDrawer, StyledDrawerHeader } from "./styled";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard,
  GradientOutlined,
  Home,
  Logout,
  PeopleAltTwoTone,
  SecurityOutlined,
} from "@mui/icons-material";
import { paths } from "../../constants";
import { ButtonWithIcon } from "../ButtonWithIcon";

interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

interface MenuLink {
  text: string;
  icon: JSX.Element;
  link: string;
}
const menus: MenuLink[] = [
  {
    text: "Home",
    icon: <Home />,
    link: paths.root,
  },
  {
    text: "Dashboard",
    icon: <Dashboard />,
    link: paths.dashboard,
  },
  {
    text: "Employees",
    icon: <PeopleAltTwoTone />,
    link: paths.employees,
  },
  {
    text: "Roles",
    icon: <SecurityOutlined />,
    link: paths.roles,
  },
  {
    text: "Assign Roles",
    icon: <SecurityOutlined />,
    link: paths.assignRolesToEmployee,
  },
  {
    text: "Permissions",
    icon: <GradientOutlined />,
    link: paths.permissions,
  },
  {
    text: "Assign Permission",
    icon: <GradientOutlined />,
    link: paths.assignPermissionsToRole,
  },
];

export const Drawer = (props: DrawerProps) => {
  const { open, handleDrawerClose } = props;
  const theme = useTheme();
  const { pathname } = useLocation();

  return (
    <StyledDrawer variant="permanent" open={open}>
      <StyledDrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </StyledDrawerHeader>
      <Divider />
      <List>
        {menus.map((menu: MenuLink) => (
          <ListItem key={menu.text} disablePadding sx={{ display: "block" }}>
            <ButtonWithIcon
              to={menu.link}
              startIcon={menu.icon}
              text={open ? menu.text : undefined}
              fullWidth
              className={pathname === menu.link ? "active-bg" : ""}
              disableElevation
              style={{
                justifyContent: "start",
                margin: 0,
                paddingLeft: 24,
                fontSize: 14,
                height: 32,
                borderRadius: 0,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box height="80%" />
      <Divider />
      <List>
        <ButtonWithIcon
          startIcon={<Logout />}
          text={open ? "Log Out" : undefined}
          fullWidth
          disableElevation
          style={{
            justifyContent: "start",
            margin: 0,
            paddingLeft: 24,
            fontSize: 14,
            height: 32,
            borderRadius: 0,
          }}
        />
      </List>
      <Box height={"80%"} />
    </StyledDrawer>
  );
};
