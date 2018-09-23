import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import { AUTH_QUERY, REDIRECT_QUERY } from './queries';

const defaultState = {
  isAuthenticated: false,
  user: null,
  redirectPath: null
};

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin'
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const stateLink = new withClientState({
  cache,
  defaults: defaultState
});

const authLink = setContext((_, { headers }) => {
  console.log('[headers]:', headers);
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const uploadLink = createUploadLink();

const link = ApolloLink.from([
  // Errors Link
  errorLink,
  // Link to GraphQL server
  httpLink,
  // File Upload Link
  uploadLink,
  // Link client state
  stateLink,
  authLink
]);

const client = new ApolloClient({
  link,
  cache
});

const setAuthenticatedUser = userData => {
  client.cache.writeData({
    data: {
      isAuthenticated: true,
      user: { __typename: 'user', ...userData }
    }
  });

  // const { user } = client.cache.readQuery({ query: CURRENT_USER_QUERY });
  // console.log('user from cache:', user);
};

const isAuthenticated = () => {
  const { isAuthenticated } = client.readQuery({
    query: AUTH_QUERY
  });
  return isAuthenticated;
};

const logOutUser = async () => {
  localStorage.removeItem('token');
  await client.resetStore();
};

const setRedirectPath = redirectPath => {
  client.cache.writeData({
    data: {
      redirectPath
    }
  });
};

const getRedirectPath = () => {
  const { redirectPath } = client.readQuery({
    query: REDIRECT_QUERY
  });
  return redirectPath;
};

export default client;
export {
  isAuthenticated,
  setAuthenticatedUser,
  logOutUser,
  setRedirectPath,
  getRedirectPath
};
