import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ContentContainer from '../common/ContentContainer';
import Spinner from '../common/Spinner';
import Modal from '../UI/Modal';

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: null
  };

  // Add error to state
  componentWillReceiveProps = nextProps => {
    this.setState({ error: nextProps.error });
  };

  // Handle input value changes
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle register form submission
  handleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    this.props.loginUser(username, password);
  };

  render() {
    const { username, password, error } = this.state;

    // Reroute if authenticated
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.redirectPath} />;
    }

    if (this.props.loading) {
      return <Spinner />;
    }

    return <Modal />;
  }
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string.isRequired,
  loginUser: PropTypes.func.isRequired,
  error: PropTypes.shape().isRequired
};

export default Login;

const TextInput = styled.input`
  display: block;
  width: 100%;
  max-width: 90vw;
  border: none;
  border-radius: 99px;
  font-size: 1rem;

  margin: 10px auto;
  padding: 10px 15px;
`;

const SubmitButton = styled.button`
  display: block;
  background-color: #3d9991;
  color: #fff;
  border: none;
  border-radius: 99px;
  font-size: 1.2rem;
  padding: 10px 0;
  margin: 15px auto 1rem;
  width: 100%;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Card = styled.div`
  align-self: center;
  width: 300px;
  max-width: 90%;
  background-color: #e1eaf2;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  margin: 20% auto;
  padding: 15px;

  h2 {
    font-family: 'Montserrat', 'Helvetica', Arial, sans-serif;
    margin: 0.9em 0 0.9em;
    text-align: center;
    text-transform: uppercase;
  }

  span {
    color: #43a7ff;
    text-decoration: underline;
  }
`;
