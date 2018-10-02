import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Paper, CircularProgress } from '@material-ui/core';
import NewsletterForm from './NewsletterForm';
import { ADD_NEWSLETTER } from '../../../apollo/mutations';

const AddNewsletter = props => {
  const { cancelAdd, walkNumber } = props;

  return (
    <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
      <h3>Add Newsletter</h3>
      <Mutation mutation={ADD_NEWSLETTER}>
        {(addNewsletter, { loading, error }) => {
          if (loading) {
            return <CircularProgress />;
          }

          return (
            <NewsletterForm
              submit={addNewsletter}
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

AddNewsletter.propTypes = {
  cancelAdd: PropTypes.func.isRequired,
  walkNumber: PropTypes.number.isRequired,
};

export default AddNewsletter;
