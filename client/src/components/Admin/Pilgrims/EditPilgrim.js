import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PilgrimForm from './PilgrimForm';
import { Mutation } from 'react-apollo';
import { UPDATE_PILGRIM } from '../../../apollo/mutations';

import { Paper, CircularProgress } from '@material-ui/core';

export default class EditPilgrim extends Component {
  static getDerivedStateFromProps(nextProps) {
    return { pilgrim: nextProps.pilgrim };
  }

  state = {
    pilgrim: this.props
  };

  render() {
    const { pilgrim } = this.state;
    const { cancelEdit } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Edit Pilgrim</h3>
        <Mutation mutation={UPDATE_PILGRIM}>
          {(updatePilgrim, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            return (
              <PilgrimForm
                submit={updatePilgrim}
                error={error}
                close={cancelEdit}
                pilgrim={pilgrim}
              />
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}

EditPilgrim.propTypes = {
  pilgrim: PropTypes.shape().isRequired,
  cancelEdit: PropTypes.func.isRequired
};
