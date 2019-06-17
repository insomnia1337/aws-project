import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth"

export default ({ component: C, props: cProps, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (true) {
        return <C {...props} {...cProps} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location
              }
            }}
          />
        );
      }
    }}
  />
);
