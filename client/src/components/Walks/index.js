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
  Button,
  TextField,
} from '@material-ui/core';
import { WALKS_QUERY } from '../../apollo/queries';

import Hero from '../common/Hero';
import candles from '../../images/candles.jpeg';
import boardPath from '../../images/board-path.jpeg';
import { isEmptyObject } from '../../util/isEmpty';

class Walks extends Component {
  state = {
    walkNumberSearch: '',
    endOfWalks: false,
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { walkNumberSearch, endOfWalks } = this.state;

    return (
      <div>
        <Hero backgroundImage={candles} size="sm">
          <h1>Pilgrim Lists</h1>
        </Hero>

        <Query
          query={WALKS_QUERY}
          variables={{ offset: 0, limit: 3 }}
          fetchPolicy="cache-and-network"
        >
          {({ data, loading, fetchMore, refetch }) => {
            if (loading && isEmptyObject(data)) {
              return (
                <Grid container item justify="center">
                  <CircularProgress />
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
                  style={{
                    padding: '3rem 0',
                    margin: '0 auto',
                    maxWidth: '95%',
                  }}
                >
                  <TextField
                    type="number"
                    variant="outlined"
                    id="walkNumberSearch"
                    name="walkNumberSearch"
                    label="Search for a Walk"
                    placeholder="Walk #"
                    value={walkNumberSearch}
                    onChange={this.handleInputChange}
                    style={{ maxWidth: 300, margin: '0 auto 1rem' }}
                  />
                  <Button
                    variant="raised"
                    color="primary"
                    style={{ maxWidth: 300, margin: '0 auto 2rem' }}
                    disabled={!walkNumberSearch.length}
                    onClick={() => {
                      refetch({
                        offset: 0,
                        limit: 3,
                        walkNumber: walkNumberSearch,
                      });
                    }}
                  >
                    Search
                  </Button>
                  {walks.length === 0 ? (
                    <Fragment>
                      <p>No walks found.</p>
                      <Button
                        variant="raised"
                        color="primary"
                        style={{ maxWidth: 300, margin: '0 auto 2rem' }}
                        onClick={() => {
                          this.setState({
                            walkNumberSearch: '',
                          });
                          refetch({
                            offset: 0,
                            limit: 3,
                            walkNumber: null,
                          });
                        }}
                      >
                        Show All Walks
                      </Button>
                    </Fragment>
                  ) : (
                    <Fragment>
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
                          // Hide 'Load More' button if no more walks to load
                          style={endOfWalks ? { display: 'none' } : {}}
                          onClick={() => {
                            fetchMore({
                              variables: {
                                offset: walks.length,
                              },
                              updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) {
                                  this.setState({ endOfWalks: true });
                                  return prev;
                                }
                                if (fetchMoreResult.walks.length < 3) {
                                  this.setState({ endOfWalks: true });
                                }
                                return Object.assign({}, prev, {
                                  walks: [
                                    ...prev.walks,
                                    ...fetchMoreResult.walks,
                                  ],
                                });
                              },
                            });
                          }}
                        >
                          Load More
                        </Button>
                      </Grid>
                    </Fragment>
                  )}
                </Grid>
              );
            }
            return <p>No walks found.</p>;
          }}
        </Query>
      </div>
    );
  }
}

export default Walks;
