import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CircularProgress,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import { WALKS_QUERY } from '../../apollo/queries';

import Hero from '../common/Hero';
import candles from '../../images/candles.jpeg';
import boardPath from '../../images/board-path.jpeg';
import { isEmptyObject } from '../../util/isEmpty';

const Walks = () => (
  <Fragment>
    <Hero backgroundImage={candles} size="sm">
      <h1>Pilgrim Lists</h1>
    </Hero>
    <Query
      query={WALKS_QUERY}
      variables={{ offset: 0, limit: 3 }}
      fetchPolicy="cache-and-network"
    >
      {({ data, loading, fetchMore }) => {
        if (loading && isEmptyObject(data)) {
          return (
            <Grid item>
              <CircularProgress size={50} />;
            </Grid>
          );
        }

        if (data && data.walks) {
          const { walks } = data;
          const walkCards = walks.map(walk => (
            <Grid key={walk.id} item xs={12} sm={6} md={4} lg={3}>
              <Link
                to={`/pilgrim-lists/${walk.walkNumber}`}
                style={{ width: '100%' }}
              >
                <Card
                  elevation={22}
                  style={{
                    height: '100%',
                    width: '100%',
                    border: `3px solid ${
                      walk.gender === 'Men'
                        ? 'rgba(0, 0, 255, 0.5)'
                        : 'rgba(255, 0, 255, 0.5)'
                    }`,
                  }}
                >
                  <CardActionArea style={{ width: '100%' }}>
                    <CardMedia
                      style={{ height: 140 }}
                      image={boardPath}
                      title="Board Path"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="headline"
                        component="h3"
                      >
                        {walk.gender}
                        &apos;s Walk #{walk.walkNumber}
                      </Typography>
                      <Typography component="p">
                        {walk.startDate} - {walk.endDate}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          ));

          return (
            <Grid
              container
              direction="column"
              alignItems="center"
              spacing={32}
              style={{ padding: '3rem 0', margin: '0 auto', maxWidth: '95%' }}
            >
              <Grid
                container
                spacing={16}
                justify="center"
                style={{ padding: '0 15px' }}
              >
                {walkCards}
                <br />
              </Grid>
              <Grid item>
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => {
                    fetchMore({
                      variables: {
                        offset: walks.length,
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        return Object.assign({}, prev, {
                          walks: [...prev.walks, ...fetchMoreResult.walks],
                        });
                      },
                    });
                  }}
                >
                  Load More
                </Button>
              </Grid>
            </Grid>
          );
        }
        return <p>No walks found.</p>;
      }}
    </Query>
  </Fragment>
);

export default Walks;
