import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { isAuthenticated } from '../apollo/client';

import Section from './common/Section';
import Container from './common/ContentContainer';
import Hero from './common/Hero';
import Separator from './UI/Separator';
import { RED, GREEN, BLUE } from './UI/colors';
import { Button, Paper } from '@material-ui/core';

import woodedPath from '../images/board-path.jpeg';

const HomePage = styled.div`
  background-color: #fff;
  margin: 0 0 2rem 0;
  font-size: 1.3rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
    letter-spacing: normal;
  }

  h2 {
    font-size: 2.2rem;
    font-weight: 500;
    margin: 1em 0 0.5em;
    text-align: center;
  }
  h3 {
    color: ${BLUE};
    font-size: 1.8rem;
    font-weight: 500;
    margin: 1em 0 0.5em;
    text-align: left;
    align-self: flex-start;

    &:nth-of-type(2) {
      color: ${RED};
    }
    &:nth-of-type(3) {
      color: ${GREEN};
    }
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;

    small {
      font-family: 'Raleway', 'Helvetica Neue', Arial, sans-serif;
      font-weight: 300;
      font-size: 1.5rem;
      opacity: 0.5;
    }
  }

  h5 {
    opacity: 0.6;
    font-size: 1.1rem;
    font-weight: 300;
    font-style: italic;
    margin: 1em 0;
    text-align: center;
    text-transform: uppercase;
  }

  p {
    font-family: 'Raleway', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 1.05rem;
    letter-spacing: 0.03em;

    span {
      font-weight: 300;
      opacity: 0.7;
      font-style: italic;
    }
  }
`;

export default () => (
  <HomePage>
    <Hero backgroundImage={woodedPath}>
      {/* <HeroImage src={logo} alt="The Marketplace" /> */}
      <h1>North Mississippi Emmaus Community</h1>
      {!isAuthenticated() && (
        <Link to="/login">
          <Button color="secondary" variant="raised" size="large">
            Community Login <i className="far fa-chevron-circle-right fa-lg" />
          </Button>
        </Link>
      )}
    </Hero>
    <Section>
      <Container width={'800px'}>
        {isAuthenticated() && (
          <Paper
            style={{
              backgroundColor: 'lightgreen',
              color: '#333',
              marginTop: '2rem',
              padding: '15px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            Welcome to the North MS Emmaus Community!
          </Paper>
        )}
        <h2>
          The vision of the Walk To Emmaus is <nobr>three-fold:</nobr>
        </h2>
        <h4>
          <small>
            The scriptures remind us that, "Where there is no vision, the people
            perish" (Prov. 29: 18 KJV). A vision of where we want to go gives us
            a sense of both direction and purpose.
          </small>
        </h4>
        <p style={{ textAlign: 'center' }}>
          <span>
            The principal points below were taken from an article by Rev. Cherie
            Jones, in the April-June issue of the Walk To Emmaus International
            Newsletter.
          </span>
        </p>
        <Separator />
        <h3>First: We seek to develop Christian leaders.</h3>
        <p>
          We invite Christians who are active members of local churches to come
          to the three day weekend. While on their walk, they are challenged to
          take on the disciplines of piety, study, and Christian action for the
          rest of their lives.
        </p>
        <h3>Second: We seek to strengthen local congregations.</h3>
        <p>
          We want pilgrims to return to their local churches and continue to
          offer themselves in service to God through their congregations. They
          take back their understanding of a life marked by piety, study, and
          Christian action. They bring home a renewed energy for loving God and
          neighbor. They bring back a revitalized desire to offer sacrificial
          love within the church.
        </p>
        <h3>Third: We seek to Christianize the environment.</h3>
        <p>
          We want the pilgrims to return to their homes, places of work, school,
          neighborhoods, and be faithful witnesses to the grace of Jesus Christ.
          It is our hope and vision that their witness will make a difference in
          their world, that their lives will be marked by honesty and integrity,
          and that the light of Christ will shine through their words and deeds.
        </p>
      </Container>
    </Section>
  </HomePage>
);
