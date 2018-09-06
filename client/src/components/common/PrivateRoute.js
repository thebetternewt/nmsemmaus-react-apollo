import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, setRedirectPath } from '../../apollo/client';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthenticated()) {
        return <Component {...props} />;
      }

      setRedirectPath(props.match.path);

      return <Redirect to="/login" />;
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
