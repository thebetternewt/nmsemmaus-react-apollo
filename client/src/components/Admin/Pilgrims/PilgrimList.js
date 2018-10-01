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
import { WALK_QUERY } from '../../../apollo/queries';

const styles = {
  selected: {
    backgroundColor: 'green',
  },
};

class PilgrimList extends Component {
  state = {
    selectedId: '',
    page: 0,
    rowsPerPage: 5,
  };

  handleRowSelect = id => {
    const { selectPilgrim } = this.props;

    this.setState({ selectedId: id });
    selectPilgrim(id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { walkNumber } = this.props;
    const { selectedId, page, rowsPerPage } = this.state;

    return (
      <div>
        <p>Click on a pilgrim to view or edit.</p>

        <Query query={WALK_QUERY} variables={{ walkNumber }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress size={50} />;
            }

            if (data) {
              const {
                walk: { pilgrims },
              } = data;
              console.log(pilgrims);
              return (
                <Paper elevation={12} style={{ margin: '2rem 0', padding: 15 }}>
                  {pilgrims.length > 0 ? (
                    <div>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Last Name</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Hometown</TableCell>
                            <TableCell>Sponsor</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pilgrims
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map(pilgrim => (
                              <TableRow
                                hover
                                key={pilgrim.id}
                                selected={pilgrim.id === selectedId}
                                onClick={() => {
                                  this.handleRowSelect(pilgrim.id);
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {pilgrim.lastName}
                                </TableCell>
                                <TableCell>{pilgrim.firstName}</TableCell>
                                <TableCell>{pilgrim.hometown}</TableCell>
                                <TableCell>{pilgrim.sponsor}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        component="div"
                        count={pilgrims.length}
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
                    </div>
                  ) : (
                    <p>No pilgrims yet!</p>
                  )}
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

PilgrimList.propTypes = {
  walkNumber: PropTypes.number.isRequired,
  selectPilgrim: PropTypes.func.isRequired,
};

export default withStyles(styles)(PilgrimList);
