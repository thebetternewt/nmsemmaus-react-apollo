import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    me {
      id
      username
      admin
    }
  }
`;

const AUTH_QUERY = gql`
  query AuthQuery {
    isAuthenticated @client
  }
`;

const REDIRECT_QUERY = gql`
  query RedirectQuery {
    redirectPath @client
  }
`;

const WALK_QUERY = gql`
  query walkQuery($walkNumber: ID) {
    walk(walkNumber: $walkNumber) {
      pilgrims {
        lastName
        firstName
      }
    }
  }
`;

export {
  LOGIN_MUTATION,
  AUTH_QUERY,
  REDIRECT_QUERY,
  CURRENT_USER_QUERY,
  WALK_QUERY
};
