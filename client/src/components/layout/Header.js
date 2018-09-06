import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

import styled from 'styled-components';

import NavigationItems from './NavigationItems';

// import logo from '../../images/logos/gcp-logo-white.png';
import logo from '../../images/WalktoEmmaus-Logo-white-text.png';

const MenuBar = styled(AppBar)`
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
    /* margin-left: 15px; */
  }

  @media (min-width: 800px) {
    span {
      font-size: 24px;
    }
  }
`;

const MenuButton = styled(IconButton)`
  margin-left: 20px !important;
`;

const Header = props => {
  const { toggleLoginModal, toggleSideDrawer } = props;

  return (
    <MenuBar color="primary">
      <Toolbar>
        <BrandLink to="/">
          <Brand variant="title" color="inherit">
            <span>North MS Emmaus</span>
          </Brand>
        </BrandLink>
        <nav>
          <NavigationItems toggleLoginModal={toggleLoginModal} />
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

export default Header;
