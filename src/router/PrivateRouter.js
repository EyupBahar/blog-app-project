import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRouter;