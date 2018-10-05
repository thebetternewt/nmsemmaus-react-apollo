import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { CircularProgress, Button } from '@material-ui/core';
import { UPCOMING_WALKS_QUERY } from '../../apollo/queries';

import Separator from '../UI/Separator';

const UpcomingWalks = () => (
  <WalksWidget>
    <h4>Upcoming Walks</h4>
    <Separator margin="1rem" />
    <Query query={UPCOMING_WALKS_QUERY} variables={{ afterDate: '2018-09-14' }}>
      {({ loading, data }) => {
        if (loading) {
          return <CircularProgress size={20} />;
        }

        let walkLinks = [];
        if (data && data.walks) {
          walkLinks = data.walks.map(walk => (
            <li key={walk.id}>
              <Link to={`/pilgrim-lists/${walk.walkNumber}`}>
                <Button
                  variant="raised"
                  style={{
                    backgroundColor:
                      walk.gender === 'Men'
                        ? 'rgba(0, 0, 255, 0.3)'
                        : 'rgba(255, 0, 255, 0.3)',
                  }}
                >
                  {walk.gender}
                  &apos;s Walk #{walk.walkNumber}
                  <br />
                  {walk.startDate} thru {walk.endDate}
                </Button>
              </Link>
            </li>
          ));
        }
        return <WalkLinkList>{walkLinks.slice(0, 4)}</WalkLinkList>;
      }}
    </Query>
  </WalksWidget>
);

const WalksWidget = styled.div`
  margin-bottom: 2rem;
  h4 {
    text-align: center !important;
    margin: 1em;
  }
`;

const WalkLinkList = styled.ul`
  padding-left: 0;
  list-style: none;
  text-align: center;
  font-size: 1.2rem;
  padding-top: 1rem;

  li {
    padding: 2px 0;

    a {
      cursor: pointer;

      &:hover {
        color: blue;
      }
    }
  }
`;

export default UpcomingWalks;
