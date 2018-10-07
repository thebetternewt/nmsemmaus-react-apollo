import React from 'react';
import styled from 'styled-components';

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
      <h1>Application Forms</h1>
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
          <a
            href="https://s3.amazonaws.com/nmsemmaus/applications/Team+Application_2018.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
              Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
            </Button>
          </a>
          {/* <Button
            variant="raised"
            style={{ backgroundColor: YELLOW, marginTop: 10 }}
          >
            Online Form <CreateIcon style={{ marginLeft: 10 }} />
          </Button> */}
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
          <a
            href="https://s3.amazonaws.com/nmsemmaus/applications/2018+Clergy+Application.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
              Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
            </Button>
          </a>
          {/* <Button
            variant="raised"
            style={{ backgroundColor: YELLOW, marginTop: 10 }}
          >
            Online Form <CreateIcon style={{ marginLeft: 10 }} />
          </Button> */}
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
        <h3>Information Update Form</h3>
        <Separator margin="1rem" />
        <Grid
          item
          container
          justify="space-around"
          style={{ paddingTop: '10px', maxWidth: 400 }}
        >
          <a
            href="https://s3.amazonaws.com/nmsemmaus/applications/Personal+Information+Update_Oct_2009.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
              Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
            </Button>
          </a>
          <a
            href="https://goo.gl/forms/ynyfjMHEqZ2G3CpV2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="raised"
              style={{ backgroundColor: YELLOW, marginTop: 10 }}
            >
              Online Form <CreateIcon style={{ marginLeft: 10 }} />
            </Button>
          </a>
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
          <a
            href="https://s3.amazonaws.com/nmsemmaus/applications/Request+for+Reservation_2018.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
              Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
            </Button>
          </a>
          {/* <Button
            variant="raised"
            style={{ backgroundColor: YELLOW, marginTop: 10 }}
          >
            Online Form <CreateIcon style={{ marginLeft: 10 }} />
          </Button> */}
        </Grid>
      </Application>
      {/* MUSIC APPLICATION */}
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
        <h3>Music Team Application</h3>
        <Separator margin="1rem" />
        <Grid
          item
          container
          justify="space-around"
          style={{ paddingTop: '10px', maxWidth: 400 }}
        >
          <a
            href="https://s3.amazonaws.com/nmsemmaus/applications/Music+Team+Application_2018.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
              Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
            </Button>
          </a>
          {/* <Button
            variant="raised"
            style={{ backgroundColor: YELLOW, marginTop: 10 }}
          >
            Online Form <CreateIcon style={{ marginLeft: 10 }} />
          </Button> */}
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
        <h3>Sponsorship Application</h3>
        <Separator margin="1rem" />
        <Grid
          item
          container
          justify="space-around"
          style={{ paddingTop: '10px', maxWidth: 400 }}
        >
          <a
            href="https://s3.amazonaws.com/nmsemmaus/applications/Sponsor_Sheet_2012.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="raised" color="primary" style={{ marginTop: 10 }}>
              Download <CloudDownloadIcon style={{ marginLeft: 10 }} />
            </Button>
          </a>
          {/* <Button
            variant="raised"
            style={{ backgroundColor: YELLOW, marginTop: 10 }}
          >
            Online Form <CreateIcon style={{ marginLeft: 10 }} />
          </Button> */}
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
