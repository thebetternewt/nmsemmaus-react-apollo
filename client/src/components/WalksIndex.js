import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
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
        <Section>
          <Query query={WALKS_QUERY}>
            {({ data, loading }) => {
              if (loading) {
                return <h2>Loading...</h2>;
              }

              if (data && data.walks) {
                console.log(data);
                const { walks } = data;
                const walkCards = walks.map(walk => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={walk.id}>
                    <Link to={`/pilgrim-lists/${walk.walkNumber}`}>
                      <Card
                        style={{ flexGrow: 0, margin: '2rem 0' }}
                        elevation={22}
                        style={{
                          height: '100%',
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
                return (
                  <Container>
                    <Grid container spacing={16}>
                      {walkCards}
                    </Grid>
                  </Container>
                );
              }
            }}
          </Query>
        </Section>
      </Fragment>
    );
  }
}
