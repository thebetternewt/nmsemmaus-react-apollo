import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import SideDrawer from './SideDrawer';
import Footer from './Footer';

class Layout extends Component {
  state = {
    sideDrawerOpen: false,
  };

  toggleSideDrawer = () => {
    const { sideDrawerOpen } = this.state;
    this.setState({ sideDrawerOpen: !sideDrawerOpen });
  };

  render() {
    const { sideDrawerOpen } = this.state;
    const { children } = this.props;
    return (
      <LayoutContainer>
        <Header toggleSideDrawer={this.toggleSideDrawer} />
        <SideDrawer toggle={this.toggleSideDrawer} open={sideDrawerOpen} />
        <LayoutBody>{children}</LayoutBody>
        <Footer />
      </LayoutContainer>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LayoutBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 56px;
`;
