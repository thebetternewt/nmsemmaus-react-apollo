import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';

import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';
import ScrollToTop from './components/common/ScrollToTop';
import registerServiceWorker from './registerServiceWorker';

import client, { setAuthenticatedUser, logOutUser } from './apollo/client';

// Check for token in LS
const token = localStorage.getItem('token');
if (token) {
  const decoded = jwtDecode(token);
  // Set user data in Apollo cache
  setAuthenticatedUser(decoded);

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.log('token expired');
    // Logout user
    logOutUser();
    // Redirect to login
    window.location.href = '/';
  }
}

const app = (
  <ApolloProvider client={client}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
