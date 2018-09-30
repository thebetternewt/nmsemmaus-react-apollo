import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Paper, CircularProgress } from '@material-ui/core';
import PilgrimForm from './PilgrimForm';
import { ADD_PILGRIM } from '../../../apollo/mutations';

const AddPilgrim = props => {
  const { cancelAdd, walkNumber } = props;

  return (
    <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
      <h3>Add Pilgrim</h3>
      <Mutation mutation={ADD_PILGRIM}>
        {(addPilgrim, { loading, error }) => {
          if (loading) {
            return <CircularProgress />;
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
};

AddPilgrim.propTypes = {
  walkNumber: PropTypes.number.isRequired,
  cancelAdd: PropTypes.func.isRequired,
};

export default AddPilgrim;
