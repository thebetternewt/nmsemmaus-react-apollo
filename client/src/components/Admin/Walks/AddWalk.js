import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Paper, CircularProgress } from '@material-ui/core';
import WalkForm from './WalkForm';
import { ADD_WALK } from '../../../apollo/mutations';

const AddWalk = props => {
  const { cancelAdd } = props;

  return (
    <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
      <h3>Add Walk</h3>
      <Mutation mutation={ADD_WALK}>
        {(addWalk, { loading, error }) => {
          if (loading) {
            return <CircularProgress />;
          }

          return <WalkForm submit={addWalk} error={error} close={cancelAdd} />;
        }}
      </Mutation>
    </Paper>
  );
};

AddWalk.propTypes = {
  cancelAdd: PropTypes.func.isRequired,
};

export default AddWalk;
