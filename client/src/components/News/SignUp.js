import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Typography,
  Paper,
  Input,
  InputLabel,
  FormControl,
  Button,
  CssBaseline,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  layout: {
    width: 'auto',
    height: '100vh',
    display: 'flex', // Fix IE11 issue.
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    zIndex: 20,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: 0,
  },
  headline: {
    color: '#000 !important',
    fontSize: '1.5rem !important',
    marginBottom: '0 !important',
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class NewsSignUp extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    walkNumber: '',
    errors: [],
  };

  // Handle input value changes
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerEmail = () => {
    const { email, firstName, lastName, walkNumber } = this.state;
    const { close } = this.props;

    axios
      .post(
        'https://api.sendgrid.com/v3/contactdb/recipients',
        [
          {
            email,
            first_name: firstName,
            last_name: lastName,
            walk_number: walkNumber,
          },
        ],
        {
          headers: {
            authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`,
          },
        }
      )
      .then(res => {
        const { status, errors } = res;
        if (status === 201) {
          close();
        } else {
          this.setState({ errors });
        }
      })
      .catch(console.error);
  };

  render() {
    const { email, firstName, lastName, walkNumber, errors } = this.state;
    const { classes, close } = this.props;

    return (
      <SignUpModalWrapper>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline" className={classes.headline}>
              Sign Up
            </Typography>

            {errors && (
              <pre style={{ color: 'red' }}>
                {errors.map(({ message }) => (
                  <span key={message}>{message}</span>
                ))}
              </pre>
            )}
            <form
              className={classes.form}
              onSubmit={e => {
                e.preventDefault();
                this.registerEmail();
              }}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoFocus
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="walkNumber">Walk Number</InputLabel>
                <Input
                  type="number"
                  name="walkNumber"
                  id="walkNumber"
                  value={walkNumber}
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </form>
            <CloseButton onClick={() => close()}>x</CloseButton>
          </Paper>
        </main>
      </SignUpModalWrapper>
    );
  }
}

NewsSignUp.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(NewsSignUp);

const SignUpModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 500;
`;

const CloseButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 20px 15px;
  font-size: 40px;
`;
