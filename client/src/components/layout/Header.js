import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NavigationItems from './NavigationItems';

// import logo from '../../images/logos/gcp-logo-white.png';
import logo from '../../images/WalktoEmmaus-Logo-white-text.png';

const Header = styled.div`
  background-color: #333;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5);
  display: flex;
  height: 60px;
  justify-content: center;
  left: 0;
  max-width: 100vw;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  nav {
    display: none;
  }

  @media (min-width: 800px) {
    .menu-button {
      display: none;
    }

    nav {
      display: block;
      height: 100%;
    }
  }
`;

const Container = styled.div`
  align-items: center;
  color: #fff;
  display: flex;

  height: 100%;
  justify-content: space-between;
  max-width: 1200px;
  padding: 0 15px;
  width: 100%;
`;

const Brand = styled.div`
  align-items: center;
  display: flex;
  height: 80%;

  img {
    height: 40px;
  }

  span {
    font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    margin-left: 15px;
  }

  @media (min-width: 800px) {
    span {
      font-size: 24px;
    }
  }
`;

const MenuButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
`;

export default props => (
  <Header>
    <Container>
      <Link to="/">
        <Brand>
          <span>North MS Emmaus</span>
        </Brand>
      </Link>
      <nav>
        <NavigationItems />
      </nav>
      <MenuButton className="menu-button" onClick={props.toggleSideDrawer}>
        <i className="fal fa-bars fa-3x" />
      </MenuButton>
    </Container>
  </Header>
);
