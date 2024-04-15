import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { StyledButton } from "./styled";

interface CommonProps {
  text?: string;
}
export type ButtonWithIconProps = ButtonProps & CommonProps;
export type LinkButtonWithIconProps = ButtonProps & LinkProps & CommonProps;

export const ButtonWithIcon = (
  props: ButtonWithIconProps | LinkButtonWithIconProps
) => {
  if ("to" in props) {
    const { to, ...buttonProps } = props as LinkButtonWithIconProps;

    return (
      <Link to={to} style={{ textDecoration: "none" }}>
        <StyledButton {...buttonProps}>{props.text}</StyledButton>
      </Link>
    );
  } else {
    return (
      <StyledButton {...(props as ButtonProps)}>{props.text}</StyledButton>
    );
  }
};
