import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { NEWSLETTERS_QUERY } from '../../apollo/queries';

import { CircularProgress } from '@material-ui/core';

class Newsletters extends Component {
  render() {
    return (
      <div>
        <Query query={NEWSLETTERS_QUERY}>
          {({ loading, data }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.newsletters) {
              console.log(data);
              const { newsletters } = data;

              const newsletterItems = newsletters.map(newsletter => (
                <li key={newsletter.id}>{newsletter.title}</li>
              ));

              return <ul style={{ listStyle: 'none' }}>> {newsletterItems}</ul>;
            }

            return <p>No newsletters found</p>;
          }}
        </Query>
      </div>
    );
  }
}

export default Newsletters;
