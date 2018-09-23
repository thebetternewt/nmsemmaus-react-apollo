import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import {
  LATEST_NEWSLETTER_QUERY,
  NEWSLETTERS_QUERY,
  NEWSLETTER_QUERY
} from '../../apollo/queries';

import { CircularProgress, Grid, Paper } from '@material-ui/core';
import Hero from '../common/Hero';
import Newsletter from './Newsletter';

import boardPath from '../../images/board-path.jpeg';

class Newsletters extends Component {
  render() {
    const { id } = this.props.match.params;

    let newsletter;
    if (id) {
      newsletter = (
        <Query query={NEWSLETTER_QUERY} variables={{ id }}>
          {({ loading, data }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.newsletter) {
              return <Newsletter newsletter={data.newsletter} />;
            }

            return null;
          }}
        </Query>
      );
    } else {
      newsletter = (
        <Query query={LATEST_NEWSLETTER_QUERY}>
          {({ loading, data }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.latestNewsletter) {
              return <Newsletter newsletter={data.latestNewsletter} />;
            }

            return null;
          }}
        </Query>
      );
    }

    return (
      <div>
        <Helmet>
          <title>News | North MS Emmaus</title>
        </Helmet>
        <Hero backgroundImage={boardPath} size="sm">
          <h1>News</h1>
        </Hero>
        <Grid
          container
          spacing={32}
          justify="center"
          style={{ paddingTop: '3rem', backgroundColor: '#b7b7b7' }}
        >
          <Grid
            item
            container
            md={8}
            lg={6}
            justify="center"
            direction="column"
          >
            {newsletter}
          </Grid>
          <Grid item md={3}>
            <Paper style={{ padding: '2rem 30px' }} elevation={22} square>
              <h3>Recent Newsletters</h3>
              <Query query={NEWSLETTERS_QUERY}>
                {({ loading, data }) => {
                  if (loading) {
                    return <CircularProgress size={20} />;
                  }

                  let newsletterLinks;
                  if (data && data.newsletters) {
                    newsletterLinks = data.newsletters.map(newsletter => (
                      <li key={newsletter.id}>
                        >{' '}
                        <Link to={`/news/${newsletter.id}`}>
                          {newsletter.title}
                        </Link>
                      </li>
                    ));

                    return (
                      <NewsletterLinkList>
                        {newsletterLinks.slice(0, 4)}
                      </NewsletterLinkList>
                    );
                  }
                }}
              </Query>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const NewsletterLinkList = styled.ul`
  padding-left: 0;
  list-style: none;
  li {
    padding: 2px 0;

    a {
      cursor: pointer;

      &:hover {
        color: blue;
      }
    }
  }
`;

export default Newsletters;
