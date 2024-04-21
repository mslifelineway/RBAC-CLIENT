import { permissionKeys } from "../constants";
import { useAppSelector } from "../redux/store";

interface UserPermissionCheck {
  hasPermission: (permissionUniqueKey: string) => boolean;
}

//TODO:: NEED TO REMOVE
const defaultPermissions = Object.values(permissionKeys).splice(
  0,
  Object.values(permissionKeys).length - 2
);

export const usePermissionCheck = (): UserPermissionCheck => {
  const { data } = useAppSelector((state) => state.authReducer);

  const hasPermission = (permissionUniqueKey: string): boolean => {
    //checking whether current user is an administrator. since 0th index in roles will be "ADMINISTRATOR" which is a string.
    if (
      typeof data?.roles[0] === "string" &&
      data?.roles[0] === "ADMINISTRATOR"
    ) {
      return true;
    }

    return data?.permissionUniqueKeys
      ? data.permissionUniqueKeys.includes(permissionUniqueKey)
      : false;
    // return defaultPermissions.includes(permissionUniqueKey);
  };

  const values: UserPermissionCheck = {
    hasPermission,
  };

  return values;
};
