import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Paper, CircularProgress } from '@material-ui/core';
import BoardForm from './BoardForm';
import { ADD_BOARD } from '../../../apollo/mutations';

const AddBoard = props => {
  const { cancelAdd } = props;

  return (
    <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
      <h3>Add Board</h3>
      <Mutation mutation={ADD_BOARD}>
        {(addBoard, { data, loading, error }) => {
          if (loading) {
            return <CircularProgress />;
          }

          if (data) {
            console.log(data);
          }

          return (
            <BoardForm submit={addBoard} error={error} close={cancelAdd} />
          );
        }}
      </Mutation>
    </Paper>
  );
};

AddBoard.propTypes = {
  cancelAdd: PropTypes.func.isRequired,
};

export default AddBoard;
