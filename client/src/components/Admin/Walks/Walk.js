import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Paper, CircularProgress, Button } from '@material-ui/core';
import WalkForm from './WalkForm';
import { WALK_QUERY } from '../../../apollo/queries';
import { UPDATE_WALK } from '../../../apollo/mutations';

export default class Walk extends Component {
  state = {
    // walkNumber: this.props.walkNumber, // eslint-disable-line react/destructuring-assignment
    showEditMode: false,
  };

  toggleEditMode = () => {
    const { showEditMode } = this.state;
    this.setState({ showEditMode: !showEditMode });
  };

  render() {
    const { showEditMode } = this.state;
    const { cancelEdit, walkNumber } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Edit Walk #{walkNumber}</h3>
        <Query query={WALK_QUERY} variables={{ walkNumber }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.walk) {
              const { startDate, endDate, gender } = data.walk;

              if (showEditMode) {
                return (
                  <Mutation mutation={UPDATE_WALK}>
                    {(updateWalk, { loading: updating, error }) => {
                      if (updating) {
                        return <CircularProgress />;
                      }

                      return (
                        <WalkForm
                          submit={updateWalk}
                          error={error}
                          walk={data.walk}
                          close={cancelEdit}
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
                    <strong>Walk Number:</strong> {walkNumber}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {endDate}
                  </p>
                  <p>
                    <strong>Gender:</strong> {gender}
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

            return <p>Walk not found.</p>;
          }}
        </Query>
      </Paper>
    );
  }
}

Walk.propTypes = {
  walkNumber: PropTypes.number.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};
