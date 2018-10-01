import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import {
  FormControl,
  InputLabel,
  Input,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { REMOVE_BOARD } from '../../../apollo/mutations';

const styles = {
  buttonMargins: {
    margin: '1rem 20px 1rem 0',
  },
};

class BoardForm extends Component {
  state = {
    /* eslint-disable react/destructuring-assignment */
    id: this.props.board.id || '',
    year: this.props.board.year || '',
    chairman: this.props.board.chairman || '',
    viceChairman: this.props.board.viceChairman || '',
    secretary: this.props.board.secretary || '',
    treasurer: this.props.board.treasurer || '',
    communitySpiritualDirector:
      this.props.board.communitySpiritualDirector || '',
    exOfficio: this.props.board.exOfficio || '',
    /* eslint-enable react/destructuring-assignment */
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      id,
      year,
      chairman,
      viceChairman,
      secretary,
      treasurer,
      communitySpiritualDirector,
      exOfficio,
    } = this.state;
    const { submit, close, error, classes } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          submit({
            variables: {
              id,
              year,
              chairman,
              viceChairman,
              secretary,
              treasurer,
              communitySpiritualDirector,
              exOfficio,
            },
            refetchQueries: ['BoardsQuery'],
          })
            .then(() => close())
            .catch(err => console.log(err));
        }}
      >
        {error && (
          <pre style={{ margin: '1rem', color: 'red' }}>
            Error: <span>{error.graphQLErrors[0].message}</span>
          </pre>
        )}

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="year">Year</InputLabel>
          <Input
            type="text"
            id="year"
            name="year"
            value={year}
            autoFocus
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="chairman">Chairman</InputLabel>
          <Input
            type="text"
            id="chairman"
            name="chairman"
            value={chairman}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="viceChairman">Vice Chairman</InputLabel>
          <Input
            type="text"
            id="viceChairman"
            name="viceChairman"
            value={viceChairman}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="secretary">Secretary</InputLabel>
          <Input
            type="text"
            id="secretary"
            name="secretary"
            value={secretary}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="treasurer">Treasurer</InputLabel>
          <Input
            type="text"
            id="treasurer"
            name="treasurer"
            value={treasurer}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="communitySpiritualDirector">
            Community Spiritual Director
          </InputLabel>
          <Input
            type="text"
            id="communitySpiritualDirector"
            name="communitySpiritualDirector"
            value={communitySpiritualDirector}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="exOfficio">Ex Officio</InputLabel>
          <Input
            type="text"
            id="exOfficio"
            name="exOfficio"
            value={exOfficio}
            onChange={this.handleInputChange}
          />
        </FormControl>

        <Button
          type="submit"
          variant="raised"
          color="primary"
          className={classes.buttonMargins}
        >
          Submit
        </Button>
        {id.length > 0 && (
          <Mutation mutation={REMOVE_BOARD}>
            {(removeBoard, { loading }) => {
              if (loading) {
                return <CircularProgress />;
              }

              return (
                <Button
                  variant="raised"
                  color="secondary"
                  onClick={() => {
                    if (window.confirm('Are you sure?')) {
                      removeBoard({
                        variables: { id },
                        refetchQueries: ['BoardsQuery'],
                      })
                        .then(
                          // TODO: Redirect with JS
                          (window.location.href = '/admin/boards')
                        )
                        .catch(err => console.log(err));
                    }
                  }}
                  className={classes.buttonMargins}
                >
                  Delete
                </Button>
              );
            }}
          </Mutation>
        )}
        <Button
          variant="raised"
          onClick={close}
          className={classes.buttonMargins}
          style={{ backgroundColor: '#777', color: '#fff' }}
        >
          Cancel
        </Button>
      </form>
    );
  }
}

BoardForm.defaultProps = {
  board: {},
  error: null,
};

BoardForm.propTypes = {
  board: PropTypes.shape(),
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
  error: PropTypes.shape(),
};

export default withStyles(styles)(BoardForm);
