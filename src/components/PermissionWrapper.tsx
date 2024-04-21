import React from "react";
import { Navigate } from "react-router-dom";
import { paths } from "../constants";
import { usePermissionCheck } from "../hooks";

interface PermissionWrapperProps {
  children: React.ReactNode;
  permissionUniqueKey?: string;
  disablePermissionCheck?: boolean;
}

export const PermissionWrapper = ({
  children,
  permissionUniqueKey,
  disablePermissionCheck = false,
}: PermissionWrapperProps): JSX.Element => {
  const { hasPermission } = usePermissionCheck();

  if (disablePermissionCheck) return <>{children}</>;

  return permissionUniqueKey && hasPermission(permissionUniqueKey) ? (
    <>{children}</>
  ) : (
    <Navigate to={`${paths.root}?permission=no_value`} />
  );
};
