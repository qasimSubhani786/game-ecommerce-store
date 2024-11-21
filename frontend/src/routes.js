import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  errorPageRoute,
  path,
  privatePageRoutes,
  publicPageRoutes,
} from "./common/routesNames";
import PublicRoute from "./routes/publiceRoutes";
import PrivateRoute from "./routes/privateRoute";

const BaseRoutes = () => {
  const privateRoutes = Object.values(privatePageRoutes);
  const publicRoutes = Object.values(publicPageRoutes);
  const ErrorRoute = Object.values(errorPageRoute);

  return (
    <Routes>
      {privateRoutes.map(
        ({ component: Component, name, path, subPage, ...rest }) => {
          return (
            <Route
              path={path}
              key={`route-${name}`}
              element={
                <PrivateRoute>
                  <Component
                    SubPage={subPage != null ? subPage : null}
                    {...rest}
                  />
                </PrivateRoute>
              }
              {...rest}
            />
          );
        }
      )}
      {publicRoutes.map(({ component: Component, name, path }) => {
        return (
          <Route
            path={path}
            key={`route-${name}`}
            element={
              <PublicRoute>
                <Component />
              </PublicRoute>
            }
          />
        );
      })}
      {ErrorRoute.map(({ component: Component, name, path }) => {
        return (
          <Route path={path} key={`route-${name}`} element={<Component />} />
        );
      })}
      <Route path="*" element={<Navigate to={path.dashboard} />} />
    </Routes>
  );
};
export default BaseRoutes;
