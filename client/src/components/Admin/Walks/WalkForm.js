import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Input,
  TextField,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  buttonMargins: {
    margin: '1rem 20px 1rem 0'
  }
};

class WalkForm extends Component {
  state = {
    id: this.props.walk.id || '',
    walkNumber: this.props.walk.walkNumber || '',
    gender: this.props.walk.gender || '',
    startDate: this.props.walk.startDate || '',
    endDate: this.props.walk.endDate || ''
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { id, walkNumber, gender, startDate, endDate } = this.state;
    const { submit, close, error, classes } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          submit({
            variables: {
              id,
              walkNumber,
              gender,
              startDate,
              endDate
            },
            refetchQueries: ['WalksQuery']
          })
            .then(() => close())
            .catch(err => console.log(err));
        }}
      >
        {error && (
          <pre style={{ margin: '1rem', color: 'red' }}>
            Error:{' '}
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
          </pre>
        )}
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="walkNumber">Walk Number</InputLabel>
          <Input
            type="text"
            id="walkNumber"
            name="walkNumber"
            value={walkNumber}
            autoFocus
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl component="fieldset" style={{ marginTop: '1rem' }}>
          <FormLabel component="legend" style={{ fontSize: '0.8rem' }}>
            Gender
          </FormLabel>
          <RadioGroup
            style={{ flexDirection: 'row' }}
            aria-label="Gender"
            name="gender"
            value={gender}
            onChange={this.handleInputChange}
          >
            <FormControlLabel value="Men" control={<Radio />} label="Men" />
            <FormControlLabel value="Women" control={<Radio />} label="Women" />
          </RadioGroup>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField
            type="date"
            id="startDate"
            name="startDate"
            label="Start Date"
            value={startDate}
            onChange={this.handleInputChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField
            type="date"
            id="endDate"
            label="End Date"
            name="endDate"
            value={endDate}
            onChange={this.handleInputChange}
            InputLabelProps={{
              shrink: true
            }}
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

WalkForm.defaultProps = {
  walk: {}
};

WalkForm.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  walk: PropTypes.shape()
};

export default withStyles(styles)(WalkForm);
