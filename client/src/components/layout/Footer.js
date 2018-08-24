import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/ContentContainer';
import styled from 'styled-components';

// import logo from '../../images/logos/gcp-logo-white.png';
import logo from '../../images/WalktoEmmaus-Logo-white-text.png';

const FooterWrapper = styled.div`
  background-color: #333;
  color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 3px 12px rgba(100, 100, 100, 0.7);
  display: flex;
  justify-content: center;
  max-width: 100vw;
  padding: 3rem 0;
  width: 100%;
  text-align: center;

  img {
    width: 100px;
  }
`;

const Footer = () => (
  <FooterWrapper>
    <Container>
      <Link to="/">
        <img src={logo} alt="North MS Emmaus Community" />
        <p>
          <i className="fal fa-copyright" /> {new Date().getFullYear()} North MS
          Emmaus Community
        </p>
      </Link>
    </Container>
  </FooterWrapper>
);

export default Footer;
