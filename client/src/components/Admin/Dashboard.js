import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import SideDrawer from './SideDrawer';
import Walks from './Walks';
import Newsletters from './Newsletters';
import PilgrimUpload from './Pilgrims/PilgrimUpload';
import Boards from './Boards';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    marginLeft: drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const Dashboard = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <SideDrawer width={drawerWidth} />
      <main className={classes.content}>
        <Route exact path="/admin/walks" component={Walks} />
        <Route exact path="/admin/newsletters" component={Newsletters} />
        <Route exact path="/admin/pilgrims" component={PilgrimUpload} />
        <Route exact path="/admin/boards" component={Boards} />
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Dashboard);
