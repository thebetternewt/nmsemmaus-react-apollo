import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PilgrimForm from './PilgrimForm';
import { Mutation } from 'react-apollo';
import { ADD_PILGRIM } from '../../../apollo/mutations';

import { Paper, CircularProgress } from '@material-ui/core';

export default class AddPilgrim extends Component {
  render() {
    const { cancelAdd, walkNumber } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Add Pilgrim</h3>
        <Mutation mutation={ADD_PILGRIM}>
          {(addPilgrim, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data) {
              console.log(data);
            }

            return (
              <PilgrimForm
                submit={addPilgrim}
                error={error}
                close={cancelAdd}
                walkNumber={walkNumber}
              />
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}

AddPilgrim.propTypes = {
  walkNumber: PropTypes.number.isRequired
};
