import React, { Component, Fragment } from 'react';
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
  Button
} from '@material-ui/core';

import { WALKS_QUERY } from '../apollo/queries';

import Section from './common/Section';
import Container from './common/ContentContainer';
import Hero from './common/Hero';

import candles from '../images/candles.jpeg';
import boardPath from '../images/board-path.jpeg';

export default class PilgrimsListsIndex extends Component {
  render() {
    return (
      <Fragment>
        <Hero backgroundImage={candles} size="sm">
          <h1>Pilgrim Lists</h1>
        </Hero>
        <Grid
          container
          spacing={16}
          justify="flex-start"
          style={{ padding: '3rem 10px' }}
        >
          <Query query={WALKS_QUERY}>
            {({ data, loading }) => {
              if (loading) {
                return (
                  <Grid item>
                    <CircularProgress />;
                  </Grid>
                );
              }

              if (data && data.walks) {
                console.log(data);
                const { walks } = data;
                const walkCards = walks.map(walk => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Link
                      to={`/pilgrim-lists/${walk.walkNumber}`}
                      style={{ width: '100%' }}
                      key={walk.id}
                    >
                      <Card
                        elevation={22}
                        style={{
                          // flexGrow: 0,
                          // margin: '2rem 0',
                          height: '100%',
                          width: '100%',
                          border: `3px solid ${
                            walk.gender === 'Men'
                              ? 'rgba(0, 0, 255, 0.5)'
                              : 'rgba(255, 0, 255, 0.5)'
                          }`
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
                              's Walk #{walk.walkNumber}
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
                          {/* <Button size="small" color="primary">
                          Learn More
                        </Button> */}
                        </CardActions>
                      </Card>
                    </Link>
                  </Grid>
                ));
                return <Fragment>{walkCards}</Fragment>;
              }
            }}
          </Query>
        </Grid>
      </Fragment>
    );
  }
}
