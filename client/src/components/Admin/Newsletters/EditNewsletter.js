import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { UPDATE_NEWSLETTER } from '../../../apollo/mutations';

import { Paper, CircularProgress } from '@material-ui/core';
import NewsletterForm from './NewsletterForm';

export default class EditNewsletter extends Component {
  static getDerivedStateFromProps(nextProps) {
    return { newsletter: nextProps.newsletter };
  }

  state = {
    newsletter: this.props.newsletter
  };

  render() {
    const { newsletter } = this.state;
    const { cancelEdit } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Edit Newsletter</h3>
        <Mutation mutation={UPDATE_NEWSLETTER}>
          {(updateNewsletter, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            return (
              <NewsletterForm
                submit={updateNewsletter}
                error={error}
                close={cancelEdit}
                newsletter={newsletter}
              />
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}

EditNewsletter.propTypes = {
  newsletter: PropTypes.shape().isRequired,
  cancelEdit: PropTypes.func.isRequired
};
