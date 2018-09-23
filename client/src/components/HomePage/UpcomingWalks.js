import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { UPCOMING_WALKS_QUERY } from '../../apollo/queries';

import { CircularProgress, Paper } from '@material-ui/core';
import { YELLOW } from '../UI/colors';
import Separator from '../UI/Separator';

class UpcomingWalks extends Component {
  render() {
    return (
      <Paper
        style={{ padding: '2rem 30px', backgroundColor: YELLOW }}
        elevation={22}
        square
      >
        <h3>Upcoming Walks</h3>
        <Separator />
        <Query
          query={UPCOMING_WALKS_QUERY}
          variables={{ afterDate: '2018-09-14' }}
        >
          {({ loading, data }) => {
            if (loading) {
              return <CircularProgress size={20} />;
            }

            let walkLinks = [];
            if (data && data.walks) {
              walkLinks = data.walks.map(walk => (
                <li key={walk.id}>
                  <Link to={`/pilgrim-lists/${walk.walkNumber}`}>
                    {walk.gender}
                    's Walk #{walk.walkNumber}
                    <br />
                    {walk.startDate} thru {walk.endDate}
                  </Link>
                </li>
              ));
            }
            return <WalkLinkList>{walkLinks.slice(0, 4)}</WalkLinkList>;
          }}
        </Query>
      </Paper>
    );
  }
}

const WalkLinkList = styled.ul`
  padding-left: 0;
  list-style: none;
  text-align: center;
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
