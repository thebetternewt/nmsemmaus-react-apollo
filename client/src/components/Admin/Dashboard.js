import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';

import SideDrawer from './SideDrawer';
import { CURRENT_USER_QUERY } from '../../apollo/queries';
import Walks from './Walks';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  content: {
    marginLeft: drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SideDrawer width={drawerWidth} />
        <main className={classes.content}>
          <Route exact path="/admin/walks" component={Walks} />
          {/* <Route exact path="/dashboard/user-admin" component={Users} /> */}
          {/* <Route
            exact
            path="/dashboard/department-admin"
            component={Departments}
          /> */}
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);