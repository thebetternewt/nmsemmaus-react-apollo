import React from 'react';
import styled from 'styled-components';

import Container from './ContentContainer';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DarkFilter } from '../UI/filters';

const PaperHero = styled(Paper)`
  background-image: url('${props => props.backgroundimage}');
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

const Hero = props => {
  const { backgroundImage, half } = props;

  return (
    <PaperHero
      color="secondary"
      square
      backgroundimage={backgroundImage}
      half={half}
    >
      <DarkFilter />

      <Container>{props.children}</Container>
    </PaperHero>
  );
};

export default Hero;
