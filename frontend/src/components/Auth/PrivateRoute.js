import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../Common/Spinner/Spinner";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <Spinner />;
      } else if (auth.isAuthenticated) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            //  to="/login"
            to={{
              pathname: "/login/",
              search: `?next=${props.location.pathname}`,
            }}
          />
        );
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
