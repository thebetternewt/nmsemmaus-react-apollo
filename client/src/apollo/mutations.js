import gql from 'graphql-tag';

const ADD_WALK = gql`
  mutation AddWalk(
    $walkNumber: Int!
    $gender: String!
    $startDate: String!
    $endDate: String!
  ) {
    addWalk(
      walkNumber: $walkNumber
      gender: $gender
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      walkNumber
      gender
      startDate
      endDate
    }
  }
`;

const UPDATE_WALK = gql`
  mutation UpdateWalk(
    $id: ID!
    $walkNumber: Int
    $gender: String
    $startDate: String
    $endDate: String
  ) {
    updateWalk(
      id: $id
      walkNumber: $walkNumber
      gender: $gender
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      walkNumber
      gender
      startDate
      endDate
    }
  }
`;

export { ADD_WALK, UPDATE_WALK };
