import React, { FC } from "react";

interface LayoutProps {
  children: JSX.Element;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};
