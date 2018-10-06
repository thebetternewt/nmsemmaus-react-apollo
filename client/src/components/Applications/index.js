import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Grid, Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CreateIcon from '@material-ui/icons/Create';
import boardPath from '../../images/board-path.jpeg';
import Hero from '../common/Hero';

import { YELLOW } from '../UI/colors';
import Separator from '../UI/Separator';

const Applications = () => (
  <div>
    <Hero backgroundImage={boardPath} size="sm">
      <h1>Applications</h1>
    </Hero>
    <Grid
      container
      spacing={32}
      alignItems="center"
      style={{ padding: '3rem 0' }}
      direction="column"
    >
      {/* TEAM APPLICATION */}
      <Application
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        md={8}
        lg={6}
        style={{ maxWidth: '400px' }}
      >
        <h3>Team Application</h3>
        <Separator margin="1rem" />
        <Grid
          item
          container
          justify="space-around"
          style={{ paddingTop: '10px', maxWidth: 400 }}
        >
          <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
            Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
          </Button>
          <Button
            variant="raised"
            style={{ backgroundColor: YELLOW, marginTop: 10 }}
          >
            Online Form <CreateIcon style={{ marginLeft: 10 }} />
          </Button>
        </Grid>
      </Application>
      {/* CLERGY APPLICATION */}
      <Application
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        md={8}
        lg={6}
        style={{ maxWidth: '400px' }}
      >
        <h3>Clergy Application</h3>
        <Separator margin="1rem" />
        <Grid
          item
          container
          justify="space-around"
          style={{ paddingTop: '10px', maxWidth: 400 }}
        >
          <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
            Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
          </Button>
          <Button
            variant="raised"
            style={{ backgroundColor: YELLOW, marginTop: 10 }}
          >
            Online Form <CreateIcon style={{ marginLeft: 10 }} />
          </Button>
        </Grid>
      </Application>
      {/* INFORMATION UPDATE */}
      <Application
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        md={8}
        lg={6}
        style={{ maxWidth: '400px' }}
      >
        <h3>Information Update</h3>
        <Separator margin="1rem" />
        <Grid
          item
          container
          justify="space-around"
          style={{ paddingTop: '10px', maxWidth: 400 }}
        >
          <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
            Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
          </Button>
          <Button
            variant="raised"
            style={{ backgroundColor: YELLOW, marginTop: 10 }}
          >
            Online Form <CreateIcon style={{ marginLeft: 10 }} />
          </Button>
        </Grid>
      </Application>
      {/* PILGRIM APPLICATION */}
      <Application
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        md={8}
        lg={6}
        style={{ maxWidth: '400px' }}
      >
        <h3>Pilgrim Application</h3>
        <Separator margin="1rem" />
        <Grid
          item
          container
          justify="space-around"
          style={{ paddingTop: '10px', maxWidth: 400 }}
        >
          <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
            Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
          </Button>
          <Button
            variant="raised"
            style={{ backgroundColor: YELLOW, marginTop: 10 }}
          >
            Online Form <CreateIcon style={{ marginLeft: 10 }} />
          </Button>
        </Grid>
      </Application>
      {/* MUISC APPLICATION */}
      <Application
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        md={8}
        lg={6}
        style={{ maxWidth: '400px' }}
      >
        <h3>Music Application</h3>
        <Separator margin="1rem" />
        <Grid
          item
          container
          justify="space-around"
          style={{ paddingTop: '10px', maxWidth: 400 }}
        >
          <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
            Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
          </Button>
          <Button
            variant="raised"
            style={{ backgroundColor: YELLOW, marginTop: 10 }}
          >
            Online Form <CreateIcon style={{ marginLeft: 10 }} />
          </Button>
        </Grid>
      </Application>
      {/* SPONSOR APPLICATION */}
      <Application
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        md={8}
        lg={6}
        style={{ maxWidth: '400px' }}
      >
        <h3>Sponsor Application</h3>
        <Separator margin="1rem" />
        <Grid
          item
          container
          justify="space-around"
          style={{ paddingTop: '10px', maxWidth: 400 }}
        >
          <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
            Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
          </Button>
          <Button
            variant="raised"
            style={{ backgroundColor: YELLOW, marginTop: 10 }}
          >
            Online Form <CreateIcon style={{ marginLeft: 10 }} />
          </Button>
        </Grid>
      </Application>
    </Grid>
  </div>
);

export default Applications;

const Application = styled(Grid)`
  h3 {
    text-align: center;
    margin-bottom: 0;
  }
  button {
    width: 170px;
  }
`;
