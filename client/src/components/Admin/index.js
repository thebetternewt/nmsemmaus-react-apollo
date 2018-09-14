import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../apollo/queries';

import Dashboard from './Dashboard';

export default class Admin extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data }) => {
          // Reroute to "/" if current user not admin
          if (data && data.me) {
            if (!data.me.admin) {
              return <Redirect to="/" />;
            }

            return (
              <div>
                <Dashboard />
              </div>
            );
          }

          return null;
        }}
      </Query>
    );
  }
}
