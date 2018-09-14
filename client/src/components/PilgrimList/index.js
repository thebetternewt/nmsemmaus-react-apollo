import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { WALK_QUERY } from '../../apollo/queries';
import { CircularProgress } from '@material-ui/core';
import Hero from '../common/Hero';

import candles from '../../images/candles.jpeg';

const PilgrimList = props => {
  console.log(props);
  const walkNumber = props.match.params.walk_number;

  return (
    <div>
      <Hero backgroundImage={candles}>
        <h1>WalkNumber {walkNumber}</h1>
      </Hero>
      <Query query={WALK_QUERY} variables={{ walkNumber }}>
        {({ data, loading }) => {
          console.log(data);

          if (loading) {
            return <CircularProgress size={50} />;
          }

          if (data && data.walk) {
            const { pilgrims } = data.walk;
            console.log(pilgrims);
            const pilgrimItems = pilgrims.map(pilgrim => (
              <li key={pilgrim.id}>
                {pilgrim.firstName} {pilgrim.lastName}, {pilgrim.hometown},
                Sponsor: {pilgrim.sponsor}
              </li>
            ));
            return (
              <Fragment>
                <ul>{pilgrimItems}</ul>
              </Fragment>
            );
          }

          return null;
        }}
      </Query>
    </div>
  );
};

export default PilgrimList;
