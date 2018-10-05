import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Paper, CircularProgress, Button } from '@material-ui/core';
import { BOARD_QUERY } from '../../../apollo/queries';
import { UPDATE_BOARD } from '../../../apollo/mutations';

import BoardForm from './BoardForm';

export default class Board extends Component {
  state = {
    year: this.props.year, // eslint-disable-line react/destructuring-assignment
    showEditMode: false,
  };

  toggleEditMode = () => {
    const { showEditMode } = this.state;
    this.setState({ showEditMode: !showEditMode });
  };

  render() {
    const { year, showEditMode } = this.state;
    const { cancelEdit } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <Query query={BOARD_QUERY} variables={{ year }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.board) {
              const {
                chairman,
                viceChairman,
                secretary,
                treasurer,
                communitySpiritualDirector,
                exOfficio,
              } = data.board;

              if (showEditMode) {
                return (
                  <Mutation mutation={UPDATE_BOARD}>
                    {(updateBoard, { loading: updating, error }) => {
                      if (updating) {
                        return <CircularProgress />;
                      }

                      return (
                        <BoardForm
                          submit={updateBoard}
                          error={error}
                          close={this.toggleEditMode}
                          board={data.board}
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
                    <strong>Year:</strong> {year}
                  </p>
                  <p>
                    <strong>Chairman:</strong> {chairman}
                  </p>
                  <p>
                    <strong>Vice Chairman:</strong> {viceChairman}
                  </p>
                  <p>
                    <strong>Secretary:</strong> {secretary}
                  </p>
                  <p>
                    <strong>Treasurer:</strong> {treasurer}
                  </p>
                  <p>
                    <strong>Community Spiritual Director:</strong>{' '}
                    {communitySpiritualDirector}
                  </p>
                  <p>
                    <strong>
                      Ex Officio <em>(Immediate Past Chair)</em>:
                    </strong>{' '}
                    {exOfficio}
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

            return <p>Board not found.</p>;
          }}
        </Query>
      </Paper>
    );
  }
}

Board.propTypes = {
  year: PropTypes.string.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};
