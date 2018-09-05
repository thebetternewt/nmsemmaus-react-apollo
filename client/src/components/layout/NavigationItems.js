import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavigationItem from './NavigationItem';
// import ProfileImage from '../profiles/ProfileImage';
import { ActionButton } from '../UI/buttons';

const NavigationItems = props => (
  <Nav>
    <NavigationItem link="/">Home</NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <ActionButton onClick={props.toggleLoginModal}>Log In</ActionButton>
    )}
  </Nav>
);

NavigationItems.defaultProps = {
  isAuthenticated: false
};

NavigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default NavigationItems;

const Nav = styled.ul`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 800px) {
    align-items: center;
    flex-direction: row;
    height: 100%;
  }
`;

const ProfileLink = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 6px;
  }
`;
