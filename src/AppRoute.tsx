import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { paths } from "./constants";
import { Login, Page404 } from "./containers";
import { ProtectedRoute, PublicRoute } from "./components";
import { protectedRoutes, publicRoutes } from "./routes.config.";
import { PermissionWrapper } from "./components/PermissionWrapper";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path={paths.login} element={<PublicRoute />}>
          <Route path={paths.login} element={<Login />} />
        </Route>

        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<PublicRoute />}>
            <Route path={route.path} element={route.element} />
          </Route>
        ))}
        {protectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<ProtectedRoute />}>
            <Route
              path={route.path}
              element={
                <PermissionWrapper
                  permissionUniqueKey={route.permissionKey}
                  disablePermissionCheck={route.disablePermissionCheck}
                >
                  {route.element}
                </PermissionWrapper>
              }
            />
          </Route>
        ))}
        <Route path={paths.root} element={<PublicRoute />}>
          <Route path={paths.all} element={<Page404 />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoute;
