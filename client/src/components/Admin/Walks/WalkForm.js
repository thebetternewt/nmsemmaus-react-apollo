import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';

export default class WalkForm extends Component {
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
    const { submit, close, error } = this.props;

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
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Input
            type="text"
            id="gender"
            name="gender"
            value={gender}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="startDate">Start Date</InputLabel>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="endDate">End Date</InputLabel>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={this.handleInputChange}
          />
        </FormControl>

        <Button type="submit" variant="raised" color="primary">
          Submit
        </Button>
        <Button variant="raised" color="secondary" onClick={close}>
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
