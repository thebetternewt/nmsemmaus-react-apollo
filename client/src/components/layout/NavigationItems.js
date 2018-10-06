import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@material-ui/core';
import { isAuthenticated, logOutUser } from '../../apollo/client';

import NavigationItem from './NavigationItem';

const NavigationItems = () => (
  <Nav>
    <NavigationItem link="/">Home</NavigationItem>
    {isAuthenticated() ? (
      <Fragment>
        <NavigationItem link="/news">News</NavigationItem>
        <NavigationItem link="/pilgrim-lists">Pilgrim Lists</NavigationItem>
        <NavigationItem link="/board">Board</NavigationItem>
        <NavigationItem link="/applications">Applications</NavigationItem>
        <NavigationItem link="/sponsorship">Sponsorship</NavigationItem>
        <NavigationItem link="/admin/walks">Admin</NavigationItem>
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
      <Link to="/login" style={{ width: '100%', padding: '0 30px' }}>
        <LoginButton color="secondary" size="large" variant="raised" fullWidth>
          Login
        </LoginButton>
      </Link>
    )}
  </Nav>
);

export default NavigationItems;

const Nav = styled.ul`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 900px) {
    align-items: center;
    flex-direction: row;
    height: 100%;
  }
`;

const LoginButton = styled(Button)`
  @media (max-width: 899px) {
    margin-top: 15px !important;
    align-self: center;
    width: 90%;
  }
`;
