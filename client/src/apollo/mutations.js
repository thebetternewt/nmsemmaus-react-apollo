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
    updatePilgrim(
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
const ADD_NEWSLETTER = gql`
  mutation AddNewsletter(
    $title: String!
    $body: String!
    $publishedOn: String!
  ) {
    addNewsletter(title: $title, body: $body, publishedOn: $publishedOn) {
      id
      title
      body
      publishedOn
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_NEWSLETTER = gql`
  mutation UpdateNewsletter(
    $id: ID!
    $title: String
    $body: String
    $publishedOn: String
    $documentUrl: String
  ) {
    updateNewsletter(
      id: $id
      title: $title
      body: $body
      publishedOn: $publishedOn
      documentUrl: $documentUrl
    ) {
      id
      title
      body
      publishedOn
      documentUrl
      createdAt
      updatedAt
    }
  }
`;

const REMOVE_NEWSLETTER = gql`
  mutation RemoveNewsletter($id: ID!) {
    removeNewsletter(id: $id) {
      id
    }
  }
`;

const SIGN_S3 = gql`
  mutation SignS3($filename: String!, $filetype: String!, $path: String!) {
    signS3(filename: $filename, filetype: $filetype, path: $path) {
      url
      signedRequest
    }
  }
`;

const ADD_BOARD = gql`
  mutation AddBoard(
    $year: ID!
    $chairman: String
    $viceChairman: String
    $secretary: String
    $treasurer: String
    $communitySpiritualDirector: String
    $exOfficio: String
  ) {
    addBoard(
      year: $year
      chairman: $chairman
      viceChairman: $viceChairman
      secretary: $secretary
      treasurer: $treasurer
      communitySpiritualDirector: $communitySpiritualDirector
      exOfficio: $exOfficio
    ) {
      id
    }
  }
`;

const UPDATE_BOARD = gql`
  mutation UpdateBoard(
    $id: ID!
    $year: ID
    $chairman: String
    $viceChairman: String
    $secretary: String
    $treasurer: String
    $communitySpiritualDirector: String
    $exOfficio: String
  ) {
    updateBoard(
      id: $id
      year: $year
      chairman: $chairman
      viceChairman: $viceChairman
      secretary: $secretary
      treasurer: $treasurer
      communitySpiritualDirector: $communitySpiritualDirector
      exOfficio: $exOfficio
    ) {
      id
    }
  }
`;

const REMOVE_BOARD = gql`
  mutation RemoveBoard($id: ID!) {
    removeBoard(id: $id) {
      id
    }
  }
`;

export {
  ADD_WALK,
  UPDATE_WALK,
  ADD_PILGRIM,
  UPDATE_PILGRIM,
  ADD_NEWSLETTER,
  UPDATE_NEWSLETTER,
  REMOVE_NEWSLETTER,
  SIGN_S3,
  ADD_BOARD,
  UPDATE_BOARD,
  REMOVE_BOARD,
};
