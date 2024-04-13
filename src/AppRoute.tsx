import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { paths } from "./constants";
import { Login, Page404, Welcome } from "./containers";
import { ProtectedRoute, PublicRoute } from "./components";
import { getRoutesByPaths, pathsByPermissions } from "./data";
import { useAppSelector } from "./redux/store";

const AppRoute = () => {
  const { data } = useAppSelector((state) => state.authReducer);
  const [routePaths, setRoutePaths] = useState<string[]>([]);

  const hasAllPermissions =
    typeof data?.roles[0] === "string" && data?.roles[0] === "ADMINISTRATOR";

  useEffect(() => {
    if (hasAllPermissions) {
      setRoutePaths(Object.values(pathsByPermissions));
    } else {
      const routesByPermissions: string[] = [];
      data?.permissions?.forEach((p) => {
        if (pathsByPermissions[p]) {
          routesByPermissions.push(pathsByPermissions[p]);
        }
      });
      setRoutePaths(routesByPermissions);
    }
  }, [data]);

  return (
    <Router>
      <Routes>
        <Route path={paths.login} element={<PublicRoute />}>
          <Route path={paths.login} element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route path={paths.root} element={<ProtectedRoute />}>
          <Route path={paths.root} element={<Welcome />} />
          {getRoutesByPaths(routePaths).map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path={paths.all} element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
