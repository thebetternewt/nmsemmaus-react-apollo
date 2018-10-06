import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { CircularProgress, Grid, Button } from '@material-ui/core';
import {
  LATEST_NEWSLETTER_QUERY,
  NEWSLETTERS_QUERY,
  NEWSLETTER_QUERY,
} from '../../apollo/queries';
import { GREEN } from '../UI/colors';

import Hero from '../common/Hero';
import Newsletter from './Newsletter';

import boardPath from '../../images/board-path.jpeg';
import Separator from '../UI/Separator';
import SignUp from './SignUp';

class Newsletters extends Component {
  state = {
    showSignUp: false,
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleSignUp = () => {
    const { showSignUp } = this.state;
    this.setState({ showSignUp: !showSignUp });
  };

  render() {
    const { id } = this.props.match.params; // eslint-disable-line
    const { showSignUp } = this.state;

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
          <Button
            variant="raised"
            color="secondary"
            onClick={this.toggleSignUp}
          >
            Register for Newsletter Emails
          </Button>
          {showSignUp && (
            <Fragment>
              <Backdrop />
              <SignUp close={this.toggleSignUp} />
            </Fragment>
          )}
        </Hero>
        <Grid
          container
          spacing={32}
          justify="center"
          style={{ padding: '3rem 0' }}
        >
          <Grid
            item
            container
            md={8}
            lg={6}
            justify="center"
            direction="column"
            style={{ maxWidth: '100vw' }}
          >
            {newsletter}
          </Grid>
          <Grid item md={3}>
            <LinksWidget>
              <h4>Recent Newsletters</h4>
              <Separator margin="1rem" />
              <Query query={NEWSLETTERS_QUERY}>
                {({ loading, data }) => {
                  if (loading) {
                    return <CircularProgress size={20} />;
                  }

                  let newsletterLinks;
                  if (data && data.newsletters) {
                    newsletterLinks = data.newsletters.map(nl => (
                      <li key={nl.id}>
                        <Link to={`/news/${nl.id}`}>{nl.title}</Link>
                      </li>
                    ));

                    return (
                      <NewsletterLinkList>
                        {newsletterLinks.slice(0, 4)}
                      </NewsletterLinkList>
                    );
                  }

                  return <p>No newsletters found.</p>;
                }}
              </Query>
            </LinksWidget>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Newsletters;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const NewsletterLinkList = styled.ul`
  color: ${GREEN};
  list-style: none;
  text-align: center;
  font-size: 1rem;
  padding-left: 0;
  padding-top: 1rem;

  li {
    padding: 0.5em 0;
    text-decoration: underline;

    &:first-of-type {
      padding-top: 0;
    }
  }
`;

const LinksWidget = styled.div`
  h4 {
    text-align: center !important;
    margin: 1em;
  }
`;
