import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { NEWSLETTERS_QUERY } from '../../../apollo/queries';

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

class NewsletterList extends Component {
  state = {
    selectedId: ''
  };

  handleRowSelect = id => {
    this.setState({ selectedId: id });
    this.props.selectNewsletter(id);
  };

  render() {
    const { selectedId } = this.state;

    return (
      <div>
        <p>Click on a newsletter to view or edit.</p>

        <Query query={NEWSLETTERS_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress size={50} />;
            }

            if (data) {
              const { newsletters } = data;
              return (
                <Paper elevation={12} style={{ margin: '2rem 0', padding: 15 }}>
                  {newsletters.length > 0 ? (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell>Publish Date</TableCell>
                          <TableCell>Last Updated</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {newsletters.map(newsletter => {
                          return (
                            <TableRow
                              hover
                              key={newsletter.id}
                              selected={newsletter.id === selectedId}
                              onClick={() => {
                                this.handleRowSelect(newsletter.id);
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {newsletter.title}
                              </TableCell>
                              <TableCell>{newsletter.publishedOn}</TableCell>
                              <TableCell>{newsletter.updatedAt}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <p>No newsletters yet!</p>
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

NewsletterList.propTypes = {
  selectNewsletter: PropTypes.func.isRequired
};

export default withStyles(styles)(NewsletterList);
