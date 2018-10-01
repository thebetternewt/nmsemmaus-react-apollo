import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { CircularProgress, Grid } from '@material-ui/core';
import { WALK_QUERY } from '../../apollo/queries';
import Hero from '../common/Hero';
import PilgrimsList from './PilgrimsList';

import candles from '../../images/candles.jpeg';
import PilgrimListPdf from './PilgrimListPdf';

const Walk = props => {
  const { match } = props;
  const walkNumber = match.params.walk_number;

  return (
    <div>
      <Hero backgroundImage={candles} size="sm">
        <h1>Walk #{walkNumber}</h1>
      </Hero>
      <div style={{ padding: '2rem 10px' }}>
        <Grid container direction="row" spacing={32} justify="center">
          <Query query={WALK_QUERY} variables={{ walkNumber }}>
            {({ data, loading }) => {
              if (loading) {
                return (
                  <Grid item>
                    <CircularProgress size={50} />;
                  </Grid>
                );
              }

              if (data && data.walk) {
                const { pilgrims } = data.walk;

                return (
                  <Fragment>
                    <Grid
                      item
                      container
                      xs={12}
                      sm={6}
                      md={4}
                      direction="column"
                    >
                      <h2>Pilgrims</h2>
                      <PilgrimsList pilgrims={pilgrims} />
                      <PilgrimListPdf
                        walkNumber={walkNumber}
                        pilgrims={pilgrims}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      sm={6}
                      md={4}
                      direction="column"
                    >
                      <h2>Workers</h2>
                      <p>No workers recorded.</p>
                    </Grid>
                  </Fragment>
                );
              }

              return null;
            }}
          </Query>
        </Grid>
      </div>
    </div>
  );
};

Walk.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Walk;
