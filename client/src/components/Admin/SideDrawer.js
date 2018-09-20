import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../apollo/queries';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import { items } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: drawerWidth,
    height: '100%'
  },
  toolbar: theme.mixins.toolbar,
  subheader: {
    textTransform: 'uppercase'
  }
});

const SideDrawer = props => {
  const { classes } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" className={classes.subheader}>
            Admin
          </ListSubheader>
        }
      >
        {items}
      </List>
    </Drawer>
  );
};

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideDrawer);
