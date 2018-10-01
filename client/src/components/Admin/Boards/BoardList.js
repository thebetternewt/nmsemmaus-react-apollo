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
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { BOARDS_QUERY } from '../../../apollo/queries';

const styles = {
  selected: {
    backgroundColor: 'green',
  },
};

class BoardList extends Component {
  state = {
    selectedYear: '',
  };

  handleRowSelect = year => {
    const { selectBoard } = this.props;

    this.setState({ selectedYear: year });
    selectBoard(year);
  };

  render() {
    const { selectedYear } = this.state;

    return (
      <div>
        <p>Click on a board to view or edit.</p>

        <Query query={BOARDS_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress size={50} />;
            }

            if (data) {
              const { boards } = data;
              return (
                <Paper elevation={12} style={{ margin: '2rem 0', padding: 15 }}>
                  {boards.length > 0 ? (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Year</TableCell>
                          <TableCell>Chairman</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {boards.map(board => (
                          <TableRow
                            hover
                            key={board.id}
                            selected={board.year === selectedYear}
                            onClick={() => {
                              this.handleRowSelect(board.year);
                            }}
                          >
                            <TableCell>{board.year}</TableCell>
                            <TableCell>{board.chairman}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p>No boards yet!</p>
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

BoardList.propTypes = {
  selectBoard: PropTypes.func.isRequired,
};

export default withStyles(styles)(BoardList);
