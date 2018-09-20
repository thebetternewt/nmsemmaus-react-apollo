import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { WALK_QUERY } from '../../apollo/queries';

import { CircularProgress, Grid, Paper } from '@material-ui/core';
import Hero from '../common/Hero';
import PilgrimsList from './PilgrimsList';

import candles from '../../images/candles.jpeg';

const Walk = props => {
  console.log(props);
  const walkNumber = props.match.params.walk_number;

  return (
    <div>
      <Hero backgroundImage={candles}>
        <h1>Walk #{walkNumber}</h1>
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
            /* const pilgrimItems = pilgrims.map(pilgrim => (
              <li key={pilgrim.id}>
                {pilgrim.firstName} {pilgrim.lastName}, {pilgrim.hometown},
                Sponsor: {pilgrim.sponsor}
              </li>
            )); */

            return (
              <div style={{ padding: '2rem' }}>
                <Grid container spacing={32} justify="center" direction="row">
                  <Grid item xs={12} sm={6} lg={4} direction="column">
                    <h2>Pilgrims</h2>
                    <PilgrimsList pilgrims={pilgrims} />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} direction="column">
                    <h2>Workers</h2>
                    <p>No workers recorded.</p>
                  </Grid>
                </Grid>
              </div>
            );
          }

          return null;
        }}
      </Query>
    </div>
  );
};

export default Walk;
