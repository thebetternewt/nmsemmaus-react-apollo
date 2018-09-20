import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { WALK_QUERY } from '../../../apollo/queries';

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

class PilgrimList extends Component {
  state = {
    selectedId: ''
  };

  handleRowSelect = id => {
    this.setState({ selectedId: id });
  };

  render() {
    const { walkNumber, selectPilgrim } = this.props;
    const { selectedId } = this.state;

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
                walk: { pilgrims }
              } = data;
              console.log(pilgrims);
              return (
                <Paper elevation={12} style={{ margin: '2rem 0', padding: 15 }}>
                  {pilgrims.length > 0 ? (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Hometown</TableCell>
                          <TableCell>Sponsor</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pilgrims.map(pilgrim => {
                          return (
                            <TableRow
                              hover
                              key={pilgrim.id}
                              selected={pilgrim.id === selectedId}
                              onClick={() => {
                                this.handleRowSelect(pilgrim.id);
                                selectPilgrim(pilgrim);
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {pilgrim.firstName} {pilgrim.lastName}
                              </TableCell>
                              <TableCell>{pilgrim.hometown}</TableCell>
                              <TableCell>{pilgrim.sponsor}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
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
  selectPilgrim: PropTypes.func.isRequired
};

export default withStyles(styles)(PilgrimList);
