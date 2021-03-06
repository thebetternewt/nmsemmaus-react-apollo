import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Paper } from '@material-ui/core';
import Container from './ContentContainer';
import { DarkFilter } from '../UI/filters';

const PaperHero = styled(Paper)`
  background-image: url('${props => props.backgroundimage}');
  background-position: center;
  background-size: cover;
  display: flex;
  font-size: 1rem;
  height: ${({ size }) => {
    switch (size) {
    case 'sm':
      return '35vh';
    default:
      return '70vh';
    }
  }};
  justify-content: center;
  max-height: 600px;
  min-height: 300px;
  position: relative;
  text-align: center;
  width: 100vw;

  h1 {
    color: #fff;
    font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
    font-size: 3.2rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-bottom: 0.7em;

    @media screen and (max-width: 500px) {
      font-size: 2.5rem;
    }
  }
`;

const Hero = props => {
  const { backgroundImage, size } = props;

  return (
    <PaperHero
      color="secondary"
      square
      backgroundimage={backgroundImage}
      size={size}
    >
      <DarkFilter />
      <Container>{props.children}</Container>
    </PaperHero>
  );
};

Hero.defaultProps = {
  size: 'lg',
  backgroundImage: '',
};

Hero.propTypes = {
  size: PropTypes.string,
  backgroundImage: PropTypes.string,
};

export default Hero;
