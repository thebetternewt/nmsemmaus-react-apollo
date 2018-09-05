import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthenticated) {
        return <Component {...props} />;
      }
      return <Redirect to="/" />;
    }}
  />
);

PrivateRoute.defaultProps = {
  isAuthenticated: false
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default PrivateRoute;
