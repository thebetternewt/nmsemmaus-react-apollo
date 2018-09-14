import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import './App.css';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { setAuthenticatedUser, logOutUser } from './apollo/client';

import PrivateRoute from './components/common/PrivateRoute';
import Layout from './components/layout/Layout';
import HomePage from './components/HomePage';
import Login from './components/auth/Login';
import PilgrimListsIndex from './components/PilgrimListsIndex';
import PilgrimList from './components/PilgrimList';
import Admin from './components/Admin';

import theme from './components/common/MuiTheme';

// Check for token in LS
const token = localStorage.getItem('token');
if (token) {
  const decoded = jwt_decode(token);
  // Set user data in Apollo cache
  setAuthenticatedUser(decoded);

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    logOutUser();
    // Redirect to login
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Home | North MS Emmaus</title>
            <meta
              name="description"
              content="A social network where Christian creatives can connect."
            />
          </Helmet>
          <Layout>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute
                exact
                path="/pilgrim-lists"
                component={PilgrimListsIndex}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/pilgrim-lists/:walk_number"
                component={PilgrimList}
              />
            </Switch>
            <Switch>
              <PrivateRoute path="/admin" component={Admin} />
            </Switch>
          </Layout>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
