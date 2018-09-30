import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Paper, CircularProgress } from '@material-ui/core';
import NewsletterForm from './NewsletterForm';
import { ADD_NEWSLETTER } from '../../../apollo/mutations';

export default class AddNewsletter extends Component {
  render() {
    const { cancelAdd, walkNumber } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Add Newsletter</h3>
        <Mutation mutation={ADD_NEWSLETTER}>
          {(addNewsletter, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data) {
              console.log(data);
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
  }
}
