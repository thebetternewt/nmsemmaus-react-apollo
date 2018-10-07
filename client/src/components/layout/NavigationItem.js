import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { YELLOW } from '../UI/colors';

const NavigationItem = props => {
  const { link, children } = props;
  return (
    <NavItem>
      <NavigationLink exact to={link}>
        {children}
      </NavigationLink>
    </NavItem>
  );
};

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavigationItem;

const NavItem = styled.li`
  height: 100%;
  margin: 0;
  width: 100%;

  @media (min-width: 900px) {
    width: auto;
  }
`;

const NavigationLink = styled(NavLink)`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: flex-start;
  padding: 0 30px;
  position: relative;
  width: 100%;
  text-transform: capitalize;

  &:after {
    background-color: ${YELLOW};
    bottom: 50%;
    left: 0;
    height: 0;
    width: 10px;
    content: '';
    display: block;
    position: absolute;
    transition: height 200ms ease-out;
    transform: translateY(50%);
  }
  &.active {
    background-color: #eee;
    &:after {
      height: 100%;
    }
  }

  @media (min-width: 900px) {
    height: 60px;
    justify-content: center;
    padding: 0 10px;
    margin: 0 5px 0 0;
    width: auto;

    &:after {
      background-color: ${YELLOW};
      bottom: 0;
      content: '';
      display: block;
      height: 5px;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      transition: width 200ms ease-out;
      width: 0;
    }
    &.active {
      background-color: rgba(255, 255, 255, 0.2);
      &:after {
        height: 5px;
        width: 100%;
      }
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      &:after {
        background-color: #fff;
        height: 5px;
        width: 100%;
      }
    }
  }
`;
