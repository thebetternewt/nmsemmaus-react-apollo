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

const ADD_PILGRIM = gql`
  mutation AddPilgrim(
    $firstName: String!
    $lastName: String!
    $hometown: String!
    $sponsor: String!
    $walkNumber: Int!
  ) {
    addPilgrim(
      firstName: $firstName
      lastName: $lastName
      hometown: $hometown
      sponsor: $sponsor
      walkNumber: $walkNumber
    ) {
      id
      firstName
      lastName
      hometown
      sponsor
      walkNumber
    }
  }
`;

const UPDATE_PILGRIM = gql`
  mutation UpdatePilgrim(
    $id: ID!
    $firstName: String
    $lastName: String
    $hometown: String
    $sponsor: String
  ) {
    UpdatePilgrim(
      id: $id
      firstName: $firstName
      lastName: $lastName
      hometown: $hometown
      sponsor: $sponsor
    ) {
      id
      firstName
      lastName
      hometown
      sponsor
      walkNumber
    }
  }
`;

export { ADD_WALK, UPDATE_WALK, ADD_PILGRIM, UPDATE_PILGRIM };
