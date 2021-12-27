import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { user } = useSelector((state) => state.authentication);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user?.email === "admin@admin.com" ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/authenticate"} />
        )
      }
    />
  );
};

export default PrivateRoute;
