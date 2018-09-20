import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, List, ListItem, ListItemText, Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const PilgrimsList = props => {
  const { classes, pilgrims } = props;
  const pilgrimListItems = pilgrims.map(pilgrim => (
    <ListItem key={pilgrim.id}>
      <Avatar>
        <PersonIcon />
      </Avatar>
      <ListItemText
        primary={`${pilgrim.firstName} ${pilgrim.lastName}`}
        secondary={`${pilgrim.hometown} | Sponsor: ${pilgrim.sponsor}`}
      />
    </ListItem>
  ));

  return (
    <Fragment>
      {pilgrims.length > 0 ? (
        <Paper>
          <List>{pilgrimListItems}</List>
        </Paper>
      ) : (
        <p>No pilgrims found.</p>
      )}
    </Fragment>
  );
};

PilgrimsList.propTypes = {
  classes: PropTypes.object.isRequired,
  pilgrims: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(PilgrimsList);
