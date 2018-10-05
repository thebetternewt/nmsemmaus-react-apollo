import React from 'react';
import styled from 'styled-components';
import { GREEN } from '../UI/colors';
import Separator from '../UI/Separator';

const HomeLinksCard = () => (
  <LinksWidget>
    <h4>Additional Links</h4>
    <Separator margin="1rem" />
    <LinkList>
      <li>
        <a
          href="https://nmsemmaus.org/CCNM2017Newsletter.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Newsletter for the Christian Camp of North Mississippi
        </a>
      </li>
      <li>
        <a
          href="http://nmsemmaus.netlify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          North MS Emmaus Legacy Site
        </a>
      </li>
      <li>
        <a
          href="https://www.upperroom.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Upper Room
        </a>
      </li>
      <li>
        <a
          href="https://northmschrysalis.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          North MS Chrysalis Website
        </a>
      </li>
    </LinkList>
  </LinksWidget>
);

const LinksWidget = styled.div`
  h4 {
    text-align: center !important;
    margin: 1em;
  }
`;

const LinkList = styled.ul`
  color: ${GREEN};
  list-style: none;
  text-align: center;
  font-size: 1rem;
  padding-left: 0;
  padding-top: 1rem;

  li {
    padding: 0.5em 0;
    text-decoration: underline;

    &:first-of-type {
      padding-top: 0;
    }
  }
`;

export default HomeLinksCard;
