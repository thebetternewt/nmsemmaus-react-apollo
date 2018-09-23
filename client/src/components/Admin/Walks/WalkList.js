import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { WALKS_QUERY } from '../../../apollo/queries';

import {
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  selected: {
    backgroundColor: 'green'
  }
};

class WalkList extends Component {
  state = {
    selectedId: ''
  };

  handleRowSelect = id => {
    this.setState({ selectedId: id });
  };

  render() {
    const { selectWalk } = this.props;
    const { selectedId } = this.state;

    return (
      <div>
        <p>Click on a walk to view or edit.</p>

        <Query query={WALKS_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress size={50} />;
            }

            if (data) {
              const { walks } = data;

              return (
                <Paper elevation={12} style={{ margin: '2rem 0', padding: 15 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {walks.map(walk => {
                        return (
                          <TableRow
                            hover
                            key={walk.id}
                            selected={walk.id === selectedId}
                            onClick={() => {
                              this.handleRowSelect(walk.id);
                              selectWalk(walk);
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {walk.walkNumber}
                            </TableCell>
                            <TableCell>{walk.gender}</TableCell>
                            <TableCell>{walk.startDate}</TableCell>
                            <TableCell>{walk.endDate}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              );
            }

            return null;
          }}
        </Query>
      </div>
    );
  }
}

WalkList.propTypes = {
  selectWalk: PropTypes.func.isRequired
};

export default withStyles(styles)(WalkList);
