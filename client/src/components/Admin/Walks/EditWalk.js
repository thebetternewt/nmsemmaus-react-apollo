import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WalkForm from './WalkForm';
import { Mutation } from 'react-apollo';
import { UPDATE_WALK } from '../../../apollo/mutations';

import { Paper, CircularProgress } from '@material-ui/core';

export default class EditWalk extends Component {
  static getDerivedStateFromProps(nextProps) {
    return { walk: nextProps.walk };
  }

  state = {
    walk: this.props
  };

  render() {
    const { walk } = this.state;
    const { cancelEdit } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Edit Walk</h3>
        <Mutation mutation={UPDATE_WALK}>
          {(updateWalk, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            return (
              <WalkForm
                submit={updateWalk}
                error={error}
                walk={walk}
                close={cancelEdit}
              />
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}

EditWalk.propTypes = {
  walk: PropTypes.shape().isRequired,
  cancelEdit: PropTypes.func.isRequired
};
