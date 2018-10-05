import React from 'react';
import styled from 'styled-components';

import { Paper, Grid } from '@material-ui/core';
import LinksCard from './LinksCard';
import UpcomingWalks from './UpcomingWalks';

import { isAuthenticated } from '../../apollo/client';

const SideBar = () => (
  <Container elevation={8}>
    <Grid container direction="column">
      {isAuthenticated() && <UpcomingWalks />}
      <LinksCard />
    </Grid>
  </Container>
);

export default SideBar;

const Container = styled(Paper)`
  background-color: #eee !important;
  padding: 15px;
  margin-top: 2rem;
`;
