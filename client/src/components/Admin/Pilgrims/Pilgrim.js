import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import { Paper, CircularProgress, Button } from '@material-ui/core';
import PilgrimForm from './PilgrimForm';
import { PILGRIM_QUERY } from '../../../apollo/queries';
import { UPDATE_PILGRIM } from '../../../apollo/mutations';

export default class Pilgrim extends Component {
  state = {
    id: this.props.id, // eslint-disable-line react/destructuring-assignment
    showEditMode: false,
  };

  toggleEditMode = () => {
    const { showEditMode } = this.state;
    this.setState({ showEditMode: !showEditMode });
  };

  render() {
    const { id, showEditMode } = this.state;
    const { cancelEdit } = this.props;

    console.log('pilgrim state: ', this.state);

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Edit Pilgrim</h3>
        <Query query={PILGRIM_QUERY} variables={{ id }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.pilgrim) {
              const { firstName, lastName, hometown, sponsor } = data.pilgrim;

              if (showEditMode) {
                return (
                  <Mutation mutation={UPDATE_PILGRIM}>
                    {(updatePilgrim, { loading: updating, error }) => {
                      if (updating) {
                        return <CircularProgress />;
                      }

                      return (
                        <PilgrimForm
                          submit={updatePilgrim}
                          error={error}
                          close={cancelEdit}
                          pilgrim={data.pilgrim}
                        />
                      );
                    }}
                  </Mutation>
                );
              }

              return (
                <Fragment>
                  <h3>Detail:</h3>
                  <p>
                    <strong>First Name:</strong> {firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {lastName}
                  </p>
                  <p>
                    <strong>Hometown:</strong> {hometown}
                  </p>
                  <p>
                    <strong>Sponsor:</strong> {sponsor}
                  </p>

                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.toggleEditMode}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={cancelEdit}
                  >
                    Close
                  </Button>
                </Fragment>
              );
            }

            return <p>Pilgrim not found.</p>;
          }}
        </Query>
      </Paper>
    );
  }
}

Pilgrim.propTypes = {
  id: PropTypes.string.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};
