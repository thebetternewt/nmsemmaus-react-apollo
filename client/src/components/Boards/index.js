import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CircularProgress,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import { BOARDS_QUERY } from '../../apollo/queries';
import { PURPLE } from '../UI/colors';

import Hero from '../common/Hero';
import boardPath from '../../images/board-path.jpeg';
import Separator from '../UI/Separator';

const Boards = () => (
  <Fragment>
    <Hero backgroundImage={boardPath} size="sm">
      <h1>Board of Directors</h1>
    </Hero>
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={32}
      style={{ padding: '3rem 0', margin: '0 auto', maxWidth: '95%' }}
    >
      <Query query={BOARDS_QUERY} variables={{ limit: 4 }}>
        {({ data, loading }) => {
          if (loading) {
            return (
              <Grid item>
                <CircularProgress size={50} />;
              </Grid>
            );
          }

          if (data && data.boards) {
            const { boards } = data;

            const currentBoard = boards[0];
            const currentBoardItem = (
              <Grid item xs={12} style={{ width: 600, maxWidth: '95vw' }}>
                <CurrentBoardCard elevation={12}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="headline"
                      component="h3"
                      style={{ color: '#fff' }}
                    >
                      {currentBoard.year} Board of Directors
                    </Typography>
                    <Separator color="#fff" margin="1rem" />
                    <BoardList>
                      <li>Chairman - {currentBoard.chairman}</li>
                      <li>Vice Chairman - {currentBoard.viceChairman}</li>
                      <li>Secretary - {currentBoard.secretary}</li>
                      <li>Treasurer - {currentBoard.treasurer}</li>
                      <li>
                        Community Spiritual Director -{' '}
                        {currentBoard.communitySpiritualDirector}
                      </li>
                      <li>
                        Ex Officio (Immediate Past Chair) -{' '}
                        {currentBoard.exOfficio}
                      </li>
                    </BoardList>
                  </CardContent>
                </CurrentBoardCard>
              </Grid>
            );

            const boardItems = boards.slice(1, boards.length).map(board => (
              <Grid key={board.id} item xs={12} sm={4} lg={3}>
                <Card
                  style={{
                    height: '100%',
                    border: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    textAlign: 'center',
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h3">
                      Class of {board.year}
                    </Typography>

                    <Typography component="p" style={{ fontSize: '1.2rem' }}>
                      {board.chairman}
                      <br />
                      {board.viceChairman}
                      <br />
                      {board.secretary}
                      <br />
                      {board.treasurer}
                      <br />
                      {board.communitySpiritualDirector}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ));

            return (
              <Fragment>
                {currentBoardItem}
                <Grid item container justify="center" spacing={16}>
                  {boardItems}
                </Grid>
              </Fragment>
            );
          }
          return <p>No boards found.</p>;
        }}
      </Query>
    </Grid>
  </Fragment>
);

const CurrentBoardCard = styled(Card)`
  background-color: ${PURPLE} !important;
  text-align: center;
  padding: 1rem 20px;
`;

const BoardList = styled.ul`
  color: #fff;
  font-size: 1.1rem;
  list-style: none;
  padding-left: 0;

  li {
    padding: 0.3em 0;
  }
`;

export default Boards;
