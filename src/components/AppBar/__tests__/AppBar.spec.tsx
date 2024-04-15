import React from "react";
import { create } from "react-test-renderer";
import { AppBar } from "..";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { IconButton, Typography } from "@mui/material";
import { StyledAppBar } from "../styled";
import { ToastContainer } from "react-toastify";
import { toastOptions } from "../../../constants";

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");

  return {
    ...original,
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");

  return {
    ...original,
    createPortal: (node: JSX.Element) => node,
  };
});

describe("AppBar Component", () => {
  test("renders correctly with default props", () => {
    const handleDrawerOpen = jest.fn();
    const component = create(
      <Provider store={store}>
        <ToastContainer {...toastOptions} />
        <AppBar handleDrawerOpen={handleDrawerOpen} />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("renders correctly with open state", () => {
    const handleDrawerOpen = jest.fn();
    const component = create(
      <Provider store={store}>
        <ToastContainer {...toastOptions} />
        <AppBar handleDrawerOpen={handleDrawerOpen} open={true} />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("calls handleDrawerOpen when IconButton is clicked", () => {
    const handleDrawerOpen = jest.fn();
    const component = create(
      <Provider store={store}>
        <ToastContainer {...toastOptions} />
        <AppBar handleDrawerOpen={handleDrawerOpen} />
      </Provider>
    );
    const iconButton = component.root.findByType(IconButton);
    iconButton.props.onClick();
    expect(handleDrawerOpen).toHaveBeenCalled();
  });

  test("renders Typography with text 'RBAC'", () => {
    const handleDrawerOpen = jest.fn();
    const component = create(
      <Provider store={store}>
        <ToastContainer {...toastOptions} />
        <AppBar handleDrawerOpen={handleDrawerOpen} />
      </Provider>
    );
    const typography = component.root.findByType(Typography);
    expect(typography.props.children).toEqual("RBAC");
  });

  test("renders StyledAppBar with position 'fixed'", () => {
    const handleDrawerOpen = jest.fn();
    const component = create(
      <Provider store={store}>
        <ToastContainer {...toastOptions} />
        <AppBar handleDrawerOpen={handleDrawerOpen} />
      </Provider>
    );
    const styledAppBar = component.root.findByType(StyledAppBar);
    expect(styledAppBar.props.position).toEqual("fixed");
  });
});
