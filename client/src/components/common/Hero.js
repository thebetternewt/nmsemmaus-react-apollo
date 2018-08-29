import React from 'react';
import styled from 'styled-components';

import Container from './ContentContainer';

const Hero = styled.div`
  background-image: url('${props => props.backgroundImage}');
  background-position: center bottom;
  background-size: cover;
  display: flex;
  font-size: 1rem;
  height: ${({ half }) => {
    if (half) {
      return '35vh';
    }
    return '70vh';
  }};
  justify-content: center;
  max-height: 600px;
  min-height: 300px;
  position: relative;
  text-align: center;
  width: 100vw;

  h1 {
    color: #fff;
    font-family: 'Roboto Slab', 'sans-serif';
    font-size: 3.2rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    margin-bottom: 0.7em;

    @media screen and (max-width: 500px) {
      font-size: 2.5rem;
    }
  }
`;

const Filter = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export default props => (
  <Hero backgroundImage={props.backgroundImage} half={props.half}>
    <Filter />
    <Container>{props.children}</Container>
  </Hero>
);
