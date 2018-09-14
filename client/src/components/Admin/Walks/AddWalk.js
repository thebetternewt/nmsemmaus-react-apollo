import React, { Component } from 'react';
import WalkForm from './WalkForm';
import { Mutation } from 'react-apollo';
import { ADD_WALK } from '../../../apollo/mutations';

import { Paper, CircularProgress } from '@material-ui/core';

export default class AddWalk extends Component {
  render() {
    const { cancelAdd } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Add Department</h3>
        <Mutation mutation={ADD_WALK}>
          {(addWalk, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data) {
              console.log(data);
            }

            return (
              <WalkForm submit={addWalk} error={error} close={cancelAdd} />
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}
