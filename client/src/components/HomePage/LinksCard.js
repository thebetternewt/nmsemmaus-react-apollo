import React from 'react';
import { Paper } from '@material-ui/core';
import { GREEN } from '../UI/colors';

const HomeLinksCard = () => {
  return (
    <Paper style={{ backgroundColor: GREEN }}>
      <ul>
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
      </ul>
    </Paper>
  );
};

export default HomeLinksCard;
