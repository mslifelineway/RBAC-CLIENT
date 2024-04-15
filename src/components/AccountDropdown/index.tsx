import React from "react";
import { Dropdown, Menu } from "@mui/base";
import { AnimatedListbox, MenuButton, MenuItem } from "./styled";
import { AccountCircleOutlined } from "@mui/icons-material";
import { AppDispatch, RequestStatus, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { MakeApiCallProps } from "../../services";
import { CURRENT_USER, endpoints } from "../../constants";
import { EBaseURLs, EHttpMethods } from "../../services/axios";
import { logout } from "../../redux/actions";
import Cookies from "js-cookie";
import { IRole } from "../../redux/reducers/auth.slice";

export const AccountDropdown = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useAppSelector((state) => state.authReducer.data);

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  const doLogout = async () => {
    try {
      const callProps: MakeApiCallProps<null> = {
        endpoint: endpoints.logout,
        payload: null,
        method: EHttpMethods.POST,
        baseURL:
          typeof currentUser?.roles?.[0] === "string"
            ? EBaseURLs.ADMINISTRATOR_AUTH
            : EBaseURLs.EMPLOYEE_AUTH,
      };
      const res = await dispatch(logout(callProps));
      if (res.meta.requestStatus === RequestStatus.FULFILLED) {
        Cookies.remove(CURRENT_USER);
      }
    } catch (error) {
      console.log("error while logout", error);
    }
  };

  let roles = "";
  currentUser?.roles?.forEach((c: IRole | string) => {
    if (roles === "") roles += typeof c === "string" ? c : c.name;
    else roles += `, ${typeof c === "string" ? c : c.name}`;
  });

  // const roles = (currentUser?.roles || []).reduce((acc: string, c: IRole | string) => {
  //   if (acc === "") {
  //     return typeof c === "string" ? c : c.name; // If accumulator is empty, return the name of the current role or string
  //   } else {
  //     return `${acc}, ${typeof c === "string" ? c : c.name}`; // If accumulator is not empty, append the name of the current role or string with a comma
  //   }
  // }, "")

  return (
    <Dropdown>
      <MenuButton>
        <AccountCircleOutlined fontSize="large" />
      </MenuButton>
      <Menu slots={{ listbox: AnimatedListbox }}>
        {currentUser?.roles?.length! > 0 ? (
          <p style={{ fontStyle: "italic", textAlign: "center" }}>({roles})</p>
        ) : null}
        <MenuItem onClick={createHandleMenuClick("Profile")}>Profile</MenuItem>
        <MenuItem onClick={createHandleMenuClick("Language settings")}>
          Language settings
        </MenuItem>
        <MenuItem onClick={doLogout}>Log out</MenuItem>
      </Menu>
    </Dropdown>
  );
};
