import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import {
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { WALKS_QUERY } from '../../../apollo/queries';

const styles = {
  selected: {
    backgroundColor: 'green',
  },
};

class WalkList extends Component {
  state = {
    selectedId: '',
    page: 0,
    rowsPerPage: 5,
  };

  handleRowSelect = walk => {
    const { selectWalk } = this.props;

    this.setState({ selectedId: walk.id });
    selectWalk(walk.walkNumber);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { selectedId, page, rowsPerPage } = this.state;

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
                      {walks.map(walk => (
                        <TableRow
                          hover
                          key={walk.id}
                          selected={walk.id === selectedId}
                          onClick={() => {
                            this.handleRowSelect(walk);
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {walk.walkNumber}
                          </TableCell>
                          <TableCell>{walk.gender}</TableCell>
                          <TableCell>{walk.startDate}</TableCell>
                          <TableCell>{walk.endDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    count={walks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
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
  selectWalk: PropTypes.func.isRequired,
};

export default withStyles(styles)(WalkList);
