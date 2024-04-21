import React from "react";
import { create } from "react-test-renderer";
import {
  ButtonWithIcon,
  ButtonWithIconProps,
  LinkButtonWithIconProps,
} from "..";

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");

  return {
    ...original,
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

describe("ButtonWithIcon Component", () => {
  it("should renders a Button without any props", () => {
    const component = create(<ButtonWithIcon />);
    const btnElement = component.root.findByProps({
      "data-testid": "buttonWithIcon",
    });
    expect(btnElement).toBeTruthy();
  });

  it("should renders a Button with ButtonWithIconProps", () => {
    const fn = jest.fn();
    const btnProps: ButtonWithIconProps = {
      text: "click me",
      onClick: fn,
    };
    const component = create(<ButtonWithIcon {...btnProps} />);
    const btnElement = component.root.findByProps({
      "data-testid": "buttonWithIcon",
    });
    expect(btnElement).toBeTruthy();
    expect(btnElement.props.onClick).toBe(fn);
  });
  it("should renders a Link Button with LinkButtonWithIconProps", () => {
    const linkBtnProps: LinkButtonWithIconProps = {
      to: "/",
      text: "navigate",
    };
    const component = create(<ButtonWithIcon {...linkBtnProps} />);
    const btnElement = component.root.findByProps({
      "data-testid": "linkButtonWithIcon",
    });
    expect(btnElement).toBeTruthy();
  });
});
