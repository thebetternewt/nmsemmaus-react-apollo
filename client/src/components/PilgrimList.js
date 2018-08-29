import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Container from './common/ContentContainer';
import Hero from './common/Hero';
import Separator from './UI/Separator';
import { RED, GREEN, BLUE } from './UI/colors';

import candles from '../images/candles.jpeg';

const Section = styled.div`
  ${props =>
    props.dark
      ? 'background-color: #333; color: #fff'
      : 'background-color: #fff; color: #111'};
  width: 100vw;
  padding: 1rem 0;
`;

export default () => (
  <div>
    <Hero backgroundImage={candles} half>
      <h1>Pilgrim Lists</h1>
    </Hero>
    <Section>
      <Container width={'800px'}>
        {/* <h2>Who are we?</h2> */}
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
  </div>
);

const HeroImage = styled.img`
  width: 80%;
  max-width: 400px;
  margin-bottom: 2rem;
`;
