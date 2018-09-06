import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isAuthenticated, logOutUser } from '../../apollo/client';

import NavigationItem from './NavigationItem';
// import ProfileImage from '../profiles/ProfileImage';
import { Button } from '@material-ui/core';

const NavigationItems = props => {
  return (
    <Nav>
      <NavigationItem link="/">Home</NavigationItem>
      {isAuthenticated() ? (
        <Fragment>
          <NavigationItem link="/news">News</NavigationItem>
          <NavigationItem link="/pilgrim-lists">Pilgrim Lists</NavigationItem>
          <LoginButton
            color="secondary"
            size="large"
            variant="raised"
            onClick={() => {
              logOutUser();
              window.location.href = '/';
            }}
          >
            Logout
          </LoginButton>
        </Fragment>
      ) : (
        <Link to="/login">
          <LoginButton color="secondary" size="large" variant="raised">
            Login
          </LoginButton>
        </Link>
      )}
    </Nav>
  );
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

const LoginButton = styled(Button)`
  margin-right: 80px;
`;

const ProfileLink = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 6px;
  }
`;
