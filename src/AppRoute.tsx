import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { paths } from "./constants";
import { Login, Dashboard } from "./containers";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path={paths.root} element={<Login />} />
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.dashboard} element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
