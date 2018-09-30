import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import MailIcon from '@material-ui/icons/Mail';
import GroupIcon from '@material-ui/icons/Group';

export default (
  <div>
    <Link to="/admin/walks">
      <ListItem button>
        <ListItemIcon>
          <DirectionsWalkIcon />
        </ListItemIcon>
        <ListItemText primary="Walks" />
      </ListItem>
    </Link>
    <Link to="/admin/newsletters">
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Newsletters" />
      </ListItem>
    </Link>
    <Link to="/admin/pilgrims">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Pilgrims" />
      </ListItem>
    </Link>
  </div>
);
