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
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import {
  Dashboard,
  GradientOutlined,
  Home,
  PeopleAltTwoTone,
  SecurityOutlined,
} from "@mui/icons-material";
import { paths } from "../../constants";

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
            <Link to={menu.link}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                {menu.icon}
                <ListItemText
                  primary={menu.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};
