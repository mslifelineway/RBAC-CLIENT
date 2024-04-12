import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { paths } from "./constants";
import { Login, Dashboard, Employees, CreateEmployee } from "./containers";
import { ProtectedRoute, PublicRoute } from "./components";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path={paths.login} element={<PublicRoute />}>
          <Route path={paths.login} element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route path={paths.root} element={<ProtectedRoute />}>
          <Route
            path={paths.root}
            element={<Navigate to={paths.dashboard} />}
          />
          <Route path={paths.dashboard} element={<Dashboard />} />
          <Route path={paths.employees} element={<Employees />} />
          <Route path={paths.createEmployee} element={<CreateEmployee />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoute;
