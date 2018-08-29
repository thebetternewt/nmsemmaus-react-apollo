import { gql } from 'react-apollo';

const walkQuery = gql`
  query walkQuery($walkNumber: ID) {
    walk(walkNumber: $walkNumber) {
      pilgrims {
        lastName
        firstName
      }
    }
  }
`;
