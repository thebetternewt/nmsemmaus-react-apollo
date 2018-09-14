import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { LOGIN_MUTATION } from '../../apollo/queries';
import {
  setAuthenticatedUser,
  getRedirectPath,
  setRedirectPath
} from '../../apollo/client';

import ContentContainer from '../common/ContentContainer';
import Spinner from '../common/Spinner';
import {
  Typography,
  Paper,
  Input,
  InputLabel,
  FormControl,
  Button,
  CssBaseline,
  Avatar,
  CircularProgress
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import { DarkFilter } from '../UI/filters';

import boardPath from '../../images/board-path.jpeg';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    zIndex: 20,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  // Handle input value changes
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, password } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Backdrop>
          <DarkFilter />
        </Backdrop>

        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <Mutation mutation={LOGIN_MUTATION}>
              {(login, { loading, data, error }) => {
                if (loading) {
                  return (
                    <CircularProgress
                      color="secondary"
                      style={{ margin: '1rem 0' }}
                    />
                  );
                }

                if (data) {
                  console.log(data);
                  const token = data.login;
                  localStorage.setItem('token', token);
                  setAuthenticatedUser(jwt_decode(token));
                  const path = getRedirectPath();
                  if (path) {
                    console.log(path);
                    setRedirectPath(null);
                    return <Redirect to={path} />;
                  } else {
                    return <Redirect to="/" />;
                  }
                }
                return (
                  <Fragment>
                    {error && (
                      <pre style={{ color: 'red' }}>
                        Error:{' '}
                        {error.graphQLErrors.map(({ message }, i) => (
                          <span key={i}>{message}</span>
                        ))}
                      </pre>
                    )}
                    <form
                      className={classes.form}
                      onSubmit={e => {
                        e.preventDefault();
                        login({
                          variables: {
                            username,
                            password
                          }
                        }).catch(err => console.log(err.message));
                      }}
                    >
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                          id="username"
                          name="username"
                          autoFocus
                          onChange={this.handleInputChange}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                          name="password"
                          type="password"
                          id="password"
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
                        Sign in
                      </Button>
                    </form>
                  </Fragment>
                );
              }}
            </Mutation>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

Login.defaultProps = {
  redirectPath: null
};

Login.propTypes = {
  redirectPath: PropTypes.string
};

export default withStyles(styles)(Login);

const Backdrop = styled(Paper)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${boardPath});
  background-size: cover;
  background-position: center center;
`;
