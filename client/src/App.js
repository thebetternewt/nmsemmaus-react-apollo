import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

import PrivateRoute from './components/common/PrivateRoute';

import Layout from './components/layout/Layout';
import HomePage from './components/HomePage';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';

class App extends Component {
  render() {
    return (
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
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/dashboard" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
