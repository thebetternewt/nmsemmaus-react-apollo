import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  buttonMargins: {
    margin: '1rem 20px 1rem 0',
  },
};

class PilgrimForm extends Component {
  state = {
    /* eslint-disable react/destructuring-assignment */
    id: this.props.pilgrim.id || '',
    firstName: this.props.pilgrim.firstName || '',
    lastName: this.props.pilgrim.lastName || '',
    hometown: this.props.pilgrim.hometown || '',
    sponsor: this.props.pilgrim.sponsor || '',
    walkNumber: this.props.pilgrim.walkNumber || this.props.walkNumber,
    /* eslint-enable react/destructuring-assignment */
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      id,
      firstName,
      lastName,
      hometown,
      sponsor,
      walkNumber,
    } = this.state;
    const { submit, close, error, classes } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          submit({
            variables: {
              id,
              firstName,
              lastName,
              hometown,
              sponsor,
              walkNumber,
            },
            refetchQueries: ['WalkQuery'],
          })
            .then(() => close())
            .catch(err => console.log(err));
        }}
      >
        {error && (
          <pre style={{ margin: '1rem', color: 'red' }}>
            Error:{' '}
            {error.graphQLErrors.map(({ message }) => (
              <span key={message}>{message}</span>
            ))}
          </pre>
        )}

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            autoFocus
            onChange={this.handleInputChange}
          />
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={this.handleInputChange}
          />
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="hometown">Hometown</InputLabel>
          <Input
            type="text"
            id="hometown"
            name="hometown"
            value={hometown}
            onChange={this.handleInputChange}
          />
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="sponsor">Sponsor</InputLabel>
          <Input
            type="text"
            id="sponsor"
            name="sponsor"
            value={sponsor}
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
        <Button
          variant="raised"
          color="secondary"
          onClick={close}
          className={classes.buttonMargins}
        >
          Cancel
        </Button>
      </form>
    );
  }
}

PilgrimForm.defaultProps = {
  pilgrim: {},
  walkNumber: null,
  error: null,
};

PilgrimForm.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  pilgrim: PropTypes.shape(),
  walkNumber: PropTypes.number,
  classes: PropTypes.shape().isRequired,
  error: PropTypes.shape(),
};

export default withStyles(styles)(PilgrimForm);
