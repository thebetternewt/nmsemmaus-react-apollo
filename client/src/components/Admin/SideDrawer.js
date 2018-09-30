import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import items from './sideDrawerItems';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: drawerWidth,
    height: '100%',
  },

  toolbar: theme.mixins.toolbar,
  subheader: {
    textTransform: 'uppercase',
  },
});

const SideDrawer = props => {
  const { classes } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
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
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(SideDrawer);
