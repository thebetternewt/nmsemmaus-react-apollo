import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationItems from './NavigationItems';

const MenuBar = styled(AppBar)`
  nav {
    display: none;
  }

  @media (min-width: 900px) {
    .menu-button {
      display: none;
    }

    nav {
      display: block;
      height: 100%;
    }
  }
`;

const BrandLink = styled(Link)`
  flex-grow: 1;
`;
const Brand = styled(Typography)`
  flex-grow: 1;
  text-transform: uppercase;

  span {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    line-height: 0.8em;
  }

  @media (min-width: 900px) {
    span {
      font-size: 24px;
    }
  }
`;

const MenuButton = styled(IconButton)`
  margin-left: 20px !important;
`;

const Header = props => {
  const { toggleSideDrawer } = props;

  return (
    <MenuBar color="primary">
      <Toolbar>
        <BrandLink to="/">
          <Brand variant="title" color="inherit">
            <span>North MS Emmaus</span>
          </Brand>
        </BrandLink>
        <nav>
          <NavigationItems />
        </nav>

        <MenuButton
          color="inherit"
          aria-label="Menu"
          onClick={toggleSideDrawer}
          className="menu-button"
        >
          <MenuIcon />
        </MenuButton>
      </Toolbar>
    </MenuBar>
  );
};

Header.propTypes = {
  toggleSideDrawer: PropTypes.func.isRequired,
};

export default Header;
