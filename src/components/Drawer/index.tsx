import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { StyledDrawer, StyledDrawerHeader } from "./styled";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import { useLocation } from "react-router-dom";
import {
  Dashboard,
  GradientOutlined,
  Home,
  Logout,
  PeopleAltTwoTone,
  SecurityOutlined,
} from "@mui/icons-material";
import { paths, permissionKeys } from "../../constants";
import { ButtonWithIcon } from "../ButtonWithIcon";
import { useAppSelector } from "../../redux/store";
import { usePermissionCheck } from "../../hooks";

interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

interface MenuLink {
  text: string;
  icon: JSX.Element;
  link: string;
  permissionUniqueKey?: string;
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
    permissionUniqueKey: permissionKeys.viewDashboard,
  },
  {
    text: "Employees",
    icon: <PeopleAltTwoTone />,
    link: paths.employees,
    permissionUniqueKey: permissionKeys.viewEmployees,
  },
  {
    text: "Roles",
    icon: <SecurityOutlined />,
    link: paths.roles,
    permissionUniqueKey: permissionKeys.viewRoles,
  },
  {
    text: "Assign Roles",
    icon: <SecurityOutlined />,
    link: paths.assignRolesToEmployee,
    permissionUniqueKey: permissionKeys.assignRole,
  },
  {
    text: "Permissions",
    icon: <GradientOutlined />,
    link: paths.permissions,
    permissionUniqueKey: permissionKeys.viewPermissions,
  },
  {
    text: "Assign Permission",
    icon: <GradientOutlined />,
    link: paths.assignPermissionsToRole,
    permissionUniqueKey: permissionKeys.assignPermission,
  },
];

export const Drawer = (props: DrawerProps) => {
  const { hasPermission } = usePermissionCheck();
  const { data } = useAppSelector((state) => state.authReducer);
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
        {menus
          .filter(({ permissionUniqueKey }) =>
            permissionUniqueKey ? hasPermission(permissionUniqueKey) : true
          )
          .map((menu: MenuLink) => (
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
